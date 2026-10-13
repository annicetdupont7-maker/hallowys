import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopView } from '@/components/shop-view';

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Tous nos hijabs, abayas, robes modestes et accessoires, avec leurs prix. Commande sur WhatsApp.',
};

export default function BoutiquePage() {
  return (
    <div className="container-page py-10 md:py-14">
      <p className="eyebrow">La collection</p>
      <h1 className="mt-2 font-display text-4xl font-medium md:text-5xl">Boutique</h1>
      <p className="mt-3 max-w-lg text-brown-soft">
        Touchez un article pour voir les couleurs, les tailles et le commander sur WhatsApp.
      </p>
      <Suspense>
        <ShopView />
      </Suspense>
    </div>
  );
}
