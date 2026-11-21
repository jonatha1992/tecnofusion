import {
  siAngular, siBlazor, siBootstrap, siCelery, siChartdotjs, siDjango, siDocker, siDotnet, siEslint, siExpo,
  siExpress, siFastapi, siFfmpeg, siFirebase, siGithubactions, siGooglecloud, siGooglegemini, siJsonwebtokens,
  siLeaflet, siMercadopago, siMui, siNextdotjs, siNodedotjs, siPinia, siPostgresql, siPython, siRailway, siReact,
  siRedis, siSqlite, siSupabase, siSwagger, siTailwindcss, siTypescript, siVite, siVuedotjs,
} from "simple-icons";

export const CATEGORIES = [
  { id: "distribuidos", label: "Sistemas distribuidos", featured: true },
  { id: "fullstack", label: "Full-Stack Web" },
  { id: "ia", label: "IA & Machine Learning" },
  { id: "mobile", label: "Mobile" },
  { id: "datos", label: "Datos & Automatización" },
];

const ICONS = {
  Docker: siDocker, Celery: siCelery, Redis: siRedis, Railway: siRailway, "Cloud Functions": siGooglecloud,
  "GitHub Actions": siGithubactions, "Django REST Framework": siDjango, FastAPI: siFastapi, "Node.js": siNodedotjs,
  Express: siExpress, Supabase: siSupabase, JWT: siJsonwebtokens, "ASP.NET Core": siDotnet, Swagger: siSwagger,
  React: siReact, Vue: siVuedotjs, Angular: siAngular, "Next.js": siNextdotjs, Pinia: siPinia, Vite: siVite,
  TypeScript: siTypescript, "Tailwind CSS": siTailwindcss, Bootstrap: siBootstrap, "Material UI": siMui,
  Django: siDjango, "Blazor Server": siBlazor, Firebase: siFirebase, ESLint: siEslint, MercadoPago: siMercadopago,
  PostgreSQL: siPostgresql, "Google Gemini": siGooglegemini, Expo: siExpo, "React Native": siReact, Python: siPython,
  FFmpeg: siFfmpeg, "Chart.js": siChartdotjs, Leaflet: siLeaflet, SQLite: siSqlite,
};

export function getTechIcon(canonicalName) {
  return ICONS[canonicalName] ?? null;
}

const slug = (s) => String(s).toLowerCase().replace(/[\s_\-.]+/g, "");

const CANON = {
  Docker: ["distribuidos"],
  Celery: ["distribuidos", "datos"],
  Redis: ["distribuidos"],
  Railway: ["distribuidos"],
  "Cloud Functions": ["distribuidos"],
  "GitHub Actions": ["distribuidos"],
  "Django REST Framework": ["distribuidos", "fullstack"],
  FastAPI: ["distribuidos"],
  Uvicorn: ["distribuidos"],
  "Node.js": ["distribuidos", "fullstack"],
  Express: ["distribuidos", "fullstack"],
  Supabase: ["distribuidos"],
  JWT: ["distribuidos"],
  "ASP.NET Core": ["distribuidos"],
  Swagger: ["distribuidos"],
  "API REST": ["distribuidos"],
  Microservicios: ["distribuidos"],
  Colas: ["distribuidos"],
  React: ["fullstack"],
  Vue: ["fullstack"],
  Angular: ["fullstack"],
  "Next.js": ["fullstack"],
  Pinia: ["fullstack"],
  Vite: ["fullstack"],
  TypeScript: ["fullstack"],
  "Tailwind CSS": ["fullstack"],
  Bootstrap: ["fullstack"],
  "Material UI": ["fullstack"],
  Django: ["fullstack"],
  "Blazor Server": ["fullstack"],
  Firebase: ["fullstack"],
  EmailJS: ["fullstack"],
  ESLint: ["fullstack"],
  MercadoPago: ["fullstack"],
  PostgreSQL: ["fullstack"],
  "Google Gemini": ["ia"],
  "Google Speech Recognition": ["ia"],
  "Argos Translate": ["ia"],
  "Machine Learning": ["ia"],
  IA: ["ia"],
  Expo: ["mobile"],
  "React Native": ["mobile"],
  Python: ["datos"],
  PyDub: ["datos"],
  PyMuPDF: ["datos"],
  FFmpeg: ["datos"],
  "Chart.js": ["datos"],
  Leaflet: ["datos"],
  SQLite: ["datos"],
  "SQL Server": ["datos"],
  "Oracle Database": ["datos"],
  Automatización: ["datos"],
  Datos: ["datos"],
};

const ALIASES = {
  "Cloud Functions": ["Firebase Cloud Functions"],
  Firebase: ["Firebase Firestore", "Firebase Hosting", "Firebase (Auth", "Firebase (Auth Storage)", "Firestore", "Storage", "Storage)", "Firebase Storage", "Firebase Auth"],
  "Tailwind CSS": ["TailwindCSS"],
  Vue: ["Vue 3", "Vue.js", "Vue.js 3"],
  Bootstrap: ["Bootstrap 5"],
  "Material UI": ["Material-UI", "MUI"],
  FastAPI: ["Fast_API", "Fast API"],
  Leaflet: ["Leaflet.js"],
  Uvicorn: ["Unicorn"],
  "Node.js": ["Node", "NodeJS"],
  Express: ["Express.js"],
  "Machine Learning": ["ML"],
  "Next.js": ["NextJS"],
  "Django REST Framework": ["DRF", "Django REST"],
  "Blazor Server": ["Blazor"],
};

const LOOKUP = new Map();
for (const name of Object.keys(CANON)) LOOKUP.set(slug(name), name);
for (const [canon, list] of Object.entries(ALIASES)) for (const a of list) LOOKUP.set(slug(a), canon);

export function normalizeTech(name) {
  const raw = String(name ?? "").trim();
  if (!raw) return "";
  return LOOKUP.get(slug(raw)) ?? raw;
}

function toTechArray(technologies) {
  if (Array.isArray(technologies)) return technologies;
  if (typeof technologies === "string") return technologies.split(",");
  return [];
}

export function normalizeTechList(technologies) {
  const seen = new Set();
  const out = [];
  for (const t of toTechArray(technologies)) {
    const n = normalizeTech(t);
    if (n && !seen.has(n.toLowerCase())) {
      seen.add(n.toLowerCase());
      out.push(n);
    }
  }
  return out;
}

export function categoriesForProject(project) {
  const ids = new Set();
  for (const t of normalizeTechList(project?.technologies)) for (const c of CANON[t] ?? []) ids.add(c);
  return ids;
}

export function buildCategoryFilters(projects) {
  return CATEGORIES.map((c) => ({
    ...c,
    count: projects.filter((p) => categoriesForProject(p).has(c.id)).length,
  })).filter((c) => c.count > 0);
}

export function filterByCategory(projects, categoryId) {
  if (!categoryId || categoryId === "todas") return projects;
  return projects.filter((p) => categoriesForProject(p).has(categoryId));
}
