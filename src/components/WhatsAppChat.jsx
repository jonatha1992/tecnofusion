import { useState } from "react";

function WhatsAppChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");

    const handleSend = () => {
        if (message) {
            const text = name ? `Hola, soy ${name}. ${message}` : message;
            window.open(`https://wa.me/5491160235647?text=${encodeURIComponent(text)}`, "_blank");
            setMessage("");
        }
    };

    return (
        <>
            <button
                aria-label={isOpen ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"}
                className="fixed bottom-5 right-5 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition-all"
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
                    className="fixed bottom-28 right-5 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
                >
                    <div className="bg-green-600 p-2 w-full">
                        <h6 className="text-center text-white font-bold">Chatea con nosotros</h6>
                    </div>
                    <div className="mb-4 p-4 bg-gray-50">
                        <input
                            type="text"
                            placeholder="Nombre Completo"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <textarea
                            placeholder="Escribe tu mensaje"
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            type="button"
                            className="bg-blue-800 hover:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded w-full"
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
