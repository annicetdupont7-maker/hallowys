import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/breadcrumb';
import { Faq } from '@/components/faq';
import { FAQ } from '@/lib/faq';

export const metadata: Metadata = {
  title: 'Questions fréquentes',
  description: 'Livraison, retours, tailles, paiement : les réponses aux questions les plus posées sur HALLOWYS.',
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <PageHeader
        crumbs={[{ label: 'Questions fréquentes' }]}
        eyebrow="Aide"
        title="Questions fréquentes"
        intro="Livraison, retours, tailles et paiement : cliquez sur une question pour afficher sa réponse."
      />
      <div className="mt-10">
        <Faq items={FAQ} />
      </div>
      <p className="mt-8 text-sm text-ink-muted">
        Vous ne trouvez pas votre réponse ?{' '}
        <Link href="/contact" className="font-medium text-pumpkin hover:text-pumpkin-soft">
          Contactez-nous
        </Link>
        , nous répondons sous 24 h ouvrées.
      </p>
    </div>
  );
}
