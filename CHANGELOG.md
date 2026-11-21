# Changelog — tecnofusion.dev

## [1.1.1] - 2026-11-20

### Fixed
- Enlaces de navegación (menú, Hero, Servicios y footer) no desplazaban: los ids de sección (`proyectos`, `Servicios`, `Contacto`) no coincidían con los anchors `#projects`, `#servicios`, `#contact`.

## [1.1.0] - 2026-11-20

### Added
- Rediseño editorial completo *The well-kept board* (Tablero Editorial & Muro Asimétrico) con tipografía `Bricolage Grotesque` y `JetBrains Mono` y paleta Charcoal & Sage (`#F2EFE9` / `#DFDCD2` / `#1C1C1C` / `#8FA68E`).
- Enfoque explícito en **Sistemas Distribuidos**, Ingeniería Full-Stack, IA Aplicada y Productos SaaS propios en Hero, Servicios, Footer, SEO/OpenGraph y `BLUEPRINT.md`.
- Endpoint HTTP `addProject` protegido con API key en Cloud Functions y subida de imágenes de proyectos a Garage (S3-compatible).
- Resiliencia local cuando Firebase corre sin credenciales (`.env`), evitando pantalla en blanco y cayendo al catálogo estático.
- Archivo `VERSION`, `CHANGELOG.md`, `BLUEPRINT.md`, `docs/DECISIONS.md` y `.vscode/tasks.json`.
