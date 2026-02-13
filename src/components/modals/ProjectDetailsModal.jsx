import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getTechIcon } from '../../utils/techIcons';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProjectDetailsModal({ isOpen, onClose, project, onOpenReadme }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            // Reset image loaded state when modal opens
            setImageLoaded(false);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, project]); // Added project dependency to reset on project change

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1a1f4b] border border-[#E68369]/20 w-full max-w-6xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
                >
                    {/* Close button - Absolute top right (visible in both layouts) */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all duration-300 group"
                    >
                        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Left Column: Image (Desktop) / Top Image (Mobile) */}
                    <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-[#131842]">
                        {!imageLoaded && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1f4b]">
                                <LoadingSpinner />
                            </div>
                        )}
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-90' : 'opacity-0'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f4b] via-transparent to-transparent md:bg-gradient-to-r"></div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full md:w-1/2 flex flex-col h-full bg-[#1a1f4b]">
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                            <div className="flex flex-col gap-5">
                                
                                {/* Header: Title & Status */}
                                <div className="pr-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white font-outfit leading-tight">
                                            {project.title}
                                        </h2>
                                        {project.status && (
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md h-fit ${
                                                project.status === 'Producción' 
                                                    ? 'bg-gradient-to-r from-green-600 to-green-500' 
                                                    : 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                                            } text-white`}>
                                                {project.status}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Technologies */}
                                    {project.technologies && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {(Array.isArray(project.technologies) 
                                                ? project.technologies 
                                                : (typeof project.technologies === 'string' ? project.technologies.split(',') : [])
                                            ).map((tech, idx) => {
                                                const techName = typeof tech === 'string' ? tech.trim() : tech;
                                                if(!techName) return null;
                                                return (
                                                    <span 
                                                        key={idx}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#131842] border border-[#E68369]/30 text-gray-200 hover:border-[#E68369] transition-colors"
                                                    >
                                                        <span className="text-lg">{getTechIcon(techName)}</span>
                                                        {techName}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300 leading-relaxed">
                                    <p className="whitespace-pre-line">{project.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer: Action Buttons */}
                        <div className="p-6 md:p-8 border-t border-white/10 bg-[#161b40]">
                            <div className="flex gap-3">
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 basis-0 w-0 flex items-center justify-center gap-2 text-white border border-white/20 hover:border-[#E68369] bg-white/5 hover:bg-[#E68369]/10 rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 group whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[#E68369] transition-colors flex-shrink-0">
                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                        </svg>
                                        <span className="truncate">Código</span>
                                    </a>
                                )}
                                
                                {project.previewLink && (
                                    <a
                                        href={project.previewLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 basis-0 w-0 flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#E68369] to-[#d67359] hover:shadow-lg hover:shadow-[#E68369]/30 rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                        <span className="truncate">Demo</span>
                                    </a>
                                )}
                                {project.readmeUrl && (
                                    <button
                                        onClick={() => onOpenReadme(project.readmeUrl, project.title)}
                                        className="flex-1 basis-0 w-0 flex items-center justify-center gap-2 text-white border border-white/20 hover:border-[#E68369] bg-white/5 hover:bg-[#E68369]/10 rounded-lg px-4 py-2.5 font-medium text-sm transition-all duration-300 group whitespace-nowrap"
                                        title="Ver Documentación"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={2} 
                                            stroke="currentColor" 
                                            className="w-5 h-5 group-hover:text-[#E68369] transition-colors flex-shrink-0"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <span className="truncate">Docs</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
