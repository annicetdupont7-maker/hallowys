import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AssetImage } from '@/components/asset-image';
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
      {/* EN-TÊTE — asset category.*, préchargé ici car c'est le LCP de la page. */}
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
            <nav aria-label="Fil d'Ariane" className="text-sm text-ink-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="transition-colors hover:text-pumpkin">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {category.name}
                </li>
              </ol>
            </nav>

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
        <p className="text-sm text-ink-faint">
          {products.length} {products.length > 1 ? 'articles' : 'article'}
        </p>

        <div className="mt-6">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="rounded-card border border-line/70 bg-surface/60 p-8 text-center text-sm text-ink-muted">
              Cette collection se prépare encore dans l&apos;ombre. Revenez très vite.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
          Poursuivre la visite
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
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
