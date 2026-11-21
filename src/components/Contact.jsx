import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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

function Contact({ id, title }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});
    const [selectedDate] = useState(null);

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
            appointmentDate: selectedDate ? selectedDate.toISOString() : null
        }));
    }, [form.name, form.email, selectedDate]);

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
                    }));
                } catch {
                    // ignore malformed storage
                }
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleWhatsAppClick = () => {
        const phoneNumber = "5491159910666";
        const message = "¡Hola! Me interesa conocer más sobre los servicios de tecnofusion.dev";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        // Email opcional, pero si se provee debe ser válido
        if (form.email.trim() && !emailRegex.test(form.email.trim())) {
            newErrors.email = "Email inválido.";
        }

        if (!form.message.trim()) newErrors.message = "Cuéntanos brevemente tu necesidad.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        const phoneNumber = "5491159910666";
        const summary = [
            `Soy ${form.name.trim() || "un cliente"}.`,
            form.email.trim() ? `Email: ${form.email.trim()}.` : "",
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
        <section id={id} aria-labelledby={`${id}-title`} className="bg-[#F2EFE9] text-[#1C1C1C] py-16 px-4 md:px-6 border-t border-[#1C1C1C]/12">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.header variants={itemVariants} className="text-left">
                        <p className="text-xs font-medium tracking-wide text-[#57554F]">Contacto directo · Buenos Aires</p>
                        <h1 id={`${id}-title`} className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[0.95] text-[#1C1C1C] mt-2">
                            {title || "Iniciemos un proyecto"}
                        </h1>
                    </motion.header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 mt-8">
                        <motion.div variants={itemVariants} className="lg:col-span-5 bg-[#1C1C1C] text-[#F2EFE9] rounded-[6px] p-6 md:p-8 flex flex-col justify-between text-left min-h-[380px]">
                            <div>
                                <h2 className="text-2xl font-semibold tracking-[-0.03em]">Canal directo de ingeniería</h2>
                                <p className="mt-3 text-sm leading-relaxed text-[#F2EFE9]/75">Consultas técnicas, alcance de arquitectura, desarrollo de productos SaaS o integración de agentes de IA. Respuesta directa sin intermediarios comerciales.</p>
                                <button type="button" onClick={handleWhatsAppClick} className="mt-6 inline-flex items-center justify-between w-full bg-[#8FA68E] hover:bg-[#9FB59E] text-[#1C1C1C] font-semibold px-5 py-3.5 rounded-[6px] text-sm transition-colors"><span>Iniciar conversación por WhatsApp</span><span>→</span></button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-8 pt-6 border-t border-[#F2EFE9]/15 text-xs">
                                <div><p className="text-[#F2EFE9]/55">Email</p><p className="mt-1">tecnofusion.it@gmail.com</p></div>
                                <div><p className="text-[#F2EFE9]/55">Ubicación</p><p className="mt-1">Buenos Aires, Argentina · Remoto</p></div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="lg:col-span-7 bg-[#DFDCD2] text-[#1C1C1C] rounded-[6px] p-6 md:p-8 text-left">
                            <h2 className="text-xl font-semibold tracking-[-0.03em] text-[#1C1C1C]">Brief rápido de proyecto</h2>
                            <p className="mt-2 text-sm text-[#57554F]">Completá tu necesidad y abrimos el canal con el resumen técnico listo.</p>
                            <form className="space-y-4 mt-6" onSubmit={handleSubmit} noValidate>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Nombre (opcional)</label>
                                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#FFFFFF] border border-[#1C1C1C]/20 rounded-[6px] px-3.5 py-2.5 text-sm text-[#1C1C1C] placeholder-[#57554F]/60 focus:outline-none focus:border-[#1C1C1C]" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">Email (opcional)</label>
                                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[#FFFFFF] border border-[#1C1C1C]/20 rounded-[6px] px-3.5 py-2.5 text-sm text-[#1C1C1C] placeholder-[#57554F]/60 focus:outline-none focus:border-[#1C1C1C]" placeholder="tu@email.com" />
                                    {errors.email && <p className="text-xs text-[#D95D39] font-medium mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1">¿Qué necesitas? *</label>
                                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full bg-[#FFFFFF] border border-[#1C1C1C]/20 rounded-[6px] px-3.5 py-2.5 text-sm text-[#1C1C1C] placeholder-[#57554F]/60 focus:outline-none focus:border-[#1C1C1C]" placeholder="Ej: Web corporativa con blog y formulario" />
                                    {errors.message && <p className="text-xs text-[#D95D39] font-medium mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" className="px-6 py-3 text-sm font-medium bg-[#1C1C1C] hover:bg-[#333333] text-[#F2EFE9] rounded-[6px] transition-colors">Validar y enviar a WhatsApp</button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;
