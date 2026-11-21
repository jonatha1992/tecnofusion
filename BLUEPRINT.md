# Tecnofusion.dev — Project Blueprint

> Estado vivo del proyecto. Lee este archivo al empezar cada sesión y actualízalo antes de terminar.
> Última actualización: 2026-11-19 — Rediseño completo 'The well-kept board' (Tablero Editorial & Muro Asimétrico) en rama `dev`.

## Estado de despliegue (2026-11-20)
- Menú: ya corregido en prod (version.json sha a038146). Fichas sin Demo/Código: el build de prod no traía `VITE_FIREBASE_*` (desde 6862616 quitó GitHub Actions y el desplegador builda sin env) -> `db=null` -> `fallbackProjects`. Fix: `.env.production` versionado con la config web pública de Firebase (de `/__/firebase/init.json`; sin keys de IA) + links reales en `fallbackProjects`.
- Bloqueo de deploy: en `home-server/deployer/apps.json` tecnofusion tiene `main.deploy=false` y componente `hosting` con `deploy: []`; solo hay preview `test`. Para publicar vía desplegador hay que activar `main.deploy=true` y agregar `npx firebase-tools@13 deploy --only hosting:tecnofusion-dev --project tecnofuision-it` (+ credenciales Firebase en el host).

## 1. Resumen
- **Qué hace**: Sitio oficial y estudio/portfolio técnico de Tecnofusion (`tecnofusion.dev`), enfocado en Sistemas Distribuidos, Ingeniería de Software Full-Stack, Sistemas con IA, Automatización Operativa y Productos SaaS propios en producción, con panel de administración en Firebase y asistente comercial con IA (Navi / Gemini).
- **Para quién**: Clientes de ingeniería de software, empresas que buscan desarrollo SaaS/IA a medida y presentación de productos propios en producción.
- **Stack**: React 18, Vite 8, Tailwind CSS v4, Firebase (Auth, Firestore, Storage, Hosting, Cloud Functions), Google Generative AI (Gemini), Vitest + Testing Library.
- **Repositorio**: `https://github.com/jonatha1992/tecnofusion.git` (carpeta local: `E:/tecnofusion`)
- **Rama activa**: `dev` (flujo obligatorio: `dev` -> `test` -> `main`)
- **URLs**: Prod: `https://tecnofusion.dev` (`https://tecnofusion-it.web.app`)

## 2. Arquitectura y estructura
```
E:/tecnofusion/
├── index.html                  # Fuentes Bricolage Grotesque + JetBrains Mono, SEO y metadatos
├── src/
│   ├── App.jsx                 # Ruteo público (/), legal (/privacidad, /terminos) y admin (/admin/*)
│   ├── index.css               # Tokens del tablero editorial (#F2EFE9, #DFDCD2, #1C1C1C, #8FA68E)
│   ├── components/
│   │   ├── Header.jsx          # Barra editorial compacta + acceso admin
│   │   ├── Layout.jsx          # Contenedor general + footer de celdas ('The mark, built large')
│   │   ├── Hero.jsx            # Tablero de primera pantalla ('The well-kept board', sin carrusel ni video)
│   │   ├── Projects.jsx        # Muro asimétrico de sistemas en producción (Firestore + fallback local)
│   │   ├── Servicios.jsx       # Capacidades Full-Stack, IA, SaaS y Datos ('Lead line' + 'Statement cell')
│   │   ├── Contact.jsx         # Celda de acción conectada a WhatsApp, Google Sheets y Navi AI
│   │   ├── CustomerAssistant.jsx # Asistente Navi AI con puente localStorage hacia Contact
│   │   └── modals/             # ProjectDetailsModal.jsx y ReadmeModal.jsx
│   ├── data/projectCovers.js   # Mapa de portadas SVG locales por proyecto
│   └── services/               # projectService.js, firebase.js, geminiService.js
├── public/assets/projects/     # Especímenes SVG reales de sistemas en producción
└── test/                       # Suite unitaria e integración (Vitest)
```

## 3. Cómo correr y probar
- **Instalar**: `npm install`
- **Desarrollo**: `npm run dev`
- **Tests**: `npm test -- --run`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **VS Code (F5)**: `.vscode/launch.json` y `.vscode/tasks.json` configurados para levantar Vite y correr tests.

## 4. Estado de funcionalidades
| Módulo / Feature | Estado | Notas |
|---|---|---|
| Tablero Hero ('The well-kept board') | ✅ Listo | Grilla 12 cols, sin `react-slick` ni video pesado, especímenes SVG reales |
| Muro Asimétrico de Proyectos | ✅ Listo | Carga Firestore + fallback local resiliente, modales de ficha y README |
| Sección Servicios (Full-Stack, IA, SaaS) | ✅ Listo | Sin CCTV, sin emojis, sin fotos genéricas de Unsplash |
| Contacto + Puente Navi AI | ✅ Listo | Envío a WhatsApp + Google Sheets + autocompletado desde el chat |
| Panel Admin (`/admin/dashboard`) | ✅ Listo | CRUD de proyectos protegido con Firebase Auth |

## 5. Historial de sesiones
### 2026-11-19
- **Hicimos**: Rediseño integral de `tecnofusion.dev` bajo la dirección 1 elegida por Jonatan (**Tablero Editorial & Muro Asimétrico / 'The well-kept board'**, seed `850491372` de `design-taste-frontend`). Eliminación de carrusel/video en Hero, retiro de Seguridad CCTV, emojis y fotos de Unsplash en Servicios, actualización tipográfica a `Bricolage Grotesque` y paleta cálida `#F2EFE9` + charcoal `#1C1C1C` + sage `#8FA68E`.
- **Decisiones**: Posicionar el estudio 100% en Ingeniería de Software Full-Stack, Sistemas con IA, Automatización y Productos SaaS propios.
- **Quedó pendiente**: Revisión visual final de Jonatan antes de commit/promote a `test`.
