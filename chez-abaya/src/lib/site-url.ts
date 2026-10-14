/**
 * Adresse publique du site, utilisée pour les aperçus de lien (WhatsApp,
 * Facebook…) et le sitemap.
 * - Sur Vercel, elle est déduite automatiquement du domaine de production.
 * - Avec un nom de domaine à vous, définir NEXT_PUBLIC_SITE_URL
 *   (ex. https://chezabaya.bj) dans les variables d'environnement Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '');
