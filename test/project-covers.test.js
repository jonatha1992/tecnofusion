import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { projectScreens, resolveProjectImage, coverImageProps } from "../src/data/projectCovers.js";

test("las capturas reales existen en 1200 y 600", () => {
  for (const slug of projectScreens) {
    assert.ok(existsSync(`public/assets/projects/screens/${slug}.webp`), slug);
    assert.ok(existsSync(`public/assets/projects/screens/${slug}-600.webp`), slug);
  }
});

test("prefiere captura real y cae a SVG", () => {
  assert.equal(resolveProjectImage("Expenses Tracker"), "/assets/projects/screens/expenses-tracker.webp");
  assert.equal(resolveProjectImage("Spin Predictor"), "/assets/projects/spin-predictor.svg");
});

test("srcset solo para capturas", () => {
  assert.match(coverImageProps("/assets/projects/screens/tecnofusion.webp").srcSet, /tecnofusion-600\.webp 600w/);
  assert.equal(coverImageProps("/assets/projects/spin-predictor.svg").srcSet, undefined);
});

test("cada proyecto nuevo con captura resuelve a su WebP", async () => {
  const { readFileSync } = await import("node:fs");
  const nuevos = JSON.parse(readFileSync("scripts/new-projects.json", "utf8"));
  const sinCaptura = new Set(["Control Apps", "Trading Bot"]);
  for (const { title } of nuevos) {
    const src = resolveProjectImage(title);
    if (sinCaptura.has(title)) continue;
    assert.match(src, /^\/assets\/projects\/screens\/.+\.webp$/, title);
    assert.ok(existsSync(`public${src}`), title);
  }
  assert.equal(resolveProjectImage("PayAlert SaaS - Gestión de Flujo de Caja", "https://x/y.png"), "/assets/projects/screens/payalert-saas-gestion-de-flujo-de-caja.webp");
});
