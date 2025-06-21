# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Configuración de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```
VITE_FIREBASE_API_KEY=<tu_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<tu_auth_domain>
VITE_FIREBASE_PROJECT_ID=<tu_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<tu_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<tu_messaging_sender_id>
VITE_FIREBASE_APP_ID=<tu_app_id>

VITE_EMAILJS_SERVICE_ID=<tu_service_id>
VITE_EMAILJS_TEMPLATE_ID=<tu_template_id>
VITE_EMAILJS_CONFIRM_TEMPLATE_ID=<tu_template_confirm_id>
VITE_EMAILJS_PUBLIC_KEY=<tu_public_key>
```

Estas variables se utilizan en `src/firebase.js` y `src/components/Contact.jsx` para configurar Firebase y EmailJS respectivamente.
