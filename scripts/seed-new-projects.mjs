// Alta de proyectos en Firestore (tecnofuision-it/projects) desde scripts/new-projects.json.
// Usa la sesión ya iniciada de firebase-tools (`firebase login`); no lee ni imprime secretos.
// Uso: node scripts/seed-new-projects.mjs          (simulacro)
//      node scripts/seed-new-projects.mjs --apply  (crea los que no existen por título)
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { toProjectSlug } from "../src/data/projectCovers.js";

const PROJECT = "tecnofuision-it";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/projects`;
const apply = process.argv.includes("--apply");

const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
const require = createRequire(`${globalRoot}/firebase-tools/`);
const auth = require("./lib/auth");
const accounts = [auth.getGlobalDefaultAccount(), ...auth.getAdditionalAccounts()].filter(Boolean);
let accessToken = null;
for (const account of accounts) {
  try {
    accessToken = await auth.getAccessToken(account.tokens.refresh_token, []);
    console.log(`Sesión firebase-tools: ${account.user.email}`);
    break;
  } catch {
    console.log(`Sesión vencida: ${account.user.email}`);
  }
}
if (!accessToken) throw new Error("Sin sesión válida de firebase-tools: ejecutá `firebase login --reauth`.");
const headers = { Authorization: `Bearer ${accessToken.access_token ?? accessToken}`, "Content-Type": "application/json" };

const existing = new Set();
let pageToken = "";
do {
  const res = await fetch(`${BASE}?pageSize=100${pageToken ? `&pageToken=${pageToken}` : ""}`, { headers });
  if (!res.ok) throw new Error(`Lectura falló: ${res.status}`);
  const json = await res.json();
  for (const d of json.documents ?? []) existing.add(toProjectSlug(d.fields?.title?.stringValue));
  pageToken = json.nextPageToken ?? "";
} while (pageToken);

const str = (v) => ({ stringValue: v });
const projects = JSON.parse(readFileSync(new URL("./new-projects.json", import.meta.url), "utf8"));

for (const p of projects) {
  if (existing.has(toProjectSlug(p.title))) {
    console.log(`= ya existe: ${p.title}`);
    continue;
  }
  const now = new Date().toISOString();
  const fields = {
    title: str(p.title),
    description: str(p.description),
    status: str(p.status),
    technologies: { arrayValue: { values: p.technologies.map(str) } },
    isDeployed: { booleanValue: Boolean(p.previewLink) },
    createdAt: { timestampValue: now },
    updatedAt: { timestampValue: now },
  };
  if (p.previewLink) fields.previewLink = str(p.previewLink);
  if (p.githubLink) fields.githubLink = str(p.githubLink);
  if (!apply) {
    console.log(`+ (simulacro) ${p.title}`);
    continue;
  }
  const res = await fetch(BASE, { method: "POST", headers, body: JSON.stringify({ fields }) });
  if (!res.ok) throw new Error(`Alta de "${p.title}" falló: ${res.status} ${(await res.text()).slice(0, 200)}`);
  console.log(`+ creado: ${p.title} (${(await res.json()).name.split("/").pop()})`);
}
