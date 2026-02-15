import { generateTextWithFallback } from "./aiProviderService";

/**
 * Analiza el contenido de un README para extraer informacion del proyecto.
 * @param {string} readmeText - Contenido del README
 * @returns {Promise<Object>} Datos extraidos { title, description, technologies, status }
 */
export const analyzeReadme = async (readmeText) => {
  if (!readmeText?.trim()) {
    throw new Error("El README esta vacio.");
  }

  try {
    const prompt = `
Analiza el siguiente texto de un archivo README de un proyecto de software y extrae la siguiente informacion en formato JSON:
- title: Un titulo corto y descriptivo para el proyecto.
- description: Una descripcion clara y concisa de lo que hace el proyecto (maximo 3 oraciones).
- technologies: Una lista de las tecnologias principales utilizadas (ej: "React, Node.js, Firebase").
- status: "Desarrollo" o "Produccion" (inferir del contexto, default "Desarrollo").

IMPORTANTE:
- Responde UNICAMENTE con un objeto JSON valido.
- No uses markdown ni bloques de codigo.

README:
${readmeText}
`;

    const { text, provider } = await generateTextWithFallback(prompt);
    console.info(`[README AI] analisis desde ${provider}`);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("La respuesta de la IA no contiene un JSON valido.");
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("Error al analizar README con IA:", error);
    throw new Error(`Error en la IA: ${error.message}`);
  }
};
