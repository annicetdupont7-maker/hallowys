import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartForm } from '@/components/add-to-cart';
import { AssetImage } from '@/components/asset-image';
import { Breadcrumb } from '@/components/breadcrumb';
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
  const categories = product.categories.map(getCategory).filter((c) => c !== undefined);
  const stars = Math.round(product.rating);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: 'Boutique', href: '/boutique' },
          ...(primaryCategory
            ? [{ label: primaryCategory.name, href: `/categories/${primaryCategory.slug}` }]
            : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/*
          VISUEL PRODUIT : asset product.*, préchargé : c'est le LCP de la fiche.
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
                −{discount} %
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
            <span aria-hidden className="tracking-wider text-pumpkin">
              {'★'.repeat(stars)}
              <span className="text-line">{'★'.repeat(5 - stars)}</span>
            </span>
            <span>
              {product.rating.toFixed(1).replace('.', ',')}
              <span className="sr-only"> sur 5</span> · {product.reviews} avis
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-lg text-ink-faint line-through">
                <span className="sr-only">Au lieu de </span>
                {formatPrice(product.oldPrice)}
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

          <AddToCartForm product={product} />

          <dl className="mt-8 grid gap-4 border-t border-line/70 pt-6 sm:grid-cols-2">
            {[
              ['Catégories', categories.map((c) => c.name).join(', ')],
              ['Référence', product.id],
              ['Expédition', 'Sous 24 h, suivi inclus'],
              ['Livraison', 'Offerte dès 49 € d’achat'],
              ['Retours', '30 jours pour changer d’avis'],
              ['Paiement', 'Sécurisé, 3 fois sans frais dès 90 €'],
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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="related-title"
              className="font-display text-2xl text-ink sm:text-3xl"
            >
              Vous aimerez aussi
            </h2>
            <Link
              href="/boutique"
              className="text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
            >
              ← Retour à la boutique
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
