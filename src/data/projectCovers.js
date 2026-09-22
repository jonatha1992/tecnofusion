// Portadas locales servidas desde `public/assets/projects/`.
//
// Las URLs de imagen guardadas en Firestore apuntan a Firebase Storage, que hoy
// responde HTTP 402 ("billing account ... is disabled in state closed"), asi que
// las tarjetas quedaban con el placeholder para siempre. Mientras el billing siga
// cerrado, preferimos la portada local.
//
// La clave es el slug del titulo del proyecto. Para volver a Storage cuando el
// billing vuelva, borra la entrada correspondiente de este mapa.
export const projectCovers = {
  'aesfron-plataforma-educativa': '/assets/projects/aesfron-plataforma-educativa.svg',
  'api-de-logistica-integracion-envia-com': '/assets/projects/api-de-logistica-integracion-envia-com.svg',
  'api-projects-tecnofuision-it': '/assets/projects/api-projects-tecnofuision-it.svg',
  'audiotext-transcriptor-y-traductor-de-audio': '/assets/projects/audiotext-transcriptor-y-traductor-de-audio.svg',
  'dashboard-de-operaciones-de-seguridad': '/assets/projects/dashboard-de-operaciones-de-seguridad.svg',
  'expenses-tracker': '/assets/projects/expenses-tracker.svg',
  'forgotten-objects-system': '/assets/projects/forgotten-objects-system.svg',
  'gestion-de-polizas': '/assets/projects/gestion-de-polizas.svg',
  'gestorcoc-v2-0': '/assets/projects/gestorcoc-v2-0.svg',
  'matilda-vintage-tienda-de-ropa-online': '/assets/projects/matilda-vintage-tienda-de-ropa-online.svg',
  'neon-designs-carteles-de-neon-led': '/assets/projects/neon-designs-carteles-de-neon-led.svg',
  'payalert-saas-gestion-de-flujo-de-caja': '/assets/projects/payalert-saas-gestion-de-flujo-de-caja.svg',
  'portfolio-tecnico-jonathan-correa': '/assets/projects/portfolio-tecnico-jonathan-correa.svg',
  'sentinel-compliance-engine-corvux-aml-dashboard': '/assets/projects/sentinel-compliance-engine-corvux-aml-dashboard.svg',
  'spin-predictor': '/assets/projects/spin-predictor.svg',
  'tecnofusion': '/assets/projects/tecnofusion.svg',
  'traductor-de-pdf': '/assets/projects/traductor-de-pdf.svg',
  'voxnote-ai-movil': '/assets/projects/voxnote-ai-movil.svg',
}

/**
 * Slug estable a partir del titulo. Igual al del portfolio, para que ambos
 * consumidores resuelvan la misma portada.
 * @param {string} title
 * @returns {string}
 */
export function toProjectSlug(title) {
  return String(title || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

/**
 * Portada local si existe; si no, la URL guardada en Firestore.
 * @param {string} title
 * @param {string} [remoteImage]
 * @returns {string}
 */
export function resolveProjectImage(title, remoteImage) {
  return projectCovers[toProjectSlug(title)] || remoteImage || ''
}
