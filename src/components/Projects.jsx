import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { getAllProjects } from "../services/projectService";

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
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No hay proyectos disponibles</p>
            <p className="text-gray-500 mt-2">Los proyectos aparecerán aquí cuando los agregues desde el panel de administración</p>
          </div>
        ) : (
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
          >
            {children ||
              projects.map((p, index) => (
                <motion.div
                  key={p.id || p.title || index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
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
        <p className="text-white text-opacity-80 leading-relaxed text-sm">{description}</p>
      </div>
      <div className="flex gap-3 p-4 pt-0">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center text-white border border-white border-opacity-30 rounded-lg px-4 py-2.5 transition-all hover:text-pink-400 hover:border-pink-400 hover:bg-pink-100 hover:bg-opacity-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.35-1.088.636-1.339-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.566 4.936.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.135 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            <span className="text-sm font-medium">Código</span>
          </a>
        )}
        <a
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${githubLink ? 'flex-1' : 'w-full'} flex items-center justify-center text-white bg-pink-400 rounded-lg px-4 py-2.5 transition-all hover:bg-pink-500 hover:scale-105 hover:shadow-lg`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium">Ver Demo</span>
        </a>
      </div>
    </div>
  );
}

export default Projects;
