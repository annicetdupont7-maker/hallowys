import Link from 'next/link';
import { CATEGORIES } from '@/lib/catalog';
import { CONTACT } from '@/lib/site';

const SHOP_LINKS = [
  { href: '/boutique', label: 'Toute la boutique' },
  { href: '/promotions', label: 'Promotions' },
  ...CATEGORIES.map((category) => ({ href: `/categories/${category.slug}`, label: category.name })),
];

const SERVICE_LINKS = [
  { href: '/faq#livraison-delais', label: 'Livraison' },
  { href: '/faq#retours', label: 'Retours et remboursements' },
  { href: '/faq#tailles', label: 'Guide des tailles' },
  { href: '/faq', label: 'Questions fréquentes' },
  { href: '/contact', label: 'Nous contacter' },
  { href: '/panier', label: 'Mon panier' },
];

const linkClass = 'text-ink-muted transition-colors hover:text-pumpkin';

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-2">
            <p className="text-lg font-semibold tracking-[0.22em] text-ink">HALLOWYS</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Décors, costumes et lumières pour faire de chaque 31 octobre une nuit dont on
              reparle encore en novembre.
            </p>
            <p className="mt-5 text-sm text-ink-muted">
              <a href={`mailto:${CONTACT.email}`} className="font-medium text-pumpkin hover:text-pumpkin-soft">
                {CONTACT.email}
              </a>
              <br />
              <span className="text-ink-faint">{CONTACT.hours}</span>
            </p>
          </div>

          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop" className="text-sm font-semibold uppercase tracking-wider text-ink">
              Boutique
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-service">
            <h2 id="footer-service" className="text-sm font-semibold uppercase tracking-wider text-ink">
              Service client
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 border-t border-line/70 pt-6 text-xs text-ink-faint">
          © {new Date().getFullYear()} HALLOWYS. Tous droits réservés. Visuels et univers
          graphiques propriété de HALLOWYS.
        </p>
      </div>
    </footer>
  );
}
