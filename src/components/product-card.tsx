import Link from 'next/link';
import { QuickAddButton } from '@/components/add-to-cart';
import { AssetImage } from '@/components/asset-image';
import { discountPercent, formatPrice, type Product } from '@/lib/catalog';

/**
 * CARTE PRODUIT — assets `product.*` (/images/products/*.webp).
 *
 * Prix, prix barré, badge de remise et note sont rendus en HTML/CSS.
 * Toute la carte mène à la fiche produit ; le bouton d'ajout rapide passe
 * au-dessus du lien étendu grâce à son `z-index`.
 * Aucune de ces informations n'est jamais incrustée dans le fichier image :
 * un changement de prix ne demande donc jamais de retoucher un visuel.
 */
export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product);

  return (
    <article className="group relative flex flex-1 flex-col overflow-hidden rounded-card border border-line/70 bg-surface transition-colors hover:border-pumpkin/45">
      <div className="relative">
        <AssetImage
          asset={product.image}
          ratio="1 / 1"
          imageClassName="transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* Pastilles promo / badge : HTML au-dessus de l'image. */}
        <div className="pointer-events-none absolute inset-x-2 top-2 flex items-start justify-between gap-1.5 sm:inset-x-3 sm:top-3 sm:gap-2">
          {discount !== null ? (
            <span className="whitespace-nowrap rounded-full bg-blood px-2 py-1 text-xs font-bold text-ink shadow-lg sm:px-2.5">
              −{discount} %
            </span>
          ) : product.stock === 0 ? (
            <span className="whitespace-nowrap rounded-full bg-void/85 px-2 py-1 text-xs font-semibold text-ink-muted backdrop-blur sm:px-2.5">
              Rupture
            </span>
          ) : (
            <span />
          )}
          {product.badge ? (
            <span className="truncate rounded-full bg-void/80 px-2 py-1 text-xs font-medium text-pumpkin backdrop-blur sm:px-2.5">
              {product.badge}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-medium leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-pumpkin"
          >
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

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-4">
          <span className="text-lg font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.oldPrice ? (
            <span className="text-sm text-ink-faint line-through">
              <span className="sr-only">Au lieu de </span>
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-3">
          <QuickAddButton product={product} />
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
          <div className="flex min-w-0 flex-1 flex-col">
            <ProductCard product={product} />
          </div>
        </li>
      ))}
    </ul>
  );
}
