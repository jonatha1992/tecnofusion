# 🔥 Configuración de Firebase - Guía Paso a Paso

## ✅ Paso 1: Credenciales - COMPLETADO

Ya tienes las credenciales configuradas en `.env.local`:
- ✅ API Key
- ✅ Auth Domain
- ✅ Project ID: `tecnofuision-it`
- ✅ Storage Bucket
- ✅ App ID

## 📋 Pasos Siguientes en Firebase Console

Ve a: https://console.firebase.google.com/project/tecnofuision-it

---

## 🔐 Paso 2: Habilitar Authentication

### 2.1 Ir a Authentication
1. En el menú lateral, click en **"Authentication"** (🔐)
2. Click en **"Get started"** (si es la primera vez)

### 2.2 Habilitar Email/Password
1. Click en la pestaña **"Sign-in method"**
2. Busca **"Email/Password"**
3. Click en **"Email/Password"**
4. **Habilita** el toggle (debe quedar azul)
5. NO habilites "Email link" (solo Email/Password)
6. Click **"Save"**

✅ Authentication configurado!

---

## 🗄️ Paso 3: Configurar Firestore Database

### 3.1 Crear Base de Datos
1. En el menú lateral, click en **"Firestore Database"** (🗄️)
2. Click en **"Create database"**

### 3.2 Modo de Inicio
- Selecciona: **"Start in production mode"**
- Click **"Next"**

### 3.3 Ubicación
- Selecciona la ubicación más cercana (ej: `southamerica-east1` para Argentina)
- Click **"Enable"**

### 3.4 Configurar Reglas de Seguridad
1. Click en la pestaña **"Rules"**
2. Reemplaza todo el contenido con esto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colección de proyectos
    match /projects/{project} {
      // Cualquiera puede leer proyectos (para la web pública)
      allow read: if true;

      // Solo usuarios autenticados pueden crear/editar/eliminar
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

✅ Firestore configurado!

---

## 📦 Paso 4: Configurar Firebase Storage

### 4.1 Crear Storage
1. En el menú lateral, click en **"Storage"** (📦)
2. Click en **"Get started"**

### 4.2 Reglas de Seguridad
- Selecciona: **"Start in production mode"**
- Click **"Next"**

### 4.3 Ubicación
- Usa la misma ubicación que Firestore
- Click **"Done"**

### 4.4 Configurar Reglas de Seguridad
1. Click en la pestaña **"Rules"**
2. Reemplaza todo el contenido con esto:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Carpeta de proyectos
    match /projects/{allPaths=**} {
      // Cualquiera puede leer imágenes (para la web pública)
      allow read: if true;

      // Solo usuarios autenticados pueden subir/modificar/eliminar
      allow write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

✅ Storage configurado!

---

## 👤 Paso 5: Crear Usuario Administrador

### 5.1 Agregar Usuario
1. Ve a **"Authentication"** → Pestaña **"Users"**
2. Click en **"Add user"**

### 5.2 Ingresar Credenciales
```
Email: admin@tecnofusion.com
Password: [Elige una contraseña segura]
```

**Recomendaciones para la contraseña:**
- Mínimo 8 caracteres
- Mayúsculas y minúsculas
- Números y símbolos
- Ejemplo: `TecnoAdmin2025!`

3. Click **"Add user"**

✅ Usuario administrador creado!

**🔒 IMPORTANTE:** Guarda estas credenciales de forma segura. Las necesitarás para acceder al panel de administración.

---

## 🧪 Paso 6: Probar el Sistema

### 6.1 Reiniciar Servidor de Desarrollo

Después de actualizar `.env.local`, reinicia el servidor:

```bash
# Detén el servidor (Ctrl + C si está corriendo)
# Luego reinicia:
npm run dev
```

### 6.2 Acceder al Panel de Admin

1. Abre: http://localhost:5173/admin/login
2. Ingresa las credenciales del admin que creaste
3. Deberías ver el Dashboard vacío

### 6.3 Crear Primer Proyecto de Prueba

1. Click en **"Nuevo Proyecto"**
2. Completa el formulario:
   ```
   Título: Proyecto de Prueba
   Descripción: Este es un proyecto de prueba para validar el sistema ABM
   GitHub Link: https://github.com/tecnofusion/test
   Preview Link: https://test.tecnofusion.dev
   Imagen: Selecciona cualquier imagen de tu PC
   ```
3. Click **"Crear Proyecto"**

### 6.4 Verificar en Firebase Console

1. Ve a Firestore Database
2. Deberías ver:
   - Colección: `projects`
   - Documento con los datos del proyecto

3. Ve a Storage
4. Deberías ver:
   - Carpeta: `projects/[id-del-proyecto]`
   - Imagen subida

### 6.5 Verificar en la Web Pública

1. Ve a: http://localhost:5173/
2. Scroll hasta la sección "Proyectos"
3. Deberías ver tu proyecto de prueba junto con los proyectos de ejemplo

✅ Sistema funcionando correctamente!

---

## 📊 Verificación Visual en Firebase Console

### Firestore Database
```
📁 projects (collection)
  └── 📄 abc123xyz (document)
      ├── title: "Proyecto de Prueba"
      ├── description: "Este es un proyecto..."
      ├── image: "https://firebasestorage.googleapis.com/..."
      ├── githubLink: "https://github.com/..."
      ├── previewLink: "https://test.tecnofusion.dev"
      ├── createdAt: January 18, 2025 at 3:45:00 PM UTC-3
      └── updatedAt: January 18, 2025 at 3:45:00 PM UTC-3
```

### Storage
```
📦 tecnofuision-it.appspot.com
  └── 📁 projects
      └── 📁 abc123xyz
          └── 🖼️ 1234567890_imagen.jpg
```

---

## 🎯 Resumen de URLs

- **Firebase Console:** https://console.firebase.google.com/project/tecnofuision-it
- **Web Local:** http://localhost:5173
- **Admin Local:** http://localhost:5173/admin/login
- **Proyecto ID:** `tecnofuision-it`

---

## 🐛 Troubleshooting

### Error: "Firebase: Error (auth/invalid-api-key)"
- ✅ Ya está resuelto - credenciales actualizadas en `.env.local`

### Error: "Missing or insufficient permissions"
- Verifica las reglas de Firestore
- Asegúrate de estar autenticado

### Error: "Storage: User does not have permission"
- Verifica las reglas de Storage
- Asegúrate de estar autenticado

### Las imágenes no se cargan
1. Ve a Firebase Console → Storage → Rules
2. Verifica que `allow read: if true;` esté presente
3. Click "Publish"

### No puedo iniciar sesión
1. Ve a Authentication → Users
2. Verifica que el usuario exista
3. Intenta resetear la contraseña desde Firebase Console

---

## 🎉 ¡Listo!

Si completaste todos los pasos, tu sistema ABM está 100% funcional:

✅ Firebase configurado
✅ Authentication habilitada
✅ Firestore Database lista
✅ Storage configurado
✅ Usuario admin creado
✅ Sistema probado y funcionando

**Próximo paso:** Deploy a producción con Firebase Hosting (ver DEPLOY_FIREBASE.md)

---

## 📞 Contacto

¿Necesitas ayuda? Revisa:
- [ABM_PROYECTOS.md](ABM_PROYECTOS.md) - Documentación completa del sistema
- [DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md) - Guía de deploy
- [Firebase Docs](https://firebase.google.com/docs) - Documentación oficial
