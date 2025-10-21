import { useState } from "react";

function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const handleSend = () => {
        if (message) {
            const text = name ? `Hola, soy ${name}. ${message}` : message;
            window.open(`https://wa.me/5491159910666?text=${encodeURIComponent(text)}`, "_blank");
            setMessage("");
        }
    };

    return (
        <>
            <button
                aria-label={isOpen ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
                className="fixed p-3 text-white transition-all bg-green-600 rounded-full shadow-lg bottom-5 right-5 hover:bg-green-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <span className="text-xl">✖</span>
                ) : (
                    <span className="text-xl">💬</span>
                )}
            </button>

            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Chat de WhatsApp"
                    className="fixed z-50 overflow-hidden bg-white rounded-lg shadow-xl bottom-28 right-5 w-80"
                >
                    <div className="w-full p-2 bg-green-600">
                        <h6 className="font-bold text-center text-white">Chatea con nosotros</h6>
                    </div>
                    <div className="p-4 mb-4 bg-gray-50">
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <textarea
                            placeholder="Escribe tu mensaje"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="button"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-800 rounded hover:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSend}
                            disabled={!message}
                        >
                            ENVIAR
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default WhatsAppChat;
