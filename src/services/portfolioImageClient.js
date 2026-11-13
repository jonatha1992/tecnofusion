const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_IMAGE_WIDTH = 1280;

export const createPortfolioImageClient = ({ apiUrl, auth, fetchImpl = fetch }) => {
  const endpoint = () => {
    if (!apiUrl) throw new Error("Falta configurar VITE_IMAGES_API_URL");
    return `${apiUrl.replace(/\/+$/, "")}/v1/portfolio-images`;
  };

  const request = async (method, body) => {
    const token = await auth.currentUser.getIdToken();
    const response = await fetchImpl(endpoint(), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let detail;
      try {
        detail = (await response.json()).error;
      } catch {
        detail = null;
      }
      const messages = {
        400: "Los datos de la imagen no son válidos.",
        401: "Tu sesión no es válida. Inicia sesión nuevamente.",
        403: "No tienes permiso para gestionar imágenes.",
        413: "La imagen supera el tamaño permitido.",
        502: "El servicio no pudo procesar la imagen.",
        503: "El servicio de imágenes no está disponible temporalmente.",
      };
      throw new Error(`No se pudo gestionar la imagen. ${detail || messages[response.status] || `Error del servidor (${response.status}).`}`);
    }

    return response;
  };

  return {
    async upload({ filename, contentType, data }) {
      const response = await request("POST", { filename, contentType, data });
      return (await response.json()).image;
    },
    async delete(image) {
      await request("DELETE", { image });
    },
  };
};

const canvasBlob = (canvas, quality) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (blob) resolve(blob);
    else reject(new Error("No se pudo procesar la imagen en el navegador."));
  }, "image/webp", quality);
});

export const optimizeProjectImage = async (file) => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo procesar la imagen en el navegador.");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  let quality = 0.85;
  let blob = await canvasBlob(canvas, quality);
  while (blob.size > MAX_IMAGE_BYTES && quality > 0.1) {
    quality = Math.max(0.1, quality - 0.1);
    blob = await canvasBlob(canvas, quality);
  }
  if (blob.size > MAX_IMAGE_BYTES) throw new Error("No se pudo reducir la imagen a 2MB.");

  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  const name = file.name.replace(/\.[^.]+$/, "") || "project-image";
  return { filename: `${name}.webp`, contentType: "image/webp", data: btoa(binary) };
};
