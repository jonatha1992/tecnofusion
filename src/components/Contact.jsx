import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiPhone, HiMail, HiLocationMarker } from "react-icons/hi";

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

    const handleWhatsAppClick = () => {
        const phoneNumber = "5491159910666";
        const message = "¡Hola! Me interesa conocer más sobre los servicios de Tecnofusión.IT";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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
