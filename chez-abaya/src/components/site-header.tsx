'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BOUTIQUE } from '@/config/boutique';
import { CATEGORIES } from '@/data/products';
import { GENERAL_MESSAGE, whatsappUrl } from '@/lib/whatsapp';
import { CloseIcon, MenuIcon, WhatsAppIcon } from './icons';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/#commander', label: 'Comment commander' },
  { href: '#contact', label: 'Contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Referme le menu à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  // Échap ferme le menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/85">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none" aria-label={`${BOUTIQUE.name} — accueil`}>
          <span className="font-display text-[1.65rem] font-semibold tracking-tight">{BOUTIQUE.name}</span>
          <span className="mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-gold">Cotonou</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`py-2 transition-colors hover:text-olive ${
                    pathname === item.href ? 'text-olive underline decoration-gold underline-offset-8' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={whatsappUrl(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-brown px-4 py-2 text-sm font-semibold transition-colors hover:bg-brown hover:text-ivory md:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Nous écrire
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="-mr-2 grid size-11 place-items-center rounded-full md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="border-t border-line bg-ivory md:hidden">
          <ul className="container-page divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-display text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page pb-6 pt-2">
            <p className="eyebrow mb-3">Catégories</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/boutique?categorie=${c.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line px-4 py-2 text-sm"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
