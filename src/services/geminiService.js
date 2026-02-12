import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Analiza el contenido de un README para extraer información del proyecto.
 * @param {string} readmeText - Contenido del README
 * @returns {Promise<Object>} Datos extraídos { title, description, technologies }
 */
export const analyzeReadme = async (readmeText) => {
    if (!API_KEY) {
        throw new Error("VITE_GEMINI_API_KEY no está configurada");
    }

    try {
        // Usamos el modelo gemini-2.5-flash confirmado por el usuario y la lista de modelos
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      Analiza el siguiente texto de un archivo README de un proyecto de software y extrae la siguiente información en formato JSON:
      - title: Un título corto y descriptivo para el proyecto.
      - description: Una descripción clara y concisa de lo que hace el proyecto (máximo 3 oraciones).
      - technologies: Una lista de las tecnologías principales utilizadas (ej: "React, Node.js, Firebase").
      - status: "Desarrollo" o "Producción" (inferir del contexto, default "Desarrollo").

      IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido.
      
      README:
      ${readmeText}
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Respuesta bruta de Gemini:", text);

        // Limpiar bloques de código si existen
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            // Intento de fallback si no hay JSON claro
            throw new Error("La respuesta de la IA no contiene un JSON válido.");
        }

        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error("Error detallado al analizar README con Gemini:", error);
        if (error.message.includes("API key not valid")) {
            throw new Error("La API Key de Gemini no es válida. Por favor, revísala en el archivo .env");
        }
        throw new Error(`Error en la IA: ${error.message}`);
    }
};
