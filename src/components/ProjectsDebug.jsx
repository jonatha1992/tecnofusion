import { useState, useEffect } from "react";
import { getAllProjects } from "../services/projectService";

/**
 * Componente de debugging para verificar la carga de proyectos desde Firebase
 * Este componente muestra información detallada sobre el proceso de carga
 */
function ProjectsDebug() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }]);
    console.log(`[${type.toUpperCase()}] ${message}`);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      addLog('Iniciando carga de proyectos...', 'info');
      setLoading(true);

      addLog('Llamando a getAllProjects()...', 'info');
      const data = await getAllProjects();

      addLog(`Proyectos recibidos: ${data.length}`, 'success');
      addLog(`Datos: ${JSON.stringify(data, null, 2)}`, 'info');

      setProjects(data);

      if (data.length === 0) {
        addLog('⚠️ La colección de proyectos está vacía', 'warning');
      } else {
        data.forEach((project, index) => {
          addLog(`Proyecto ${index + 1}: ${project.title}`, 'success');
        });
      }

    } catch (error) {
      addLog(`❌ Error: ${error.message}`, 'error');
      addLog(`Stack: ${error.stack}`, 'error');
      setError(error);
    } finally {
      setLoading(false);
      addLog('Carga finalizada', 'info');
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-400 bg-red-900/20 border-red-500';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'success': return 'text-green-400 bg-green-900/20 border-green-500';
      default: return 'text-blue-400 bg-blue-900/20 border-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔍 Projects Debug Console
          </h1>
          <p className="text-gray-400">
            Herramienta de diagnóstico para verificar la carga de proyectos desde Firebase
          </p>
        </div>

        {/* Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Estado</div>
            <div className="text-2xl font-bold text-white">
              {loading ? (
                <span className="text-yellow-400">Cargando...</span>
              ) : error ? (
                <span className="text-red-400">Error</span>
              ) : (
                <span className="text-green-400">Completado</span>
              )}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Proyectos</div>
            <div className="text-2xl font-bold text-white">
              {projects.length}
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Logs</div>
            <div className="text-2xl font-bold text-white">
              {logs.length}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mb-8">
          <button
            onClick={loadProjects}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : 'Recargar Proyectos'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logs */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Console Logs</h2>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <div className="text-gray-500">No hay logs aún...</div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`mb-2 p-3 rounded border-l-4 ${getLogColor(log.type)}`}
                  >
                    <div className="text-xs opacity-60 mb-1">{log.timestamp}</div>
                    <div className="whitespace-pre-wrap break-words">{log.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Proyectos */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">
                Proyectos Cargados ({projects.length})
              </h2>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-gray-500">No hay proyectos</p>
                </div>
              ) : (
                projects.map((project, index) => (
                  <div
                    key={project.id || index}
                    className="mb-4 p-4 bg-gray-900 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-24 h-24 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/96x96?text=Error';
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {project.title || 'Sin título'}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {project.description || 'Sin descripción'}
                        </p>
                        <div className="flex gap-2 text-xs">
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                            >
                              GitHub
                            </a>
                          )}
                          {project.previewLink && (
                            <a
                              href={project.previewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2 py-1 bg-purple-600 text-white rounded hover:bg-purple-500"
                            >
                              Preview
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <code className="text-xs text-gray-500">ID: {project.id}</code>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Error Details */}
        {error && (
          <div className="mt-6 bg-red-900/20 border-2 border-red-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-red-400 mb-4">Error Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Message:</span>
                <span className="text-white ml-2">{error.message}</span>
              </div>
              <div>
                <span className="text-gray-400">Code:</span>
                <span className="text-white ml-2">{error.code || 'N/A'}</span>
              </div>
              {error.stack && (
                <div>
                  <span className="text-gray-400">Stack:</span>
                  <pre className="text-xs text-gray-300 mt-2 bg-black/30 p-3 rounded overflow-x-auto">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsDebug;
