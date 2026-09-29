import Link from 'next/link';
import { Hero } from '@/components/hero';
import { CategoryCard } from '@/components/category-card';
import { ProductGrid } from '@/components/product-card';
import { SaleBanner } from '@/components/sale-banner';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { NewsletterForm } from '@/components/newsletter-form';
import { CATEGORIES, PRODUCTS, getProductsByCategory, sortProducts } from '@/lib/catalog';
import { FAQ } from '@/lib/faq';

const CATEGORY_COUNT_WORDS = ['Zéro', 'Une', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept', 'Huit'];

const REASSURANCE = [
  { title: 'Expédition sous 24 h', text: 'Commandé avant 14 h, parti le jour même.' },
  { title: 'Univers cohérent', text: 'Chaque pièce est choisie pour tenir dans le même décor.' },
  { title: 'Retours 30 jours', text: 'La nuit passée, si ça ne va pas, on reprend.' },
];

export default function HomePage() {
  /**
   * Sélections dérivées du catalogue : les plus populaires (nombre d'avis)
   * et les dernières arrivées (date de mise en rayon), sans doublon.
   */
  const bestSellers = sortProducts(PRODUCTS, 'pertinence').slice(0, 4);
  const nouveautes = sortProducts(
    PRODUCTS.filter((p) => !bestSellers.includes(p)),
    'nouveautes',
  ).slice(0, 4);
  const categoryCount = CATEGORY_COUNT_WORDS[CATEGORIES.length] ?? String(CATEGORIES.length);

  return (
    <>
      {/* 1. HERO : asset hero.main, seul visuel préchargé de la page. */}
      <Hero />

      {/* 2. Bandeau de réassurance : texte pur, aucune image. */}
      <section aria-label="Nos engagements" className="border-y border-line/70 bg-surface/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {REASSURANCE.map((item) => (
            <div key={item.title}>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-ink-faint">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATÉGORIES : assets category.*, tous en lazy loading. */}
      <section id="categories" aria-labelledby="categories-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
              Le rayon des ombres
            </p>
            <h2
              id="categories-title"
              className="mt-2 font-display text-3xl text-ink sm:text-4xl"
            >
              Explorer par univers
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-muted">
            {categoryCount} familles pensées pour se répondre : décor, costume et lumière racontent
            la même histoire.
          </p>
        </header>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} count={getProductsByCategory(category.slug).length} />
            </li>
          ))}
        </ul>
      </section>

      {/* 4. PRODUITS PHARES : les plus populaires, lazy loading. */}
      {bestSellers.length > 0 ? (
      <section aria-labelledby="bestsellers-title" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
              Les plus convoités
            </p>
            <h2
              id="bestsellers-title"
              className="mt-2 font-display text-3xl text-ink sm:text-4xl"
            >
              Pièces phares de la saison
            </h2>
          </div>
          <Link
            href="/boutique"
            className="text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
          >
            Voir toute la boutique →
          </Link>
        </header>

        <div className="mt-10">
          <ProductGrid products={bestSellers} />
        </div>
      </section>
      ) : null}

      {/* 5. BANNIÈRE PROMO : asset banner.sale, lazy loading. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SaleBanner />
      </div>

      {/* 6. NOUVEAUTÉS : dernières arrivées. La section disparaît entièrement
             si elle n'a rien à montrer : jamais de grille vide. */}
      {nouveautes.length > 0 ? (
        <section aria-labelledby="new-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
                Fraîchement sorties de la crypte
              </p>
              <h2
                id="new-title"
                className="mt-2 font-display text-3xl text-ink sm:text-4xl"
              >
                Nouveautés
              </h2>
            </div>
            <Link
              href="/boutique?tri=nouveautes"
              className="text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
            >
              Toutes les nouveautés →
            </Link>
          </header>

          <div className="mt-10">
            <ProductGrid products={nouveautes} />
          </div>
        </section>
      ) : null}

      {/* 7. AVIS CLIENTS : 2 assets testimonial.*, avatars 72 px, lazy loading. */}
      <Testimonials />

      {/* 8. FAQ : extrait, réponses dépliables. */}
      <section aria-labelledby="faq-title" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
            Avant de commander
          </p>
          <h2 id="faq-title" className="mt-2 font-display text-3xl text-ink sm:text-4xl">
            Questions fréquentes
          </h2>
        </header>
        <div className="mt-10">
          <Faq items={FAQ.slice(0, 4)} />
        </div>
        <p className="mt-6 text-center">
          <Link
            href="/faq"
            className="text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
          >
            Toutes les questions →
          </Link>
        </p>
      </section>

      {/* 9. NEWSLETTER : texte pur, aucune image. */}
      <section aria-labelledby="newsletter-title" className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-card border border-line/70 bg-surface/60 p-8 text-center sm:p-12">
          <h2
            id="newsletter-title"
            className="font-display text-2xl text-ink sm:text-3xl"
          >
            Recevez les rituels HALLOWYS
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
            Nouveautés, ventes privées et idées de mise en scène. Une lettre par mois, jamais
            davantage.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
