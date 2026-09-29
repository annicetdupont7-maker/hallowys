import type { Metadata } from 'next';
import { PageHeader } from '@/components/breadcrumb';
import { CartView } from '@/components/cart-view';

export const metadata: Metadata = {
  title: 'Panier',
  robots: { index: false },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHeader crumbs={[{ label: 'Panier' }]} title="Votre panier" />
      <CartView />
    </div>
  );
}
