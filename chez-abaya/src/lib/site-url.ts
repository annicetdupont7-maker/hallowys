/**
 * Adresse publique du site, utilisée pour les aperçus de lien (WhatsApp,
 * Facebook…) et le sitemap.
 * - Avec un nom de domaine à vous : définir NEXT_PUBLIC_SITE_URL
 *   (ex. https://chezabaya.bj) dans les variables d'environnement Vercel.
 * - Sinon, déduite de l'adresse Vercel (aperçu de branche ou production).
 */
function vercelUrl(): string | undefined {
  const host =
    process.env.VERCEL_ENV === 'preview'
      ? process.env.VERCEL_BRANCH_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return host ? `https://${host}` : undefined;
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl() ?? 'http://localhost:3000').replace(
  /\/$/,
  '',
);
