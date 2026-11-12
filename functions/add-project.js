const crypto = require("node:crypto");

const ALLOWED_ORIGINS = new Set([
  "https://portfolio-correa-jonathan.web.app",
  "https://portfolio-correa-jonathan.firebaseapp.com",
  "https://tecnofuision-it.web.app",
  "https://tecnofuision-it.firebaseapp.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

const ALLOWED_FIELDS = new Set([
  "id",
  "title",
  "description",
  "category",
  "status",
  "githubLink",
  "previewLink",
  "isDeployed",
  "technologies",
  "readmeUrl",
  "readmeFileName",
  "imageBase64",
  "imageUrl",
  "image",
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

function safeCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || !a || !b) return false;
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function detectImage(buffer) {
  if (!buffer || buffer.length === 0) return null;
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return { ext: "png", contentType: "image/png" };
  }
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return { ext: "jpg", contentType: "image/jpeg" };
  }
  if (
    buffer.length >= 12 &&
    buffer.toString("utf8", 0, 4) === "RIFF" &&
    buffer.toString("utf8", 8, 12) === "WEBP"
  ) {
    return { ext: "webp", contentType: "image/webp" };
  }
  return null;
}

function parseBase64Image(raw) {
  if (typeof raw !== "string" || !raw.trim()) {
    return { error: "Image base64 data must be a non-empty string." };
  }
  let base64Data = raw.trim();
  const dataUriMatch = base64Data.match(/^data:image\/(png|jpeg|jpg|webp);base64,(.+)$/i);
  if (dataUriMatch) {
    base64Data = dataUriMatch[2];
  }
  let buffer;
  try {
    buffer = Buffer.from(base64Data, "base64");
  } catch (err) {
    return { error: "Invalid base64 encoding." };
  }
  if (!buffer || buffer.length === 0) {
    return { error: "Decoded image buffer is empty." };
  }
  if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
    return { error: "Image exceeds 5MB limit." };
  }
  const detected = detectImage(buffer);
  if (!detected) {
    return { error: "Image must be PNG, JPG, or WEBP." };
  }
  return { buffer, ...detected };
}

function normalizeTechnologies(raw) {
  if (raw === undefined || raw === null) return [];
  const list = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? raw.split(",")
      : null;
  if (!list) return null;
  const result = [];
  for (const item of list) {
    if (typeof item !== "string") return null;
    const trimmed = item.trim();
    if (trimmed) {
      if (trimmed.length > 50) return null;
      result.push(trimmed);
    }
  }
  if (result.length > 50) return null;
  return result;
}

