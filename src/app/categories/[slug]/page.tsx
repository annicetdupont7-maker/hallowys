import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AssetImage } from '@/components/asset-image';
import { Breadcrumb } from '@/components/breadcrumb';
import { ProductGrid } from '@/components/product-card';
import { CATEGORIES, getCategory, getProductsByCategory } from '@/lib/catalog';
import { getAsset } from '@/lib/images';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: 'Catégorie introuvable' };

  return {
    title: category.name,
    description: category.description,
    openGraph: {
      title: `${category.name} · HALLOWYS`,
      description: category.description,
      /* L'image de catégorie sert aussi de visuel de partage. */
      images: [{ url: getAsset(category.image).src, alt: getAsset(category.image).alt }],
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      {/* EN-TÊTE : asset category.*, préchargé ici car c'est le LCP de la page. */}
      <section className="relative isolate">
        <AssetImage
          asset={category.image}
          ratio={null}
          priority
          sizes="100vw"
          className="h-[300px] w-full sm:h-[360px] lg:h-[420px]"
        />
        {/* Voile gauche + bas : les visuels de catégorie sont lumineux, le
            titre et le fil d'Ariane ont besoin d'un fond franchement sombre. */}
        <div aria-hidden className="scrim-hero absolute inset-0" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
            <Breadcrumb items={[{ label: 'Boutique', href: '/boutique' }, { label: category.name }]} />

            <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
              {category.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-faint">
            {products.length} {products.length > 1 ? 'articles' : 'article'}
          </p>
          {products.length > 0 ? (
            <Link
              href={`/boutique?categorie=${category.slug}`}
              className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-ink-muted transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
            >
              Trier et filtrer ces articles
            </Link>
          ) : null}
        </div>

        <div className="mt-6">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="rounded-card border border-line/70 bg-surface/60 p-8 text-center">
              <p className="text-sm text-ink-muted">
                Aucun article n&apos;est disponible dans cette catégorie pour le moment.
              </p>
              <Link
                href="/boutique"
                className="mt-6 inline-block rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void"
              >
                Voir toute la boutique
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
          Poursuivre la visite
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          <li>
            <Link
              href="/promotions"
              className="block rounded-full border border-pumpkin/40 px-4 py-2 text-sm text-pumpkin transition-colors hover:bg-pumpkin/10"
            >
              Promotions
            </Link>
          </li>
          {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categories/${c.slug}`}
                className="block rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-muted transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
