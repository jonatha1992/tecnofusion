import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const PROJECTS_COLLECTION = "projects";

/**
 * Sube una imagen a Firebase Storage
 * @param {File} file - Archivo de imagen
 * @param {string} projectId - ID del proyecto (para organizar carpetas)
 * @returns {Promise<string>} URL de descarga de la imagen
 */
export const uploadProjectImage = async (file, projectId) => {
  if (!file) throw new Error("No se proporcionó ningún archivo");

  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `projects/${projectId}/${fileName}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

/**
 * Sube un archivo README a Firebase Storage
 * @param {File} file - Archivo README (.md o .txt)
 * @param {string} projectId - ID del proyecto
 * @returns {Promise<string>} URL de descarga del README
 */
export const uploadProjectReadme = async (file, projectId) => {
  if (!file) throw new Error("No se proporcionó ningún archivo README");

  // Usar nombre fijo o timestamp, un nombre fijo 'README.md' es más limpio si solo habrá uno
  // Pero para evitar problemas de caché, usaremos timestamp
  const timestamp = Date.now();
  const fileName = `${timestamp}_README.md`;
  const storageRef = ref(storage, `projects/${projectId}/${fileName}`);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

/**
 * Elimina una imagen de Firebase Storage
 * @param {string} imageUrl - URL de la imagen a eliminar
 */
export const deleteProjectImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
  }
};

/**
 * Obtiene todos los proyectos de Firestore
 * @returns {Promise<Array>} Lista de proyectos ordenados por fecha (más recientes primero)
 */
export const getAllProjects = async () => {
  // Obtenemos sin orderBy para evitar requerir índices en Firestore
  // El ordenamiento se hace en el cliente
  const projectsQuery = query(collection(db, PROJECTS_COLLECTION));

  const querySnapshot = await getDocs(projectsQuery);
  const projects = [];

  querySnapshot.forEach((doc) => {
    projects.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  // Ordenar en el cliente por createdAt (más recientes primero)
  projects.sort((a, b) => {
    // Manejar timestamps de Firestore (objeto con método toDate) y fechas regulares
    const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0);
    const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0);
    return dateB - dateA; // Descendente (más recientes primero)
  });

  return projects;
};

/**
 * Obtiene un proyecto por su ID
 * @param {string} projectId - ID del proyecto
 * @returns {Promise<Object>} Datos del proyecto
 */
export const getProjectById = async (projectId) => {
  const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
  const projectSnap = await getDoc(projectRef);

  if (projectSnap.exists()) {
    return {
      id: projectSnap.id,
      ...projectSnap.data(),
    };
  } else {
    throw new Error("Proyecto no encontrado");
  }
};

/**
 * Crea un nuevo proyecto
 * @param {Object} projectData - Datos del proyecto
 * @param {File} imageFile - Archivo de imagen (opcional)
 * @returns {Promise<string>} ID del proyecto creado
 */
/**
 * Crea un nuevo proyecto
 * @param {Object} projectData - Datos del proyecto
 * @param {File} imageFile - Archivo de imagen (opcional)
 * @param {File} readmeFile - Archivo README (opcional)
 * @returns {Promise<string>} ID del proyecto creado
 */
export const createProject = async (projectData, imageFile, readmeFile) => {
  // Crear documento primero para obtener ID
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...projectData,
    image: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  // Si hay imagen, subirla y actualizar el documento
  if (imageFile) {
    const imageUrl = await uploadProjectImage(imageFile, docRef.id);
    await updateDoc(doc(db, PROJECTS_COLLECTION, docRef.id), {
      image: imageUrl,
    });
  }

  // Si hay README, subirlo y actualizar documento
  if (readmeFile) {
    const readmeUrl = await uploadProjectReadme(readmeFile, docRef.id);
    await updateDoc(doc(db, PROJECTS_COLLECTION, docRef.id), {
      readmeUrl: readmeUrl,
    });
  }

  return docRef.id;
};

/**
 * Actualiza un proyecto existente
 * @param {string} projectId - ID del proyecto
 * @param {Object} projectData - Datos actualizados del proyecto
 * @param {File} imageFile - Nuevo archivo de imagen (opcional)
 * @returns {Promise<void>}
 */
/**
 * Actualiza un proyecto existente
 * @param {string} projectId - ID del proyecto
 * @param {Object} projectData - Datos actualizados del proyecto
 * @param {File} imageFile - Nuevo archivo de imagen (opcional)
 * @param {File} readmeFile - Nuevo archivo README (opcional)
 * @returns {Promise<void>}
 */
export const updateProject = async (projectId, projectData, imageFile, readmeFile) => {
  const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
  const updateData = {
    ...projectData,
    updatedAt: serverTimestamp(),
  };

  // Si hay nueva imagen, eliminar la anterior y subir la nueva
  if (imageFile) {
    const currentProject = await getProjectById(projectId);

    // Eliminar imagen anterior si existe y es de Firebase Storage
    if (currentProject.image && currentProject.image.includes("firebase")) {
      await deleteProjectImage(currentProject.image);
    }

    // Subir nueva imagen
    const imageUrl = await uploadProjectImage(imageFile, projectId);
    updateData.image = imageUrl;
  }

  // Si hay nuevo README, subirlo y actualizar URL
  if (readmeFile) {
    try {
      const readmeUrl = await uploadProjectReadme(readmeFile, projectId);
      updateData.readmeUrl = readmeUrl;
    } catch (e) {
      console.error("Error al subir README:", e);
    }
  }

  await updateDoc(projectRef, updateData);
};

/**
 * Elimina un proyecto
 * @param {string} projectId - ID del proyecto a eliminar
 * @returns {Promise<void>}
 */
export const deleteProject = async (projectId) => {
  // Obtener datos del proyecto para eliminar imagen
  const project = await getProjectById(projectId);

  // Eliminar imagen si existe y es de Firebase Storage
  if (project.image && project.image.includes("firebase")) {
    await deleteProjectImage(project.image);
  }

  // Eliminar documento
  await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
};