function createAddProjectHandler({ getDb, getStorage, logger, getApiKey, getFieldValue }) {
  return async (req, res) => {
    res.vary("Origin");
    const origin = req.get("Origin");
    if (ALLOWED_ORIGINS.has(origin)) {
      res.set("Access-Control-Allow-Origin", origin);
      res.set("Access-Control-Allow-Methods", "POST, PATCH, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
    }

    if (req.method === "OPTIONS") {
      return res.status(204).send("");
    }

    if (req.method !== "POST" && req.method !== "PATCH") {
      res.set("Allow", "POST, PATCH, OPTIONS");
      return res.status(405).json({ success: false, error: "Method not allowed." });
    }

    const expectedKey = typeof getApiKey === "function" ? getApiKey() : process.env.PROJECTS_API_KEY;
    const providedKey = req.get("x-api-key");
    if (!safeCompare(providedKey, expectedKey)) {
      logger.warn("Unauthorized addProject attempt", {
        hasKey: Boolean(providedKey),
        method: req.method,
      });
      return res.status(401).json({ success: false, error: "Unauthorized." });
    }

    const body = req.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({ success: false, error: "Invalid JSON body." });
    }

    for (const key of Object.keys(body)) {
      if (!ALLOWED_FIELDS.has(key)) {
        return res.status(400).json({ success: false, error: `Unknown field: "${key}".` });
      }
    }

    const isPatch = req.method === "PATCH";

    if (!isPatch && (typeof body.title !== "string" || !body.title.trim())) {
      return res.status(400).json({ success: false, error: "Title is required." });
    }
    if (body.title !== undefined) {
      if (typeof body.title !== "string") {
        return res.status(400).json({ success: false, error: "Title must be a string." });
      }
      const titleLen = body.title.trim().length;
      if (titleLen < 3 || titleLen > 200) {
        return res.status(400).json({ success: false, error: "Title must be between 3 and 200 characters." });
      }
    }

    if (body.description !== undefined) {
      if (typeof body.description !== "string") {
        return res.status(400).json({ success: false, error: "Description must be a string." });
      }
      if (body.description.length > 5000) {
        return res.status(400).json({ success: false, error: "Description must not exceed 5000 characters." });
      }
    }

    if (body.category !== undefined) {
      if (typeof body.category !== "string" || !body.category.trim()) {
        return res.status(400).json({ success: false, error: "Category must be a non-empty string." });
      }
      if (body.category.trim().length > 100) {
        return res.status(400).json({ success: false, error: "Category must not exceed 100 characters." });
      }
    }

    let normalizedStatus;
    if (body.status !== undefined) {
      if (typeof body.status !== "string") {
        return res.status(400).json({ success: false, error: "Status must be a string." });
      }
      const trimmedStatus = body.status.trim();
      if (trimmedStatus === "Desarrollo") {
        normalizedStatus = "Desarrollo";
      } else if (trimmedStatus === "Producción" || trimmedStatus === "Produccion") {
        normalizedStatus = "Producción";
      } else {
        return res.status(400).json({ success: false, error: "Status must be 'Desarrollo' or 'Producción'." });
      }
    } else if (!isPatch) {
      normalizedStatus = "Desarrollo";
    }

    let technologies;
    if (body.technologies !== undefined) {
      technologies = normalizeTechnologies(body.technologies);
      if (technologies === null) {
        return res.status(400).json({
          success: false,
          error: "Technologies must be an array of strings or comma-separated string, with max 50 items up to 50 chars each.",
        });
      }
    } else if (!isPatch) {
      technologies = [];
    }

    for (const linkField of ["githubLink", "previewLink"]) {
      if (body[linkField] !== undefined) {
        if (typeof body[linkField] !== "string") {
          return res.status(400).json({ success: false, error: `${linkField} must be a string.` });
        }
        if (body[linkField].length > 500) {
          return res.status(400).json({ success: false, error: `${linkField} must not exceed 500 characters.` });
        }
        if (body[linkField].trim()) {
          try {
            const parsed = new URL(body[linkField].trim());
            if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
              return res.status(400).json({ success: false, error: `${linkField} must use http or https protocol.` });
            }
          } catch {
            return res.status(400).json({ success: false, error: `${linkField} must be a valid URL.` });
          }
        }
      }
    }

    if (body.isDeployed !== undefined && typeof body.isDeployed !== "boolean") {
      return res.status(400).json({ success: false, error: "isDeployed must be a boolean." });
    }

    if (body.readmeUrl !== undefined) {
      if (typeof body.readmeUrl !== "string") {
        return res.status(400).json({ success: false, error: "readmeUrl must be a string." });
      }
      if (body.readmeUrl.length > 1000) {
        return res.status(400).json({ success: false, error: "readmeUrl must not exceed 1000 characters." });
      }
      if (body.readmeUrl.trim()) {
        try {
          const parsed = new URL(body.readmeUrl.trim());
          if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
            return res.status(400).json({ success: false, error: "readmeUrl must use http or https protocol." });
          }
        } catch {
          return res.status(400).json({ success: false, error: "readmeUrl must be a valid URL." });
        }
      }
    }

    if (body.readmeFileName !== undefined) {
      if (typeof body.readmeFileName !== "string" || body.readmeFileName.length > 100) {
        return res.status(400).json({ success: false, error: "readmeFileName must be a string up to 100 characters." });
      }
    }

    let parsedImage = null;
    if (body.imageBase64 !== undefined) {
      parsedImage = parseBase64Image(body.imageBase64);
      if (parsedImage.error) {
        return res.status(400).json({ success: false, error: parsedImage.error });
      }
    }

    const directImageUrl = body.imageUrl || body.image;
    if (directImageUrl !== undefined) {
      if (typeof directImageUrl !== "string" || !directImageUrl.trim()) {
        return res.status(400).json({ success: false, error: "imageUrl must be a non-empty string." });
      }
      if (directImageUrl.length > 1000) {
        return res.status(400).json({ success: false, error: "imageUrl must not exceed 1000 characters." });
      }
      try {
        const parsed = new URL(directImageUrl.trim());
        if (parsed.protocol !== "https:") {
          return res.status(400).json({ success: false, error: "imageUrl must use https protocol." });
        }
      } catch {
        return res.status(400).json({ success: false, error: "imageUrl must be a valid URL." });
      }
    }

    if (!isPatch && !parsedImage && !directImageUrl) {
      return res.status(400).json({ success: false, error: "Image is required for new projects." });
    }

    const db = getDb();
    const bucket = typeof getStorage === "function" ? getStorage() : null;

    let targetDocRef;
    let existingData = null;

    if (isPatch) {
      if (body.id) {
        targetDocRef = db.collection("projects").doc(body.id);
        const snap = await targetDocRef.get();
        if (!snap.exists) {
          return res.status(404).json({ success: false, error: "Project not found." });
        }
        existingData = snap.data();
      } else if (body.title) {
        const querySnap = await db.collection("projects").where("title", "==", body.title.trim()).limit(1).get();
        if (querySnap.empty) {
          return res.status(404).json({ success: false, error: "Project not found." });
        }
        const docSnap = querySnap.docs[0];
        targetDocRef = docSnap.ref;
        existingData = docSnap.data();
      } else {
        return res.status(400).json({ success: false, error: "id or title is required for PATCH." });
      }
    } else {
      if (body.id) {
        targetDocRef = db.collection("projects").doc(body.id);
        const snap = await targetDocRef.get();
        if (snap.exists) {
          existingData = snap.data();
        }
      } else if (body.title) {
        const querySnap = await db.collection("projects").where("title", "==", body.title.trim()).limit(1).get();
        if (!querySnap.empty) {
          const docSnap = querySnap.docs[0];
          targetDocRef = docSnap.ref;
          existingData = docSnap.data();
        } else {
          targetDocRef = db.collection("projects").doc();
        }
      } else {
        targetDocRef = db.collection("projects").doc();
      }
    }

    const projectId = targetDocRef.id;
    let uploadedFile = null;
    let finalImageUrl = directImageUrl ? directImageUrl.trim() : (existingData ? existingData.image : "");

    try {
      if (parsedImage) {
        if (!bucket) {
          throw new Error("Storage bucket not available.");
        }
        const timestamp = Date.now();
        const filePath = `projects/${projectId}/${timestamp}_image.${parsedImage.ext}`;
        const downloadToken = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString("hex");
        const fileRef = bucket.file(filePath);
        await fileRef.save(parsedImage.buffer, {
          resumable: false,
          metadata: {
            contentType: parsedImage.contentType,
            metadata: {
              firebaseStorageDownloadTokens: downloadToken,
            },
          },
        });
        uploadedFile = fileRef;
        const bucketName = bucket.name || "tecnofuision-it.firebasestorage.app";
        finalImageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&token=${downloadToken}`;
      }

      const serverTimestamp = getFieldValue ? getFieldValue.serverTimestamp() : require("firebase-admin").firestore.FieldValue.serverTimestamp();

      if (existingData) {
        const updatePayload = {
          updatedAt: serverTimestamp,
        };
        if (body.title !== undefined) updatePayload.title = body.title.trim();
        if (body.description !== undefined) updatePayload.description = body.description.trim();
        if (body.category !== undefined) updatePayload.category = body.category.trim();
        if (normalizedStatus !== undefined) updatePayload.status = normalizedStatus;
        if (technologies !== undefined) updatePayload.technologies = technologies;
        if (body.githubLink !== undefined) updatePayload.githubLink = body.githubLink.trim();
        if (body.previewLink !== undefined) updatePayload.previewLink = body.previewLink.trim();
        if (body.isDeployed !== undefined) {
          updatePayload.isDeployed = body.isDeployed;
        } else if (body.previewLink !== undefined) {
          updatePayload.isDeployed = Boolean(body.previewLink.trim());
        }
        if (finalImageUrl) updatePayload.image = finalImageUrl;
        if (body.readmeUrl !== undefined) updatePayload.readmeUrl = body.readmeUrl.trim();
        if (body.readmeFileName !== undefined) updatePayload.readmeFileName = body.readmeFileName.trim();

        const curReadmeUrl = body.readmeUrl !== undefined ? body.readmeUrl.trim() : (existingData.readmeUrl || "");
        const curReadmeFile = body.readmeFileName !== undefined ? body.readmeFileName.trim() : (existingData.readmeFileName || "");
        updatePayload.hasReadme = Boolean(curReadmeUrl || curReadmeFile || existingData.hasReadme === true);

        await targetDocRef.update(updatePayload);
        logger.info("Project updated", { id: projectId });
      } else {
        const createPayload = {
          title: body.title.trim(),
          description: (body.description || "").trim(),
          category: (body.category || "General").trim(),
          status: normalizedStatus || "Desarrollo",
          technologies: technologies || [],
          githubLink: (body.githubLink || "").trim(),
          previewLink: (body.previewLink || "").trim(),
          isDeployed: body.isDeployed !== undefined ? body.isDeployed : Boolean(body.previewLink && body.previewLink.trim()),
          image: finalImageUrl || "",
          createdAt: serverTimestamp,
          updatedAt: serverTimestamp,
        };
        if (body.readmeUrl && body.readmeUrl.trim()) {
          createPayload.readmeUrl = body.readmeUrl.trim();
        }
        if (body.readmeFileName && body.readmeFileName.trim()) {
          createPayload.readmeFileName = body.readmeFileName.trim();
        }
        createPayload.hasReadme = Boolean(createPayload.readmeUrl || createPayload.readmeFileName);

        await targetDocRef.set(createPayload);
        logger.info("Project created", { id: projectId });
      }

      return res.status(200).json({
        success: true,
        id: projectId,
        image: finalImageUrl,
      });
    } catch (err) {
      if (uploadedFile) {
        try {
          await uploadedFile.delete();
          logger.info("Cleaned up uploaded image after failure", { path: uploadedFile.name });
        } catch (cleanupErr) {
          logger.error("Failed to delete orphaned image", { error: cleanupErr.message });
        }
      }
      logger.error("addProject failed", {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined,
      });
      return res.status(500).json({ success: false, error: "Failed to save project." });
    }
  };
}

module.exports = { createAddProjectHandler, detectImage, parseBase64Image, safeCompare };
