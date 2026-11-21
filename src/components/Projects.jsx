import { useState, useEffect, useMemo } from "react";
import LoadingSpinner from "./common/LoadingSpinner";

import { getAllProjects } from "../services/projectService";
import ReadmeModal from "./modals/ReadmeModal";
import ProjectDetailsModal from "./modals/ProjectDetailsModal";
import { buildCategoryFilters, filterByCategory, normalizeTechList } from "../data/techCatalog";
const SPAN_CLASSES = ['md:col-span-7', 'md:col-span-5', 'md:col-span-4', 'md:col-span-4', 'md:col-span-4'];

const fallbackProjects = [
  { title: "PayAlert — SaaS Gestión de Flujo de Caja", description: "Plataforma SaaS para gestionar flujo de caja, alertas y operaciones financieras.", image: "/assets/projects/payalert-saas-gestion-de-flujo-de-caja.svg", status: "Producción", technologies: ["React", "Firebase", "SaaS"], githubLink: "https://github.com/jonatha1992/payalert" },
  { title: "Sentinel Compliance Engine — Corvux AML Dashboard", description: "Motor de compliance y dashboard AML para analizar operaciones y facilitar auditorías.", image: "/assets/projects/sentinel-compliance-engine-corvux-aml-dashboard.svg", status: "Producción", technologies: ["Python", "ML", "Compliance"], githubLink: "https://github.com/jonatha1992/dashboard_transacciones_universeales" },
  { title: "SpinPredictor — Análisis Estadístico & ML", description: "Análisis estadístico y modelos de machine learning aplicados a datos de roulette.", image: "/assets/projects/spin-predictor.svg", status: "Producción", technologies: ["Python", "Machine Learning", "Análisis de datos"], previewLink: "https://spinpredictor.site/", githubLink: "https://github.com/jonatha1992/spinpredictor2" },
  { title: "AudioText — Transcriptor y Traductor con IA", description: "Transcripción y traducción de audio mediante herramientas de inteligencia artificial.", image: "/assets/projects/audiotext-transcriptor-y-traductor-de-audio.svg", status: "Producción", technologies: ["IA", "Audio", "Python"], previewLink: "https://drive.google.com/drive/folders/1xQjfPNuMF6r0xZRcek96iU9X9TViqP21?usp=sharing", githubLink: "https://github.com/jonatha1992/Auditext" },
  { title: "Sistema de Gestión Financiera", description: "Sistema para organizar información financiera y apoyar el seguimiento operativo.", image: "/assets/projects/expenses-tracker.svg", status: "Producción", technologies: ["React", "Finanzas", "Firebase"] },
  { title: "Automatización de Reportes Operativos", description: "Automatización de reportes y consolidación de información para equipos operativos.", image: "/assets/projects/automatizacion-reportes.svg", status: "Producción", technologies: ["Python", "Automatización", "Datos"] },
];

