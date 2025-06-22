import { useState } from "react";
import { Typography, Container, Grid, Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import BuildIcon from "@mui/icons-material/Build";

function Servicios({ title, id, gradientClass }) {
    const [activeService, setActiveService] = useState(null);

    const services = [
        {
            icon: <CodeIcon fontSize="large" />,
            title: "Desarrollo Web",
            description: "Creamos sitios web modernos y responsivos utilizando las últimas tecnologías.",
        },
        {
            icon: <BrushIcon fontSize="large" />,
            title: "Diseño UI/UX",
            description: "Diseñamos interfaces intuitivas y atractivas para mejorar la experiencia del usuario.",
        },
        {
            icon: <PhoneAndroidIcon fontSize="large" />,
            title: "Desarrollo de Aplicaciones Móviles",
            description: "Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android.",
        },
        {
            icon: <BusinessCenterIcon fontSize="large" />,
            title: "Consultoría IT",
            description: "Ofrecemos asesoramiento experto en tecnología para optimizar sus procesos de negocio.",
        },
        {
            icon: <CameraOutdoorIcon fontSize="large" />,
            title: "Instalación de Cámaras CCTV",
            description: "Implementamos sistemas de videovigilancia para proteger su hogar o negocio.",
        },
        {
            icon: <BuildIcon fontSize="large" />,
            title: "Mantenimiento y Soporte",
            description: "Proporcionamos soporte técnico continuo y mantenimiento para sus proyectos digitales.",
        },
    ];

    return (
        <div id={id} className={`min-h-[100vh] ${gradientClass} text-white flex items-center justify-center animate-fade-in`}>
            <Container>
                <Typography variant="h1" sx={{ fontSize: "4rem", mb: 8 }} className="text-gradient">
                    {title}
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        {services.map((service, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    borderLeft: "4px solid transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        borderLeft: "4px solid #E68369",
                                    },
                                }}
                                onMouseEnter={() => setActiveService(index)}
                                onMouseLeave={() => setActiveService(null)}
                            >
                                <Box sx={{ marginRight: 2, color: "#E68369" }}>{service.icon}</Box>
                                <Typography variant="h6">{service.title}</Typography>
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {activeService !== null ? (
                                <Typography variant="body1">{services[activeService].description}</Typography>
                            ) : (
                                <Typography variant="body1">Pase el cursor sobre un servicio para ver más detalles.</Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Servicios;
