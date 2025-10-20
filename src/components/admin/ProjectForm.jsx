import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProject,
  updateProject,
  getProjectById,
} from "../../services/projectService";
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
  previewLink: Yup.string()
    .required("El enlace de vista previa es obligatorio"),
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

  // Clave de localStorage para el formulario
  const FORM_STORAGE_KEY = `project-form-${isEditMode ? id : 'new'}`;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      githubLink: "",
      previewLink: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        if (isEditMode) {
          await updateProject(id, values, imageFile);
          toast.success("Proyecto actualizado exitosamente");
        } else {
          if (!imageFile && !imagePreview) {
            setError("Debes seleccionar una imagen para el proyecto");
            setLoading(false);
            return;
          }
          await createProject(values, imageFile);
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
        previewLink: project.previewLink,
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

            {/* Form */}
            <form onSubmit={formik.handleSubmit}>
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
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    formik.touched.title && formik.errors.title
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
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${
                    formik.touched.description && formik.errors.description
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.description}</p>
                )}
              </div>

              {/* GitHub Link Field */}
              <div className="mb-3">
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
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    formik.touched.githubLink && formik.errors.githubLink
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.githubLink && formik.errors.githubLink && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.githubLink}</p>
                )}
              </div>

              {/* Preview Link Field */}
              <div className="mb-4">
                <label htmlFor="previewLink" className="block text-sm font-semibold text-white mb-2">
                  Enlace de Vista Previa
                </label>
                <input
                  type="text"
                  id="previewLink"
                  name="previewLink"
                  placeholder="https://mi-proyecto.com"
                  value={formik.values.previewLink}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                  className={`w-full px-3 py-2 text-sm text-gray-900 bg-white border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    formik.touched.previewLink && formik.errors.previewLink
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#E68369] focus:border-[#E68369]'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                />
                {formik.touched.previewLink && formik.errors.previewLink && (
                  <p className="mt-1 text-xs text-red-400">{formik.errors.previewLink}</p>
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
