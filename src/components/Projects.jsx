import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PreviewIcon from "@mui/icons-material/Preview";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import backSmart from "../assets/back-smart.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Projects({ title, id, children, gradientClass }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Plataforma E-Learning AESFRON",
      description: "Sistema completo de gestión de cursos online con pagos integrados, panel administrativo y certificaciones digitales.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/tecnofusion/aesfron-elearning",
      previewLink: "https://aesfron.tecnofusion.dev",
    },
    {
      title: "Sistema de Reservas WhatsApp Bot",
      description: "Bot inteligente con IA para automatización de turnos médicos, integrado con API oficial de META y sistema de gestión empresarial.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/tecnofusion/whatsapp-booking-bot",
      previewLink: "https://wa.me/5491155443322?text=Hola%2C%20quiero%20reservar%20un%20turno",
    },
    {
      title: "App de Delivery SmartMenu",
      description: "Aplicación web progresiva (PWA) para pedidos de comida con geolocalización, pagos online y tracking en tiempo real.",
      image: backSmart,
      githubLink: "https://github.com/tecnofusion/smartmenu-delivery",
      previewLink: "https://smartmenu.tecnofusion.dev",
    },
    {
      title: "Dashboard Empresarial BI",
      description: "Panel de control ejecutivo con métricas KPI en tiempo real, análisis predictivo y reportes automatizados para toma de decisiones.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/tecnofusion/executive-dashboard",
      previewLink: "https://dashboard.tecnofusion.dev",
    },
    {
      title: "Tienda Online Omnicanal",
      description: "E-commerce completo con inventario sincronizado, múltiples métodos de pago, CRM integrado y analytics avanzados.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/tecnofusion/omnichannel-store",
      previewLink: "https://store.tecnofusion.dev",
    },
    {
      title: "Predictor de Ruleta AI",
      description: "Sistema avanzado de predicción usando Deep Learning y Machine Learning para análisis de patrones en ruleta con redes neuronales y algoritmos de IA.",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      githubLink: "https://github.com/tecnofusion/roulette-ai-predictor",
      previewLink: "https://roulette-ai.tecnofusion.dev",
    },
  ];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`md:min-h-screen min-h-screen py-20 ${gradientClass} text-white flex items-center justify-center`}
    >
      <Container>
        <Typography
          id={`${id}-title`}
          variant="h1"
          sx={{ fontSize: "4rem", mb: 8 }}
          className="text-gradient"
        >
          {title}
        </Typography>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {children ||
            projects.map((p, i) => (
              <motion.div key={p.title} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }}>
                <ProjectCard {...p} />
              </motion.div>
            ))}
        </motion.div>
      </Container>
    </section>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "0 20px 40px rgba(230, 131, 105, 0.3)",
          borderColor: "rgba(230, 131, 105, 0.5)"
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        loading="lazy"
        sx={{
          borderRadius: "12px 12px 0 0",
          objectFit: "cover"
        }}
      />
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 2,
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button
          size="small"
          href={githubLink}
          startIcon={<GitHubIcon />}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 2,
            px: 2,
            "&:hover": {
              color: "#E68369",
              borderColor: "#E68369",
              backgroundColor: "rgba(230, 131, 105, 0.1)"
            }
          }}
        >
          Código
        </Button>
        <Button
          size="small"
          href={previewLink}
          startIcon={<PreviewIcon />}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "white",
            backgroundColor: "#E68369",
            borderRadius: 2,
            px: 2,
            ml: 1,
            "&:hover": {
              backgroundColor: "#d67456",
              transform: "scale(1.05)"
            }
          }}
        >
          Ver Demo
        </Button>
      </CardActions>
    </Card>
  );
}

export default Projects;
