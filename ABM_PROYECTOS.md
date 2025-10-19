# Sistema ABM de Proyectos - Tecnofusión.IT

## Descripción General

Sistema completo de administración (Alta, Baja, Modificación) para gestionar los proyectos que se muestran en el portafolio de Tecnofusión.IT. Incluye autenticación, panel de administración, gestión de imágenes en Firebase Storage y almacenamiento en Firestore.

## Características Implementadas

### 🔐 Autenticación
- Login de administrador con Firebase Authentication
- Rutas protegidas con validación de sesión
- Redirección automática según estado de autenticación
- Manejo de errores de autenticación con mensajes descriptivos

### 📊 Panel de Administración
- Dashboard con listado completo de proyectos
- Vista de tabla con información clave de cada proyecto
- Imágenes en miniatura de cada proyecto
- Enlaces directos a GitHub y Demo de cada proyecto
- Botones de acción (Editar/Eliminar) para cada proyecto
- Contador de proyectos totales
- Información del usuario logueado

### ✏️ Formulario ABM
- **Alta**: Creación de nuevos proyectos
- **Baja**: Eliminación de proyectos con confirmación
- **Modificación**: Edición de proyectos existentes
- Validación de formularios con Formik y Yup
- Carga de imágenes con preview
- Validación de tipo y tamaño de imágenes (máx 5MB)
- Feedback visual durante operaciones (loading states)

### 🖼️ Gestión de Imágenes
- Upload de imágenes a Firebase Storage
- Preview de imágenes antes de guardar
- Eliminación automática de imágenes antiguas al actualizar
- Organización por proyecto en Storage
- Soporte para URLs externas e imágenes locales

### 💾 Base de Datos
- Almacenamiento en Firestore
- Timestamps automáticos (createdAt, updatedAt)
- Ordenamiento por fecha de creación
- Sistema de fallback con proyectos por defecto

## Estructura de Archivos

```
src/
├── components/
│   ├── admin/
│   │   ├── Login.jsx              # Pantalla de login
│   │   ├── Dashboard.jsx          # Panel de administración
│   │   ├── ProjectForm.jsx        # Formulario ABM
│   │   └── PrivateRoute.jsx       # Protección de rutas
│   └── Projects.jsx               # Vista pública de proyectos
├── context/
│   └── AuthContext.jsx            # Contexto de autenticación
├── services/
│   └── projectService.js          # Servicios CRUD
└── firebase.js                    # Configuración Firebase
```

## Rutas del Sistema

### Públicas
- `/` - Página principal del portafolio

### Administración (Protegidas)
- `/admin/login` - Inicio de sesión
- `/admin/dashboard` - Panel de administración
- `/admin/projects/new` - Crear nuevo proyecto
- `/admin/projects/edit/:id` - Editar proyecto existente

## Configuración Inicial

### 1. Variables de Entorno

Asegúrate de tener configurado tu `.env.local` con las credenciales de Firebase:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 2. Configurar Firebase

#### En Firebase Console:

1. **Habilitar Authentication**
   - Ve a Authentication > Sign-in method
   - Habilita "Email/Password"
   - Crea un usuario administrador

2. **Crear base de datos Firestore**
   - Ve a Firestore Database
   - Crea la base de datos en modo producción
   - Configura las reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública de proyectos
    match /projects/{project} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Habilitar Firebase Storage**
   - Ve a Storage
   - Crea el bucket de storage
   - Configura las reglas de seguridad:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Crear Usuario Administrador

Desde Firebase Console:
- Ve a Authentication > Users
- Click en "Add user"
- Ingresa email y contraseña
- Guarda las credenciales de forma segura

## Uso del Sistema

### Iniciar Sesión

1. Navega a `http://localhost:5173/admin/login`
2. Ingresa las credenciales del administrador
3. Serás redirigido al dashboard

### Crear Nuevo Proyecto

1. Desde el dashboard, click en "Nuevo Proyecto"
2. Completa el formulario:
   - **Título**: Nombre del proyecto
   - **Descripción**: Descripción detallada
   - **Enlace de GitHub**: URL del repositorio
   - **Enlace de Vista Previa**: URL del demo/producción
   - **Imagen**: Selecciona una imagen (obligatorio)
