import { useState } from "react";
import { HiMenu, HiLogin, HiLogout, HiUserCircle } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const navItems = [
    { href: "#home", label: "Inicio" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#Servicios", label: "Servicios" },
    { href: "#Contacto", label: "Contacto" },
];

const adminNavItem = { href: "/admin/dashboard", label: "Gestión", isRoute: true };

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleCloseNavMenu = () => {
        setMobileMenuOpen(false);
    };

    const handleOpenLogin = () => {
        setOpenLoginModal(true);
    };

    const handleCloseLogin = () => {
        setOpenLoginModal(false);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const handleNavClick = (event, href, isRoute = false) => {
        event.preventDefault();
        handleCloseNavMenu();

        if (isRoute) {
            // Si es una ruta, usar navigate
            navigate(href);
        } else {
            // Pequeño delay para asegurar que el menú se cierre primero en mobile
            setTimeout(() => {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }, 100);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[1201] bg-gray-900/95 backdrop-blur-[10px] shadow-lg border-b border-white/10">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-screen-lg">
                <nav className="flex items-center justify-between min-h-[68px]">
                    {/* Logo - Desktop */}
                    <a
                        href="#"
                        className="hidden md:flex font-mono font-bold tracking-[0.3rem] text-white no-underline mr-4"
                    >
                        TECNOFUSIÓN.IT
                    </a>

                    {/* Mobile Menu Button & Logo */}
                    <div className="flex items-center flex-1 md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            <HiMenu className="w-6 h-6" />
                        </button>
                        <a
                            href="#"
                            className="flex-1 font-mono font-bold tracking-[0.3rem] text-white no-underline ml-4"
                        >
                            TECNOFUSIÓN.IT
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex flex-1 items-center gap-0">
                        {navItems.map((item) => (
                            <button
                                key={item.href}
                                onClick={(event) => handleNavClick(event, item.href, item.isRoute)}
                                className="my-2 text-white px-4 py-2 hover:bg-white/10 rounded-md transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        {user && (
                            <button
                                onClick={(event) => handleNavClick(event, adminNavItem.href, adminNavItem.isRoute)}
                                className="my-2 text-[#E68369] px-4 py-2 hover:bg-white/10 rounded-md transition-colors font-semibold border-l border-white/10 ml-2 pl-4"
                            >
                                {adminNavItem.label}
                            </button>
                        )}
                    </div>

                    {/* Login/Logout Section */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2">
                                    <HiUserCircle className="w-5 h-5 text-white" />
                                    <span className="hidden md:block text-sm text-white">
                                        {user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 ml-2 px-3 py-1.5 text-white border border-white/30 rounded-md hover:border-white/50 hover:bg-white/10 transition-colors"
                                >
                                    <HiLogout className="w-4 h-4" />
                                    Salir
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleOpenLogin}
                                className="flex items-center gap-2 ml-2 px-3 py-1.5 text-white border border-white/30 rounded-md hover:border-white/50 hover:bg-white/10 transition-colors"
                            >
                                <HiLogin className="w-4 h-4" />
                                Entrar
                            </button>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-full bg-gray-900 shadow-lg">
                        <div className="flex flex-col">
                            {navItems.map((item) => (
                                <button
                                    key={item.href}
                                    onClick={(event) => handleNavClick(event, item.href, item.isRoute)}
                                    className="w-full text-center py-3 text-white hover:bg-white/10 transition-colors font-medium text-lg"
                                >
                                    {item.label}
                                </button>
                            ))}
                            {user && (
                                <button
                                    onClick={(event) => handleNavClick(event, adminNavItem.href, adminNavItem.isRoute)}
                                    className="w-full text-center py-3 text-[#E68369] hover:bg-white/10 transition-colors font-semibold text-lg border-t border-white/10"
                                >
                                    {adminNavItem.label}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Login Modal */}
            <LoginModal open={openLoginModal} onClose={handleCloseLogin} />
        </header>
    );
}

export default Header;
