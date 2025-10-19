# Configurar Reglas de Seguridad en Firebase

## Problema
Estás viendo este error: **"Missing or insufficient permissions"**

Esto significa que Firestore no permite leer/escribir datos porque las reglas de seguridad están bloqueando el acceso.

## Solución Rápida (Consola de Firebase)

### Opción 1: Configurar desde Firebase Console (Recomendado para producción)

1. **Ve a Firebase Console**: https://console.firebase.google.com
2. **Selecciona tu proyecto**: `tecnofusion` o el nombre de tu proyecto
3. **Navega a Firestore Database**:
   - En el menú lateral izquierdo, busca "Firestore Database"
   - Haz clic en la pestaña **"Reglas"** (Rules)

4. **Copia y pega estas reglas**:
   ```javascript
   rules_version = '2';

   service cloud.firestore {
     match /databases/{database}/documents {

       // Reglas para la colección de proyectos
       match /projects/{projectId} {
         // Permitir lectura pública (para que todos vean los proyectos)
         allow read: if true;

         // Permitir escritura solo a usuarios autenticados
         allow write: if request.auth != null;
       }

       // Denegar acceso a otras colecciones por defecto
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```

5. **Haz clic en "Publicar"** (Publish)

### Opción 2: Configurar desde Firebase Console (Storage)

1. **Ve a Firebase Console**: https://console.firebase.google.com
2. **Navega a Storage**:
   - En el menú lateral, busca "Storage"
   - Haz clic en la pestaña **"Reglas"** (Rules)

3. **Copia y pega estas reglas**:
   ```javascript
   rules_version = '2';

   service firebase.storage {
     match /b/{bucket}/o {

       // Reglas para las imágenes de proyectos
       match /projects/{projectId}/{fileName} {
         // Permitir lectura pública
         allow read: if true;

         // Permitir escritura solo a usuarios autenticados
         allow write: if request.auth != null;
       }

       // Denegar acceso a otras rutas por defecto
       match /{allPaths=**} {
         allow read, write: if false;
       }
     }
   }
   ```

4. **Haz clic en "Publicar"** (Publish)

---

## Solución Automática (Firebase CLI)

Si prefieres usar la terminal, sigue estos pasos:

### 1. Desplegar las reglas con Firebase CLI

```bash
# Desplegar solo las reglas de Firestore
firebase deploy --only firestore:rules

# Desplegar solo las reglas de Storage
firebase deploy --only storage:rules

# O desplegar ambas a la vez
firebase deploy --only firestore:rules,storage:rules
```

### 2. Verificar que se desplegaron correctamente

```bash
firebase firestore:rules:list
```

---

## Explicación de las Reglas

### Firestore Rules
- **Lectura pública**: Cualquiera puede leer los proyectos (para mostrarlos en la web)
- **Escritura autenticada**: Solo usuarios logueados pueden crear/editar/eliminar proyectos

### Storage Rules
- **Lectura pública**: Cualquiera puede ver las imágenes de proyectos
- **Escritura autenticada**: Solo usuarios logueados pueden subir/eliminar imágenes

---

## Después de configurar las reglas

1. **Recarga tu aplicación** en el navegador
2. **Inicia sesión** con tu cuenta de Firebase
3. **Navega a "Gestión"** en el navbar
4. **Deberías ver el Dashboard** sin errores de permisos

---

## Notas Importantes

⚠️ **Seguridad**: Las reglas actuales permiten que solo usuarios autenticados modifiquen los proyectos. Esto es seguro para tu caso de uso.

⚠️ **Lectura pública**: Los proyectos son visibles públicamente (necesario para que los visitantes del sitio los vean).

💡 **Producción**: Estas reglas están listas para producción. No necesitas cambiarlas a menos que quieras añadir más restricciones.

---

## Archivos Creados

- `firestore.rules` - Reglas de seguridad para Firestore
- `storage.rules` - Reglas de seguridad para Firebase Storage
- `firebase.json` - Configuración actualizada para incluir las reglas
