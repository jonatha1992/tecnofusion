import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getAllProjects } from "../services/projectService";

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

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Proyectos de respaldo (fallback) si no hay conexión a Firestore o no hay proyectos
  const fallbackProjects = [
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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      // Si hay proyectos en Firestore, usarlos; si no, usar fallback
      setProjects(data.length > 0 ? data : fallbackProjects);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      setError(error);
      // En caso de error, usar proyectos de respaldo
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`md:min-h-screen min-h-screen py-8 ${gradientClass} text-white flex items-center justify-center`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 id={`${id}-title`} className="text-gradient text-4xl md:text-5xl mb-6 font-bold">{title}</h1>

        {error && (
          <div className="text-red-500 mt-2 mb-2 text-lg">
            Error al cargar proyectos. Mostrando proyectos de respaldo.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <svg className="animate-spin h-12 w-12 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          >
            {children ||
              projects.map((p) => (
                <motion.div
                  key={p.id || p.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <ProjectCard {...p} />
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 rounded-xl h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-pink-400">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="rounded-t-xl object-cover w-full h-[180px]"
      />
      <div className="flex-1 p-4">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-white text-opacity-80 leading-relaxed">{description}</p>
      </div>
      <div className="flex gap-2 p-4 pt-0">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white border border-white border-opacity-30 rounded-lg px-4 py-2 transition-colors hover:text-pink-400 hover:border-pink-400 hover:bg-pink-100 hover:bg-opacity-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          Código
        </a>
        <a
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white bg-pink-400 rounded-lg px-4 py-2 ml-1 transition-transform hover:bg-pink-500 hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15l3.75-3.75m0 0L12 7.5m3.75 3.75H8.25" />
          </svg>
          Ver Demo
        </a>
      </div>
    </div>
  );
}

export default Projects;
