import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllProjects, deleteProject } from "../../services/projectService";
import { toast } from "react-toastify";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar proyectos:", error);
      setError("Error al cargar los proyectos. Por favor recarga la página.");
      toast.error("Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete.id);
      toast.success("Proyecto eliminado exitosamente");
      loadProjects();
    } catch (error) {
      console.error("Error al eliminar proyecto:", error);
      toast.error("Error al eliminar el proyecto");
    } finally {
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen px-3 py-3 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-white mb-0.5">Panel de Administración</h1>
            <p className="text-xs text-white/60">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white border border-white/30 rounded-md hover:border-[#E68369] hover:bg-[#E68369]/10 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Salir
          </button>
        </div>

        {/* Main Content */}
        <div className="overflow-hidden bg-white rounded-lg shadow-xl">
          {/* Projects Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-2.5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900">
              Proyectos <span className="text-[#E68369]">({projects.length})</span>
            </h2>

            <button
              onClick={() => navigate("/admin/projects/new")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#E68369] to-[#d67359] rounded-md hover:from-[#d67359] hover:to-[#c66349] shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="flex items-start px-3 py-2 m-2 text-red-800 border-l-4 border-red-500 rounded-r bg-red-50">
              <svg className="flex-shrink-0 w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-[#E68369]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : projects.length === 0 ? (
            /* Empty State */
            <div className="px-4 py-10 text-center">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mb-1 text-sm font-semibold text-gray-700">No hay proyectos</h3>
              <p className="mb-4 text-xs text-gray-500">Crea tu primer proyecto</p>
              <button
                onClick={() => navigate("/admin/projects/new")}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#E68369] to-[#d67359] rounded-md hover:from-[#d67359] hover:to-[#c66349] shadow-sm hover:shadow transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Proyecto
              </button>
            </div>
          ) : (
            /* Projects Table */
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">Img</th>
                    <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">Título</th>
                    <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-700 uppercase max-w-[200px]">Descripción</th>
                    <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">Enlaces</th>
                    <th className="px-2 py-2 text-left text-[10px] font-bold text-gray-700 uppercase">Fecha</th>
                    <th className="px-2 py-2 text-center text-[10px] font-bold text-gray-700 uppercase">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {projects.map((project) => (
                    <tr key={project.id} className="transition-colors hover:bg-orange-50/40">
                      <td className="px-2 py-2">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="object-cover w-10 h-10 border border-gray-200 rounded"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <p className="text-xs font-semibold text-gray-900 max-w-[120px] truncate">{project.title}</p>
                      </td>
                      <td className="px-2 py-2">
                        <p className="text-[10px] text-gray-600 max-w-[200px] truncate leading-tight">{project.description}</p>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex gap-1">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                            title="Ver en GitHub"
                          >
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                          <a
                            href={project.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-white bg-[#131842] rounded hover:bg-[#1a2557] transition-colors"
                            title="Ver Demo"
                          >
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                        </div>
                      </td>
                      <td className="px-2 py-2">
                        <p className="text-[10px] text-gray-500">{formatDate(project.createdAt)}</p>
                      </td>
                      <td className="px-2 py-2">
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                            className="p-1 text-[#131842] hover:bg-blue-50 rounded transition-colors"
                            title="Editar"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(project)}
                            className="p-1 text-red-600 transition-colors rounded hover:bg-red-50"
                            title="Eliminar"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-xl">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-900">Confirmar Eliminación</h3>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-gray-600">
                ¿Eliminar <strong className="text-gray-900">{projectToDelete?.title}</strong>?
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50">
              <button
                onClick={handleDeleteCancel}
                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
