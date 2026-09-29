import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CartToast } from '@/components/cart-toast';
import { getAsset } from '@/lib/images';
import './globals.css';

/**
 * URL absolue du site, utilisée par `metadataBase` pour résoudre les images
 * Open Graph. Ordre de priorité :
 *   1. NEXT_PUBLIC_SITE_URL : domaine définitif, à définir une fois en ligne ;
 *   2. VERCEL_PROJECT_PRODUCTION_URL : domaine de production Vercel, injecté
 *      automatiquement : les aperçus de partage sont donc corrects dès le
 *      premier déploiement, sans configuration ;
 *   3. localhost en développement.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

const heroAsset = getAsset('hero.main');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HALLOWYS : décorations, costumes et lumières d’Halloween',
    template: '%s · HALLOWYS',
  },
  description:
    "HALLOWYS habille votre nuit d'Halloween : décorations, costumes, accessoires, éclairages et art de la table, réunis dans un même univers visuel.",
  applicationName: 'HALLOWYS',
  openGraph: {
    title: 'HALLOWYS, la nuit vous va si bien',
    description:
      "Décorations, costumes, accessoires et lumières d'Halloween réunis dans un même univers visuel.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'HALLOWYS',
    /* Le hero sert d'aperçu de partage : même visuel, même registre. */
    images: [
      {
        url: heroAsset.src,
        width: heroAsset.width,
        height: heroAsset.height,
        alt: heroAsset.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HALLOWYS, la nuit vous va si bien',
    description:
      "Décorations, costumes, accessoires et lumières d'Halloween réunis dans un même univers visuel.",
    images: [heroAsset.src],
  },
};

export const viewport: Viewport = {
  themeColor: '#08040d',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pumpkin focus:px-5 focus:py-2 focus:font-semibold focus:text-void"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="contenu">{children}</main>
        <SiteFooter />
        <CartToast />
      </body>
    </html>
  );
}
