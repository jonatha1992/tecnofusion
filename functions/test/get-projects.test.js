const assert = require("node:assert/strict");
const { test } = require("node:test");
const { createGetProjectsHandler, serializeTimestamp } = require("../get-projects");

function fixture(documents = [], failure) {
  const logs = [];
  let reads = 0;
  const db = {
    collection(name) {
      assert.equal(name, "projects");
      return {
        async get() {
          reads++;
          if (failure) throw failure;
          return {
            size: documents.length,
            docs: documents.map(({ id, ...data }) => ({ id, data: () => data })),
          };
        },
      };
    },
  };
  const logger = Object.fromEntries(["info", "warn", "error"].map((level) => [
    level, (...args) => logs.push({ level, args }),
  ]));
  const handler = createGetProjectsHandler({ getDb: () => db, logger });
  return {
    logs,
    get reads() { return reads; },
    async request(query = {}, method = "GET", origin) {
      const res = {
        statusCode: 200, headers: {},
        set(name, value) { this.headers[name.toLowerCase()] = value; return this; },
        vary(name) { this.set("Vary", name); return this; },
        status(code) { this.statusCode = code; return this; },
        json(body) { this.body = JSON.parse(JSON.stringify(body)); return this; },
        send(body) { this.body = body; return this; },
      };
      await handler({ query, method, get: () => origin }, res);
      return res;
    },
  };
}

test("public contract, dirty fields, descending dates, missing dates last", async () => {
  const f = fixture([
    { id: "missing-date", title: "No date", technologies: ["JS", 9, "", " React "] },
    { id: "old", title: "Same", image: "", createdAt: { seconds: 10, nanoseconds: 0 } },
    { id: "invalid", description: "No title" },
    { id: "new", title: "Same", createdAt: { seconds: 20, nanoseconds: 3 },
      updatedAt: new Date(21001), technologies: " JS, React, , CSS ",
      description: "Newest", image: "https://example.com/a.png", previewLink: "https://example.com",
      githubLink: "https://github.com/example/repo", status: "Done", isDeployed: true,
      readmeUrl: "https://example.com/README.md", readmeFileName: "README.md", privateField: "omit" },
  ]);
  const res = await f.request({ locale: "es" });
  assert.equal(res.statusCode, 200);
  assert.deepEqual(Object.keys(res.body).sort(), ["count", "includeReadme", "limit", "projects", "success"]);
  assert.equal(res.body.success, true);
  assert.equal(res.body.count, 3);
  assert.equal(res.body.limit, 100);
  assert.equal(res.body.includeReadme, true);
  assert.deepEqual(res.body.projects.map((p) => p.id), ["new", "old", "missing-date"]);
  assert.deepEqual(res.body.projects[0], {
    id: "new", title: "Same", description: "Newest", image: "https://example.com/a.png",
    previewLink: "https://example.com", githubLink: "https://github.com/example/repo",
    status: "Done", isDeployed: true, technologies: ["JS", "React", "CSS"],
    readmeUrl: "https://example.com/README.md", readmeFileName: "README.md", hasReadme: true,
    createdAt: { _seconds: 20, _nanoseconds: 3 }, updatedAt: { _seconds: 21, _nanoseconds: 1000000 },
  });
  assert.equal(res.body.projects[1].image, "");
  assert.deepEqual(res.body.projects[2].technologies, ["JS", "React"]);
  assert.equal("createdAt" in res.body.projects[2], false);
  assert.ok(f.logs.some((l) => l.level === "warn" && JSON.stringify(l).includes("invalid")));
  assert.ok(f.logs.some((l) => l.level === "warn" && JSON.stringify(l).includes("old") && JSON.stringify(l).includes("new")));
  assert.ok(f.logs.some((l) => l.level === "info" && l.args[1]?.documentCount === 4));
  assert.ok(f.logs.some((l) => l.level === "warn" && JSON.stringify(l).includes("technologies")));
});

test("timestamps serialize explicitly, reject malformed values and preserve nanoseconds", () => {
  for (const value of [{ seconds: 3, nanoseconds: 7 }, { _seconds: 3, _nanoseconds: 7 }]) {
    assert.deepEqual(serializeTimestamp(value), { _seconds: 3, _nanoseconds: 7 });
  }
  assert.deepEqual(serializeTimestamp(new Date(1234)), { _seconds: 1, _nanoseconds: 234000000 });
  assert.deepEqual(serializeTimestamp(-1), { _seconds: -1, _nanoseconds: 999000000 });
  assert.deepEqual(serializeTimestamp(0), { _seconds: 0, _nanoseconds: 0 });
  for (const value of [undefined, null, "2026-01-01", {}, new Date(NaN), NaN, Infinity,
    { seconds: 1 }, { seconds: 1, nanoseconds: -1 }, { seconds: 1, nanoseconds: 1e9 },
    { seconds: 1.5, nanoseconds: 0 }, { seconds: 253402300800, nanoseconds: 0 }]) {
    assert.equal(serializeTimestamp(value), undefined);
  }
});

