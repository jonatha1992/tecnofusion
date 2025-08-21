import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(255, 126, 95, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };
  return (
    <motion.div 
      id="home" 
      className="bg-ellipsis-gradient-center text-white flex flex-col items-center justify-around h-[100vh] md:h-[70vh] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="container relative z-10">
        <Slider {...settings}>
          <motion.div 
            className="flex flex-col justify-center items-center h-full py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`slide-${currentSlide}`}
          >
            <motion.div variants={itemVariants}>
              <TypewriterEffect 
                text="Bienvenido a "
                className="text-4xl md:text-6xl font-bold mb-4"
              />
              <motion.span 
                className="text-gradient text-4xl md:text-6xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                Tecnofusión.IT
              </motion.span>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-2xl leading-normal text-center max-w-3xl mt-6"
              variants={itemVariants}
            >
              Desarrollamos experiencias digitales innovadoras que transforman ideas en realidad
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-12"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white py-4 px-8 rounded-full font-semibold shadow-lg backdrop-blur-sm"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('Contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                ✨ Contáctanos
              </motion.button>
              <motion.button 
                className="border border-white/30 text-white py-4 px-8 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                variants={buttonVariants}
                whileHover={{ 
                  ...buttonVariants.hover, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 126, 95, 0.5)"
                }}
                whileTap="tap"
                onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 Ver Proyectos
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex flex-col justify-center items-center h-full py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`slide-${currentSlide}-2`}
          >
            <motion.div variants={itemVariants} className="text-center">
              <TypewriterEffect 
                text="Innovación & "
                className="text-4xl md:text-6xl font-bold mb-4"
                delay={0.5}
              />
              <motion.span 
                className="text-gradient text-4xl md:text-6xl font-bold"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
              >
                Tecnología
              </motion.span>
            </motion.div>
            
            <motion.p 
              className="text-lg md:text-2xl leading-normal text-center max-w-3xl mt-6"
              variants={itemVariants}
            >
              Creamos soluciones digitales que impulsan el crecimiento de tu negocio
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-12"
              variants={itemVariants}
            >
              <motion.button 
                className="bg-gradient-to-r from-[#feb47b] to-[#ff7e5f] text-white py-4 px-8 rounded-full font-semibold shadow-lg backdrop-blur-sm"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('Servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                💼 Nuestros Servicios
              </motion.button>
              <motion.button 
                className="border border-white/30 text-white py-4 px-8 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                variants={buttonVariants}
                whileHover={{ 
                  ...buttonVariants.hover, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(254, 180, 123, 0.5)"
                }}
                whileTap="tap"
                onClick={() => document.getElementById('Nosotros')?.scrollIntoView({ behavior: 'smooth' })}
              >
                👥 Conoce al Equipo
              </motion.button>
            </motion.div>
          </motion.div>
        </Slider>
      </div>
    </motion.div>
  );
}

// Componente de efecto de máquina de escribir
function TypewriterEffect({ text, className, delay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100 + delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);
  
  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-8 md:h-12 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
}

export default Hero;
