import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import { getAllProjects } from "../services/projectService";
import ReadmeModal from "./modals/ReadmeModal";

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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      console.log("📊 Proyectos cargados desde Firebase:", data);
      console.log("📊 Cantidad de proyectos:", data.length);

      // Mostrar SOLO proyectos de Firebase
      console.log("✅ Mostrando solo proyectos de Firebase");
      setProjects(data);
    } catch (error) {
      console.error("❌ Error al cargar proyectos:", error);
      setError(error);
      // En caso de error, mostrar array vacío
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const [selectedReadme, setSelectedReadme] = useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReadme = (url, projectTitle) => {
    setSelectedReadme(url);
    setSelectedProjectTitle(projectTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReadme(null);
    setSelectedProjectTitle("");
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`md:min-h-screen min-h-screen py-16 ${gradientClass} text-white flex items-center justify-center`}
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <h1 id={`${id}-title`} className="text-gradient text-4xl md:text-5xl mb-12 font-bold text-center">
          {title}
        </h1>

        {error && (
          <div className="text-red-400 bg-red-900/20 border border-red-400/30 rounded-lg p-4 mt-2 mb-6 text-center">
            <p className="text-lg font-medium">Error al cargar proyectos</p>
            <p className="text-sm text-red-300 mt-1">Mostrando proyectos de respaldo</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="relative">
              <svg className="animate-spin h-14 w-14 text-[#E68369]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <div className="absolute inset-0 blur-xl bg-[#E68369]/20 animate-pulse"></div>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <svg className="w-24 h-24 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-400 text-xl font-medium">No hay proyectos disponibles</p>
            <p className="text-gray-500 mt-2 text-sm">Los proyectos aparecerán aquí cuando los agregues desde el panel de administración</p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {children ||
              projects.map((p, index) => (
                <motion.div
                  key={p.id || p.title || index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ProjectCard {...p} onOpenReadme={handleOpenReadme} />
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      <ReadmeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        readmeUrl={selectedReadme}
        projectTitle={selectedProjectTitle}
      />
    </section>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink, technologies, status, readmeUrl, onOpenReadme }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl h-full flex flex-col overflow-hidden shadow-lg transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#E68369]/20 via-transparent to-[#131842]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

      {/* Border glow */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{
          background: 'linear-gradient(145deg, rgba(230, 131, 105, 0.3), transparent, rgba(19, 24, 66, 0.3))',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl h-[200px] bg-gradient-to-br from-[#131842] to-[#1a2050]">
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay gradient on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131842]/80 via-[#131842]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Floating badge on hover */}
        <motion.div
          className="absolute top-3 right-3 flex flex-col gap-2 items-end"
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.3 }}
        >
          {status && (
            <div className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${status === 'Producción' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
              {status}
            </div>
          )}
          <div className="bg-[#E68369] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            Ver más
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#E68369] transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-300 leading-relaxed text-sm mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Technologies badges */}
        {(() => {
          const techArray = Array.isArray(technologies)
            ? technologies
            : (typeof technologies === 'string' ? technologies.split(',').map(t => t.trim()).filter(t => t !== "") : []);

          if (techArray.length === 0) return null;

          return (
            <div className="flex flex-wrap gap-2 mb-4">
              {techArray.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#131842]/60 border border-[#E68369]/30 text-[#E68369] backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
              {techArray.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-[#131842]/40 border border-white/20 text-gray-400">
                  +{techArray.length - 3}
                </span>
              )}
            </div>
          );
        })()}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${previewLink ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 text-white border-2 border-white/20 rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 hover:border-[#E68369] hover:text-[#E68369] hover:bg-[#E68369]/5 group/btn`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>Código</span>
            </motion.a>
          )}

          {previewLink && (
            <motion.a
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${githubLink ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#E68369] to-[#d67359] rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#E68369]/30 group/btn relative overflow-hidden`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="relative z-10">Ver Demo</span>
            </motion.a>
          )}

          {readmeUrl && (
            <motion.button
              onClick={() => onOpenReadme(readmeUrl, title)}
              className="flex-none flex items-center justify-center gap-2 text-white border-2 border-white/20 rounded-lg px-3 py-2.5 font-medium text-sm transition-all duration-300 hover:border-[#E68369] hover:text-[#E68369] hover:bg-[#E68369]/5 group/btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              title="Ver Documentación"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Projects;
