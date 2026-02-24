import { useEffect, useRef, useState } from "react";
import { askCustomerAssistant } from "../services/customerAssistantService";

const STORAGE_KEY = "tecnofusion-customer-assistant-v1";
const INITIAL_MESSAGE = {
  role: "assistant",
  content: "Soy Navi. ¿Qué necesitas construir?.",
};

function CustomerAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setPhone(parsed.phone || "");
        setAppointmentDate(parsed.appointmentDate || null);
        return;
      } catch (e) {
        console.error("No se pudo cargar el historial del asistente cliente", e);
      }
    }
    setMessages([INITIAL_MESSAGE]);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, name, email, phone, appointmentDate }));
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, name, email, phone, appointmentDate]);

  const extractContactInfo = (text) => {
    // Extraer Email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && !email) setEmail(emailMatch[0]);

    // Extraer Teléfono (8+ dígitos seguidos de espacios/guiones)
    const phoneMatch = text.match(/(\+?\d[\d-\s]{7,}\d)/);
    if (phoneMatch && !phone) setPhone(phoneMatch[0].replace(/\s/g, ""));

    // Extraer Nombre (Heurística simple: "me llamo X" o "mi nombre es X")
    const nameMatch = text.match(/(?:me llamo|soy|mi nombre es)\s+([a-zA-ZáéíóúÁÉÍÓÚñÑ]+)/i);
    if (nameMatch && !name) setName(nameMatch[1].trim());

    // Extraer Fecha (Heurística simple: "el 25 de mayo", "lunes", "mañana")
    // Note: This is a placeholder for better extraction if needed, 
    // but for now we rely on Navi confirming it and the user confirming.
    // However, if Navi says "Anotado para el 25/05", we could potentially sync it back.
  };



  const handleSend = async (customText) => {
    if (loading) return;
    const text = (customText ?? input).trim();
    if (!text) return;

    const userMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    // Intentar extraer info de contacto del mensaje del usuario
    extractContactInfo(text);

    try {
      const reply = await askCustomerAssistant(nextMessages, { name, email, phone, appointmentDate: appointmentDate || "No definida" });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      
      // Si la respuesta indica éxito final, disparamos el guardado a Google Sheets
      if (reply.toLowerCase().includes("guardados") || reply.toLowerCase().includes("registrada")) {
        // Importar dinámicamente para no ensuciar el inicio
        const { sendToGoogleSheets } = await import("../services/googleSheetsService");
        sendToGoogleSheets({
          name,
          email,
          phone,
          message: text,
          appointmentDate: appointmentDate || "Ver chat",
          source: "Navi AI"
        });
      }
    } catch (err) {
      setError(err.message || "No pudimos responder ahora. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
    setError("");
    setName("");
    setEmail("");
    setPhone("");
    setAppointmentDate(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
      messages: [INITIAL_MESSAGE], 
      name: "", 
      email: "", 
      phone: "",
      appointmentDate: null 
    }));
  };

  const renderMessage = (msg, idx) => {
    const isUser = msg.role === "user";
    return (
      <div key={`${msg.role}-${idx}`} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow ${isUser
            ? "bg-gradient-to-r from-[#E68369] to-[#d67359] text-white"
            : "bg-white/10 border border-white/10 text-white"
            }`}
        >
          <p className="whitespace-pre-wrap">{msg.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="w-[360px] max-w-[calc(100vw-1.5rem)] bg-[#0b0f20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0f172a] to-[#0b1024] border-b border-white/10">
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-white/70">Tecnofusion · Asesor</p>
              <h3 className="text-sm font-bold text-white">Navi</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                className="p-2 text-white/80 hover:text-white bg-white/0 hover:bg-white/10 rounded-full transition text-lg leading-none"
                aria-label="Reiniciar chat"
                title="Reiniciar chat"
              >
                ↺
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition"
                aria-label="Cerrar asistente"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 py-3 h-80 overflow-y-auto space-y-2 bg-[#080c1c]">
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-white/70 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="inline-flex h-2 w-2 bg-emerald-400 rounded-full animate-ping" />
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <div className="px-4 py-2 text-xs text-red-200 bg-red-900/40 border-t border-red-500/30">
              {error}
            </div>
          )}

          <div className="p-3 bg-[#0f1230] border-t border-white/10">


            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Cuéntanos tu idea en 1-2 líneas..."
                className="flex-1 w-full resize-none rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/70 focus:border-transparent"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#2563eb] to-[#22d3ee] text-white font-bold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-white/40">Enter envía · Shift+Enter nuevo renglón</p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#22d3ee] text-white font-semibold shadow-lg hover:shadow-xl transition"
          aria-label="Abrir asistente comercial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Habla con Navi
        </button>
      )}
    </div>
  );
}

export default CustomerAssistant;
