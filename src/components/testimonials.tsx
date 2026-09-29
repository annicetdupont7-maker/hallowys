import { AssetImage } from '@/components/asset-image';
import type { AssetKey } from '@/lib/images';

/**
 * AVIS CLIENTS : assets `testimonial.*` (/images/testimonials/*.webp).
 *
 * Les portraits sont affichés en avatar circulaire de 72 px : `sizes="72px"`
 * évite de télécharger un fichier plus large que nécessaire, et le conteneur
 * carré réserve la place avant chargement.
 *
 * Les produits cités dans les avis existent dans le catalogue.
 */
type Testimonial = {
  quote: string;
  name: string;
  city: string;
  rating: number;
  avatar: Extract<AssetKey, `testimonial.${string}`>;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "J'ai commandé le squelette géant et deux citrouilles LED le lundi, tout était installé pour le week-end. Mes voisins ont cru que j'avais fait appel à un décorateur.",
    name: 'Amina D.',
    city: 'Lyon',
    rating: 5,
    avatar: 'testimonial.1',
  },
  {
    quote:
      "Ce que j'aime, c'est que tout va ensemble. Les lanternes, la vaisselle et les bougies partagent le même univers : aucune fausse note sur la table.",
    name: 'Malik T.',
    city: 'Bordeaux',
    rating: 5,
    avatar: 'testimonial.2',
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="avis-title" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
          Paroles de revenants
        </p>
        <h2
          id="avis-title"
          className="mt-2 font-display text-3xl text-ink sm:text-4xl"
        >
          Ils ont hanté leur maison avec nous
        </h2>
      </header>

      <ul className="mt-10 grid gap-5 md:grid-cols-2">
        {TESTIMONIALS.map((item) => (
          <li key={item.name}>
            <figure className="flex h-full flex-col rounded-card border border-line/70 bg-surface/60 p-6 sm:p-7">
              <p className="text-pumpkin">
                <span aria-hidden>{'★'.repeat(item.rating)}</span>
                <span className="sr-only">Note : {item.rating} sur 5</span>
              </p>
              {/* Espaces fines insécables : le guillemet fermant ne part jamais
                  seul à la ligne (typographie française). */}
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-ink-muted">
                {`« ${item.quote} »`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3.5">
                <AssetImage
                  asset={item.avatar}
                  ratio="1 / 1"
                  className="size-[72px] shrink-0 rounded-full border border-line"
                  sizes="72px"
                  decorative
                />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-ink-faint">
                    {item.city} · <span className="text-pumpkin">Achat vérifié</span>
                  </p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
