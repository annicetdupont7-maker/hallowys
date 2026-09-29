import type { Metadata, Viewport } from 'next';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'HALLOWYS — Décorations, costumes et lumières d’Halloween',
    template: '%s · HALLOWYS',
  },
  description:
    "HALLOWYS habille votre nuit d'Halloween : décorations, costumes, accessoires, éclairages et art de la table, réunis dans un même univers visuel.",
  applicationName: 'HALLOWYS',
  openGraph: {
    title: 'HALLOWYS — La nuit vous va si bien',
    description:
      "Décorations, costumes, accessoires et lumières d'Halloween réunis dans un même univers visuel.",
    type: 'website',
    locale: 'fr_FR',
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
      </body>
    </html>
  );
}
