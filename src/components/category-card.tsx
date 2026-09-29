import Link from 'next/link';
import { AssetImage } from '@/components/asset-image';
import type { Category } from '@/lib/catalog';

/**
 * CARTE CATÉGORIE — assets `category.*` (/images/categories/*.webp).
 *
 * Le nom de la catégorie et son accroche sont du HTML posé sur un voile
 * dégradé : l'image finale n'a donc aucun texte à porter.
 */
export function CategoryCard({ category, count }: { category: Category; count: number }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block overflow-hidden rounded-card border border-line/70 bg-surface transition-colors hover:border-pumpkin/50"
    >
      <AssetImage
        asset={category.image}
        ratio="4 / 3"
        imageClassName="transition-transform duration-500 group-hover:scale-[1.04]"
      />

      <div aria-hidden className="scrim pointer-events-none absolute inset-0" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ink">
              {category.name}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{category.tagline}</p>
          </div>
          <span className="shrink-0 rounded-full bg-void/70 px-2.5 py-1 text-xs text-ink-muted backdrop-blur">
            {count} {count > 1 ? 'articles' : 'article'}
          </span>
        </div>
      </div>
    </Link>
  );
}
