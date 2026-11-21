import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReadmeModal({ isOpen, onClose, readmeUrl, projectTitle }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && readmeUrl) {
            setLoading(true);
            setError('');
            const fetchReadme = async () => {
                try {
                    try {
                        const res = await fetch(readmeUrl);
                        if (res.ok) {
                            const text = await res.text();
                            setContent(text);
                            return;
                        }
                    } catch (err) {
                        console.warn("Fallo fetch directo, intentando proxy...", err);
                    }
                    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(readmeUrl)}`;
                    const proxyRes = await fetch(proxyUrl);
                    if (!proxyRes.ok) throw new Error("No se pudo cargar el archivo");
                    const proxyText = await proxyRes.text();
                    setContent(proxyText);
                } catch (err) {
                    console.error(err);
                    setError("No se pudo cargar el README. Verifica permisos o CORS.");
                } finally {
                    setLoading(false);
                }
            };
            fetchReadme();
        } else {
            setContent('');
        }
    }, [isOpen, readmeUrl]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1C1C]/75" onClick={onClose}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-[#F2EFE9] text-[#1C1C1C] border border-[#1C1C1C]/20 w-full max-w-4xl max-h-[85vh] rounded-[6px] flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-[#DFDCD2] border-b border-[#1C1C1C]/15 text-[#1C1C1C]">
                        <h2 className="text-xl font-semibold truncate">{projectTitle} - README</h2>
                        <button onClick={onClose} aria-label="Cerrar" className="p-1 text-[#1C1C1C] hover:bg-[#F2EFE9] transition-colors rounded-[6px]">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 bg-[#FFFFFF] text-[#1C1C1C]">
                        {loading ? <div className="flex flex-col items-center justify-center h-40 gap-3"><div className="w-8 h-8 border-4 border-[#1C1C1C] border-t-transparent rounded-full animate-spin" /><p className="text-[#45433E] text-sm">Cargando documentación...</p></div> : error ? <div className="flex flex-col items-center justify-center h-40 text-[#D95D39] gap-2"><p>{error}</p></div> : <article className="prose prose-sm md:prose-base max-w-none text-[#1C1C1C] prose-headings:text-[#1C1C1C] prose-a:text-[#45433E] prose-code:text-[#1C1C1C] prose-pre:bg-[#F2EFE9] prose-pre:border prose-pre:border-[#1C1C1C]/15 prose-blockquote:border-l-[#1C1C1C] prose-img:rounded-[6px]"><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></article>}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
