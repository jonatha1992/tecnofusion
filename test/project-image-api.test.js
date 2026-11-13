import test from "node:test";
import assert from "node:assert/strict";
import { createPortfolioImageClient } from "../src/services/portfolioImageClient.js";

test("sube imagen con token, tipo y base64 según contrato", async () => {
  const requests = [];
  const auth = { currentUser: { getIdToken: async () => "id-token" } };
  const client = createPortfolioImageClient({
    apiUrl: "https://images.example.test/",
    auth,
    fetchImpl: async (...args) => {
      requests.push(args);
      return { ok: true, status: 201, json: async () => ({ image: "https://cdn.example.test/image.webp" }) };
    },
  });

  const result = await client.upload({ filename: "project.webp", contentType: "image/webp", data: "YWJj" });

  assert.equal(result, "https://cdn.example.test/image.webp");
  assert.equal(requests[0][0], "https://images.example.test/v1/portfolio-images");
  assert.equal(requests[0][1].method, "POST");
  assert.deepEqual(requests[0][1].headers, {
    Authorization: "Bearer id-token",
    "Content-Type": "application/json",
  });
  assert.deepEqual(JSON.parse(requests[0][1].body), {
    filename: "project.webp",
    contentType: "image/webp",
    data: "YWJj",
  });
});

test("propaga el error JSON recibido por el endpoint", async () => {
  const client = createPortfolioImageClient({
    apiUrl: "https://images.example.test",
    auth: { currentUser: { getIdToken: async () => "id-token" } },
    fetchImpl: async () => ({ ok: false, status: 413, json: async () => ({ error: "Image too large" }) }),
  });

  await assert.rejects(client.upload({ filename: "x.webp", contentType: "image/webp", data: "eA==" }), /Image too large/);
});

test("elimina solo enviando URL en el cuerpo y token Bearer", async () => {
  let request;
  const client = createPortfolioImageClient({
    apiUrl: "https://images.example.test",
    auth: { currentUser: { getIdToken: async () => "id-token" } },
    fetchImpl: async (...args) => {
      request = args;
      return { ok: true, status: 204 };
    },
  });

  await client.delete("https://cdn.example.test/image.webp");

  assert.equal(request[1].method, "DELETE");
  assert.deepEqual(JSON.parse(request[1].body), { image: "https://cdn.example.test/image.webp" });
});
