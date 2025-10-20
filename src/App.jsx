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
const Dashboard = lazy(() => import("./components/admin/Dashboard"));
const ProjectForm = lazy(() => import("./components/admin/ProjectForm"));
const PrivateRoute = lazy(() => import("./components/admin/PrivateRoute"));

// Debug component (temporal)
const ProjectsDebug = lazy(() => import("./components/ProjectsDebug"));

// Componente para la página principal
function HomePage() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={<div className="min-h-[60vh]"></div>}>
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
        <Suspense fallback={<div className="min-h-screen"></div>}>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<HomePage />} />

            {/* Rutas de administración */}
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

            {/* Debug route (temporal - eliminar en producción) */}
            <Route path="/debug/projects" element={<ProjectsDebug />} />

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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
