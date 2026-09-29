import Link from 'next/link';
import { Hero } from '@/components/hero';
import { CategoryCard } from '@/components/category-card';
import { ProductGrid } from '@/components/product-card';
import { SaleBanner } from '@/components/sale-banner';
import { Testimonials } from '@/components/testimonials';
import { CATEGORIES, PRODUCTS, getProductsByCategory } from '@/lib/catalog';

const REASSURANCE = [
  { title: 'Expédition sous 24 h', text: 'Commandé avant 14 h, parti le jour même.' },
  { title: 'Univers cohérent', text: 'Chaque pièce est choisie pour tenir dans le même décor.' },
  { title: 'Retours 30 jours', text: 'La nuit passée, si ça ne va pas, on reprend.' },
];

export default function HomePage() {
  /**
   * Répartition dérivée du catalogue réel, jamais d'un nombre figé : une
   * section ne peut donc pas se retrouver vide si le catalogue change.
   * Les mieux notés en vitrine, le reste en nouveautés.
   */
  const parNote = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
  const bestSellers = parNote.slice(0, Math.ceil(parNote.length / 2));
  const nouveautes = parNote.slice(Math.ceil(parNote.length / 2));

  return (
    <>
      {/* 1. HERO — asset hero.main, seul visuel préchargé de la page. */}
      <Hero />

      {/* 2. Bandeau de réassurance — texte pur, aucune image. */}
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

      {/* 3. CATÉGORIES — 6 assets category.*, tous en lazy loading. */}
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
            Six familles pensées pour se répondre : décor, costume et lumière racontent la même
            histoire.
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

      {/* 4. PRODUITS PHARES — les mieux notés, lazy loading. */}
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
            href="/categories/decorations"
            className="text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
          >
            Tout voir →
          </Link>
        </header>

        <div className="mt-10">
          <ProductGrid products={bestSellers} />
        </div>
      </section>
      ) : null}

      {/* 5. BANNIÈRE PROMO — asset banner.sale, lazy loading. */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SaleBanner />
      </div>

      {/* 6. NOUVEAUTÉS — seconde moitié du catalogue. La section disparaît
             entièrement si elle n'a rien à montrer : jamais de grille vide. */}
      {nouveautes.length > 0 ? (
        <section aria-labelledby="new-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
              Fraîchement sorties de la crypte
            </p>
            <h2
              id="new-title"
              className="mt-2 font-display text-3xl text-ink sm:text-4xl"
            >
              Nouveautés
            </h2>
          </header>

          <div className="mt-10">
            <ProductGrid products={nouveautes} />
          </div>
        </section>
      ) : null}

      {/* 7. AVIS CLIENTS — 2 assets testimonial.*, avatars 72 px, lazy loading. */}
      <Testimonials />

      {/* 8. NEWSLETTER — texte pur, aucune image. */}
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
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="vous@exemple.fr"
              className="flex-1 rounded-full border border-line bg-void px-5 py-3 text-sm text-ink placeholder:text-ink-faint"
            />
            <button
              type="submit"
              className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
