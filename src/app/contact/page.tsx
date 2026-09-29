import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/breadcrumb';
import { ContactForm } from '@/components/contact-form';
import { CONTACT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Une question sur un produit, une commande ou un retour ? Écrivez à l’équipe HALLOWYS.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageHeader
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Service client"
        title="Nous contacter"
        intro="Une question sur un produit, une commande ou un retour ? Notre équipe vous répond sous 24 h ouvrées."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <section
          aria-label="Formulaire de contact"
          className="rounded-card border border-line/70 bg-surface/60 p-5 sm:p-8"
        >
          <ContactForm />
        </section>

        <aside className="space-y-6 self-start rounded-card border border-line/70 bg-surface/60 p-5 text-sm sm:p-8">
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-faint">E-mail</h2>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 inline-block break-all font-medium text-pumpkin hover:text-pumpkin-soft"
            >
              {CONTACT.email}
            </a>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-faint">Horaires</h2>
            <p className="mt-1 text-ink">{CONTACT.hours}</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wider text-ink-faint">Réponse rapide</h2>
            <p className="mt-1 text-ink-muted">
              Livraison, retours, tailles : la plupart des réponses se trouvent dans nos{' '}
              <Link href="/faq" className="font-medium text-pumpkin hover:text-pumpkin-soft">
                questions fréquentes
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
