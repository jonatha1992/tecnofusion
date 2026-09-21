const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 100;
const ALLOWED_ORIGINS = new Set([
  "https://portfolio-correa-jonathan.web.app",
  "https://portfolio-correa-jonathan.firebaseapp.com",
  "https://tecnofuision-it.web.app",
  "https://tecnofuision-it.firebaseapp.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function parseParams(query = {}) {
  const limit = typeof query.limit === "string" && /^\d+$/.test(query.limit) && Number(query.limit) > 0
    ? Math.min(Number(query.limit), MAX_LIMIT)
    : DEFAULT_LIMIT;
  return {
    limit,
    includeReadme: query.includeReadme !== "false",
    dedupe: query.dedupe === "true",
    // Los datos no están localizados; locale se acepta sin alterar el resultado.
    locale: typeof query.locale === "string" ? query.locale : undefined,
  };
}

function serializeTimestamp(value) {
  let seconds;
  let nanoseconds;
  if (value instanceof Date || typeof value === "number") {
    // Los valores numéricos históricos se interpretan como milisegundos Unix.
    const milliseconds = value instanceof Date ? value.getTime() : value;
    if (!Number.isFinite(milliseconds) || !Number.isInteger(milliseconds)) return undefined;
    seconds = Math.floor(milliseconds / 1000);
    nanoseconds = (milliseconds - seconds * 1000) * 1000000;
  } else if (value && typeof value === "object") {
    seconds = value.seconds ?? value._seconds;
    nanoseconds = value.nanoseconds ?? value._nanoseconds;
  } else {
    return undefined;
  }
  if (!Number.isInteger(seconds) || seconds < -62135596800 || seconds > 253402300799
    || !Number.isInteger(nanoseconds) || nanoseconds < 0 || nanoseconds >= 1000000000) {
    return undefined;
  }
  // El consumidor lee _seconds literalmente: no depender del toJSON del SDK.
  return { _seconds: seconds, _nanoseconds: nanoseconds };
}

function normalizeProject(doc, includeReadme, logger) {
  const data = doc.data();
  if (!data || typeof data.title !== "string" || !data.title.trim()) {
    logger.warn("Skipping project without a valid title", { id: doc.id });
    return undefined;
  }

  const project = { id: doc.id, title: data.title };
  const coercedFields = [];
  for (const field of ["description", "image", "previewLink", "githubLink", "status", "readmeUrl", "readmeFileName"]) {
    if (typeof data[field] === "string") {
      project[field] = data[field];
    } else if (data[field] !== undefined) {
      coercedFields.push(field);
    }
  }

  // Una imagen vacía no oculta el proyecto; el portfolio ya la trata como ausencia de media.
  if (project.image) {
    try {
      if (new URL(project.image).protocol !== "https:") throw new Error("Invalid image protocol");
    } catch {
      delete project.image;
      coercedFields.push("image");
    }
  }

  if (data.technologies !== undefined) {
    const source = typeof data.technologies === "string"
      ? data.technologies.split(",")
      : Array.isArray(data.technologies) ? data.technologies : [];
    project.technologies = source.filter((item) => typeof item === "string")
      .map((item) => item.trim()).filter(Boolean);
    if (!Array.isArray(data.technologies)
      || source.length !== project.technologies.length
      || source.some((item, index) => item !== project.technologies[index])) {
      coercedFields.push("technologies");
    }
  }

  if (typeof data.isDeployed === "boolean") {
    project.isDeployed = data.isDeployed;
  } else if (data.isDeployed !== undefined) {
    coercedFields.push("isDeployed");
  }

  project.hasReadme = Boolean(project.readmeUrl?.trim() || project.readmeFileName?.trim() || data.hasReadme === true);
  if (data.hasReadme !== undefined && data.hasReadme !== project.hasReadme) {
    coercedFields.push("hasReadme");
  }
  if (!includeReadme) {
    delete project.readmeUrl;
    delete project.readmeFileName;
  }

  for (const field of ["createdAt", "updatedAt"]) {
    const timestamp = serializeTimestamp(data[field]);
    if (timestamp) project[field] = timestamp;
    if (data[field] !== undefined && (!timestamp || typeof data[field]?.toDate !== "function")) {
      coercedFields.push(field);
    }
  }
  if (coercedFields.length) {
    logger.warn("Coerced project fields", { id: doc.id, fields: coercedFields });
  }
  return project;
}

function newestFirst(a, b) {
  if (!a.createdAt) return b.createdAt ? 1 : 0;
  if (!b.createdAt) return -1;
  return b.createdAt._seconds - a.createdAt._seconds
    || b.createdAt._nanoseconds - a.createdAt._nanoseconds;
}

function createGetProjectsHandler({ getDb, logger }) {
  return async (req, res) => {
    const params = parseParams(req.query);
    logger.info("getProjects request started", { method: req.method, ...params });
    res.vary("Origin");
    const origin = req.get("Origin");
    if (ALLOWED_ORIGINS.has(origin)) {
      // Lista exacta, sin credenciales. Un origen ajeno puede leer por HTTP, sin permiso CORS.
      res.set("Access-Control-Allow-Origin", origin);
      res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
    }
    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "GET") {
      res.set("Allow", "GET, OPTIONS");
      return res.status(405).json({ success: false, error: "Method not allowed." });
    }

    try {
      // Sin orderBy: incluye documentos sin fecha y no requiere índices adicionales.
      const snapshot = await getDb().collection("projects").get();
      logger.info("Projects collection read", { documentCount: snapshot.size });
      let projects = snapshot.docs.map((doc) => normalizeProject(doc, params.includeReadme, logger))
        .filter(Boolean).sort(newestFirst);

      const titles = new Map();
      for (const project of projects) {
        const ids = titles.get(project.title) || [];
        ids.push(project.id);
        titles.set(project.title, ids);
      }
      for (const [title, ids] of titles) {
        if (ids.length > 1) logger.warn("Duplicate project title", { title, ids, dedupe: params.dedupe });
      }
      // Conservar duplicados por defecto evita ocultar proyectos legítimos con igual título.
      if (params.dedupe) {
        const seen = new Set();
        projects = projects.filter((project) => {
          if (seen.has(project.title)) return false;
          seen.add(project.title);
          return true;
        });
      }
      projects = projects.slice(0, params.limit);
      return res.status(200).json({
        success: true,
        count: projects.length,
        limit: params.limit,
        includeReadme: params.includeReadme,
        projects,
      });
    } catch (error) {
      logger.error("getProjects failed", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
      return res.status(500).json({ success: false, error: "Unable to load projects." });
    }
  };
}

module.exports = { createGetProjectsHandler, serializeTimestamp };
