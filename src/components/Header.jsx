import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
                    const headerOffset = 80; // Aumentado para mejor posicionamiento
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
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: 'rgba(17, 24, 39, 0.95)', // Fondo oscuro con transparencia
                backdropFilter: 'blur(10px)', // Efecto de vidrio esmerilado
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Sombra sutil
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)' // Borde sutil
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Toolbar disableGutters sx={{ minHeight: '68px !important' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TECNOFUSIÓN.IT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: 'center' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            tabIndex={0}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                '& .MuiPaper-root': {
                                    width: '100%',
                                    maxWidth: '100%',
                                    left: '0 !important',
                                    right: '0',
                                    mx: 'auto',
                                    backgroundColor: 'rgb(17, 24, 39)', // Mismo color que el header
                                    backgroundImage: 'none',
                                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                                    '& .MuiMenuItem-root': {
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    },
                                },
                            }}
                        >
                            {navItems.map((item) => (
                                <MenuItem
                                    key={item.href}
                                    onClick={(event) => handleNavClick(event, item.href, item.isRoute)}
                                    tabIndex={0}
                                    sx={{
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        width="100%"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                            {user && (
                                <MenuItem
                                    key={adminNavItem.href}
                                    onClick={(event) => handleNavClick(event, adminNavItem.href, adminNavItem.isRoute)}
                                    tabIndex={0}
                                    sx={{
                                        py: 1.5,
                                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        width="100%"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '1.1rem',
                                            color: '#E68369',
                                        }}
                                    >
                                        {adminNavItem.label}
                                    </Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TECNOFUSIÓN.IT
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.href}
                                onClick={(event) => handleNavClick(event, item.href, item.isRoute)}
                                sx={{ my: 2, color: "white", display: "block" }}
                                tabIndex={0}
                            >
                                {item.label}
                            </Button>
                        ))}
                        {user && (
                            <Button
                                key={adminNavItem.href}
                                onClick={(event) => handleNavClick(event, adminNavItem.href, adminNavItem.isRoute)}
                                sx={{
                                    my: 2,
                                    color: "#E68369",
                                    display: "block",
                                    fontWeight: 600,
                                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                                    ml: 1,
                                    pl: 2,
                                }}
                                tabIndex={0}
                            >
                                {adminNavItem.label}
                            </Button>
                        )}
                    </Box>

                    {/* Login/Logout Button */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {user ? (
                            <>
                                <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
                                    <AccountCircleIcon />
                                    <Typography variant="body2" sx={{ display: { xs: "none", md: "block" } }}>
                                        {user.email}
                                    </Typography>
                                </Box>
                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        ml: 1,
                                        borderColor: "rgba(255, 255, 255, 0.3)",
                                        "&:hover": {
                                            borderColor: "rgba(255, 255, 255, 0.5)",
                                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        },
                                    }}
                                    variant="outlined"
                                >
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={handleOpenLogin}
                                startIcon={<LoginIcon />}
                                sx={{
                                    ml: 1,
                                    borderColor: "rgba(255, 255, 255, 0.3)",
                                    "&:hover": {
                                        borderColor: "rgba(255, 255, 255, 0.5)",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    },
                                }}
                                variant="outlined"
                            >
                                Entrar
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>

            {/* Login Modal */}
            <LoginModal open={openLoginModal} onClose={handleCloseLogin} />
        </AppBar>
    );
}

export default Header;
