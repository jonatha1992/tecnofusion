import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Contact from "./components/Contact";
import WhatsAppChat from "./components/WhatsAppChat";
const theme = createTheme({
    palette: {
        primary: {
            main: "#131842",
        },
        secondary: {
            main: "#E68369",
        },
        background: {
            default: "#FBF6E2",
            paper: "#ECCEAE",
        },
        text: {
            primary: "#131842",
            secondary: "#E68369",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            color: "#131842",
        },
        h2: {
            color: "#131842",
        },
        h3: {
            color: "#131842",
        },
        body1: {
            color: "#131842",
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#131842",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
                containedPrimary: {
                    backgroundColor: "#E68369",
                    color: "#FBF6E2",
                    "&:hover": {
                        backgroundColor: "#d57257",
                    },
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Hero />
                <Section title="Sección 1" id="seccion1" />
                <Section title="Sección 2" id="seccion2" />
                <Section title="Sección 3" id="seccion3" />
                <Contact />
                <WhatsAppChat />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
