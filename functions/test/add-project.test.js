const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createAddProjectHandler, detectImage, parseBase64Image, safeCompare } = require("../add-project");

function createMockFixture({ existingDocs = {}, storageFiles = {}, apiKey = "test-secret-key-123", failure } = {}) {
  const logs = [];
  const dbData = { ...existingDocs };
  const savedStorage = { ...storageFiles };
  const deletedStorage = [];

  const db = {
    collection(name) {
      assert.equal(name, "projects");
      return {
        doc(id) {
          const docId = id || ("mock-id-" + Math.random().toString(36).substring(2, 9));
          return {
            id: docId,
            async get() {
              if (failure && failure.stage === "get") throw failure;
              if (dbData[docId]) {
                return {
                  exists: true,
                  id: docId,
                  data: () => dbData[docId],
                };
              }
              return { exists: false, id: docId, data: () => null };
            },
            async set(data) {
              if (failure && (!failure.stage || failure.stage === "set")) throw failure;
              dbData[docId] = data;
            },
            async update(data) {
              if (failure && (!failure.stage || failure.stage === "update")) throw failure;
              if (!dbData[docId]) throw new Error("Document does not exist");
              dbData[docId] = { ...dbData[docId], ...data };
            },
          };
        },
        where(field, op, val) {
          return {
            limit(n) {
              return {
                async get() {
                  if (failure && failure.stage === "query") throw failure;
                  const docs = [];
                  for (const [id, data] of Object.entries(dbData)) {
                    if (op === "==" && data[field] === val) {
                      docs.push({
                        id,
                        ref: db.collection("projects").doc(id),
                        data: () => data,
                      });
                      if (docs.length >= n) break;
                    }
                  }
                  return {
                    empty: docs.length === 0,
                    docs,
                  };
                },
              };
            },
          };
        },
      };
    },
  };

  const storage = {
    name: "test-bucket.appspot.com",
    file(filePath) {
      return {
        name: filePath,
        async save(buffer, options) {
          if (failure && failure.stage === "storage") throw failure;
          savedStorage[filePath] = { buffer, options };
        },
        async delete() {
          deletedStorage.push(filePath);
          delete savedStorage[filePath];
        },
      };
    },
  };

  const logger = Object.fromEntries(["info", "warn", "error"].map((level) => [
    level, (...args) => logs.push({ level, args }),
  ]));

  const mockFieldValue = {
    serverTimestamp: () => ({ _methodName: "serverTimestamp" }),
  };

  const handler = createAddProjectHandler({
    getDb: () => db,
    getStorage: () => storage,
    logger,
    getApiKey: () => apiKey,
    getFieldValue: mockFieldValue,
  });

  return {
    logs,
    dbData,
    savedStorage,
    deletedStorage,
    async request({ body, headers = {}, method = "POST", origin } = {}) {
      const reqHeaders = {};
      for (const [k, v] of Object.entries(headers)) {
        reqHeaders[k.toLowerCase()] = v;
      }
      const req = {
        body,
        method,
        get(headerName) {
          const lower = headerName.toLowerCase();
          if (lower === "origin") return origin;
          return reqHeaders[lower];
        },
      };
      const res = {
        statusCode: 200,
        headers: {},
        set(name, value) {
          this.headers[name.toLowerCase()] = value;
          return this;
        },
        vary(name) {
          this.set("vary", name);
          return this;
        },
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.body = JSON.parse(JSON.stringify(data));
          return this;
        },
        send(data) {
          this.body = data;
          return this;
        },
      };
      await handler(req, res);
      return res;
    },
  };
}

const SAMPLE_PNG_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

test("detectImage and safeCompare utilities", () => {
  assert.equal(safeCompare("abc", "abc"), true);
  assert.equal(safeCompare("abc", "def"), false);
  assert.equal(safeCompare("", "abc"), false);
  assert.equal(safeCompare(null, "abc"), false);

  const pngBuf = Buffer.from(SAMPLE_PNG_BASE64, "base64");
  assert.deepEqual(detectImage(pngBuf), { ext: "png", contentType: "image/png" });

  const parsed = parseBase64Image("data:image/png;base64," + SAMPLE_PNG_BASE64);
  assert.equal(parsed.ext, "png");
  assert.equal(parsed.contentType, "image/png");
  assert.ok(parsed.buffer);

  const invalid = parseBase64Image("not-base64-content");
  assert.ok(invalid.error);
});

test("auth validation: missing or invalid x-api-key returns 401", async () => {
  const f = createMockFixture();

  const noKey = await f.request({
    body: { title: "Test" },
    headers: {},
  });
  assert.equal(noKey.statusCode, 401);
  assert.equal(noKey.body.success, false);

  const wrongKey = await f.request({
    body: { title: "Test" },
    headers: { "x-api-key": "wrong-key" },
  });
  assert.equal(wrongKey.statusCode, 401);
  assert.equal(wrongKey.body.success, false);
});

