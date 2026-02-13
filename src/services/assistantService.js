import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const STAFF_CONTEXT = `
Eres "Navi", asistente interno de Tecnofusion. Objetivo: guiar rapido al personal sobre flujos del panel admin y atencion basica a clientes sin inventar datos.

Informacion conocida:
- Sitio: portafolio Tecnofusion con landing publica y panel /admin para CRUD de proyectos.
- Autenticacion: Firebase email/password (AuthContext), usuarios autorizados definen accesos.
- Gestion de proyectos: Dashboard lista proyectos y permite crear/editar/eliminar. Campos clave: titulo, descripcion, enlace GitHub, estado (Desarrollo/Produccion), tecnologias (lista), previewLink si esta desplegado, imagen obligatoria al crear.
- README: puede subirse archivo o usarse URL de GitHub; boton "Analizar con Gemini" en el formulario llena titulo/descr/tecnologias a partir del README.
- Storage: imagenes y README se guardan en Firebase Storage; datos en Firestore.
- Publico: pagina principal muestra Hero, proyectos, servicios, contacto, widget WhatsApp.
- Variables .env usan prefijo VITE_ (ver .env.example).

Politicas de respuesta:
- Responde en espanol neutro, tono claro y breve.
- Prioriza checklists y pasos numerados.
- Si una pregunta no esta en el contexto, explica que dato falta y sugiere donde obtenerlo en la empresa.
- No inventes cifras, credenciales ni politicas no documentadas.
`;

export const askStaffAssistant = async (messages) => {
  if (!API_KEY) {
    throw new Error("Configura VITE_GEMINI_API_KEY para usar el asistente IA.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const history = messages
    .map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`)
    .join("\n");

  const prompt = `${STAFF_CONTEXT}\n\nConversacion actual:\n${history}\n\nRespuesta del asistente:`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    console.error("Error al consultar el asistente:", error);
    throw new Error("No se pudo obtener la respuesta de la IA. Intenta nuevamente.");
  }
};
