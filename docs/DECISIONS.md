# Decisiones — tecnofusion

Registro de decisiones del repo (se actualiza en cada `promote-to-test`).

Formato por entrada: `## YYYY-MM-DD — título` con Contexto, Decisión, Alternativas descartadas, Motivo, Impacto, Ticket/commit.

---

## 2026-11-20 — Rediseño editorial "The well-kept board" y enfoque en sistemas distribuidos

- **Contexto:** El sitio anterior heredaba un tema oscuro genérico (`#131842`), carrusel `react-slick` con video pesado en el Hero, partículas decorativas, fotos de Unsplash y servicios de CCTV que ya no reflejaban la propuesta central del estudio.
- **Decisión:** Adoptar la dirección 1 (*Tablero Editorial & Muro Asimétrico / The well-kept board*): tipografía `Bricolage Grotesque` + `JetBrains Mono`, paleta clara cálida (`#F2EFE9` / `#DFDCD2`) con bloques charcoal (`#1C1C1C`) y acento sage (`#8FA68E`), Hero de hoja dividida, muro asimétrico de 12 columnas con `SPAN_CLASSES` estáticas, servicios orientados a Sistemas Distribuidos, Ingeniería Full-Stack, IA Aplicada y Productos SaaS propios, y fallback resiliente cuando Firebase corre sin credenciales locales.
- **Alternativas descartadas:** (2) Ingeniería Suiza & Especímenes Técnicos (grilla 1px estilo Linear/Raycast); (3) Estudio Creativo de Alto Contraste (Nothing/Vercel oscuro); mantener o pulir el tema oscuro anterior.
- **Motivo:** Diferenciar la identidad visual frente a plantillas SaaS/IA genéricas, priorizar evidencia real de sistemas en producción y reducir peso/complejidad visual.
- **Impacto:** Reescritura de `index.html`, `src/index.css`, `Header`, `Layout`, `Hero`, `Projects`, `Servicios`, `Contact`, `CustomerAssistant`, modales y resiliencia en `src/firebase.js`, `AuthContext.jsx` y `projectService.js`.
- **Ticket/commit:** `122d9b2`
