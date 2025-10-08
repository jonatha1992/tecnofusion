import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import heroVideo from "../assets/video-hero.mp4";

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
      className="relative flex items-center w-full min-h-screen overflow-hidden text-white bg-ellipsis-gradient-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fondo animado CSS (se usa mientras no hay video) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Fondo animado con gradientes */}
        <div className="absolute inset-0 bg-moving-gradient"></div>

        {/* Video de fondo (se mostrará cuando esté disponible) */}
        <video
          className="absolute top-0 left-0 object-cover w-full h-full opacity-70"
          autoPlay
          muted
          loop
          playsInline
          style={{ display: 'block' }}
          onLoadedData={(e) => {
            console.log('Video cargado exitosamente');
            e.target.style.display = 'block';
            // Ocultar el fondo CSS cuando el video carga
            const gradientBg = e.target.parentElement.querySelector('.bg-moving-gradient');
            if (gradientBg) gradientBg.style.display = 'none';
          }}
          onError={(e) => {
            console.log('Video no encontrado, usando fondo animado CSS');
            e.target.style.display = 'none';
          }}
        >
          <source src={heroVideo} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>

        {/* Overlay sutil para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black bg-opacity-15"></div>

        {/* Gradiente adicional muy sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20"></div>
      </div>

      {/* Partículas animadas de fondo (opcional, ahora más sutiles) */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {particles.map(({ id, initialX, initialY, duration, delay }) => (
          <motion.span
            key={id}
            className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] opacity-60"
            initial={{
              x: initialX,
              y: initialY,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.4, 0]
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
      <div className="container relative z-20 w-full px-4 mx-auto">
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
                className="mb-4 text-4xl font-bold md:text-6xl"
              />
              <motion.span
                className="text-4xl font-bold text-gradient md:text-6xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
              >
                Tecnofusión.IT
              </motion.span>
            </motion.div>

            <motion.p
              className="max-w-3xl mt-6 text-lg leading-normal text-center md:text-2xl"
              variants={itemVariants}
            >
              Desarrollamos experiencias digitales innovadoras que transforman ideas en realidad
            </motion.p>

            <motion.div
              className="mt-12 hero-button-container"
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
            className="flex flex-col items-center justify-center h-full py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={`slide-${currentSlide}-2`}
          >
            <motion.div variants={itemVariants} className="text-center">
              <TypewriterEffect
                text="Innovación & "
                className="mb-4 text-4xl font-bold md:text-6xl"
                delay={0.5}
              />
              <motion.span
                className="text-4xl font-bold text-gradient md:text-6xl"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
              >
                Tecnología
              </motion.span>
            </motion.div>

            <motion.p
              className="max-w-3xl mt-6 text-lg leading-normal text-center md:text-2xl"
              variants={itemVariants}
            >
              Creamos soluciones digitales que impulsan el crecimiento de tu negocio
            </motion.p>

            <motion.div
              className="mt-12 hero-button-container"
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
