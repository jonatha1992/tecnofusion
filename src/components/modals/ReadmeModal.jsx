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
                    // Intento 1: Fetch directo (puede fallar por CORS)
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

                    // Intento 2: Fetch a través de proxy (allorigins) para evitar CORS
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
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#1a1f4b] border border-[#E68369]/20 w-full max-w-4xl max-h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#131842]">
                        <h2 className="text-xl font-bold text-white truncate flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#E68369]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {projectTitle} - README
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#0f1235]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-40 gap-3">
                                <div className="w-8 h-8 border-4 border-[#E68369] border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-400 text-sm">Cargando documentación...</p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-40 text-red-400 gap-2">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <article className="prose prose-invert prose-sm md:prose-base max-w-none 
                prose-headings:text-white prose-a:text-[#E68369] prose-a:no-underline hover:prose-a:underline
                prose-code:text-[#E68369] prose-pre:bg-[#1a1f4b] prose-pre:border prose-pre:border-white/10
                prose-blockquote:border-l-[#E68369] prose-img:rounded-lg"
                            >
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content}
                                </ReactMarkdown>
                            </article>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
