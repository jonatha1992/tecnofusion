import { Box, Container, CssBaseline, useTheme, Typography } from "@mui/material";
import Header from "./Header";

function Layout({ children }) {
    const theme = useTheme();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <CssBaseline />
            <Header />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
                {children}
            </Box>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: "auto",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" className="text-center">
                        {" "}
                        Todos los derechos reservados. &copy; {new Date().getFullYear()} Tecnofusión.IT
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;
