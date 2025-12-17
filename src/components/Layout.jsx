import Header from "./Header";

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-[#131842] pt-[68px]">
                {children}
            </main>
            <footer className="py-6 px-4 mt-auto bg-[#E68369] text-[#131842]">
                <div className="container mx-auto max-w-screen-sm">
                    <p className="text-center text-sm">
                        Todos los derechos reservados. &copy; {new Date().getFullYear()} Tecnofusión.IT
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
