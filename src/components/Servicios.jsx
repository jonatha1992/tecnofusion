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
        }
    ];
    const serviceList = services && Array.isArray(services) ? services : defaultServices;
    return (
        <section id={id} aria-labelledby={`${id}-title`} className={`min-h-[100vh] ${gradientClass} text-white py-6 animate-fade-in`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-6">
                    <h1 id={`${id}-title`} className="text-gradient text-4xl md:text-5xl mb-1 font-bold">{title}</h1>
                </div>
                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
                        <div className="md:col-span-5">
                            <motion.div ref={ref} variants={containerVariants} initial="hidden" animate="visible">
                                {serviceList.map((service, index) => (
                                    <div key={index} className={`mb-4 cursor-pointer transition-all ${activeService === index ? 'bg-orange-100 border-l-4 border-orange-400' : 'bg-white/5'}`} onMouseEnter={() => setActiveService(index)}>
                                        <div className="flex items-center p-4">
                                            <span className="text-orange-500 text-2xl mr-3">{service.icon}</span>
                                            <div className="flex-1">
                                                <h2 className="font-bold text-lg text-white mb-1">{service.title}</h2>
                                                <p className="text-gray-300 text-sm">{service.shortDescription}</p>
                                            </div>
                                            <span className={`text-orange-500 ml-2 transition-transform ${activeService === index ? 'rotate-90' : ''}`}>→</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                        <div className="md:col-span-7">
                            <div className="h-full pl-4">
                                {activeService !== null ? (
                                    <motion.div key={activeService} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                        <div className="bg-white/10 rounded-lg p-6 shadow-lg flex flex-col min-h-[420px]">
                                            <div className="flex items-center mb-4">
                                                <span className="text-orange-500 text-2xl mr-3">{serviceList[activeService].icon}</span>
                                                <h3 className="font-bold text-xl text-white">{serviceList[activeService].title}</h3>
                                            </div>
                                            <img src={serviceList[activeService].image} alt={serviceList[activeService].title} className="w-full h-[130px] object-cover rounded-lg mb-4" />
                                            <p className="text-gray-200 mb-4">{serviceList[activeService].fullDescription}</p>
                                            <div className="mb-4">
                                                <h4 className="text-orange-400 font-semibold mb-2">Tecnologías utilizadas:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {serviceList[activeService].technologies.map((tech, techIndex) => (
                                                        <span key={techIndex} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs border border-orange-300">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="text-orange-400 font-semibold mb-2">Beneficios clave:</h4>
                                                <ul className="space-y-1">
                                                    {serviceList[activeService].benefits.map((benefit, benefitIndex) => (
                                                        <li key={benefitIndex} className="flex items-center text-gray-100 text-sm">
                                                            <span className="text-orange-400 mr-2">✔</span>{benefit}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="text-gray-300 text-xs">Tiempo: <strong>{serviceList[activeService].deliveryTime}</strong></span>
                                                <button className="border border-orange-400 text-orange-400 px-4 py-2 rounded hover:bg-orange-100 hover:text-orange-700 transition-all text-xs font-semibold">Solicitar Cotización <span className="ml-1">→</span></button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="bg-white/5 rounded-lg flex items-center justify-center min-h-[420px] shadow-lg">
                                        <div className="text-center px-3">
                                            <h4 className="text-gray-300 mb-2 text-xl font-semibold">Selecciona un servicio</h4>
                                            <p className="text-gray-400 text-base">Pasa el cursor sobre cualquier servicio de la izquierda para ver información detallada, tecnologías utilizadas, beneficios y tiempo de entrega.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Mobile Layout */}
                <div className="block md:hidden">
                    <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                        {serviceList.map((service, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <div className={`mb-2 cursor-pointer transition-all ${activeService === index ? 'bg-orange-100 border-l-4 border-orange-400' : 'bg-white/5'}`} onClick={() => setActiveService(activeService === index ? null : index)}>
                                    <div className="flex items-center p-3">
                                        <span className="text-orange-500 text-2xl mr-3">{service.icon}</span>
                                        <div className="flex-1">
                                            <h2 className="font-bold text-lg text-white mb-1">{service.title}</h2>
                                            <p className="text-gray-300 text-sm">{service.shortDescription}</p>
                                        </div>
                                        <span className={`text-orange-500 ml-2 transition-transform ${activeService === index ? 'rotate-90' : ''}`}>→</span>
                                    </div>
                                </div>
                                {activeService === index && (
                                    <div className="bg-white/10 rounded-lg p-4 shadow-lg ml-2 mr-2 mb-3">
                                        <img src={service.image} alt={service.title} className="w-full h-[200px] object-cover rounded-lg mb-4" />
                                        <p className="text-gray-200 mb-4">{service.fullDescription}</p>
                                        <div className="mb-4">
                                            <h4 className="text-orange-400 font-semibold mb-2">Tecnologías utilizadas:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {service.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs border border-orange-300">{tech}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="text-orange-400 font-semibold mb-2">Beneficios clave:</h4>
                                            <ul className="space-y-1">
                                                {service.benefits.map((benefit, benefitIndex) => (
                                                    <li key={benefitIndex} className="flex items-center text-gray-100 text-sm">
                                                        <span className="text-orange-400 mr-2">✔</span>{benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-gray-300 text-xs">Tiempo: <strong>{service.deliveryTime}</strong></span>
                                            <button className="border border-orange-400 text-orange-400 px-4 py-2 rounded hover:bg-orange-100 hover:text-orange-700 transition-all text-xs font-semibold">Solicitar Cotización <span className="ml-1">→</span></button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Servicios;
