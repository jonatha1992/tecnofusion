import { Typography, Container } from "@mui/material";
import { CheckIcon } from "@heroicons/react/outline";
import { FaGithub, FaEye } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import franco from "../assets/franco.jpg";
import foto_joni from "../assets/joni.jpg";
import svg1 from "../assets/imgsection2.svg";

function Section({ title, id, gradientClass }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };
  
  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 80, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        bounce: 0.3
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`min-h-screen py-20 ${gradientClass} text-white flex items-center justify-center`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Container>
        {id === "Nosotros" ? (
          <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div className="text-center mb-16" variants={titleVariants}>
              <Typography
                id={`${id}-title`}
                variant="h1"
                sx={{ fontSize: "4rem", textTransform: "capitalize" }}
                className="text-gradient mb-6"
              >
                {title}
              </Typography>
              <Typography variant="h4" className="mb-6 text-white">
                Este es nuestro equipo de trabajo!
              </Typography>
              <Typography variant="body1" className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed mb-8">
                Somos un equipo profesional especializado en soluciones tecnológicas integrales
                para impulsar el crecimiento de tu negocio.
              </Typography>
              
              {/* Services Overview */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <Typography variant="h6" className="text-white font-bold mb-2">
                    Desarrollo Web
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Apps web modernas con React, Node.js y bases de datos escalables
                  </Typography>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <Typography variant="h6" className="text-white font-bold mb-2">
                    Consultoría IT
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Asesoramiento experto en tecnología y optimización de procesos
                  </Typography>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <Typography variant="h6" className="text-white font-bold mb-2">
                    Seguridad CCTV
                  </Typography>
                  <Typography variant="body2" className="text-gray-300">
                    Sistemas de videovigilancia y control de acceso profesional
                  </Typography>
                </div>
              </div>
            </motion.div>
            
            {/* What We Do Section */}
            <motion.div 
              className="text-center mt-16"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Typography variant="h4" className="text-white font-bold mb-8">
                ¿Qué hacemos?
              </Typography>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-3">💻</div>
                  <Typography variant="h6" className="text-white font-semibold mb-2">
                    Desarrollo Web
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Sitios web modernos y aplicaciones escalables
                  </Typography>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-3">🤖</div>
                  <Typography variant="h6" className="text-white font-semibold mb-2">
                    Automatización
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    ChatBots y sistemas automáticos para empresas
                  </Typography>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-3">📊</div>
                  <Typography variant="h6" className="text-white font-semibold mb-2">
                    Consultoría IT
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    Análisis y optimización de procesos tecnológicos
                  </Typography>
                </div>
                
                <div className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-3">🛡️</div>
                  <Typography variant="h6" className="text-white font-semibold mb-2">
                    Seguridad
                  </Typography>
                  <Typography variant="body2" className="text-gray-400">
                    CCTV y sistemas de control de acceso
                  </Typography>
                </div>
              </div>
              
              {/* Team Illustration - Smaller and subtle */}
              <div className="mt-12 max-w-md mx-auto">
                <img
                  src={svg1}
                  alt="Ilustración del equipo trabajando"
                  className="w-full h-auto opacity-20 hover:opacity-30 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          </div>
        ) : null}
      </Container>
    </motion.section>
  );
}

export default Section;