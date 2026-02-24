import { generateTextWithFallback } from "./aiProviderService";

const CLIENT_CONTEXT = `
Eres "Navi". Estilo: AMIGABLE PERO CONCISO, EDUCADO, SIN SALUDOS REPETITIVOS.

Reglas de Oro:
1. Sé amable y cortés al pedir información (ej: "¡Perfecto! ¿Me podrías indicar tu email?", en lugar de ser cortante). No uses más de 20 palabras por respuesta.
2. Si el usuario da un dato (nombre, mail, tel), confírmalo amablemente (ej: "¡Anotado!") y pide el siguiente.
3. No saludes en cada mensaje si ya iniciaron la conversación.
4. Tu único fin es obtener: Nombre, Email, Teléfono y Necesidad.
5. Si el usuario quiere una cita, pregúntale fecha y hora. Usa la "Fecha y hora actual" dada en el contexto para deducir qué día es "hoy" o "mañana".
6. Al definir la cita, dile: "Agendaré la cita para el [FECHA/HORA] en nuestro calendario".
7. Si ya tienes todos los datos y la cita, despídete amablemente: "¡Listo! Hemos registrado tus datos y tu cita. Nos comunicaremos pronto." y termina.
`;

export const askCustomerAssistant = async (messages, contactData = {}) => {
  const { name, email, phone, appointmentDate } = contactData;
  
  const currentDateStr = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const contactContext = [
    `Fecha y hora actual: ${currentDateStr}`,
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
