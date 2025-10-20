import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Servicios({ id, title, gradientClass, services, containerVariants, itemVariants }) {
    const [activeService, setActiveService] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref);

    // Default services array if not provided
    const defaultServices = [
        {
            icon: <span>💻</span>,
            title: "Desarrollo Web Profesional",
            shortDescription: "Sitios web modernos, rápidos y escalables que impulsan tu negocio.",
            fullDescription: "Desarrollamos sitios web y aplicaciones web de alto rendimiento utilizando tecnologías de vanguardia. Nuestro enfoque se centra en la velocidad, SEO, y experiencia de usuario excepcional.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
            technologies: ["React", "Vue.js", "Node.js", "MongoDB", "PostgreSQL", "AWS"],
            benefits: [
                "100% Responsivo y Mobile-First",
                "Optimizado para SEO y velocidad",
                "Escalable y mantenible",
                "Integración con APIs y servicios externos"
            ],
            deliveryTime: "2-6 semanas"
        },
        {
            icon: <span>🎨</span>,
            title: "Diseño UI/UX Premium",
            shortDescription: "Diseños que convierten visitantes en clientes y mejoran la experiencia.",
            fullDescription: "Creamos experiencias digitales memorables a través de investigación de usuarios, arquitectura de información y diseño visual impactante que se alinea con los objetivos de tu negocio.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
            technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle", "Framer"],
            benefits: [
                "Investigación y análisis de usuarios",
                "Prototipado interactivo",
                "Guías de estilo y sistemas de diseño",
                "Testing de usabilidad"
            ],
            deliveryTime: "1-4 semanas"
        },
        {
            icon: <span>🤖</span>,
            title: "ChatBots y Automatización",
            shortDescription: "Automatiza procesos y mejora la atención al cliente 24/7.",
            fullDescription: "Implementamos soluciones de inteligencia artificial conversacional para automatizar la atención al cliente, calificación de leads y procesos internos de tu empresa, disponibles las 24 horas del día.",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80",
            technologies: ["Dialogflow", "WhatsApp API", "Telegram Bot", "OpenAI GPT", "Python", "FastAPI"],
            benefits: [
                "Atención al cliente automatizada 24/7",
                "Reducción de costos operativos",
                "Calificación automática de leads",
                "Integración con CRM y sistemas existentes"
            ],
            deliveryTime: "3-8 semanas"
        },
        {
            icon: <span>💼</span>,
            title: "Consultoría IT",
            shortDescription: "Asesoramiento experto en tecnología y transformación digital.",
            fullDescription: "Brindamos consultoría estratégica en tecnología para optimizar procesos, reducir costos y acelerar la transformación digital de tu empresa con soluciones a medida.",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
            technologies: ["Análisis de Procesos", "Cloud Computing", "DevOps", "Arquitectura de Software", "Seguridad IT"],
            benefits: [
                "Auditoría tecnológica completa",
                "Plan de transformación digital",
                "Optimización de infraestructura",
                "Reducción de costos IT hasta 40%"
            ],
            deliveryTime: "2-4 semanas"
        },
        {
            icon: <span>🔒</span>,
            title: "Seguridad CCTV",
            shortDescription: "Sistemas de videovigilancia profesional para tu negocio.",
            fullDescription: "Instalamos y configuramos sistemas de videovigilancia CCTV de última generación con acceso remoto, grabación en la nube y detección inteligente de movimiento para proteger tu negocio.",
            image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
            technologies: ["Cámaras IP", "DVR/NVR", "Hikvision", "Dahua", "Almacenamiento Cloud", "Acceso Remoto"],
            benefits: [
                "Monitoreo remoto desde cualquier dispositivo",
                "Grabación en alta definición",
                "Detección inteligente de movimiento",
                "Alertas en tiempo real"
            ],
            deliveryTime: "1-3 semanas"
        },
        {
            icon: <span>📱</span>,
            title: "Aplicaciones Móviles",
            shortDescription: "Apps nativas y multiplataforma para iOS y Android.",
            fullDescription: "Desarrollamos aplicaciones móviles nativas y multiplataforma con diseño intuitivo, alto rendimiento y experiencia de usuario excepcional para iOS y Android.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
            technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "API REST"],
            benefits: [
                "Desarrollo multiplataforma",
                "Menor tiempo de desarrollo",
                "Actualizaciones OTA",
                "Integración con servicios nativos"
            ],
            deliveryTime: "6-12 semanas"
        }
    ];

    const serviceList = services && Array.isArray(services) ? services : defaultServices;

    return (
        <section
            id={id}
            aria-labelledby={`${id}-title`}
            className={`min-h-screen ${gradientClass} text-white py-16 animate-fade-in flex items-center`}
        >
            <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="text-center mb-12">
                    <h1
                        id={`${id}-title`}
                        className="text-gradient text-4xl md:text-5xl mb-3 font-bold"
                    >
                        {title}
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Soluciones tecnológicas integrales para impulsar tu negocio
                    </p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
                        {/* Services List */}
                        <div className="md:col-span-5">
                            <motion.div
                                ref={ref}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-3"
                            >
                                {serviceList.map((service, index) => (
                                    <motion.div
                                        key={index}
                                        className={`group relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden
                                            ${activeService === index
                                                ? 'bg-gradient-to-r from-[#E68369]/20 to-[#E68369]/10 border-l-4 border-[#E68369] shadow-lg shadow-[#E68369]/20'
                                                : 'bg-white/5 border-l-4 border-transparent hover:bg-white/10 hover:border-l-[#E68369]/50'
                                            }`}
                                        onMouseEnter={() => setActiveService(index)}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Subtle gradient overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-[#E68369]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                        <div className="flex items-center p-4 relative z-10">
                                            <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                                                ${activeService === index
                                                    ? 'bg-[#E68369] shadow-lg shadow-[#E68369]/30 scale-110'
                                                    : 'bg-[#131842] group-hover:bg-[#E68369]/20 group-hover:scale-105'
                                                }`}
                                            >
                                                <span className="text-2xl">{service.icon}</span>
                                            </div>

                                            <div className="flex-1 ml-4">
                                                <h2 className={`font-bold text-base mb-1 transition-colors duration-300
                                                    ${activeService === index ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}
                                                >
                                                    {service.title}
                                                </h2>
                                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                                                    {service.shortDescription}
                                                </p>
                                            </div>

                                            <motion.svg
                                                className={`flex-shrink-0 w-5 h-5 ml-3 transition-colors duration-300
                                                    ${activeService === index ? 'text-[#E68369]' : 'text-gray-500 group-hover:text-[#E68369]'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                animate={{
                                                    x: activeService === index ? 4 : 0,
                                                    rotate: activeService === index ? 0 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </motion.svg>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Service Detail Panel */}
                        <div className="md:col-span-7">
                            <div className="h-full">
                                {activeService !== null ? (
                                    <motion.div
                                        key={activeService}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10 overflow-hidden min-h-[520px] flex flex-col">
                                            {/* Decorative gradient */}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#E68369]/20 to-transparent rounded-full blur-3xl opacity-50" />
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#131842]/40 to-transparent rounded-full blur-3xl opacity-50" />

                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex items-center mb-5">
                                                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E68369] to-[#d67359] shadow-lg shadow-[#E68369]/30">
                                                        <span className="text-3xl">{serviceList[activeService].icon}</span>
                                                    </div>
                                                    <h3 className="font-bold text-2xl text-white ml-4">
                                                        {serviceList[activeService].title}
                                                    </h3>
                                                </div>

                                                {/* Image */}
                                                <div className="relative rounded-xl overflow-hidden mb-5 shadow-lg group/img">
                                                    <img
                                                        src={serviceList[activeService].image}
                                                        alt={serviceList[activeService].title}
                                                        className="w-full h-[160px] object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#131842]/60 to-transparent" />
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-200 mb-5 leading-relaxed">
                                                    {serviceList[activeService].fullDescription}
                                                </p>

                                                {/* Technologies */}
                                                <div className="mb-5">
                                                    <h4 className="text-[#E68369] font-semibold mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                        </svg>
                                                        Tecnologías
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {serviceList[activeService].technologies.map((tech, techIndex) => (
                                                            <span
                                                                key={techIndex}
                                                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#131842]/60 border border-[#E68369]/30 text-[#E68369] backdrop-blur-sm hover:bg-[#E68369]/10 hover:border-[#E68369] transition-all duration-300"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Benefits */}
                                                <div className="mb-5 flex-1">
                                                    <h4 className="text-[#E68369] font-semibold mb-3 flex items-center">
                                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Beneficios clave
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {serviceList[activeService].benefits.map((benefit, benefitIndex) => (
                                                            <li
                                                                key={benefitIndex}
                                                                className="flex items-start text-gray-100 text-sm group/benefit"
                                                            >
                                                                <svg className="w-5 h-5 mr-2 flex-shrink-0 text-[#E68369] group-hover/benefit:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                <span>{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Footer */}
                                                <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                                                    <div className="flex items-center text-gray-300 text-sm">
                                                        <svg className="w-5 h-5 mr-2 text-[#E68369]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-semibold text-white">{serviceList[activeService].deliveryTime}</span>
                                                    </div>

                                                    <motion.button
                                                        className="relative bg-gradient-to-r from-[#E68369] to-[#d67359] text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-[#E68369]/40 transition-all duration-300 overflow-hidden group/btn"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <span className="relative z-10 flex items-center">
                                                            Solicitar Cotización
                                                            <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                            </svg>
                                                        </span>
                                                        {/* Button shine effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-sm rounded-2xl flex items-center justify-center min-h-[520px] shadow-xl border border-white/10">
                                        <div className="text-center px-6">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#E68369]/20 to-[#131842]/20 rounded-2xl flex items-center justify-center">
                                                <svg className="w-10 h-10 text-[#E68369]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                </svg>
                                            </div>
                                            <h4 className="text-white mb-2 text-xl font-bold">
                                                Explora nuestros servicios
                                            </h4>
                                            <p className="text-gray-400 text-base leading-relaxed max-w-md">
                                                Selecciona un servicio de la lista para descubrir tecnologías, beneficios y tiempos de entrega
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="block md:hidden">
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-4"
                    >
                        {serviceList.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group"
                            >
                                <motion.div
                                    className={`cursor-pointer transition-all duration-300 rounded-xl overflow-hidden
                                        ${activeService === index
                                            ? 'bg-gradient-to-r from-[#E68369]/20 to-[#E68369]/10 border-l-4 border-[#E68369] shadow-lg'
                                            : 'bg-white/5 border-l-4 border-transparent'
                                        }`}
                                    onClick={() => setActiveService(activeService === index ? null : index)}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-center p-4">
                                        <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                                            ${activeService === index
                                                ? 'bg-[#E68369] shadow-lg shadow-[#E68369]/30'
                                                : 'bg-[#131842]'
                                            }`}
                                        >
                                            <span className="text-2xl">{service.icon}</span>
                                        </div>

                                        <div className="flex-1 ml-3">
                                            <h2 className={`font-bold text-base mb-1 transition-colors duration-300
                                                ${activeService === index ? 'text-white' : 'text-gray-200'}`}
                                            >
                                                {service.title}
                                            </h2>
                                            <p className="text-gray-400 text-xs">
                                                {service.shortDescription}
                                            </p>
                                        </div>

                                        <motion.svg
                                            className={`flex-shrink-0 w-5 h-5 ml-2 transition-colors duration-300
                                                ${activeService === index ? 'text-[#E68369]' : 'text-gray-500'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{ rotate: activeService === index ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </motion.svg>
                                    </div>
                                </motion.div>

                                {/* Expandable content */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeService === index ? "auto" : 0,
                                        opacity: activeService === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    {activeService === index && (
                                        <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl rounded-xl p-5 shadow-lg mt-3 mx-2 border border-white/10">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-[180px] object-cover rounded-lg mb-4 shadow-md"
                                            />

                                            <p className="text-gray-200 mb-4 leading-relaxed text-sm">
                                                {service.fullDescription}
                                            </p>

                                            <div className="mb-4">
                                                <h4 className="text-[#E68369] font-semibold mb-2 text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                    </svg>
                                                    Tecnologías
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {service.technologies.map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[#131842]/60 border border-[#E68369]/30 text-[#E68369]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <h4 className="text-[#E68369] font-semibold mb-2 text-sm flex items-center">
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Beneficios
                                                </h4>
                                                <ul className="space-y-1.5">
                                                    {service.benefits.map((benefit, benefitIndex) => (
                                                        <li
                                                            key={benefitIndex}
                                                            className="flex items-start text-gray-100 text-xs"
                                                        >
                                                            <svg className="w-4 h-4 mr-2 flex-shrink-0 text-[#E68369] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/10">
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <svg className="w-4 h-4 mr-1.5 text-[#E68369]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="font-semibold text-white">{service.deliveryTime}</span>
                                                </div>

                                                <button className="w-full sm:w-auto bg-gradient-to-r from-[#E68369] to-[#d67359] text-white px-5 py-2 rounded-lg font-semibold text-xs shadow-lg hover:shadow-[#E68369]/30 transition-all duration-300 flex items-center justify-center">
                                                    Solicitar Cotización
                                                    <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Servicios;
