import { useState, useRef } from "react";
import { Typography, Container, Grid, Box, Card, CardContent, Chip, Button } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import BuildIcon from "@mui/icons-material/Build";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, useInView } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function Servicios({ title, id, gradientClass }) {
    const [activeService, setActiveService] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const services = [
        {
            icon: <CodeIcon fontSize="large" />,
            title: "Desarrollo Web Profesional",
            shortDescription: "Sitios web modernos, rápidos y escalables que impulsan tu negocio.",
            fullDescription: "Desarrollamos sitios web y aplicaciones web de alto rendimiento utilizando tecnologías de vanguardia. Nuestro enfoque se centra en la velocidad, SEO, y experiencia de usuario excepcional.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
            icon: <BrushIcon fontSize="large" />,
            title: "Diseño UI/UX Premium",
            shortDescription: "Diseños que convierten visitantes en clientes y mejoran la experiencia.",
            fullDescription: "Creamos experiencias digitales memorables a través de investigación de usuarios, arquitectura de información y diseño visual impactante que se alinea con los objetivos de tu negocio.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
            icon: <PhoneAndroidIcon fontSize="large" />,
            title: "Apps Móviles Nativas",
            shortDescription: "Aplicaciones móviles potentes para iOS y Android con rendimiento nativo.",
            fullDescription: "Desarrollamos apps móviles que destacan en las tiendas de aplicaciones. Desde MVP hasta aplicaciones empresariales complejas, garantizamos calidad, rendimiento y experiencia de usuario superior.",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "AWS Amplify"],
            benefits: [
                "Desarrollo multiplataforma eficiente",
                "Integración con servicios nativos",
                "Push notifications y analytics",
                "Publicación en App Store y Google Play"
            ],
            deliveryTime: "6-12 semanas"
        },
        {
            icon: <BusinessCenterIcon fontSize="large" />,
            title: "Consultoría Tecnológica",
            shortDescription: "Estrategia digital y arquitectura tecnológica para escalar tu negocio.",
            fullDescription: "Analizamos tus procesos actuales y diseñamos soluciones tecnológicas personalizadas que mejoran la eficiencia, reducen costos y aceleran el crecimiento de tu empresa.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            technologies: ["Cloud Architecture", "DevOps", "Microservicios", "APIs", "Database Design", "Security"],
            benefits: [
                "Auditoría tecnológica completa",
                "Roadmap de transformación digital",
                "Optimización de procesos",
                "Reducción de costos operativos"
            ],
            deliveryTime: "2-4 semanas"
        },
        {
            icon: <CameraOutdoorIcon fontSize="large" />,
            title: "Sistemas de Videovigilancia",
            shortDescription: "Soluciones completas de seguridad con tecnología IP de última generación.",
            fullDescription: "Implementamos sistemas de videovigilancia profesionales con cámaras IP 4K, almacenamiento en la nube, acceso remoto y análisis inteligente para máxima seguridad.",
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            technologies: ["Cámaras IP 4K", "NVR", "Cloud Storage", "AI Analytics", "Mobile Apps", "Access Control"],
            benefits: [
                "Monitoreo 24/7 desde cualquier lugar",
                "Grabación en alta definición",
                "Detección inteligente de movimiento",
                "Integración con sistemas de alarma"
            ],
            deliveryTime: "1-2 semanas"
        },
        {
            icon: <BuildIcon fontSize="large" />,
            title: "Soporte Técnico Premium",
            shortDescription: "Mantenimiento proactivo y soporte 24/7 para tus sistemas críticos.",
            fullDescription: "Garantizamos el funcionamiento óptimo de tus sistemas con monitoreo continuo, actualizaciones de seguridad, backups automáticos y soporte técnico especializado.",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            technologies: ["Monitoring Tools", "Backup Systems", "Security Updates", "Performance Optimization", "Help Desk", "Remote Support"],
            benefits: [
                "Monitoreo proactivo 24/7",
                "Respuesta rápida ante incidencias",
                "Backups automáticos diarios",
                "Actualizaciones de seguridad"
            ],
            deliveryTime: "Inmediato"
        },
    ];

    return (
        <section id={id} aria-labelledby={`${id}-title`} className={`min-h-[100vh] ${gradientClass} text-white py-20 animate-fade-in`}>
            <Container maxWidth="xl">
                <Box textAlign="center" mb={8}>
                    <Typography id={`${id}-title`} variant="h1" sx={{ fontSize: "4rem", mb: 3 }} className="text-gradient">
                        {title}
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: "800px", mx: "auto", mb: 4 }}>
                        Soluciones tecnológicas innovadoras que transforman ideas en realidad digital.
                        Desde desarrollo web hasta sistemas de seguridad, cubrimos todas sus necesidades técnicas.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <motion.div
                            ref={ref}
                            variants={containerVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                        >
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                >
                                    <Card
                                        sx={{
                                            mb: 2,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            backgroundColor: activeService === index ? "rgba(230, 131, 105, 0.15)" : "rgba(255,255,255,0.05)",
                                            borderLeft: activeService === index ? "4px solid #E68369" : "4px solid transparent",
                                            "&:hover": {
                                                backgroundColor: "rgba(230, 131, 105, 0.15)",
                                                borderLeft: "4px solid #E68369",
                                                transform: "translateX(4px)",
                                            },
                                        }}
                                        onMouseEnter={() => setActiveService(index)}
                                        onMouseLeave={() => setActiveService(null)}
                                    >
                                        <CardContent sx={{ display: "flex", alignItems: "center", py: 2 }}>
                                            <Box sx={{ marginRight: 3, color: "#E68369", minWidth: "60px" }}>
                                                {service.icon}
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 0.5 }}>
                                                    {service.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>
                                                    {service.shortDescription}
                                                </Typography>
                                            </Box>
                                            <ArrowForwardIcon sx={{ color: "#E68369", opacity: activeService === index ? 1 : 0.5 }} />
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box sx={{ height: "100%", pl: { md: 4 } }}>
                            {activeService !== null ? (
                                <motion.div
                                    key={activeService}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card sx={{
                                        backgroundColor: "rgba(255,255,255,0.08)",
                                        height: "100%",
                                        minHeight: "500px",
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <CardContent sx={{ flex: 1, p: 4 }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                                <Box sx={{ color: "#E68369", mr: 2 }}>
                                                    {services[activeService].icon}
                                                </Box>
                                                <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
                                                    {services[activeService].title}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ mb: 3, borderRadius: 2, overflow: "hidden", position: "relative" }}>
                                                <img
                                                    src={services[activeService].image}
                                                    alt={services[activeService].title}
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                        borderRadius: "8px"
                                                    }}
                                                />
                                                <Box sx={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: "linear-gradient(135deg, rgba(230, 131, 105, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                                                    borderRadius: "8px"
                                                }} />
                                            </Box>

                                            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 3, lineHeight: 1.7 }}>
                                                {services[activeService].fullDescription}
                                            </Typography>

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="h6" sx={{ color: "#E68369", mb: 2 }}>
                                                    Tecnologías utilizadas:
                                                </Typography>
                                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                                    {services[activeService].technologies.map((tech, techIndex) => (
                                                        <Chip
                                                            key={techIndex}
                                                            label={tech}
                                                            sx={{
                                                                backgroundColor: "rgba(230, 131, 105, 0.2)",
                                                                color: "white",
                                                                border: "1px solid rgba(230, 131, 105, 0.5)"
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="h6" sx={{ color: "#E68369", mb: 2 }}>
                                                    Beneficios clave:
                                                </Typography>
                                                {services[activeService].benefits.map((benefit, benefitIndex) => (
                                                    <Box key={benefitIndex} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                        <CheckCircleIcon sx={{ color: "#E68369", mr: 1, fontSize: "1.2rem" }} />
                                                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                                                            {benefit}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>

                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto", pt: 3 }}>
                                                <Box>
                                                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                                                        Tiempo de entrega: <strong>{services[activeService].deliveryTime}</strong>
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    endIcon={<ArrowForwardIcon />}
                                                    sx={{
                                                        borderColor: "#E68369",
                                                        color: "#E68369",
                                                        "&:hover": {
                                                            borderColor: "#E68369",
                                                            backgroundColor: "rgba(230, 131, 105, 0.1)"
                                                        }
                                                    }}
                                                >
                                                    Solicitar Cotización
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ) : (
                                <Card sx={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
                                    height: "100%",
                                    minHeight: "500px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <CardContent sx={{ textAlign: "center" }}>
                                        <Typography variant="h5" sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
                                            Selecciona un servicio
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                            Pasa el cursor sobre cualquier servicio de la izquierda para ver información detallada,
                                            tecnologías utilizadas, beneficios y tiempo de entrega.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default Servicios;
