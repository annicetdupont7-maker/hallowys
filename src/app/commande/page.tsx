import type { Metadata } from 'next';
import { PageHeader } from '@/components/breadcrumb';
import { CheckoutView } from '@/components/checkout-view';

export const metadata: Metadata = {
  title: 'Commande',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHeader
        crumbs={[{ label: 'Panier', href: '/panier' }, { label: 'Commande' }]}
        title="Finaliser ma commande"
        intro="Renseignez vos coordonnées de livraison, puis validez : votre commande nous est transmise par WhatsApp."
      />
      <CheckoutView />
    </div>
  );
}
