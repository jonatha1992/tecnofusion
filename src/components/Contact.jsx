import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Typography, Container, Box, Button, Card, CardContent } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
        const phoneNumber = "5491159910666"; // Tu número de WhatsApp
        const message = "¡Hola! Me interesa conocer más sobre los servicios de Tecnofusión.IT";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id={id} aria-labelledby={`${id}-title`} className={`min-h-[100vh] ${gradientClass} text-white py-20 flex items-center justify-center`}>
            <Container maxWidth="lg">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center"
                >
                    <motion.div variants={itemVariants}>
                        <Typography id={`${id}-title`} variant="h1" sx={{ fontSize: "4rem", mb: 3 }} className="text-gradient">
                            {title}
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: "800px", mx: "auto", mb: 6 }}>
                            ¿Listo para transformar tu idea en realidad digital?
                            Contáctanos directamente por WhatsApp y comencemos tu proyecto hoy mismo.
                        </Typography>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-col items-center max-w-4xl mx-auto space-y-8">
                        {/* Botón principal de WhatsApp */}
                        <Card sx={{
                            backgroundColor: "rgba(37, 211, 102, 0.1)",
                            backdropFilter: "blur(10px)",
                            border: "2px solid rgba(37, 211, 102, 0.3)",
                            borderRadius: 4,
                            p: 4,
                            width: "100%",
                            maxWidth: "600px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: "rgba(37, 211, 102, 0.2)",
                                borderColor: "rgba(37, 211, 102, 0.6)",
                                transform: "translateY(-8px)",
                                boxShadow: "0 20px 40px rgba(37, 211, 102, 0.3)"
                            }
                        }}>
                            <CardContent sx={{ textAlign: "center" }}>
                                <WhatsAppIcon sx={{ fontSize: "4rem", color: "#25D366", mb: 2 }} />
                                <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", mb: 2 }}>
                                    Conversemos por WhatsApp
                                </Typography>
                                <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", mb: 4, lineHeight: 1.6 }}>
                                    Obtén respuesta inmediata a tus consultas. Nuestro equipo está disponible para
                                    asesorarte y crear la solución perfecta para tu negocio.
                                </Typography>
                                <Button
                                    onClick={handleWhatsAppClick}
                                    size="large"
                                    startIcon={<WhatsAppIcon />}
                                    sx={{
                                        backgroundColor: "#25D366",
                                        color: "white",
                                        px: 4,
                                        py: 2,
                                        fontSize: "1.2rem",
                                        fontWeight: "bold",
                                        borderRadius: 3,
                                        "&:hover": {
                                            backgroundColor: "#22c55e",
                                            transform: "scale(1.05)"
                                        }
                                    }}
                                >
                                    Iniciar Conversación
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Información de contacto adicional */}
                        <motion.div variants={itemVariants} className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
                            <Card sx={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                p: 3,
                                textAlign: "center",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(230, 131, 105, 0.1)",
                                    borderColor: "rgba(230, 131, 105, 0.3)"
                                }
                            }}>
                                <PhoneIcon sx={{ fontSize: "2.5rem", color: "#E68369", mb: 2 }} />
                                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                                    Teléfono
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                                    +54 9 11 5544-3322
                                </Typography>
                            </Card>

                            <Card sx={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                p: 3,
                                textAlign: "center",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(230, 131, 105, 0.1)",
                                    borderColor: "rgba(230, 131, 105, 0.3)"
                                }
                            }}>
                                <EmailIcon sx={{ fontSize: "2.5rem", color: "#E68369", mb: 2 }} />
                                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                                    Email
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                                    contacto@tecnofusion.dev
                                </Typography>
                            </Card>

                            <Card sx={{
                                backgroundColor: "rgba(255,255,255,0.05)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 3,
                                p: 3,
                                textAlign: "center",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "rgba(230, 131, 105, 0.1)",
                                    borderColor: "rgba(230, 131, 105, 0.3)"
                                }
                            }}>
                                <LocationOnIcon sx={{ fontSize: "2.5rem", color: "#E68369", mb: 2 }} />
                                <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", mb: 1 }}>
                                    Ubicación
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                                    Buenos Aires, Argentina
                                </Typography>
                            </Card>
                        </motion.div>

                        {/* Call to action adicional */}
                        <motion.div variants={itemVariants} className="text-center">
                            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
                                🚀 ¿Tienes un proyecto en mente?
                            </Typography>
                            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "600px", mx: "auto" }}>
                                No esperes más. Cada día que pasa sin digitalizar tu negocio es una oportunidad perdida.
                                Hablemos y hagamos realidad tu visión tecnológica.
                            </Typography>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}

export default Contact;
