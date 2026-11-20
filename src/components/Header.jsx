import { useState } from "react";
import { HiMenu, HiLogin, HiLogout, HiUserCircle } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const navItems = [
    { href: "#hero", label: "Inicio" },
    { href: "#projects", label: "Proyectos" },
    { href: "#servicios", label: "Servicios" },
    { href: "#contact", label: "Contacto" },
];

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => { await logout(); };
    const handleNavClick = (event, href, isRoute = false) => {
        event.preventDefault();
        setMobileMenuOpen(false);
        if (isRoute) return navigate(href);
        const targetElement = document.querySelector(href);
        if (targetElement) targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[1201] border-b border-[#1C1C1C]/15 bg-[#F2EFE9]/95">
            <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6">
                <a href="#hero" className="flex shrink-0 items-center gap-2.5 no-underline">
                    <span className="rounded-[6px] bg-[#1C1C1C] px-2.5 py-1 text-sm font-semibold tracking-[-0.03em] text-[#F2EFE9]">TF</span>
                    <span className="text-base font-semibold tracking-[-0.03em] text-[#1C1C1C]">tecnofusion.dev</span>
                    <span className="h-2 w-2 rounded-full bg-[#8FA68E]" aria-label="En línea" />
                </a>
                <div className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)} className="rounded-[6px] px-3 py-2 text-sm text-[#1C1C1C] transition-colors hover:bg-[#1C1C1C] hover:text-[#F2EFE9]">{item.label}</a>)}
                    {user && <button onClick={() => navigate("/admin/dashboard")} className="rounded-[6px] px-3 py-2 text-sm text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F2EFE9]">Gestión</button>}
                </div>
                <div className="flex items-center gap-2">
                    {user && <span className="hidden items-center gap-1.5 text-sm sm:flex"><HiUserCircle className="h-5 w-5" />{user.email}</span>}
                    <button onClick={user ? handleLogout : () => setOpenLoginModal(true)} className="rounded-[6px] bg-[#DFDCD2] px-3.5 py-1.5 text-sm font-medium text-[#1C1C1C] transition-colors hover:bg-[#1C1C1C] hover:text-[#F2EFE9]">
                        <span className="flex items-center gap-1.5">{user ? <><HiLogout className="h-4 w-4" />Salir</> : <><HiLogin className="h-4 w-4" />Entrar</>}</span>
                    </button>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-[6px] p-2 md:hidden" aria-label="Abrir navegación" aria-expanded={mobileMenuOpen}><HiMenu className="h-5 w-5" /></button>
                </div>
            </nav>
            {mobileMenuOpen && <div className="absolute left-0 right-0 top-full border-b border-[#1C1C1C]/15 bg-[#F2EFE9] p-2 md:hidden">
                {navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => handleNavClick(event, item.href)} className="block rounded-[6px] px-4 py-3 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#F2EFE9]">{item.label}</a>)}
                {user && <button onClick={(event) => handleNavClick(event, "/admin/dashboard", true)} className="w-full rounded-[6px] px-4 py-3 text-left">Gestión</button>}
            </div>}
            <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />
        </header>
    );
}

export default Header;
