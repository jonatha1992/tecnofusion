import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#F2EFE9] text-[#1C1C1C]">
            <Header />
            <main className="flex-1 bg-[#F2EFE9] pt-14">{children}</main>
            <footer className="mt-auto px-4 pb-8 pt-12 md:px-6">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-12">
                    <section className="flex min-h-[180px] flex-col justify-between rounded-[6px] bg-[#1C1C1C] p-6 text-[#F2EFE9] sm:col-span-2 lg:col-span-6">
                        <div><h2 className="text-3xl font-semibold leading-[0.94] tracking-[-0.04em] md:text-4xl">tecnofusion.dev</h2><p className="mt-4 max-w-[48ch] text-sm text-[#F2EFE9]/80">Sistemas distribuidos, ingeniería Full-Stack, IA aplicada y productos SaaS propios en producción.</p></div>
                        <p className="mt-6 text-xs text-[#F2EFE9]/65">© {new Date().getFullYear()} tecnofusion.dev. Todos los derechos reservados.</p>
                    </section>
                    <section className="flex flex-col justify-between rounded-[6px] bg-[#DFDCD2] p-6 lg:col-span-3"><h3 className="text-xs font-medium">Navegación</h3><nav className="mt-5 flex flex-col items-start gap-3"><a href="#hero">Inicio</a><a href="#projects">Proyectos</a><a href="#servicios">Servicios</a><a href="#contact">Contacto</a></nav></section>
                    <section className="flex flex-col justify-between rounded-[6px] bg-[#8FA68E] p-6 lg:col-span-3"><div><h3 className="text-xs font-medium">Coordenadas</h3><p className="mt-5">Buenos Aires, Argentina</p><a className="mt-2 block" href="mailto:tecnofusion.it@gmail.com">tecnofusion.it@gmail.com</a><a className="mt-2 block" href="tel:+5491159910666">+54 9 11 5991-0666</a></div><div className="mt-5 flex gap-4 text-sm"><a href="https://github.com/tecnofusion" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/company/tecnofusion/" target="_blank" rel="noreferrer">LinkedIn</a></div></section>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
