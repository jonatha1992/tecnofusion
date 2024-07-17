import React, { useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";

const predefinedMessages = [
    "HOLA, QUISIERA MÁS INFORMACIÓN SOBRE SUS SERVICIOS.",
    "¿CUÁLES SON SUS HORARIOS DE ATENCIÓN?",
    "ME GUSTARÍA AGENDAR UNA CITA.",
];

const WhatsAppChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [country, setCountry] = useState("Argentina");

    const handleSend = () => {
        if (message) {
            window.open(`https://wa.me/TUNUMERODEWHATSAPP?text=${encodeURIComponent(message)}`, "_blank");
            setMessage("");
        }
    };

    return (
        <>
            <button
                className="fixed bottom-5 right-5 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon /> : <WhatsAppIcon style={{ fontSize: 30 }} />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-5 w-80 bg-[#f0e6d2] rounded-lg shadow-xl p-4 z-[9999]">
                    <h6 className="text-lg font-semibold mb-4 text-gray-800">Chatea con nosotros</h6>

                    <div className="mb-4 space-y-2">
                        {predefinedMessages.map((msg, index) => (
                            <button
                                key={index}
                                className="w-full text-left bg-white text-sm p-2 rounded mb-2 hover:bg-gray-100 transition duration-300"
                                onClick={() => setMessage(msg)}
                            >
                                {msg}
                            </button>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Escribe tu mensaje"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 mb-2 border border-gray-300 rounded bg-white"
                    />
                    <input
                        type="text"
                        placeholder="Nombre Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 mb-2 border border-gray-300 rounded bg-white"
                    />
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
                    >
                        <option value="Argentina">Argentina</option>
                        {/* Agrega más países según sea necesario */}
                    </select>
                    <button
                        onClick={handleSend}
                        className="w-full bg-[#e57373] hover:bg-[#ef5350] text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        ENVIAR
                    </button>
                </div>
            )}
        </>
    );
};

export default WhatsAppChat;
