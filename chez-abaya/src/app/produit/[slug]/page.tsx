import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, CheckIcon, TruckIcon } from '@/components/icons';
import { OrderPanel } from '@/components/order-panel';
import { ProductCard } from '@/components/product-card';
import { ProductImage } from '@/components/product-image';
import { BOUTIQUE } from '@/config/boutique';
import { PRODUCTS, getCategory, getProduct } from '@/data/products';
import { formatPrice } from '@/lib/format';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.shortDescription} ${formatPrice(product.price)} — commande sur WhatsApp.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="container-page pb-28 pt-4 md:pb-16 md:pt-8">
        <nav aria-label="Fil d’Ariane" className="text-sm text-brown-soft">
          <Link
            href={`/boutique?categorie=${category.id}`}
            className="inline-flex min-h-11 items-center gap-2 hover:text-brown"
          >
            <ArrowLeftIcon />
            {category.label}
          </Link>
        </nav>

        <div className="mt-2 grid gap-8 md:mt-4 md:grid-cols-2 md:gap-14">
          <div className="-mx-5 md:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand md:sticky md:top-24 md:rounded-sm">
              <ProductImage
                src={product.image}
                alt={product.imageAlt}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
              {product.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-ivory/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  {product.badge}
                </span>
              )}
            </div>
            {product.credit && (
              <p className="mt-2 px-5 text-[0.7rem] text-brown-soft/80 md:px-0">Photo : {product.credit}</p>
            )}
          </div>

          <div>
            <p className="eyebrow">{category.label}</p>
            <h1 className="mt-2 font-display text-4xl font-medium leading-tight md:text-5xl">{product.name}</h1>
            <p className="mt-3 text-2xl font-semibold">{formatPrice(product.price)}</p>
            <p className="mt-5 leading-relaxed text-brown-soft">{product.description}</p>

            <OrderPanel product={product} />

            <ul className="mt-6 space-y-2 text-sm text-brown-soft">
              <li className="flex items-center gap-2">
                <TruckIcon className="size-4 shrink-0 text-olive" />
                {BOUTIQUE.delivery}
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 shrink-0 text-olive" />
                {BOUTIQUE.payment}
              </li>
            </ul>

            <div className="mt-8 border-t border-line pt-6">
              <h2 className="eyebrow">Détails</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-ivory-deep/60 py-12 md:py-16" aria-labelledby="titre-associes">
          <div className="container-page pb-16 md:pb-0">
            <h2 id="titre-associes" className="font-display text-3xl font-medium">
              Dans la même catégorie
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
