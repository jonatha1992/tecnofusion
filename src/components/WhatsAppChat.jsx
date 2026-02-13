import { useEffect, useMemo, useState } from "react";

function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [pageHint, setPageHint] = useState("");

  useEffect(() => {
    try {
      const { pathname } = window.location;
      if (pathname && pathname !== "/") {
        setPageHint(`Consulta enviada desde ${pathname}`);
      }
    } catch {
      setPageHint("");
    }
  }, []);

  const metaLine = useMemo(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `Hora local ${hours}:${minutes}${pageHint ? ` · ${pageHint}` : ""}`;
  }, [pageHint]);

  const quickPrompts = [
    "Quiero una web corporativa con formulario y SEO.",
    "Necesito cotizar una app móvil con login y notificaciones.",
    "Soporte para proyecto existente en Firebase/React.",
    "Agendar llamada de 15 minutos esta semana.",
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const intro = name ? `Hola, soy ${name}. ` : "Hola. ";
    const fullMessage = `${intro}${message.trim()}\n\n${metaLine}`;
    window.open(`https://wa.me/5491159910666?text=${encodeURIComponent(fullMessage)}`, "_blank");
    setMessage("");
  };

  const handleQuick = (text) => {
    setMessage(text);
    setIsOpen(true);
  };

  return (
    <>
      <button
        aria-label={isOpen ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
        className="fixed bottom-5 right-5 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-full shadow-xl transition-all bg-gradient-to-r from-[#E68369] to-[#d67359] hover:shadow-2xl hover:translate-y-[-1px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base">💬</span>
        <span>{isOpen ? "Cerrar" : "Chatea con nosotros"}</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat de WhatsApp"
          className="fixed z-50 w-80 max-w-[92vw] overflow-hidden rounded-2xl shadow-2xl bottom-24 right-5 bg-gradient-to-b from-[#131842] via-[#1a2557] to-[#0f1230] border border-white/10"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <p className="text-[11px] text-white/60 font-semibold">Asesor en línea</p>
              <h6 className="text-sm font-bold text-white">Chatea con Tecnofusion</h6>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              ✕
            </button>
          </div>

          <div className="px-4 py-3 space-y-2 bg-white/5 border-b border-white/10">
            <p className="text-[11px] text-white/70">Atajos inteligentes</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuick(q)}
                  className="px-3 py-1 text-[11px] font-semibold text-white bg-white/10 border border-white/15 rounded-full hover:bg-[#E68369]/20 hover:border-[#E68369]/60 transition"
                >
                  {q.slice(0, 34)}...
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 space-y-2 bg-[#0b0f2a]">
            <input
              type="text"
              placeholder="Tu nombre (opcional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm text-white placeholder-white/50 bg-white/10 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E68369]/60"
            />
            <textarea
              placeholder="Cuéntanos tu necesidad en 1-2 líneas..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm text-white placeholder-white/50 bg-white/10 border border-white/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E68369]/60 resize-none"
            />
            <div className="text-[10px] text-white/40">{metaLine}</div>
          </div>

          <div className="px-4 py-3 bg-[#0f1230]">
            <button
              type="button"
              className="w-full px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#E68369] to-[#d67359] shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              Enviar por WhatsApp
            </button>
            <p className="mt-1 text-[10px] text-white/40">Se abrirá WhatsApp con el mensaje listo.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default WhatsAppChat;
