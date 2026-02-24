import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";
import { toast } from "react-toastify";
import { sendToGoogleSheets } from "../services/googleSheetsService";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Contact({ id, title, gradientClass }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    // Puente de datos con Navi
    useEffect(() => {
        const STORAGE_KEY = "tecnofusion-customer-assistant-v1";
        const saved = localStorage.getItem(STORAGE_KEY);
        let currentMessages = [];
        if (saved) {
            try {
                currentMessages = JSON.parse(saved).messages || [];
            } catch (e) {
                console.error("Error al parsear mensajes previos", e);
            }
        }
        
        // Solo actualizamos si hay algo que actualizar para no pisar el historial
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            messages: currentMessages,
            name: form.name,
            email: form.email,
            phone: form.phone,
            appointmentDate: selectedDate ? selectedDate.toISOString() : null
        }));
    }, [form.name, form.email, form.phone]);

    useEffect(() => {
        const interval = setInterval(() => {
            const STORAGE_KEY = "tecnofusion-customer-assistant-v1";
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setForm(prev => ({
                        ...prev,
                        name: parsed.name || prev.name,
                        email: parsed.email || prev.email,
                        phone: parsed.phone || prev.phone
                    }));
                } catch (e) {}
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleWhatsAppClick = () => {
        const phoneNumber = "5491159910666";
        const message = "¡Hola! Me interesa conocer más sobre los servicios de Tecnofusión.IT";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phoneDigits = form.phone.replace(/\D/g, "");

        // Email opcional, pero si se provee debe ser válido
        if (form.email.trim() && !emailRegex.test(form.email.trim())) {
            newErrors.email = "Email inválido.";
        }

        // Teléfono opcional, pero si se provee debe tener formato básico
        if (form.phone.trim() && (phoneDigits.length < 8 || phoneDigits.length > 15)) {
            newErrors.phone = "Usa entre 8 y 15 dígitos.";
        }

        if (!form.message.trim()) newErrors.message = "Cuéntanos brevemente tu necesidad.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 ? (phoneDigits || "sin_tel") : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const phoneDigits = validateForm();
        if (!phoneDigits) return;

        const phoneNumber = "5491159910666";
        const summary = [
            `Soy ${form.name.trim() || "un cliente"}.`,
            form.email.trim() ? `Email: ${form.email.trim()}.` : "",
            phoneDigits !== "sin_tel" ? `Tel: +${phoneDigits}.` : "",
            `Necesidad: ${form.message.trim()}.`,
            selectedDate ? `📆 Cita: ${selectedDate.toLocaleDateString('es-AR')}.` : "",
        ].filter(Boolean).join(" ");

        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(summary)}`, "_blank");
        
        // Envío en segundo plano a Google Sheets
        sendToGoogleSheets({
            ...form,
            appointmentDate: selectedDate ? selectedDate.toISOString() : null
        });

        toast.success("Abrí WhatsApp con tus datos listos.");
    };

    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className={`min-h-screen ${gradientClass} text-white py-12 flex items-center justify-center`}
        >
            <div className="container mx-auto px-4 lg:px-8 max-w-screen-lg">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center"
                >
                    <motion.div variants={itemVariants}>
                        <h1
                            id={`${id}-title`}
                            className="text-5xl font-bold mb-4 text-gradient"
                        >
                            {title}
                        </h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            ¿Listo para transformar tu idea en realidad digital?
                            Contáctanos directamente por WhatsApp y comencemos tu proyecto hoy mismo.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col items-center max-w-4xl mx-auto space-y-6">
                        {/* Botón principal de WhatsApp */}
                        <div className="bg-green-600/10 backdrop-blur-md border-2 border-green-600/30 rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 hover:bg-green-600/20 hover:border-green-600/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(37,211,102,0.3)]">
                            <div className="text-center">
                                <FaWhatsapp className="text-5xl text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-white mb-3">
                                    Conversemos por WhatsApp
                                </h2>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    Obtén respuesta inmediata a tus consultas. Nuestro equipo está disponible para
                                    asesorarte y crear la solución perfecta para tu negocio.
                                </p>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 text-xl font-bold rounded-xl hover:bg-green-600 hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                    <FaWhatsapp className="text-2xl" />
                                    Iniciar Conversación
                                </button>
                            </div>
                        </div>

                        {/* Formulario con validación inteligente */}
                        <motion.div
                            variants={itemVariants}
                            className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg"
                        >
                            <h3 className="text-lg font-bold text-white mb-2">Prefieres dejarnos tus datos</h3>
                            <p className="text-sm text-white/70 mb-4">Puedes completar estos campos de forma opcional.</p>
                            <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-white/70 mb-1 block">Nombre (opcional)</label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/70"
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/70 mb-1 block">Email (opcional)</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg bg-white/10 border text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                                                errors.email ? "border-red-400 focus:ring-red-400" : "border-white/15 focus:ring-[#22d3ee]/70"
                                            }`}
                                            placeholder="tu@email.com"
                                        />
                                        {errors.email && <p className="text-xs text-red-200 mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-white/70 mb-1 block">Teléfono (opcional)</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className={`w-full px-3 py-2 rounded-lg bg-white/10 border text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                                                errors.phone ? "border-red-400 focus:ring-red-400" : "border-white/15 focus:ring-[#22d3ee]/70"
                                            }`}
                                            placeholder="+54 9 11 5991 0666"
                                        />
                                        {errors.phone && <p className="text-xs text-red-200 mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/70 mb-1 block">¿Qué necesitas? *</label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            rows={3}
                                            className={`w-full px-3 py-2 rounded-lg bg-white/10 border text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 ${
                                                errors.message ? "border-red-400 focus:ring-red-400" : "border-white/15 focus:ring-[#22d3ee]/70"
                                            }`}
                                            placeholder="Ej: Web corporativa con blog y formulario"
                                        />
                                        {errors.message && <p className="text-xs text-red-200 mt-1">{errors.message}</p>}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <p className="text-xs text-white/60">
                                        Procesamos tus datos para facilitar el contacto inicial.
                                    </p>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-[#2563eb] to-[#22d3ee] hover:shadow-lg transition"
                                    >
                                        Validar y enviar a WhatsApp
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Información de contacto adicional */}
                        <motion.div variants={itemVariants} className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-[#E68369]/10 hover:border-[#E68369]/30">
                                <HiPhone className="text-5xl text-[#E68369] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">
                                    Teléfono
                                </h3>
                                <p className="text-sm text-white/80">
                                    +54 9 11-5991-0666
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-[#E68369]/10 hover:border-[#E68369]/30">
                                <HiMail className="text-5xl text-[#E68369] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">
                                    Email
                                </h3>
                                <p className="text-sm text-white/80">
                                    Tecnofusion.it@gmail.com
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:bg-[#E68369]/10 hover:border-[#E68369]/30">
                                <HiLocationMarker className="text-5xl text-[#E68369] mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-white mb-2">
                                    Ubicación
                                </h3>
                                <p className="text-sm text-white/80">
                                    Buenos Aires, Argentina
                                </p>
                            </div>
                        </motion.div>

                        {/* Call to action adicional */}
                        <motion.div variants={itemVariants} className="text-center pt-6">
                            <h3 className="text-xl text-white/80 mb-3">
                                🚀 ¿Tienes un proyecto en mente?
                            </h3>
                            <p className="text-white/70 max-w-2xl mx-auto">
                                No esperes más. Cada día que pasa sin digitalizar tu negocio es una oportunidad perdida.
                                Hablemos y hagamos realidad tu visión tecnológica.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;
