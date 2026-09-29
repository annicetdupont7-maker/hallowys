import Link from 'next/link';
import { CATEGORIES } from '@/lib/catalog';

const SERVICE_LINKS = [
  'Livraison & retours',
  'Suivi de commande',
  'Guide des tailles',
  'Nous contacter',
];

const ABOUT_LINKS = ['Notre histoire', 'Ateliers créatifs', 'Espace presse', 'Mentions légales'];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line/70 bg-surface/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold tracking-[0.22em] text-ink">HALLOWYS</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Décors, costumes et lumières pour faire de chaque 31 octobre une nuit dont on
              reparle encore en novembre.
            </p>
          </div>

          <nav aria-labelledby="footer-categories">
            <h2 id="footer-categories" className="text-sm font-semibold uppercase tracking-wider text-ink">
              Catégories
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-ink-muted transition-colors hover:text-pumpkin"
                  >
                    {category.name}
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
              {SERVICE_LINKS.map((label) => (
                <li key={label}>
                  <span className="text-ink-muted">{label}</span>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-about">
            <h2 id="footer-about" className="text-sm font-semibold uppercase tracking-wider text-ink">
              La maison
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {ABOUT_LINKS.map((label) => (
                <li key={label}>
                  <span className="text-ink-muted">{label}</span>
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
