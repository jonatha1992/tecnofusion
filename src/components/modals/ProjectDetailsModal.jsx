import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getTechIcon } from '../../utils/techIcons';
import { normalizeTechList } from '../../data/techCatalog';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProjectDetailsModal({ isOpen, onClose, project, onOpenReadme }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            setImageLoaded(false);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, project]);

    if (!isOpen || !project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#1C1C1C]/75" onClick={onClose}>
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[#F2EFE9] text-[#1C1C1C] border border-[#1C1C1C]/20 w-full max-w-5xl max-h-[85vh] rounded-[6px] overflow-hidden flex flex-col md:flex-row relative">
                    <button onClick={onClose} aria-label="Cerrar" className="absolute top-4 right-4 z-20 p-2 bg-[#DFDCD2] hover:bg-[#1C1C1C] hover:text-[#F2EFE9] text-[#1C1C1C] rounded-[6px] transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="w-full md:w-1/2 h-48 md:h-auto relative bg-[#DFDCD2]">
                        {!imageLoaded && <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#DFDCD2]"><LoadingSpinner /></div>}
                        <img src={project.image} alt={project.title} onLoad={() => setImageLoaded(true)} className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col h-full bg-[#F2EFE9] text-[#1C1C1C]">
                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            <div className="flex flex-col gap-5">
                                <div className="pr-8">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-tight">{project.title}</h2>
                                        {project.status && <span className="px-2.5 py-1 rounded-[6px] text-xs font-medium bg-[#DFDCD2]">{project.status}</span>}
                                    </div>
                                    {project.technologies && <div className="flex flex-wrap gap-2 mt-3">{normalizeTechList(project.technologies).map((tech, idx) => {
                                        const techName = typeof tech === 'string' ? tech.trim() : tech;
                                        if (!techName) return null;
                                        return <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DFDCD2] border border-[#1C1C1C]/15 text-[#1C1C1C] rounded-[6px] text-xs font-medium"><span className="text-lg">{getTechIcon(techName)}</span>{techName}</span>;
                                    })}</div>}
                                </div>
                                <div className="text-[#45433E] leading-relaxed"><p className="whitespace-pre-line">{project.description}</p></div>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 bg-[#DFDCD2] border-t border-[#1C1C1C]/15">
                            <div className="flex flex-wrap gap-3">
                                {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 basis-0 text-center bg-[#F2EFE9] border border-[#1C1C1C]/20 hover:border-[#1C1C1C] text-[#1C1C1C] rounded-[6px] px-4 py-2.5 text-sm">Código</a>}
                                {project.previewLink && <a href={project.previewLink} target="_blank" rel="noopener noreferrer" className="flex-1 basis-0 text-center bg-[#1C1C1C] text-[#F2EFE9] hover:bg-[#333333] rounded-[6px] px-4 py-2.5 text-sm">Demo</a>}
                                {project.readmeUrl && <button onClick={() => onOpenReadme(project.readmeUrl, project.title)} className="flex-1 basis-0 bg-[#F2EFE9] border border-[#1C1C1C]/20 hover:border-[#1C1C1C] text-[#1C1C1C] rounded-[6px] px-4 py-2.5 text-sm">Docs</button>}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