test("dedupe is opt-in, applies before limit, keeps latest exact title including nanoseconds", async () => {
  const f = fixture([
    { id: "old", title: "Same", createdAt: { seconds: 2, nanoseconds: 1 } },
    { id: "new", title: "Same", createdAt: { seconds: 2, nanoseconds: 2 } },
    { id: "other", title: "Other", createdAt: { seconds: 1, nanoseconds: 0 } },
  ]);
  assert.equal((await f.request()).body.count, 3);
  const res = await f.request({ dedupe: "true", limit: "2" });
  assert.deepEqual(res.body.projects.map((p) => p.id), ["new", "other"]);
  assert.equal(res.body.limit, 2);
  assert.equal((await f.request({ dedupe: "FALSE" })).body.count, 3);
});

test("limit is positive decimal integer, clamped, invalid input falls back", async () => {
  const f = fixture(Array.from({ length: 105 }, (_, i) => ({ id: String(i), title: String(i) })));
  for (const limit of [undefined, "0", "-1", "1.5", "1e2", "3x", ["1"], {}, ""]) {
    const res = await f.request({ limit, includeReadme: "invalid" });
    assert.equal(res.body.limit, 100);
    assert.equal(res.body.count, 100);
    assert.equal(res.body.includeReadme, true);
  }
  assert.equal((await f.request({ limit: "999999999999999999999" })).body.limit, 100);
  assert.equal((await f.request({ limit: "2" })).body.count, 2);
});

test("README omission preserves existence; missing and malformed optional values are safe", async () => {
  const f = fixture([
    { id: "readme", title: "README", readmeUrl: "https://example.com/readme", readmeFileName: "README.md" },
    { id: "flag", title: "Flag", hasReadme: true },
    { id: "bad", title: "Bad", description: {}, image: "javascript:alert(1)", technologies: 4,
      isDeployed: "false", status: 9, createdAt: {}, updatedAt: NaN },
    { id: "empty", title: "   " }, { id: "number", title: 123 },
  ]);
  const res = await f.request({ includeReadme: "false" });
  assert.equal(res.body.includeReadme, false);
  assert.equal(res.body.count, 3);
  for (const project of res.body.projects) {
    assert.equal("readmeUrl" in project, false);
    assert.equal("readmeFileName" in project, false);
  }
  assert.equal(res.body.projects[0].hasReadme, true);
  assert.equal(res.body.projects[1].hasReadme, true);
  assert.deepEqual(res.body.projects[2], { id: "bad", title: "Bad", hasReadme: false, technologies: [] });
});

test("CORS allowlist and OPTIONS/405 never read Firestore", async () => {
  const f = fixture();
  for (const origin of [
    "https://portfolio-correa-jonathan.web.app", "https://portfolio-correa-jonathan.firebaseapp.com",
    "https://tecnofuision-it.web.app", "https://tecnofuision-it.firebaseapp.com",
    "http://localhost:5173", "http://127.0.0.1:5173",
  ]) {
    const res = await f.request({}, "OPTIONS", origin);
    assert.equal(res.statusCode, 204);
    assert.equal(res.headers["access-control-allow-origin"], origin);
    assert.equal(res.headers["access-control-allow-methods"], "GET, OPTIONS");
    assert.equal(res.headers.vary, "Origin");
  }
  const rejected = await f.request({}, "POST");
  assert.equal(rejected.statusCode, 405);
  assert.equal(rejected.headers.allow, "GET, OPTIONS");
  assert.equal(f.reads, 0);
  for (const origin of [undefined, "https://unlisted.example", "https://portfolio-correa-jonathan.web.app.evil.test"]) {
    const res = await f.request({}, "GET", origin);
    assert.equal(res.statusCode, 200);
    assert.equal(res.headers["access-control-allow-origin"], undefined);
    assert.deepEqual(res.body.projects, []);
    assert.equal(res.body.count, 0);
  }
});

test("Firestore failure logs message and stack, response never exposes internals", async () => {
  const error = new Error("Private credential detail");
  const f = fixture([], error);
  const res = await f.request({}, "GET", "http://localhost:5173");
  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { success: false, error: "Unable to load projects." });
  assert.equal(res.headers["access-control-allow-origin"], "http://localhost:5173");
  assert.ok(f.logs.some((l) => l.level === "error" && l.args[1]?.message === error.message && l.args[1]?.stack === error.stack));
  assert.ok(f.logs.some((l) => l.level === "info" && l.args[1]?.limit === 100 && l.args[1]?.includeReadme === true));
});