3. Click en "Crear Proyecto"

### Editar Proyecto

1. Desde el dashboard, click en el ícono de edición (lápiz)
2. Modifica los campos deseados
3. Opcionalmente, cambia la imagen
4. Click en "Actualizar Proyecto"

### Eliminar Proyecto

1. Desde el dashboard, click en el ícono de eliminación (papelera)
2. Confirma la acción en el diálogo
3. El proyecto y su imagen serán eliminados permanentemente

## Estructura de Datos

### Proyecto en Firestore

```javascript
{
  title: String,              // Título del proyecto
  description: String,        // Descripción detallada
  githubLink: String,         // URL del repositorio GitHub
  previewLink: String,        // URL del demo/producción
  image: String,              // URL de la imagen en Storage
  createdAt: Timestamp,       // Fecha de creación
  updatedAt: Timestamp        // Fecha de última actualización
}
```

## Validaciones

### Formulario
- **Título**: Mínimo 3 caracteres, obligatorio
- **Descripción**: Mínimo 10 caracteres, obligatorio
- **GitHub Link**: URL válida, obligatorio
- **Preview Link**: URL válida, obligatorio
- **Imagen**: Obligatoria para proyectos nuevos

### Imágenes
- Formatos permitidos: JPG, PNG, GIF, WebP
- Tamaño máximo: 5MB
- Dimensiones recomendadas: 800x600px

## Notificaciones

El sistema utiliza React Toastify para mostrar notificaciones:
- ✅ Éxito al crear/editar/eliminar
- ❌ Errores durante operaciones
- ⚠️ Validaciones del formulario

## Sistema de Fallback

Si no hay conexión a Firestore o no hay proyectos creados, la página pública muestra proyectos de ejemplo predefinidos para mantener la presentación del portafolio.

## Seguridad

### Implementada
- ✅ Autenticación requerida para acceso al panel
- ✅ Rutas protegidas con PrivateRoute
- ✅ Validación de sesión en cada operación
- ✅ Reglas de Firestore para escritura autenticada

### Recomendaciones Adicionales
- 🔒 Habilitar 2FA para cuenta de administrador
- 🔒 Configurar dominios autorizados en Firebase
- 🔒 Revisar logs de acceso regularmente
- 🔒 Usar variables de entorno para producción

## Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

## Tecnologías Utilizadas

- **React 18** - Framework frontend
- **React Router DOM 6** - Enrutamiento
- **Firebase Auth** - Autenticación
- **Firestore** - Base de datos NoSQL
- **Firebase Storage** - Almacenamiento de imágenes
- **Material-UI v5** - Componentes de UI
- **Formik** - Gestión de formularios
- **Yup** - Validación de esquemas
- **React Toastify** - Notificaciones
- **Framer Motion** - Animaciones

## Troubleshooting

### Error: "Firebase not configured"
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de reiniciar el servidor después de modificar `.env.local`

### Error: "Permission denied"
- Verifica las reglas de seguridad en Firestore y Storage
- Asegúrate de estar autenticado correctamente

### Imágenes no se cargan
- Verifica las reglas de Storage
- Asegúrate de que el bucket de Storage esté habilitado
- Revisa la consola del navegador para errores de CORS

### No puedo iniciar sesión
- Verifica que el usuario exista en Firebase Authentication
- Asegúrate de que Email/Password esté habilitado
- Revisa las credenciales ingresadas

## Próximas Mejoras Sugeridas

- [ ] Agregar paginación en el dashboard
- [ ] Implementar búsqueda y filtros
- [ ] Agregar categorías/tags a los proyectos
- [ ] Estadísticas de proyectos en el dashboard
- [ ] Historial de cambios (audit log)
- [ ] Múltiples imágenes por proyecto (galería)
- [ ] Ordenamiento drag & drop de proyectos
- [ ] Export/Import de proyectos
- [ ] Modo oscuro en panel de admin
- [ ] Notificaciones push para nuevos proyectos

## Soporte

Para problemas o preguntas sobre el sistema ABM, contactar al equipo de desarrollo de Tecnofusión.IT.

---

**Versión**: 1.0.0
**Última actualización**: Enero 2025
**Desarrollado por**: Tecnofusión.IT
