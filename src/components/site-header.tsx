import Link from 'next/link';
import { CATEGORIES } from '@/lib/catalog';

/** Logo typographique : dessiné en CSS, jamais une image. */
function Wordmark() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="HALLOWYS — accueil">
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-full bg-pumpkin text-void shadow-[0_0_24px_-4px_var(--color-pumpkin)] transition-transform group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M12 3c.5 0 1 .4 1.2 1 1.9-.7 4 .2 5 2 1.2 2.2.9 5.3-.6 7.8-1.2 2-3 3.2-4.6 3.2-.4 0-.7-.1-1-.2-.3.1-.6.2-1 .2-1.6 0-3.4-1.2-4.6-3.2C4.9 11.3 4.6 8.2 5.8 6c1-1.8 3.1-2.7 5-2 .2-.6.7-1 1.2-1Zm-3.3 7 1.3 2h1.4l-1.3-2H8.7Zm5 0-1.3 2h1.4l1.3-2h-1.4Zm-1.7 3.6c-.7 0-1.3.2-1.8.5.5.6 1.1.9 1.8.9s1.3-.3 1.8-.9c-.5-.3-1.1-.5-1.8-.5Z" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-[0.22em] text-ink">HALLOWYS</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-void/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Wordmark />

        <nav aria-label="Catégories" className="hidden flex-1 lg:block">
          <ul className="flex items-center justify-center gap-1">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="rounded-full px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            href="/#promotions"
            className="hidden rounded-full border border-pumpkin/40 px-4 py-2 text-sm font-medium text-pumpkin transition-colors hover:bg-pumpkin/10 sm:block"
          >
            Promotions
          </Link>
          <button
            type="button"
            className="relative rounded-full bg-surface-2 p-2.5 text-ink transition-colors hover:bg-surface-3"
            aria-label="Panier (0 article)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
              <path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.5a2 2 0 0 0 2-1.5L20 8H6.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17" cy="20" r="1.3" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation mobile : rangée défilante, aucune image impliquée. */}
      <nav aria-label="Catégories (mobile)" className="lg:hidden">
        <ul className="flex snap-x gap-2 overflow-x-auto px-4 pb-3 sm:px-6 [scrollbar-width:none]">
          {CATEGORIES.map((category) => (
            <li key={category.slug} className="snap-start">
              <Link
                href={`/categories/${category.slug}`}
                className="block whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-muted"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
