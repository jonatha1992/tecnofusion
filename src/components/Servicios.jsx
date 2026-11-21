function Servicios({ id }) {
  const sectionId = id || "servicios";
  const capabilities = [
    ["01", "Ingeniería Full-Stack & Sistemas Distribuidos.", "Arquitecturas distribuidas, aplicaciones web y plataformas multi-tenant en React, TypeScript, Node.js y Python con contratos tipados, colas, resiliencia y pruebas automatizadas."],
    ["02", "Sistemas con IA aplicada.", "Agentes con herramientas, pipelines RAG, transcripción, clasificación y flujos autónomos conectados a datos y operaciones reales."],
    ["03", "Productos SaaS propios.", "Diseño y construcción de punta a punta: autenticación, facturación, paneles de control, auditoría y despliegue continuo."],
    ["04", "Datos, ML y automatización.", "Modelos predictivos, motores de compliance/AML, integraciones API/webhooks, scrapers resilientes y tableros operativos."]
  ];
  const rows = [
    ["Plataformas Web & Productos SaaS", "React · TypeScript · Next.js · FastAPI · Node.js · PostgreSQL · Firebase"],
    ["Agentes de IA, LLMs & Automatización Operativa", "OpenAI · Anthropic · Gemini · Python · Orquestación · Webhooks"],
    ["Motores de Datos, Scoring & Modelos Predictivos", "Python · Scikit-learn · SQL · Pipelines ETL · Dashboards AML/Compliance"],
    ["Sistemas Distribuidos, Cloud & Modernización", "Arquitectura distribuida · Colas & Workers · Docker · Linux · CI/CD · Migraciones SQL · Auditoría de rendimiento"]
  ];
  return <section id={sectionId} aria-labelledby={`${sectionId}-title`} className="bg-[#F2EFE9] text-[#1C1C1C] py-16 px-4 md:px-6 border-t border-[#1C1C1C]/12"><div className="max-w-[1400px] mx-auto">
    <p className="text-sm">Capacidades de ingeniería · Arquitectura y producto</p>
    <h2 id={`${sectionId}-title`} className="text-[clamp(2rem,3.6vw,3.3rem)] font-semibold tracking-[-0.04em] leading-[0.95] text-[#1C1C1C] max-w-4xl mt-2">Arquitectura pensada para operar en producción, no solo para mostrarse en una demo.</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-[#1C1C1C]/15 text-left">{capabilities.map(([n,title,text])=><div key={n}><p className="text-sm mb-3">{n}</p><h3 className="text-lg font-semibold mb-2">{title}</h3><p className="text-sm leading-relaxed text-[#45433E]">{text}</p></div>)}</div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 mt-12">
      <div className="lg:col-span-5 bg-[#DFDCD2] text-[#1C1C1C] rounded-[6px] p-6 md:p-9 flex flex-col justify-between min-h-[420px] text-left"><div><h3 className="text-2xl font-semibold tracking-tight mb-5">Verticales de entrega y método de trabajo</h3><p className="leading-relaxed text-[#45433E]">Diagnóstico directo sobre código o requerimiento, arquitectura modular, flujo de ramas dev -&gt; test -&gt; main y validación en entornos reales.</p></div><a href="#contact" className="inline-flex items-center justify-between w-full bg-[#1C1C1C] text-[#F2EFE9] hover:bg-[#333333] rounded-[6px] px-5 py-3.5 text-sm font-medium transition-colors"><span>Consultar disponibilidad técnica</span><span>→</span></a></div>
      <div className="lg:col-span-7 rounded-[6px] overflow-hidden flex flex-col gap-0.5 bg-[#1C1C1C]/15">{rows.map(([title,tech],i)=><div key={title} className={`${i%2===0?"bg-[#1C1C1C]":"bg-[#262626]"} text-[#F2EFE9] p-5 md:p-6 flex flex-col justify-center min-h-[104px]`}><h3 className="font-semibold text-lg">{title}</h3><p className="text-sm text-[#F2EFE9]/75 mt-2">{tech}</p></div>)}</div>
    </div>
  </div></section>;
}
export default Servicios;