test("validation: rejects unknown fields, malformed title, category, status, urls", async () => {
  const f = createMockFixture();
  const authHeaders = { "x-api-key": "test-secret-key-123" };

  let res = await f.request({
    body: { title: "Valid Title", invalidParam: "bad" },
    headers: authHeaders,
  });
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /Unknown field/);

  res = await f.request({
    body: { description: "No title", imageUrl: "https://example.com/img.png" },
    headers: authHeaders,
  });
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /Title is required/);

  res = await f.request({
    body: { title: "Valid Title", status: "UnknownStatus", imageUrl: "https://example.com/img.png" },
    headers: authHeaders,
  });
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /Status must be/);

  res = await f.request({
    body: { title: "Valid Title", githubLink: "ftp://not-http.com", imageUrl: "https://example.com/img.png" },
    headers: authHeaders,
  });
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /githubLink must use http or https/);

  res = await f.request({
    body: { title: "Valid Title" },
    headers: authHeaders,
  });
  assert.equal(res.statusCode, 400);
  assert.match(res.body.error, /Image is required/);
});

test("project creation with imageBase64 uploads to Storage and saves doc", async () => {
  const f = createMockFixture();
  const authHeaders = { "x-api-key": "test-secret-key-123" };

  const res = await f.request({
    body: {
      title: "API Smoke Test",
      description: "Automated test project",
      category: "Web Full Stack",
      status: "Desarrollo",
      technologies: ["Node.js", "Firebase"],
      githubLink: "https://github.com/example/smoke-test",
      previewLink: "https://smoke-test.example.com",
      imageBase64: SAMPLE_PNG_BASE64,
    },
    headers: authHeaders,
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.success, true);
  assert.ok(res.body.id);
  assert.match(res.body.image, /https:\/\/firebasestorage\.googleapis\.com/);

  const doc = f.dbData[res.body.id];
  assert.ok(doc);
  assert.equal(doc.title, "API Smoke Test");
  assert.equal(doc.category, "Web Full Stack");
  assert.equal(doc.status, "Desarrollo");
  assert.deepEqual(doc.technologies, ["Node.js", "Firebase"]);
  assert.equal(doc.isDeployed, true);
  assert.equal(doc.image, res.body.image);
  assert.deepEqual(doc.createdAt, { _methodName: "serverTimestamp" });

  const storageKeys = Object.keys(f.savedStorage);
  assert.equal(storageKeys.length, 1);
  assert.match(storageKeys[0], new RegExp("projects/" + res.body.id + "/[0-9]+_image[.]png"));
});

test("project update: updates existing project by id or by title (deduplication)", async () => {
  const f = createMockFixture({
    existingDocs: {
      "proj-1": {
        title: "Existing Title",
        description: "Original desc",
        category: "Mobile",
        status: "Desarrollo",
        image: "https://example.com/original.png",
        technologies: ["React Native"],
      },
    },
  });
  const authHeaders = { "x-api-key": "test-secret-key-123" };

  const postRes = await f.request({
    body: {
      title: "Existing Title",
      description: "Updated desc via POST",
      category: "Mobile",
      status: "Producción",
      imageUrl: "https://example.com/updated.png",
    },
    headers: authHeaders,
    method: "POST",
  });

  assert.equal(postRes.statusCode, 200);
  assert.equal(postRes.body.id, "proj-1");
  assert.equal(f.dbData["proj-1"].description, "Updated desc via POST");
  assert.equal(f.dbData["proj-1"].status, "Producción");
  assert.equal(f.dbData["proj-1"].image, "https://example.com/updated.png");

  const patchRes = await f.request({
    body: {
      id: "proj-1",
      previewLink: "https://new-preview.example.com",
    },
    headers: authHeaders,
    method: "PATCH",
  });

  assert.equal(patchRes.statusCode, 200);
  assert.equal(f.dbData["proj-1"].previewLink, "https://new-preview.example.com");
  assert.equal(f.dbData["proj-1"].isDeployed, true);
});

test("storage cleanup if Firestore save fails after image upload", async () => {
  const failureErr = new Error("Firestore simulation failure");
  failureErr.stage = "set";
  const f = createMockFixture({
    failure: failureErr,
  });
  const authHeaders = { "x-api-key": "test-secret-key-123" };

  const res = await f.request({
    body: {
      title: "Will Fail Save",
      category: "QA",
      imageBase64: SAMPLE_PNG_BASE64,
    },
    headers: authHeaders,
  });

  assert.equal(res.statusCode, 500);
  assert.equal(res.body.success, false);
  assert.equal(f.deletedStorage.length, 1);
  assert.match(f.deletedStorage[0], /projects\/.*[.]png/);
});
