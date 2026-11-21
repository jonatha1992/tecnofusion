import test from "node:test";
import assert from "node:assert/strict";
import { normalizeTech, normalizeTechList, categoriesForProject, buildCategoryFilters, filterByCategory } from "../src/data/techCatalog.js";

test("unifica alias duplicados a un nombre canónico", () => {
  const grupos = [
    [["Firebase", "Firebase Firestore", "Firebase Hosting", "Firebase (Auth", "Firestore", "Storage)", "Storage"], "Firebase"],
    [["Tailwind CSS", "TailwindCSS", "tailwind css"], "Tailwind CSS"],
    [["Vue", "Vue 3", "Vue.js 3", "Vue.js"], "Vue"],
    [["Bootstrap", "Bootstrap 5"], "Bootstrap"],
    [["Material-UI", "Material UI"], "Material UI"],
    [["FastAPI", "Fast_API"], "FastAPI"],
    [["Leaflet", "Leaflet.js"], "Leaflet"],
    [["Uvicorn", "Unicorn"], "Uvicorn"],
  ];
  for (const [alias, canon] of grupos) for (const a of alias) assert.equal(normalizeTech(a), canon, a);
  assert.equal(normalizeTech("Firebase Cloud Functions"), "Cloud Functions");
});

test("normalizeTechList elimina duplicados y vacíos", () => {
  assert.deepEqual(normalizeTechList(["Firebase", "Firestore", "Storage)", "", "React", "react"]), ["Firebase", "React"]);
  assert.deepEqual(normalizeTechList("Vue 3, Vue.js 3, Python"), ["Vue", "Python"]);
  assert.deepEqual(normalizeTechList(undefined), []);
  assert.equal(normalizeTech("Algo Nuevo"), "Algo Nuevo");
});

test("categorías: Sistemas distribuidos primero, conteos y sin vacías", () => {
  const projects = [
    { technologies: ["React", "Vite"] },
    { technologies: ["Vue", "Fast_API"] },
    { technologies: ["Expo", "React Native"] },
    { technologies: ["Docker"] },
    { technologies: [] },
  ];
  assert.ok(categoriesForProject(projects[1]).has("distribuidos"));
  assert.ok(!categoriesForProject(projects[0]).has("distribuidos"));
  const f = buildCategoryFilters(projects);
  assert.equal(f[0].id, "distribuidos");
  assert.equal(f[0].count, 2);
  assert.ok(!f.some((c) => c.id === "ia"));
  assert.equal(filterByCategory(projects, "mobile").length, 1);
  assert.equal(filterByCategory(projects, "todas").length, 5);
});
