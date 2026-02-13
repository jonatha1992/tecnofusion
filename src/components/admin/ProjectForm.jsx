import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProject,
  updateProject,
  getProjectById,
} from "../../services/projectService";
import { analyzeReadme } from "../../services/geminiService";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("El título es obligatorio")
    .min(3, "El título debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  githubLink: Yup.string()
    .required("El enlace de GitHub es obligatorio"),
  isDeployed: Yup.boolean(),
  previewLink: Yup.string()
    .when('isDeployed', {
      is: true,
      then: (schema) => schema.required("El enlace de vista previa es obligatorio"),
      otherwise: (schema) => schema.optional(),
    }),
  technologies: Yup.string()
    .required("Las tecnologías son obligatorias"),
  status: Yup.string()
    .oneOf(["Desarrollo", "Producción"], "Estado inválido")
    .required("El estado es obligatorio"),
});

function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [hasSavedData, setHasSavedData] = useState(false);
  const [readmeFile, setReadmeFile] = useState(null);
  const [readmeText, setReadmeText] = useState("");
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  const [importMethod, setImportMethod] = useState('file'); // 'file' or 'github'
  const [githubReadmeInfo, setGithubReadmeInfo] = useState(null); // { download_url, content_encoded }

  const handleAnalyze = async () => {
    let currentReadmeText = "";

    setLoading(true);
    try {
      if (importMethod === 'file') {
        // ... Logica existente para archivo/texto
        if (readmeFile) {
          try {
            currentReadmeText = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsText(readmeFile);
            });
          } catch (err) {
            toast.error("Error al leer el archivo");
            return;
          }
        } else {
          currentReadmeText = readmeText;
        }

        if (!currentReadmeText) {
          toast.warning("Por favor, sube un archivo o pega el contenido del README");
          setLoading(false);
          return;
        }
      } else {
        // ... Logica para GitHub
        const repoUrl = formik.values.githubLink;
        if (!repoUrl) {
          toast.warning("Por favor ingresa el enlace de GitHub abajo");
          setLoading(false);
          return;
        }

        // 1. Extraer owner/repo
        // Soporta: https://github.com/user/repo, user/repo
        let user, repo;
        try {
          if (repoUrl.includes("github.com")) {
            const parts = repoUrl.split("github.com/")[1].split("/");
            user = parts[0];
            repo = parts[1]?.replace(".git", ""); // Limpiar .git si existe
          } else {
            const parts = repoUrl.split("/");
            user = parts[0];
            repo = parts[1];
          }
        } catch (e) {
          toast.error("Formato de enlace de GitHub inválido");
          setLoading(false);
          return;
        }

        if (!user || !repo) {
          toast.error("No se pudo detectar el usuario/repo de GitHub");
          setLoading(false);
          return;
        }

        // 2. Fetch README directo de GitHub api
        toast.info(`Buscando README en ${user}/${repo}...`);
        const res = await fetch(`https://api.github.com/repos/${user}/${repo}/readme`);
        if (!res.ok) {
          throw new Error("No se encontró README en el repositorio (o límite de API excedido)");
        }
        const data = await res.json();

        // 3. Decodificar contenido (viene en base64) y preparar para guardar
        currentReadmeText = atob(data.content);

        // Guardar la info para usarla en el submit final (para no subir archivo)
        setGithubReadmeInfo({
          download_url: data.download_url,
          // Guardamos la url raw directa de github
        });
      }

      // ... Gemeni Analysis 
      const data = await analyzeReadme(currentReadmeText);
      console.log("Datos recibidos de Gemini:", data);

      formik.setFieldValue("title", data.title || "");
      formik.setFieldValue("description", data.description || "");

      const techs = Array.isArray(data.technologies)
        ? data.technologies.join(", ")
        : (data.technologies || "");
      formik.setFieldValue("technologies", techs);

      toast.success("Información extraída correctamente");

    } catch (err) {
      console.error("Error al analizar:", err);
      toast.error(err.message || "Error al procesar");
    } finally {
      setLoading(false);
    }
  };


  // Clave de localStorage para el formulario
  const FORM_STORAGE_KEY = `project-form-${isEditMode ? id : 'new'}`;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      githubLink: "",
      githubLink: "",
      previewLink: "",
      isDeployed: true,
      technologies: "",
      status: "Desarrollo",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        const valuesToSave = {
          ...values,
          technologies: typeof values.technologies === 'string'
            ? values.technologies.split(',').map(t => t.trim()).filter(t => t !== "")
            : values.technologies
        };

        // Preparar el archivo README si existe o si hay texto pegado
        let fileToUpload = readmeFile;
        // Si no hay archivo pero hay texto en el área de texto, crear un archivo
        if (importMethod === 'file' && !fileToUpload && readmeText.trim()) {
          const blob = new Blob([readmeText], { type: 'text/markdown' });
          fileToUpload = new File([blob], "README.md", { type: "text/markdown" });
        }

        // Valores finales, incluyendo posible URL directa de GitHub
        const finalValues = { ...valuesToSave };

        // Si venimos de la opción GitHub, usamos esa URL directamente
        if (importMethod === 'github' && githubReadmeInfo?.download_url) {
          finalValues.readmeUrl = githubReadmeInfo.download_url;
          // fileToUpload se debe ignorar o setear null para que no intente subir a firebase
          fileToUpload = null;
        }

        if (isEditMode) {
          // Nota: updateProject necesita modificarse ligeramente para aceptar readmeUrl directo en 'values'
          // O pasamos null en fileToUpload y manejamos readmeUrl dentro de valuesToSave
          await updateProject(id, finalValues, imageFile, fileToUpload);
          toast.success("Proyecto actualizado exitosamente");
        } else {
          // ... creacion ...
          if (!imageFile && !imagePreview) {
            setError("Debes seleccionar una imagen para el proyecto");
            setLoading(false);
            return;
          }
          await createProject(finalValues, imageFile, fileToUpload);
          toast.success("Proyecto creado exitosamente");
        }
        // Limpiar localStorage al guardar exitosamente
        localStorage.removeItem(FORM_STORAGE_KEY);
        navigate("/admin/dashboard");
      } catch (error) {
        console.error("Error al guardar proyecto:", error);
        setError("Error al guardar el proyecto. Por favor intenta nuevamente.");
        toast.error("Error al guardar el proyecto");
      } finally {
        setLoading(false);
      }
    },
  });

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    if (isEditMode) {
      loadProject();
    } else {
      // Cargar datos guardados del localStorage para nuevos proyectos
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          formik.setValues(parsed.values);
          if (parsed.imagePreview) {
            setImagePreview(parsed.imagePreview);
          }
          setHasSavedData(true);
          toast.info("Se recuperó un borrador guardado");
        } catch (e) {
          console.error("Error al cargar datos guardados:", e);
        }
      }
    }
  }, [id]);

  // Guardar en localStorage cada vez que cambian los valores del formulario
  useEffect(() => {
    if (!isEditMode && (formik.values.title || formik.values.description || formik.values.githubLink || formik.values.previewLink)) {
      const dataToSave = {
        values: formik.values,
        imagePreview: imagePreview,
      };
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(dataToSave));
    }
  }, [formik.values, imagePreview, isEditMode]);

  const loadProject = async () => {
    try {
      const project = await getProjectById(id);
      formik.setValues({
        title: project.title,
        description: project.description,
        githubLink: project.githubLink,
        previewLink: project.previewLink || "",
        isDeployed: project.isDeployed !== undefined ? project.isDeployed : true,
        technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : (project.technologies || ""),
        status: project.status || "Desarrollo",
      });
      setImagePreview(project.image);
    } catch (error) {
      console.error("Error al cargar proyecto:", error);
      toast.error("Error al cargar el proyecto");
      navigate("/admin/dashboard");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        setError("Por favor selecciona un archivo de imagen válido");
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe superar los 5MB");
        return;
      }

      setImageFile(file);
      setError("");

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleClearForm = () => {
    formik.resetForm();
    setImageFile(null);
    setImagePreview("");
    setHasSavedData(false);
    localStorage.removeItem(FORM_STORAGE_KEY);
    toast.info("Formulario limpiado");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131842] via-[#1a2557] to-[#131842] py-4 px-3">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 px-3 py-1.5 mb-3 text-xs font-medium text-white border border-white/30 rounded-md hover:border-[#E68369] hover:bg-[#E68369]/10 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Dashboard
        </button>

        {/* Main Form Card */}
        <div className="bg-gradient-to-br from-[#1a2557] to-[#131842] backdrop-blur-md rounded-lg shadow-2xl overflow-hidden border border-white/10">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#131842] to-[#1a2557] border-b border-white/10">
            <h1 className="text-lg font-bold text-white">
              {isEditMode ? "Editar Proyecto" : "Nuevo Proyecto"}
            </h1>
          </div>

          <div className="p-4">
            <form onSubmit={formik.handleSubmit}>
            {/* Info Alert - Borrador guardado */}
            {hasSavedData && !isEditMode && (
              <div className="mb-3 bg-blue-50 border-l-4 border-blue-500 text-blue-800 px-3 py-2 rounded-r flex items-start justify-between">
                <div className="flex items-start">
                  <svg className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Borrador recuperado automáticamente. Los cambios se guardan mientras escribes.</span>
                </div>
                <button
                  onClick={handleClearForm}
                  className="ml-2 text-xs font-semibold text-blue-700 hover:text-blue-900 underline"
                >
                  Limpiar
                </button>
              </div>
            )}

            {/* Error Alert */}
            {error && (
              <div className="mb-3 bg-red-50 border-l-4 border-red-500 text-red-800 px-3 py-2 rounded-r flex items-start">
                <svg className="w-4 h-4 mr-2 flex-shrink-0 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">{error}</span>
              </div>
            )}

              {/* GitHub Link Field - Moved to Top */}
              <div className="mb-6">
                <label htmlFor="githubLink" className="block text-sm font-semibold text-white mb-2">
                  Enlace de GitHub
                </label>
                <input
                  type="text"
                  id="githubLink"
                  name="githubLink"
                  placeholder="https://github.com/usuario/proyecto"
                  value={formik.values.githubLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${formik.touched.githubLink && formik.errors.githubLink
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.githubLink && formik.errors.githubLink && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.githubLink}</p>
                )}
              </div>

            {/* Import from README Section */}
            <div className="mb-6 bg-white/5 border border-[#E68369]/30 rounded-lg overflow-hidden transition-all duration-300">
              <button
                type="button"
                onClick={() => setIsReadmeOpen(!isReadmeOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                aria-expanded={isReadmeOpen}
              >
                <h3 className="text-sm font-bold text-[#E68369] flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Importar desde README / Analizar con IA
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isReadmeOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`transition-[max-height,opacity] duration-300 ease-in-out ${isReadmeOpen ? 'max-h-[600px] opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-4">
                  <button
                    type="button"
                    onClick={() => setImportMethod('file')}
                    className={`px-4 py-2 text-xs font-semibold focus:outline-none transition-colors ${importMethod === 'file'
                      ? 'text-[#E68369] border-b-2 border-[#E68369]'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Subir Archivo / Pegar
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportMethod('github')}
                    className={`px-4 py-2 text-xs font-semibold focus:outline-none transition-colors ${importMethod === 'github'
                      ? 'text-[#E68369] border-b-2 border-[#E68369]'
                      : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Desde GitHub (Automático)
                  </button>
                </div>

                {importMethod === 'file' ? (
                  <>
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Opción 1: Subir archivo (README.md)
                      </label>
                      <input
                        type="file"
                        accept=".md,.txt"
                        onChange={(e) => setReadmeFile(e.target.files[0])}
                        className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E68369]/10 file:text-[#E68369] hover:file:bg-[#E68369]/20"
                      />
                      {readmeFile && (
                        <div className="mt-2 flex items-center justify-between bg-white/5 px-2 py-1 rounded">
                          <span className="text-xs text-[#E68369]">{readmeFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setReadmeFile(null)}
                            className="text-red-400 hover:text-red-300 text-xs"
                          >
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-gray-300 mb-2">
                        Opción 2: Pegar texto
                      </label>
                      <textarea
                        placeholder="Pega aquí el contenido del README..."
                        value={readmeText}
                        onChange={(e) => setReadmeText(e.target.value)}
                        className="w-full px-3 py-2 text-sm text-gray-200 bg-[#131842]/50 border border-white/10 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E68369] resize-none"
                      />
                    </div>
                  </>
                ) : (
                  <div className="mb-4">
                    <p className="text-xs text-gray-300 mb-2">
                      Usaremos el enlace de GitHub del formulario para buscar el README automáticamente.
                    </p>
                    <div className="bg-[#131842]/50 p-3 rounded border border-white/10 text-xs text-gray-400 italic">
                      {formik.values.githubLink
                        ? `Repo detectado: ${formik.values.githubLink}`
                        : "Primero ingresa el enlace de GitHub arriba 👆"}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading || (importMethod === 'github' && !formik.values.githubLink)}
                  className="w-full py-2 text-xs font-bold text-white bg-[#E68369] hover:bg-[#d67359] rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analizando...
                    </>
                  ) : (
                    "Analizar con Gemini"
                  )}
                </button>
              </div>
            </div>

            {/* Form */}
              {/* Title Field */}
              <div className="mb-3">
                <label htmlFor="title" className="block text-sm font-semibold text-white mb-2">
                  Título del Proyecto
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${formik.touched.title && formik.errors.title
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.title}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="mb-3">
                <label htmlFor="description" className="block text-sm font-semibold text-white mb-2">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${formik.touched.description && formik.errors.description
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.description}</p>
                )}
              </div>


              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="previewLink" className="block text-sm font-semibold text-white">
                    Enlace de Vista Previa
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDeployed"
                      checked={formik.values.isDeployed}
                      onChange={formik.handleChange}
                      disabled={loading}
                      className="w-4 h-4 text-[#E68369] bg-white/10 border-white/20 rounded focus:ring-[#E68369] focus:ring-offset-0 focus:ring-offset-[#131842]"
                    />
                    <span className="text-xs text-gray-300 select-none">Proyecto Desplegado</span>
                  </label>
                </div>

                {formik.values.isDeployed && (
                  <>
                    <input
                      type="text"
                      id="previewLink"
                      name="previewLink"
                      placeholder="https://mi-proyecto.com"
                      value={formik.values.previewLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={loading || !formik.values.isDeployed}
                      className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${formik.touched.previewLink && formik.errors.previewLink
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                        } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                    />
                    {formik.touched.previewLink && formik.errors.previewLink && (
                      <p className="mt-1 text-xs text-red-400">{formik.errors.previewLink}</p>
                    )}
                  </>
                )}
                {!formik.values.isDeployed && (
                  <div className="w-full px-3 py-2 text-sm text-gray-400 bg-white/5 border border-white/10 rounded-md italic">
                    Sin enlace de demostración (No desplegado)
                  </div>
                )}
              </div>

              {/* Technologies Field */}
              <div className="mb-3">
                <label htmlFor="technologies" className="block text-sm font-semibold text-white mb-2">
                  Tecnologías (Separadas por coma)
                </label>
                <input
                  type="text"
                  id="technologies"
                  name="technologies"
                  placeholder="React, Tailwind, Firebase"
                  value={formik.values.technologies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${formik.touched.technologies && formik.errors.technologies
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.technologies && formik.errors.technologies && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.technologies}</p>
                )}
              </div>

              {/* Status Field */}
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-semibold text-white mb-2">
                  Estado del Proyecto
                </label>
                <select
                  id="status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${formik.touched.status && formik.errors.status
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                    } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                >
                  <option value="Desarrollo">En Desarrollo</option>
                  <option value="Producción">En Producción</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.status}</p>
                )}
              </div>

              {/* Image Upload Section */}
              <div className="mb-4">
                <p className="block text-sm font-semibold text-white mb-2">
                  Imagen del Proyecto
                </p>

                {imagePreview ? (
                  <div className="relative inline-block w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-h-60 rounded-lg object-cover shadow-md border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={loading}
                      className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E68369] rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-2 text-[#E68369]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-1 text-sm font-semibold text-[#E68369]">
                        Clic para seleccionar imagen
                      </p>
                      <p className="text-xs text-gray-300">PNG, JPG, GIF (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={loading}
                    />
                  </label>
                )}

                {!isEditMode && !imagePreview && (
                  <p className="mt-1 text-xs text-red-400">
                    * La imagen es obligatoria para proyectos nuevos
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#E68369] to-[#d67359] rounded-md hover:from-[#d67359] hover:to-[#c66349] shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    isEditMode ? "Actualizar Proyecto" : "Crear Proyecto"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
                  disabled={loading}
                  className="sm:flex-none px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
