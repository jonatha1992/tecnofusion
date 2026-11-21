const productCards = [
  { name: "MatchAnalyzer", description: "Modelos predictivos & ML" },
  { name: "Control Apps", description: "Orquestación & despliegue" },
  { name: "KINETIQ PRO", description: "Plataforma SaaS fitness" },
  { name: "AudioText & SpinPredictor", description: "IA & datos en tiempo real" },
];

function Hero() {
  return (
    <section id="hero" className="mx-auto max-w-[1400px] px-4 pb-8 pt-20 md:px-6">
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-12">
        <div className="flex min-h-[420px] flex-col justify-between rounded-[6px] bg-[#DFDCD2] p-6 text-left text-[#1C1C1C] md:p-9 lg:col-span-7">
          <div>
            <p className="flex items-center gap-2 text-sm text-[#45433E]"><span className="h-2 w-2 rounded-full bg-[#8FA68E]" />Estudio de ingeniería de software & productos SaaS · Buenos Aires</p>
            <h1 className="mt-4 text-[clamp(2.25rem,4.2vw,3.9rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[#1C1C1C]">Sistemas distribuidos en producción, arquitectura Full-Stack e inteligencia artificial aplicada.</h1>
            <p className="mt-5 max-w-[56ch] text-base leading-relaxed text-[#45433E] md:text-lg">Diseñamos, construimos y operamos sistemas distribuidos, plataformas web, agentes de IA, pipelines de datos y productos SaaS propios con estándares de ingeniería verificables.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5"><a href="#projects" className="rounded-[6px] bg-[#1C1C1C] px-5 py-3 text-sm font-medium text-[#F2EFE9] transition-colors hover:bg-[#333333]">Ver sistemas en producción</a><a href="#contact" className="rounded-[6px] border border-[#1C1C1C]/20 bg-[#F2EFE9] px-5 py-3 text-sm font-medium text-[#1C1C1C] hover:border-[#1C1C1C]">Iniciar un proyecto</a></div>
        </div>
        <div className="grid grid-rows-2 gap-2.5 lg:col-span-5">
          <article className="flex flex-col justify-between overflow-hidden rounded-[6px] bg-[#1C1C1C] text-[#F2EFE9]"><img src="/assets/projects/payalert-saas-gestion-de-flujo-de-caja.svg" alt="PayAlert SaaS" width="640" height="360" fetchPriority="high" className="h-48 w-full object-cover" /><div className="flex min-h-8 items-center justify-between gap-3 bg-[#1C1C1C] px-4 py-2 text-xs text-[#F2EFE9]/90"><span>PayAlert — SaaS de gestión de flujo de caja</span><span className="shrink-0">Producción · React / Node / PostgreSQL</span></div></article>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <article className="flex flex-col justify-between overflow-hidden rounded-[6px] bg-[#E5E1D6]"><img src="/assets/projects/sentinel-compliance-engine-corvux-aml-dashboard.svg" alt="Sentinel Compliance Engine" width="480" height="270" className="h-32 w-full object-cover" /><div className="flex items-center justify-between gap-2 bg-[#DFDCD2] px-3.5 py-2 text-xs text-[#1C1C1C]"><span>Sentinel AML Engine</span><span>Python / FastAPI</span></div></article>
            <article className="flex flex-col justify-between rounded-[6px] bg-[#8FA68E] p-5 text-[#1C1C1C]"><div><p className="text-4xl font-semibold leading-none tracking-[-0.04em]">15+</p><p className="mt-3 text-sm">Sistemas desplegados entre productos SaaS propios, motores de IA y plataformas operativas.</p></div><p className="mt-4 text-xs">TypeScript · React · Python · Node.js · Cloud</p></article>
          </div>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {productCards.map((product) => <a key={product.name} href="#projects" className="flex items-center justify-between gap-3 rounded-[6px] border border-[#1C1C1C]/10 bg-[#FFFFFF] p-4 text-[#1C1C1C] no-underline"><span><strong className="block text-sm font-semibold">{product.name}</strong><span className="mt-1 block text-xs text-[#57554F]">{product.description}</span></span><span aria-hidden="true">↗</span></a>)}
      </div>
    </section>
  );
}

export default Hero;