function Projects({ title, id, children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const categories = useMemo(() => buildCategoryFilters(projects), [projects]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(Array.isArray(data) && data.length ? data : fallbackProjects);
    } catch (error) {
      console.error("Error al cargar proyectos; se muestra el catálogo local.", error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const [selectedReadme, setSelectedReadme] = useState(null);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpenReadme = (url, projectTitle) => {
    setSelectedReadme(url);
    setSelectedProjectTitle(projectTitle);
    setIsReadmeModalOpen(true);
  };

  const handleCloseReadmeModal = () => {
    setIsReadmeModalOpen(false);
    setSelectedReadme(null);
    setSelectedProjectTitle("");
  };

  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-[#F2EFE9] text-[#1C1C1C] py-14 px-4 md:px-6"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <h1 id={`${id}-title`} className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold tracking-[-0.04em] leading-[0.95] text-[#1C1C1C]">
          Sistemas y proyectos en producción
        </h1>
        <p className="mt-3 mb-6 text-sm text-[#45433E]">{title || "Sistemas y productos desarrollados para operar."}</p>
        <div role="group" aria-label="Filtrar proyectos por categoría" className="mb-8 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto border-b border-[#1C1C1C]/15 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 min-w-max">
            {[{ id: "todas", label: "Todas", count: projects.length }, ...categories].map((c) => {
              const active = selectedCategory === c.id;
              return (
                <button key={c.id} type="button" aria-pressed={active} onClick={() => setSelectedCategory(c.id)} className={`relative -mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1C1C] ${active ? "border-[#1C1C1C] text-[#1C1C1C]" : "border-transparent text-[#57554F] hover:text-[#1C1C1C]"}`}>
                  {c.featured && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#8FA68E]" />}
                  {c.label}
                  <span className="text-[#1C1C1C]/45">{String(c.count).padStart(2, "0")}</span>
                  {c.featured && <span className="sr-only"> (especialidad)</span>}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[320px]">
            <LoadingSpinner />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-[#DFDCD2] rounded-[6px] border border-[#1C1C1C]/15">
            <p className="text-[#1C1C1C] text-lg font-medium">No hay proyectos disponibles</p>
            <p className="text-[#57554F] mt-1 text-sm">Los proyectos aparecerán aquí cuando los agregues desde el panel de administración.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            {children ||
              filterByCategory(projects, selectedCategory).map((p, index) => (
                <div key={p.id || p.title || index} className={SPAN_CLASSES[index % SPAN_CLASSES.length]}>
                  <ProjectCard 
                    {...p} 
                    onOpenReadme={handleOpenReadme} 
                    onOpenDetails={() => handleOpenDetails(p)} 
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      <ReadmeModal
        isOpen={isReadmeModalOpen}
        onClose={handleCloseReadmeModal}
        readmeUrl={selectedReadme}
        projectTitle={selectedProjectTitle}
      />

      <ProjectDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetails}
        project={selectedProject}
        onOpenReadme={handleOpenReadme}
      />
    </section>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink, technologies, status, readmeUrl, onOpenReadme, onOpenDetails }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const techArray = normalizeTechList(technologies);
  return (
    <article onClick={onOpenDetails} className="group bg-[#FFFFFF] border border-[#1C1C1C]/15 rounded-[6px] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#1C1C1C] h-full cursor-pointer">
      <div className="relative overflow-hidden h-52 md:h-60 bg-[#DFDCD2]">
        {!imageLoaded && <div className="absolute inset-0 flex items-center justify-center bg-[#DFDCD2]"><LoadingSpinner /></div>}
        <img src={image} alt={title} loading="lazy" width="640" height="360" onLoad={() => setImageLoaded(true)} className="w-full h-full object-cover block" />
      </div>
      <div className="px-5 py-2.5 bg-[#DFDCD2] text-xs text-[#1C1C1C] flex items-center justify-between border-y border-[#1C1C1C]/12">
        <span className="inline-flex items-center gap-2"><span className={`w-2 h-2 rounded-full ${ (status || "Producción") === "Producción" ? "bg-[#8FA68E]" : "bg-[#D95D39]"}`} />{status || "Producción"}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#1C1C1C]/60">{techArray.length} tec.</span>
      </div>
      <div className="p-5 text-left flex-1 flex flex-col justify-between bg-[#FFFFFF]">
        <h3 className="text-xl font-semibold tracking-[-0.03em] leading-snug text-[#1C1C1C] mb-2">{title}</h3>
        <p className="text-sm text-[#45433E] leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>
        {techArray.length > 0 && <p className="mb-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-[#57554F]">{techArray.slice(0, 4).join(" · ")}{techArray.length > 4 && <span className="text-[#1C1C1C]/45"> · +{techArray.length - 4}</span>}</p>}
        <div className="flex flex-wrap gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          <button onClick={onOpenDetails} className="bg-[#DFDCD2] hover:bg-[#1C1C1C] hover:text-[#F2EFE9] text-[#1C1C1C] rounded-[6px] px-3.5 py-2 text-xs font-medium transition-colors">Ver ficha</button>
          {previewLink && <a href={previewLink} target="_blank" rel="noopener noreferrer" className="bg-[#1C1C1C] text-[#F2EFE9] hover:bg-[#333333] rounded-[6px] px-3.5 py-2 text-xs font-medium">Demo</a>}
          {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="bg-[#F2EFE9] border border-[#1C1C1C]/20 hover:border-[#1C1C1C] text-[#1C1C1C] rounded-[6px] px-3.5 py-2 text-xs font-medium">Código</a>}
          {readmeUrl && <button onClick={() => onOpenReadme(readmeUrl, title)} className="bg-[#F2EFE9] border border-[#1C1C1C]/20 hover:border-[#1C1C1C] text-[#1C1C1C] rounded-[6px] px-3.5 py-2 text-xs font-medium">Docs</button>}
        </div>
      </div>
    </article>
  );
}

export default Projects;
