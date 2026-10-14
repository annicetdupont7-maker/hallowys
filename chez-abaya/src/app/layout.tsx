import type { Metadata, Viewport } from 'next';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource-variable/dm-sans/wght.css';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { BOUTIQUE } from '@/config/boutique';
import { SITE_URL } from '@/lib/site-url';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BOUTIQUE.name} — ${BOUTIQUE.tagline}`,
    template: `%s · ${BOUTIQUE.name}`,
  },
  description:
    'Hijabs, abayas, robes modestes et accessoires à Cotonou. Découvrez la collection, consultez les prix et commandez directement sur WhatsApp. Livraison à Cotonou et environs.',
  openGraph: {
    siteName: BOUTIQUE.name,
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f8f4ec',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brown focus:px-4 focus:py-2 focus:text-ivory"
        >
          Aller au contenu
        </a>
        <p className="bg-brown px-4 py-2 text-center text-[0.7rem] font-medium tracking-wide text-gold-light">
          Livraison à Cotonou & environs · Commande sur WhatsApp
        </p>
        <SiteHeader />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
