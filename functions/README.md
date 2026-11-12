# Cloud Functions — TecnoFusión

Este directorio contiene las Cloud Functions del proyecto `tecnofuision-it`.

---

## 1. getProjects

Endpoint público para listar proyectos del portfolio.

* **URL**: `https://us-central1-tecnofuision-it.cloudfunctions.net/getProjects`
* **Método**: `GET` (o `HEAD`)
* **Autenticación**: Ninguna (público)
* **CORS**: Permite orígenes conocidos del portfolio; define `Vary: Origin`.

### Parámetros Query

* `limit` (número, default 100, max 100): límite de proyectos devueltos.
* `locale` (string, opcional): código ISO (`es`, `en`, etc.).
* `dedupe` (boolean, opcional): si es `true` o `1`, deduplica por `title` conservando el más reciente.

---

## 2. addProject

Endpoint privado protegido con API Key para creación y actualización de proyectos (incluyendo carga de imágenes a Cloud Storage y registro en Firestore) sin requerir sesión web ni formulario interactivo.

* **URL**: `https://us-central1-tecnofuision-it.cloudfunctions.net/addProject`
* **Métodos**: `POST` (crear / upsert), `PATCH` (actualizar campos específicos), `OPTIONS` (preflight CORS)
* **Autenticación**: Header obligatorio `x-api-key: <PROJECTS_API_KEY>` (validación en tiempo constante con Secret Manager).
  * Clave ausente o incorrecta: responde `401 Unauthorized`.
* **CORS**: Orígenes permitidos (`localhost:5173`, dominios web.app y firebaseapp.com de TecnoFusión).

### Esquema del Body (JSON)

* `title` (string, 3-200 caracteres, obligatorio en creación): título del proyecto.
* `description` (string, máx 5000 caracteres, opcional): descripción del proyecto.
* `category` (string, máx 100 caracteres, opcional): categoría (ej. `Web Full Stack`, `Mobile`, `Automatización`). Default `General`.
* `status` (string, opcional): `Desarrollo` o `Producción`. Default `Desarrollo`.
* `technologies` (array de strings o string separada por comas, máx 50 items de máx 50 caracteres c/u, opcional): lista de tecnologías.
* `githubLink` (string URL http/https, máx 500 caracteres, opcional): enlace al repositorio.
* `previewLink` (string URL http/https, máx 500 caracteres, opcional): enlace de demostración o producción.
* `isDeployed` (boolean, opcional): indicador de despliegue. Si se omite, se infiere de la presencia de `previewLink`.
* `imageBase64` (string, opcional): imagen en base64 (PNG, JPG o WEBP, máx 5MB). Se sube a Cloud Storage bajo `projects/{id}/{timestamp}_image.{ext}` y se genera URL pública con token de descarga de Firebase Storage.
* `imageUrl` o `image` (string HTTPS, opcional): URL externa directa de imagen si no se sube base64.
* `readmeUrl` (string URL http/https, máx 1000 caracteres, opcional): URL del README.
* `readmeFileName` (string, máx 100 caracteres, opcional): nombre del archivo README.
* `id` (string, opcional en POST, opcional en PATCH si se provee title): ID de documento existente en Firestore.

*Nota*: Se rechaza cualquier campo no reconocido (`Unknown field`) con código `400 Bad Request`.

### Ejemplos de uso con `curl`

> **Nota de seguridad**: La API Key no debe imprimirse ni compartirse en repositorios. En local se almacena en `~/.config/tecnofusion/projects_api_key`.

#### A. Crear un nuevo proyecto con imagen Base64

```bash
API_KEY=$(cat ~/.config/tecnofusion/projects_api_key)
IMG_B64=$(base64 -w 0 path/to/image.png)

curl -X POST https://us-central1-tecnofuision-it.cloudfunctions.net/addProject   -H "Content-Type: application/json"   -H "x-api-key: $API_KEY"   -d "{
    "title": "Mi Proyecto Nuevo",
    "description": "Descripción del proyecto",
    "category": "Web Full Stack",
    "status": "Desarrollo",
    "technologies": ["React", "Node.js", "Firebase"],
    "githubLink": "https://github.com/usuario/repo",
    "previewLink": "https://miproyecto.web.app",
    "imageBase64": "$IMG_B64"
  }"
```

Respuesta exitosa (`200 OK`):
```json
{
  "success": true,
  "id": "xK7j8L9...",
  "image": "https://firebasestorage.googleapis.com/v0/b/tecnofuision-it.firebasestorage.app/o/projects%2FxK7j8L9...%2F1731450000000_image.png?alt=media&token=..."
}
```

#### B. Actualizar un proyecto existente por ID (PATCH)

```bash
API_KEY=$(cat ~/.config/tecnofusion/projects_api_key)

curl -X PATCH https://us-central1-tecnofuision-it.cloudfunctions.net/addProject   -H "Content-Type: application/json"   -H "x-api-key: $API_KEY"   -d '{
    "id": "xK7j8L9...",
    "status": "Producción",
    "previewLink": "https://miproyecto-prod.web.app"
  }'
```

#### C. Actualizar o crear por título (Deduplicación automática)

Si se envía un `POST` con un `title` idéntico a uno existente en Firestore, la función actualiza el registro existente en lugar de duplicarlo.

---

## Tests

Ejecutar la suite completa de pruebas unitarias (`node:test`):

```bash
cd functions
npm test
```

Cubre autenticación (`401`), validaciones y rechazo de campos desconocidos (`400`), creación y subida de imágenes, actualización / deduplicación y rollback/limpieza de Storage en caso de error en Firestore.

---

## Despliegue

```bash
firebase deploy --only functions:addProject --project tecnofuision-it
```

*Requisito*: Proyecto con cuenta de facturación activa (Plan Blaze de Firebase / GCP) para habilitación de `cloudbuild.googleapis.com` y `secretmanager.googleapis.com`.
