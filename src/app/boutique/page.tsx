import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/breadcrumb';
import { ShopView } from '@/components/shop-view';
import { PRODUCTS } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Boutique',
  description:
    'Tous les produits HALLOWYS : décorations, costumes, accessoires, éclairage, art de la table et cadeaux d’Halloween.',
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHeader
        crumbs={[{ label: 'Boutique' }]}
        eyebrow="Toute la collection"
        title="Boutique"
        intro={`Les ${PRODUCTS.length} pièces de la collection, à rechercher, filtrer et trier selon vos envies.`}
      />
      {/* useSearchParams exige une frontière Suspense pour le rendu statique. */}
      <Suspense fallback={<div className="mt-8 h-96 animate-pulse rounded-card bg-surface/40" />}>
        <ShopView />
      </Suspense>
    </div>
  );
}
