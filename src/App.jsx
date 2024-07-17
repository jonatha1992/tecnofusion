import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Section from "./components/Section";

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
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      color: "#E68369",
      fontWeight: "700",
    },
    h2: {
      color: "#131842",
    },
    h3: {
      color: "#131842",
    },
    body1: {
      color: "#ffffff",
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
          color: "#ffffff",
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
        <Section
          title="Proyectos"
          id="proyectos"
          gradientClass="bg-radial-gradient-right"
        />
        <Section
          title="Sección 2"
          id="seccion2"
          gradientClass="bg-radial-gradient-left"
        />
        <Section
          title="Sección 3"
          id="seccion3"
          gradientClass="bg-radial-gradient-right"
        />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
