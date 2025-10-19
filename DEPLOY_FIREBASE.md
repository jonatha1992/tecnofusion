# 🚀 Deploy a Firebase Hosting - Guía Rápida

## Por qué Firebase Hosting es Mejor que GitHub Pages

✅ **Gratis** - Plan Spark generoso
✅ **CDN Global** - Ultra rápido en todo el mundo
✅ **HTTPS Automático** - Certificado SSL gratis
✅ **Funciona con tu ABM** - Ya tienes Firebase configurado
✅ **Dominio Custom** - Puedes usar tecnofusion.com
✅ **Rollback fácil** - Volver a versiones anteriores

## 🎯 Setup en 3 Pasos (5 minutos)

### Paso 1: Login en Firebase

```bash
firebase login
```

Se abrirá el navegador, inicia sesión con tu cuenta de Google.

### Paso 2: Inicializar Hosting

```bash
firebase init hosting
```

**Responde así:**

1. **Use an existing project** → Elige tu proyecto de Firebase
2. **What do you want to use as your public directory?** → `dist`
3. **Configure as a single-page app?** → `Yes`
4. **Set up automatic builds with GitHub?** → `No` (opcional, puedes hacerlo después)
5. **File dist/index.html already exists. Overwrite?** → `No`

### Paso 3: Build y Deploy

```bash
# Build de producción
npm run build

# Deploy a Firebase
firebase deploy --only hosting
```

**¡Listo!** 🎉 Te dará una URL tipo:
```
https://tu-proyecto.web.app
https://tu-proyecto.firebaseapp.com
```

## 📝 Comandos Útiles

```bash
# Ver proyectos disponibles
firebase projects:list

# Ver preview local antes de deploy
firebase serve

# Deploy completo
npm run build && firebase deploy --only hosting

# Ver historial de deploys
firebase hosting:channel:list

# Rollback a versión anterior
firebase hosting:rollback
```

## 🔄 Deploy Automático desde GitHub (Opcional)

Si quieres auto-deploy en cada push:

```bash
firebase init hosting:github
```

Esto configurará GitHub Actions para deploy automático.

## 🌐 Configurar Dominio Custom (Opcional)

1. Ve a Firebase Console → Hosting
2. Click "Add custom domain"
3. Ingresa tu dominio (ej: tecnofusion.com)
4. Sigue las instrucciones de DNS

## 💡 Script para Package.json

Agrega esto a tus scripts en `package.json`:

```json
"scripts": {
  "deploy": "npm run build && firebase deploy --only hosting",
  "deploy:preview": "npm run build && firebase hosting:channel:deploy preview"
}
```

Luego solo ejecuta:
```bash
npm run deploy
```

## 🆚 Comparación: Firebase vs GitHub Pages

| Característica | Firebase Hosting | GitHub Pages |
|----------------|------------------|--------------|
| **Precio** | Gratis (10GB/mes) | Gratis (100GB/mes) |
| **CDN Global** | ✅ Si | ❌ No |
| **HTTPS Custom** | ✅ Automático | ⚠️ Solo con config |
| **SPA Support** | ✅ Nativo | ⚠️ Requiere workarounds |
| **Backend** | ✅ Firebase + Functions | ❌ Solo estático |
| **Deploy** | CLI o GitHub Actions | Solo Git push |
| **Rollback** | ✅ Fácil | ❌ Manual con git |
| **Preview URLs** | ✅ Si | ❌ No |

## ⚠️ Importante

### Variables de Entorno en Firebase

Las variables de entorno de Vite (`VITE_*`) se incluyen en el build, así que:

1. **NO** pongas secretos en `.env.local`
2. Las API keys de Firebase son **públicas** (están protegidas por reglas de seguridad)
3. Para secretos reales, usa Firebase Functions

### Build Correcto

Asegúrate de que `vite.config.js` tenga:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/' // Importante para rutas
})
```

## 🐛 Troubleshooting

### Error: "Firebase command not found"
```bash
npm install -g firebase-tools
```

### Error: "Project not found"
```bash
firebase use --add
# Selecciona tu proyecto
```

### La página muestra en blanco
- Verifica que `public directory` sea `dist`
- Asegúrate de ejecutar `npm run build` antes de deploy
- Revisa la consola del navegador (F12)

### Las rutas no funcionan (404)
- Verifica que `firebase.json` tenga la configuración de rewrites
- Debe estar configurado como SPA

## 🎁 Bonus: Deploy Preview

Para ver cambios antes de producción:

```bash
npm run build
firebase hosting:channel:deploy preview
```

Te da una URL temporal para testing.

## 📊 Estadísticas y Monitoreo

En Firebase Console → Hosting puedes ver:
- Requests por día
- Bandwidth usado
- Errores 404
- Tiempo de carga

---

**¿Necesitas ayuda?** Revisa la [documentación oficial](https://firebase.google.com/docs/hosting)
