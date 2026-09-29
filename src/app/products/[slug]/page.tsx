import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AssetImage } from '@/components/asset-image';
import { ProductGrid } from '@/components/product-card';
import {
  PRODUCTS,
  discountPercent,
  formatPrice,
  getCategory,
  getProduct,
  getRelatedProducts,
} from '@/lib/catalog';
import { getAsset } from '@/lib/images';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Produit introuvable' };

  const asset = getAsset(product.image);
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} · HALLOWYS`,
      description: product.shortDescription,
      images: [{ url: asset.src, width: asset.width, height: asset.height, alt: asset.alt }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const discount = discountPercent(product);
  const related = getRelatedProducts(product);
  const primaryCategory = getCategory(product.categories[0]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-pumpkin">
              Accueil
            </Link>
          </li>
          {primaryCategory ? (
            <>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`/categories/${primaryCategory.slug}`}
                  className="transition-colors hover:text-pumpkin"
                >
                  {primaryCategory.name}
                </Link>
              </li>
            </>
          ) : null}
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/*
          VISUEL PRODUIT — asset product.*, préchargé : c'est le LCP de la fiche.
          `sizes` est surchargé car le gabarit (demi-largeur au-delà de 1024 px)
          diffère de celui des grilles déclaré dans le registre.
        */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <AssetImage
              asset={product.image}
              ratio="1 / 1"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-card border border-line/70"
            />
            {discount !== null ? (
              <span className="absolute left-4 top-4 rounded-full bg-blood px-3 py-1.5 text-sm font-bold text-ink shadow-lg">
                −{discount}%
              </span>
            ) : null}
          </div>
        </div>

        <div>
          {product.badge ? (
            <p className="inline-block rounded-full border border-pumpkin/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-pumpkin">
              {product.badge}
            </p>
          ) : null}

          <h1 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
            <span aria-hidden className="text-pumpkin">
              ★★★★★
            </span>
            <span>
              {product.rating.toFixed(1).replace('.', ',')}
              <span className="sr-only"> sur 5</span> · {product.reviews} avis
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice ? (
              <span className="text-lg text-ink-faint line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            ) : null}
            <span className="text-sm text-ink-faint">TVA incluse</span>
          </div>

          <p className="mt-6 leading-relaxed text-ink-muted">{product.description}</p>

          <ul className="mt-6 space-y-2.5">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-3 text-sm text-ink-muted">
                <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pumpkin" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="flex-1 rounded-full bg-pumpkin px-8 py-3.5 text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.01] sm:flex-none"
            >
              Ajouter au panier
            </button>
            <button
              type="button"
              className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
            >
              Ajouter aux favoris
            </button>
          </div>

          <dl className="mt-8 grid gap-4 border-t border-line/70 pt-6 sm:grid-cols-2">
            {[
              ['Expédition', 'Sous 24 h, suivi inclus'],
              ['Livraison', 'Offerte dès 49 € d’achat'],
              ['Retours', '30 jours pour changer d’avis'],
              ['Paiement', 'Sécurisé, 3× sans frais'],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wider text-ink-faint">{label}</dt>
                <dd className="mt-1 text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="mt-20">
          <h2
            id="related-title"
            className="font-display text-2xl text-ink sm:text-3xl"
          >
            Dans le même décor
          </h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
