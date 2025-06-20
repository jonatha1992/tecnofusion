import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Contact from "./components/Contact";
import WhatsAppChat from "./components/WhatsAppChat";
import Servicios from "./components/Servicios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#131842",
    },
    secondary: {
      main: "#E68369",
    },
    background: {
      default: "#131842",
      paper: "transparent",
    },
    text: {
      primary: "#131842",
      secondary: "#E68369",
      description: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: "#E68369",
      fontWeight: "700",
    },
    h2: {
      color: "#ffffff",
    },
    h3: {
      color: "#ffffff",
    },
    h5: {
      color: " #E68369",
    },
    body1: {
      color: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#13184200",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: "#13184200",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#13184200",
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
        <Section
          title="Proyectos"
          id="proyectos"
          gradientClass="bg-radial-gradient-right"
        />
        <Section
          title="Nosotros"
          id="Nosotros"
          gradientClass="bg-radial-gradient-left"
        />
        <Section
          title="Servicios"
          id="Servicios"
          gradientClass="bg-radial-gradient-left"
        />
        <Servicios title="Servicios" id="Servicios" />
        <Contact title="Contacto" id="Contacto" />
        <WhatsAppChat />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
