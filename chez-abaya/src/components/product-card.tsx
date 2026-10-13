import Link from 'next/link';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { ProductImage } from './product-image';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/produit/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
        <ProductImage
          src={product.image}
          alt={product.imageAlt}
          sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw"
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-ivory/95 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-brown">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-display text-lg font-semibold leading-snug md:text-xl">{product.name}</h3>
        <p className="line-clamp-1 text-[0.8rem] text-brown-soft">{product.shortDescription}</p>
        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          {product.colors.length > 1 && (
            <ul className="flex -space-x-1" aria-label={`${product.colors.length} couleurs disponibles`}>
              {product.colors.slice(0, 4).map((c) => (
                <li
                  key={c.name}
                  title={c.name}
                  className="size-3.5 rounded-full border border-ivory ring-1 ring-line"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
}
