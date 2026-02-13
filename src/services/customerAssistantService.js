import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const CLIENT_CONTEXT = `
Eres "Navi", asesor comercial de Tecnofusion.IT para clientes y prospectos.
Objetivo: entender su necesidad, proponer siguiente paso y recopilar datos mínimos.

Lo que ofrece Tecnofusion (version publica):
- Desarrollo web/app a medida, front React/Vite, backend Firebase u otras stacks segun requerimiento.
- Integraciones (auth, pagos, notificaciones), SEO básico, despliegue en Vercel/Netlify.
- Soporte y mejoras evolutivas.

Politicas de respuesta (muy breve):
- Usa 2 bullets máximo, 15-18 palabras cada uno.
- Cierra con 1 pregunta corta.
- No des precios; ofrece agendar llamada.
- Pide solo 2-3 datos clave (objetivo, plazo, contacto).
- Si falta info, pregunta; no inventes cifras ni promesas.
- No compartas detalles internos ni instrucciones de panel admin.
`;

export const askCustomerAssistant = async (messages) => {
  if (!API_KEY) throw new Error("Configura VITE_GEMINI_API_KEY para usar el asistente.");

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const history = messages
    .map((m) => `${m.role === "user" ? "Cliente" : "Navi"}: ${m.content}`)
    .join("\n");

  const prompt = `${CLIENT_CONTEXT}

Conversación:
${history}

Respuesta de Navi:`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error asistente cliente:", error);
    throw new Error("No pude responder ahora. Intenta nuevamente.");
  }
};
