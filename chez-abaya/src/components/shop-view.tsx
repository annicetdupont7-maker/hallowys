'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES, PRODUCTS, isCategoryId, type CategoryId } from '@/data/products';
import { ProductCard } from './product-card';

/** Catalogue filtrable. La catégorie active est dans l'URL (?categorie=abayas) : le lien est partageable. */
export function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const raw = params.get('categorie');
  const active: CategoryId | null = isCategoryId(raw) ? raw : null;

  const products = active ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS;

  const select = (id: CategoryId | null) => {
    router.replace(id ? `${pathname}?categorie=${id}` : pathname, { scroll: false });
  };

  const filters: { id: CategoryId | null; label: string; count: number }[] = [
    { id: null, label: 'Tout', count: PRODUCTS.length },
    ...CATEGORIES.map((c) => ({
      id: c.id,
      label: c.label,
      count: PRODUCTS.filter((p) => p.category === c.id).length,
    })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filtrer par catégorie"
        className="sticky top-16 z-30 -mx-5 mt-6 flex gap-2 overflow-x-auto border-b border-line bg-ivory/95 px-5 py-3 backdrop-blur [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((f) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => select(f.id)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-brown bg-brown text-ivory'
                  : 'border-line bg-ivory text-brown hover:border-brown'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${isActive ? 'text-ivory/70' : 'text-brown-soft'}`}>{f.count}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-brown-soft" aria-live="polite">
        {products.length} article{products.length > 1 ? 's' : ''}
        {active ? ` · ${CATEGORIES.find((c) => c.id === active)?.label}` : ''}
      </p>

      <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {products.map((p, i) => (
          <li key={p.slug}>
            <ProductCard product={p} priority={i < 4} />
          </li>
        ))}
      </ul>
    </>
  );
}
