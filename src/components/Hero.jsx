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
    arrows: false,
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
      scale: 1.02,
      boxShadow: "0px 8px 25px rgba(255, 126, 95, 0.3)",
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };
  // Configuración de las partículas del fondo
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <motion.section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-ellipsis-gradient-center text-white flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Partículas animadas de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(({ id, initialX, initialY, duration, delay }) => (
          <motion.span
            key={id}
            className="absolute h-2 w-2 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]"
            initial={{
              x: initialX,
              y: initialY,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="container relative z-10 mx-auto px-4 w-full">
        <Slider {...settings} className="w-full">
          <motion.div
            className="flex flex-col items-center justify-center min-h-[80vh] w-full py-12"
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
              className="hero-button-container mt-12"
              variants={itemVariants}
            >
              <motion.button
                className="hero-button hero-button-primary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('Contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="button-icon">✨</span>
                Contáctanos
              </motion.button>
              <motion.button
                className="hero-button hero-button-secondary"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="button-icon">🚀</span>
                Ver Proyectos
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
              className="hero-button-container mt-12"
              variants={itemVariants}
            >
              <motion.button
                className="hero-button hero-button-primary"
                style={{ minWidth: '220px' }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('Servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="button-icon">💼</span>
                Nuestros Servicios
              </motion.button>
              <motion.button
                className="hero-button hero-button-secondary"
                style={{ minWidth: '220px' }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => document.getElementById('Contacto')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="button-icon">📅</span>
                Agenda una consultoría
              </motion.button>
            </motion.div>
          </motion.div>
        </Slider>
      </div>
    </motion.section>
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
