'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ProductGrid } from '@/components/product-card';
import { SearchIcon } from '@/components/icons';
import {
  CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS,
  filterProducts,
  type ShopFilters,
} from '@/lib/catalog';

function parseFilters(params: URLSearchParams): ShopFilters {
  const pick = <T extends { value: string }>(key: string, list: readonly T[], fallback: string) => {
    const value = params.get(key) ?? '';
    return list.some((item) => item.value === value) ? value : fallback;
  };
  return {
    query: params.get('q') ?? '',
    category: pick('categorie', CATEGORIES.map((c) => ({ value: c.slug })), ''),
    price: pick('prix', PRICE_RANGES, ''),
    inStock: params.get('dispo') === '1',
    onSale: params.get('promo') === '1',
    sort: pick('tri', SORT_OPTIONS, 'pertinence'),
  };
}

/**
 * Boutique : recherche, filtres et tri. Chaque choix s'applique aussitôt
 * (état local) et se reporte dans l'URL (`?q=&categorie=&prix=&dispo=1&promo=1&tri=`) :
 * un résultat se partage, survit à l'actualisation, et une recherche lancée
 * depuis le header ou le bouton Retour recale les filtres.
 */
export function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const ids = { q: useId(), category: useId(), price: useId(), sort: useId() };

  const urlSearch = params.toString();
  const [search, setSearch] = useState(urlSearch);
  const [query, setQuery] = useState(() => parseFilters(params).query);
  const lastWritten = useRef(urlSearch);

  /* L'URL a changé sans nous (header, Retour) : on s'y recale. */
  useEffect(() => {
    if (urlSearch === lastWritten.current) return;
    lastWritten.current = urlSearch;
    setSearch(urlSearch);
    setQuery(new URLSearchParams(urlSearch).get('q') ?? '');
  }, [urlSearch]);

  const filters = parseFilters(new URLSearchParams(search));

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(search);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (next.get('tri') === 'pertinence') next.delete('tri');
    const nextSearch = next.toString();
    lastWritten.current = nextSearch;
    setSearch(nextSearch);
    router.replace(nextSearch ? `${pathname}?${nextSearch}` : pathname, { scroll: false });
  }

  /* La saisie est reportée dans l'URL après une courte pause. */
  useEffect(() => {
    if (query.trim() === filters.query) return;
    const timer = window.setTimeout(() => update({ q: query.trim() }), 250);
    return () => window.clearTimeout(timer);
  });

  const products = filterProducts({ ...filters, query });
  const activeCount =
    [filters.category, filters.price].filter(Boolean).length +
    Number(filters.inStock) +
    Number(filters.onSale) +
    Number(Boolean(query.trim()));

  const selectClass =
    'w-full rounded-full border border-line bg-void px-4 py-2.5 text-sm text-ink focus:border-pumpkin/60';
  const checkboxClass = 'size-4 rounded accent-[var(--color-pumpkin)]';

  return (
    <div className="mt-8">
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          update({ q: query.trim() });
        }}
        className="rounded-card border border-line/70 bg-surface/60 p-4 sm:p-5"
      >
        <label htmlFor={ids.q} className="sr-only">
          Rechercher dans la boutique
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-faint" />
          <input
            id={ids.q}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un produit, une catégorie..."
            className="w-full rounded-full border border-line bg-void py-3 pl-12 pr-5 text-base text-ink placeholder:text-ink-faint sm:text-sm"
          />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor={ids.category} className="mb-1.5 block text-xs uppercase tracking-wider text-ink-faint">
              Catégorie
            </label>
            <select
              id={ids.category}
              value={filters.category}
              onChange={(event) => update({ categorie: event.target.value })}
              className={selectClass}
            >
              <option value="">Toutes les catégories</option>
              {CATEGORIES.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.price} className="mb-1.5 block text-xs uppercase tracking-wider text-ink-faint">
              Prix
            </label>
            <select
              id={ids.price}
              value={filters.price}
              onChange={(event) => update({ prix: event.target.value })}
              className={selectClass}
            >
              <option value="">Tous les prix</option>
              {PRICE_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={ids.sort} className="mb-1.5 block text-xs uppercase tracking-wider text-ink-faint">
              Trier par
            </label>
            <select
              id={ids.sort}
              value={filters.sort}
              onChange={(event) => update({ tri: event.target.value })}
              className={selectClass}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(event) => update({ dispo: event.target.checked ? '1' : '' })}
              className={checkboxClass}
            />
            En stock uniquement
          </label>
          <label className="inline-flex min-h-10 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={(event) => update({ promo: event.target.checked ? '1' : '' })}
              className={checkboxClass}
            />
            En promotion
          </label>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                update({ q: '', categorie: '', prix: '', dispo: '', promo: '' });
              }}
              className="ml-auto min-h-10 rounded-full px-3 font-medium text-pumpkin transition-colors hover:bg-pumpkin/10"
            >
              Réinitialiser les filtres
            </button>
          ) : null}
        </div>
      </form>

      <p aria-live="polite" className="mt-6 text-sm text-ink-faint">
        {products.length} {products.length > 1 ? 'produits' : 'produit'}
        {query.trim() ? ` pour « ${query.trim()} »` : ''}
      </p>

      <div className="mt-4">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-card border border-line/70 bg-surface/60 px-6 py-12 text-center">
            <p className="font-display text-xl text-ink">
              Aucun produit ne correspond à votre recherche.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Essayez un autre mot, retirez un filtre ou parcourez nos catégories.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-muted transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
