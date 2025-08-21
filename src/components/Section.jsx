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
    <motion.div
      ref={ref}
      id={id}
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
                variant="h1"
                sx={{ fontSize: "4rem", textTransform: "capitalize" }}
                className="text-gradient mb-6"
              >
                {title}
              </Typography>
              <Typography variant="h4" className="mb-6 text-white">
                Este es nuestro equipo de trabajo!
              </Typography>
              <Typography variant="body1" className="text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed">
                Somos un equipo profesional con un analista de sistemas, un
                ingeniero en sistemas informáticos y amplia experiencia en
                desarrollo web, consultoría IT y sistemas de CCTV y
                control de acceso.
              </Typography>
            </motion.div>
            
            {/* Team Grid */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {/* Jonathan Card */}
              <motion.div 
                className="glass-card-dark p-8 rounded-2xl border border-white/10 hover:border-[#ff7e5f]/50 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(255, 126, 95, 0.2)"
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.img
                    src={foto_joni}
                    alt="Foto de Jonathan Correa"
                    className="w-20 h-20 rounded-full ring-4 ring-[#ff7e5f] shadow-lg mr-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <Typography variant="h5" className="text-white font-bold mb-2">
                      Jonathan Correa
                    </Typography>
                    <Typography variant="body1" className="text-[#ff7e5f] font-semibold">
                      Analista Programador
                    </Typography>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">JavaScript, TypeScript, React</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Tailwind, Material UI, Bootstrap</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">PostgreSQL, Firestore, SQL Server</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Node.js Express</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">C#, ASP.NET Core</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Python, R</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button 
                    className="flex items-center bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex-1 justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://github.com/jonatha1992', '_blank')}
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </motion.button>
                  <motion.button 
                    className="flex items-center glass-card text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold flex-1 justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye className="mr-2" />
                    Portfolio
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Franco Card */}
              <motion.div 
                className="glass-card-dark p-8 rounded-2xl border border-white/10 hover:border-[#feb47b]/50 transition-all duration-300"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(254, 180, 123, 0.2)"
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.img
                    src={franco}
                    alt="Foto de Franco More"
                    className="w-20 h-20 rounded-full ring-4 ring-[#feb47b] shadow-lg mr-6"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <Typography variant="h5" className="text-white font-bold mb-2">
                      Franco More
                    </Typography>
                    <Typography variant="body1" className="text-[#feb47b] font-semibold">
                      Full Stack Developer
                    </Typography>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">HTML, CSS, JavaScript</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">React, Next.js</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Tailwind, Material UI</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Node.js, Express</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Google Cloud Services</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">OpenAI, AI Integration</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Stripe, PayPal, MercadoPago</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">Firebase, Firestore</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <motion.button 
                    className="flex items-center bg-gradient-to-r from-[#feb47b] to-[#ff7e5f] text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold flex-1 justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://github.com/ctrl1758', '_blank')}
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </motion.button>
                  <motion.button 
                    className="flex items-center glass-card text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 font-semibold flex-1 justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye className="mr-2" />
                    Portfolio
                  </motion.button>
                </div>
              </motion.div>
            </div>
            
            {/* Team Illustration */}
            <motion.div 
              className="text-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            >
              <div className="max-w-lg mx-auto">
                <img
                  src={svg1}
                  alt="Ilustración representando al equipo de trabajo"
                  className="w-full h-auto opacity-40 hover:opacity-60 transition-opacity duration-300 float-animation"
                />
              </div>
            </motion.div>
          </div>
        ) : null}
      </Container>
    </motion.div>
  );
}

export default Section;