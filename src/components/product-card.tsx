import Link from 'next/link';
import { AssetImage } from '@/components/asset-image';
import { discountPercent, formatPrice, type Product } from '@/lib/catalog';

/**
 * CARTE PRODUIT — assets `product.*` (/images/products/*.webp).
 *
 * Prix, prix barré, badge de remise et note sont rendus en HTML/CSS.
 * Aucune de ces informations n'est jamais incrustée dans le fichier image :
 * un changement de prix ne demande donc jamais de retoucher un visuel.
 */
export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line/70 bg-surface transition-colors hover:border-pumpkin/45">
      <div className="relative">
        <AssetImage
          asset={product.image}
          ratio="1 / 1"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* Pastilles promo / badge : HTML au-dessus de l'image. */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {discount !== null ? (
            <span className="rounded-full bg-blood px-2.5 py-1 text-xs font-bold text-ink shadow-lg">
              −{discount}%
            </span>
          ) : (
            <span />
          )}
          {product.badge ? (
            <span className="rounded-full bg-void/80 px-2.5 py-1 text-xs font-medium text-pumpkin backdrop-blur">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-medium leading-snug text-ink">
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-ink-faint">{product.shortDescription}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
          <span aria-hidden className="text-pumpkin">
            ★
          </span>
          <span>
            {product.rating.toFixed(1).replace('.', ',')}
            <span className="sr-only"> sur 5</span>
          </span>
          <span aria-hidden>·</span>
          <span>{product.reviews} avis</span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-4">
          <span className="text-lg font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-sm text-ink-faint line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.slug} className="flex">
          <div className="flex-1">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
