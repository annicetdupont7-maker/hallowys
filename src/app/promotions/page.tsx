import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/breadcrumb';
import { ProductGrid } from '@/components/product-card';
import { getPromotions, maxDiscountPercent } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Promotions',
  description: 'Les offres HALLOWYS du moment sur les décorations, costumes et accessoires d’Halloween.',
};

export default function PromotionsPage() {
  const products = getPromotions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHeader
        crumbs={[{ label: 'Promotions' }]}
        eyebrow="Nuit des offres"
        title="Promotions"
        intro={
          products.length > 0
            ? `Jusqu'à −${maxDiscountPercent()} % sur une sélection de pièces, jusqu'au 31 octobre. La remise est déjà appliquée au prix affiché.`
            : undefined
        }
      />

      <div className="mt-10">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="rounded-card border border-line/70 bg-surface/60 px-6 py-12 text-center">
            <p className="font-display text-xl text-ink">Aucune promotion en cours pour le moment.</p>
            <Link
              href="/boutique"
              className="mt-6 inline-block rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void"
            >
              Voir toute la boutique
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
