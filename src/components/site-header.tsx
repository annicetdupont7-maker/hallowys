'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { CartIcon, CloseIcon, MenuIcon, SearchIcon } from '@/components/icons';
import { useCart, useHydrated } from '@/lib/cart';
import { CATEGORIES } from '@/lib/catalog';

const PRIMARY_LINKS = [
  { href: '/boutique', label: 'Boutique' },
  ...CATEGORIES.map((category) => ({ href: `/categories/${category.slug}`, label: category.name })),
];

const SECONDARY_LINKS = [
  { href: '/promotions', label: 'Promotions' },
  { href: '/faq', label: 'Questions fréquentes' },
  { href: '/contact', label: 'Contact' },
];

/** Logo typographique : dessiné en CSS, jamais une image. */
function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="group flex shrink-0 items-center gap-2 min-[400px]:gap-2.5"
      aria-label="HALLOWYS, retour à l'accueil"
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-full bg-pumpkin text-void shadow-[0_0_24px_-4px_var(--color-pumpkin)] transition-transform group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
          <path d="M12 3c.5 0 1 .4 1.2 1 1.9-.7 4 .2 5 2 1.2 2.2.9 5.3-.6 7.8-1.2 2-3 3.2-4.6 3.2-.4 0-.7-.1-1-.2-.3.1-.6.2-1 .2-1.6 0-3.4-1.2-4.6-3.2C4.9 11.3 4.6 8.2 5.8 6c1-1.8 3.1-2.7 5-2 .2-.6.7-1 1.2-1Zm-3.3 7 1.3 2h1.4l-1.3-2H8.7Zm5 0-1.3 2h1.4l1.3-2h-1.4Zm-1.7 3.6c-.7 0-1.3.2-1.8.5.5.6 1.1.9 1.8.9s1.3-.3 1.8-.9c-.5-.3-1.1-.5-1.8-.5Z" />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-[0.14em] text-ink min-[400px]:text-lg min-[400px]:tracking-[0.22em]">
        HALLOWYS
      </span>
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Formulaire de recherche : envoie vers la boutique filtrée par `q`. */
function SearchForm({ onSubmitted, autoFocus }: { onSubmitted?: () => void; autoFocus?: boolean }) {
  const router = useRouter();
  const inputId = useId();
  const [value, setValue] = useState('');

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        const query = value.trim();
        router.push(query ? `/boutique?q=${encodeURIComponent(query)}` : '/boutique');
        onSubmitted?.();
      }}
      className="flex gap-2"
    >
      <label htmlFor={inputId} className="sr-only">
        Rechercher un produit
      </label>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus={autoFocus}
        placeholder="Citrouille, masque, bougies..."
        className="min-w-0 flex-1 rounded-full border border-line bg-void px-5 py-3 text-base text-ink placeholder:text-ink-faint sm:text-sm"
      />
      <button
        type="submit"
        aria-label="Lancer la recherche"
        className="grid shrink-0 place-items-center rounded-full bg-pumpkin px-4 py-3 text-sm font-semibold text-void transition-colors hover:bg-pumpkin-soft sm:px-5"
      >
        <SearchIcon className="size-5 sm:hidden" />
        <span className="hidden sm:inline">Rechercher</span>
      </button>
    </form>
  );
}

function CartLink() {
  const hydrated = useHydrated();
  const { count } = useCart();
  const shown = hydrated ? count : 0;

  return (
    <Link
      href="/panier"
      className="relative grid size-11 place-items-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-surface-3"
      aria-label={`Panier, ${shown} ${shown > 1 ? 'articles' : 'article'}`}
    >
      <CartIcon />
      {shown > 0 ? (
        <span
          aria-hidden
          className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pumpkin px-1 text-[11px] font-bold tabular-nums text-void"
        >
          {shown > 99 ? '99+' : shown}
        </span>
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const searchId = useId();

  /* Menu mobile : fermeture à Échap, défilement de la page bloqué, focus géré. */
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const menuButton = menuButtonRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [searchOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-3 min-[400px]:gap-3 min-[400px]:px-4 sm:px-6 lg:px-8 xl:gap-6">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label="Ouvrir le menu"
            className="-ml-2 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 xl:hidden"
          >
            <MenuIcon />
          </button>

          <Wordmark />

          <nav aria-label="Navigation principale" className="hidden flex-1 xl:block">
            <ul className="flex items-center justify-center gap-0.5">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    className="rounded-full px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:text-pumpkin"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 min-[400px]:gap-2 xl:ml-0">
            <Link
              href="/promotions"
              aria-current={isActive(pathname, '/promotions') ? 'page' : undefined}
              className="hidden rounded-full border border-pumpkin/40 px-4 py-2 text-sm font-medium text-pumpkin transition-colors hover:bg-pumpkin/10 aria-[current=page]:bg-pumpkin/10 sm:block"
            >
              Promotions
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-expanded={searchOpen}
              aria-controls={searchId}
              aria-label={searchOpen ? 'Fermer la recherche' : 'Rechercher'}
              className="grid size-11 place-items-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-surface-3"
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <CartLink />
          </div>
        </div>

        {searchOpen ? (
          <div id={searchId} className="border-t border-line/70">
            <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
              <SearchForm autoFocus onSubmitted={() => setSearchOpen(false)} />
            </div>
          </div>
        ) : null}
      </header>

      {/* Menu mobile : rendu hors du header, dont le `backdrop-filter`
          confinerait un élément `fixed` à sa propre hauteur. */}
      <div
        id={menuId}
        className={`fixed inset-0 z-50 xl:hidden ${menuOpen ? '' : 'pointer-events-none invisible'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-void/70 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col overflow-y-auto border-r border-line/70 bg-surface transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line/70 px-4">
            <Wordmark onNavigate={closeMenu} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Fermer le menu"
              className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface-2"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="px-4 pt-5">
            <SearchForm onSubmitted={closeMenu} />
          </div>

          <nav aria-label="Navigation mobile" className="flex-1 px-2 py-4">
            <ul className="space-y-0.5">
              {[{ href: '/', label: 'Accueil' }, ...PRIMARY_LINKS].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={
                      (link.href === '/' ? pathname === '/' : isActive(pathname, link.href)) ? 'page' : undefined
                    }
                    className="block rounded-xl px-3 py-3 text-base text-ink transition-colors hover:bg-surface-2 aria-[current=page]:text-pumpkin"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-4 space-y-0.5 border-t border-line/70 pt-4">
              {[...SECONDARY_LINKS, { href: '/panier', label: 'Mon panier' }].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                    className="block rounded-xl px-3 py-3 text-base text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:text-pumpkin"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
