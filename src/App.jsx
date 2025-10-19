import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Hero from "./components/Hero";

// Lazy load secciones pesadas para mejor rendimiento inicial
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Servicios = lazy(() => import("./components/Servicios"));
const WhatsAppChat = lazy(() => import("./components/WhatsAppChat"));

// Lazy load componentes de administración
const Login = lazy(() => import("./components/admin/Login"));
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const ProjectForm = lazy(() => import("./components/admin/ProjectForm"));
const PrivateRoute = lazy(() => import("./components/admin/PrivateRoute"));

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
        backgroundColor: "rgba(19, 24, 66, 0.98)",
        backdropFilter: "blur(15px)",
        zIndex: 9999,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
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
}
});

// Componente para la página principal
function HomePage() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<div style={{ minHeight: "60vh" }}></div>}>
        <Projects title="Proyectos" id="proyectos" gradientClass="bg-radial-gradient-right" />
        <Servicios title="Servicios" id="Servicios" gradientClass="bg-radial-gradient-left" />
        <Contact title="Contacto" id="Contacto" />
        <WhatsAppChat />
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div style={{ minHeight: "100vh" }}></div>}>
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<HomePage />} />

              {/* Rutas de administración */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/projects/new"
                element={
                  <PrivateRoute>
                    <ProjectForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin/projects/edit/:id"
                element={
                  <PrivateRoute>
                    <ProjectForm />
                  </PrivateRoute>
                }
              />

              {/* Redirección para rutas no encontradas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>

          {/* Toast notifications */}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
