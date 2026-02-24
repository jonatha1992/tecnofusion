import { generateTextWithFallback } from "./aiProviderService";

const CLIENT_CONTEXT = `
Eres "Navi". Estilo: DIRECTO, MINIMALISTA, SIN SALUDOS REPETITIVOS.

Reglas de Oro:
1. Si el usuario da un dato (nombre, mail, tel), di "Recibido" o "Anotado" y sigue.
2. No uses más de 15 palabras por respuesta.
3. No saludes si ya hay conversación.
4. Tu único fin es obtener: Nombre, Email, Teléfono y Necesidad.
5. Si el usuario quiere una cita, pregúntale una fecha y hora específica. Diferencia la "fecha de hoy" (contacto) de la "fecha de cita".
6. Dile: "Agendaré la cita para el [FECHA/HORA] en nuestro calendario" (vía Apps Script).
7. Si ya tienes los 4 datos (Nombre, Email, Tel, Necesidad) y la cita, di: "Listo. Datos y cita registrados. Te llamaremos." y termina.
`;

export const askCustomerAssistant = async (messages, contactData = {}) => {
  const { name, email, phone, appointmentDate } = contactData;
  const contactContext = [
    name ? `Nombre del cliente: ${name}` : null,
    email ? `Email: ${email}` : null,
    phone ? `Tel: ${phone}` : null,
    appointmentDate ? `Cita actual: ${appointmentDate}` : "Sin cita agendada"
  ].filter(Boolean).join(", ");

  const history = messages
    .slice(-10)
    .map((m) => `${m.role === "user" ? "Cliente" : "Navi"}: ${m.content}`)
    .join("\n");

  const prompt = `${CLIENT_CONTEXT}
[Contexto: ${contactContext || "Sin datos aún"}]
Historial:
${history}

Navi:`;

  try {
    const { text, provider } = await generateTextWithFallback(prompt);
    console.info(`[Navi cliente] respuesta desde ${provider}`);
    return text;
  } catch (error) {
    console.error("Error asistente cliente:", error);
    throw new Error("No pude responder ahora. Intenta nuevamente.");
  }
};
