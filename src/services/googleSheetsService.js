/**
 * Servicio para integrar el formulario de contacto con Google Sheets
 * a través de un Web App de Google Apps Script.
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export const sendToGoogleSheets = async (data) => {
    if (!GOOGLE_SCRIPT_URL) {
        console.warn("Google Sheets URL no configurada. Saltando envío.");
        return { success: false, message: "URL no configurada" };
    }

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Crucial para Google Scripts
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                fecha: new Date().toLocaleDateString('es-AR'),
                hora: new Date().toLocaleTimeString('es-AR'),
                source: "Tecnofusion Web"
            }),
        });

        return { success: true, response };
    } catch (error) {
        console.error("Error al enviar a Google Sheets:", error);
        return { success: false, error };
    }
};
