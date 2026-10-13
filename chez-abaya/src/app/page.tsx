import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, PinIcon, TruckIcon, WhatsAppIcon } from '@/components/icons';
import { ProductCard } from '@/components/product-card';
import { ProductImage } from '@/components/product-image';
import { BOUTIQUE } from '@/config/boutique';
import { CATEGORIES, PRODUCTS, unsplash } from '@/data/products';
import { GENERAL_MESSAGE, whatsappUrl } from '@/lib/whatsapp';

/** ⚠️ Photos d'ambiance de démonstration — à remplacer par celles de la boutique. */
const HERO_IMAGE = unsplash('1772714601002-fbb0fea8a911');
const STORY_IMAGE = unsplash('1762605135376-ae5af70a5628');

const STEPS = [
  {
    title: 'Choisissez',
    text: 'Parcourez la collection, sélectionnez la couleur et la taille qui vous plaisent.',
  },
  {
    title: 'Écrivez-nous',
    text: 'Le bouton « Commander sur WhatsApp » prépare le message avec le produit, la couleur et le prix.',
  },
  {
    title: 'Recevez',
    text: 'Nous confirmons la disponibilité et convenons de la livraison. Vous payez à la réception.',
  },
];

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured);

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative overflow-hidden bg-ivory-deep">
        <div className="container-page grid items-center gap-8 py-6 md:grid-cols-2 md:gap-12 md:py-20">
          <div className="order-2 md:order-1">
            <p className="eyebrow">Nouvelle collection · Cotonou</p>
            <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight md:text-6xl">
              L’élégance modeste,
              <br />
              <em className="text-olive">livrée chez vous.</em>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brown-soft">
              Hijabs, abayas et robes choisis avec soin pour le quotidien comme pour les grandes occasions.
              Pas besoin de chercher la boutique : choisissez ici, commandez sur WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/boutique" className="btn btn-primary">
                Découvrir la collection
                <ArrowRightIcon />
              </Link>
              <a
                href={whatsappUrl(GENERAL_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsAppIcon />
                Poser une question
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brown-soft">
              <li className="flex items-center gap-2">
                <TruckIcon className="size-4 text-olive" />
                Livraison à Cotonou & environs
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="size-4 text-olive" />
                Paiement à la livraison
              </li>
            </ul>
          </div>

          <div className="relative order-1 aspect-[4/3] w-full overflow-hidden rounded-sm md:order-2 md:aspect-[4/5]">
            <ProductImage
              src={HERO_IMAGE}
              alt="Femme en ensemble ivoire et hijab assorti, assise sur fond terracotta clair"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="object-[50%_78%] md:object-center"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ CATÉGORIES */}
      <section className="container-page py-14 md:py-20" aria-labelledby="titre-categories">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Nos univers</p>
            <h2 id="titre-categories" className="mt-2 font-display text-3xl font-medium md:text-4xl">
              Que cherchez-vous ?
            </h2>
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/boutique?categorie=${c.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand">
                  <ProductImage
                    src={c.image}
                    alt={c.imageAlt}
                    sizes="(min-width: 768px) 24vw, 48vw"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/75 to-transparent p-3 pt-12 md:p-5">
                    <p className="font-display text-2xl font-semibold text-ivory md:text-3xl">{c.label}</p>
                    <p className="mt-0.5 text-xs text-ivory/85 md:text-sm">{c.blurb}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------- SÉLECTION */}
      <section className="border-y border-line bg-ivory-deep/60 py-14 md:py-20" aria-labelledby="titre-selection">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Les préférées</p>
              <h2 id="titre-selection" className="mt-2 font-display text-3xl font-medium md:text-4xl">
                Sélection du moment
              </h2>
            </div>
            <Link
              href="/boutique"
              className="hidden items-center gap-2 text-sm font-semibold underline decoration-gold underline-offset-8 sm:inline-flex"
            >
              Tout voir <ArrowRightIcon />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <Link href="/boutique" className="btn btn-outline mt-10 w-full sm:hidden">
            Voir les {PRODUCTS.length} articles
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------- COMMENT COMMANDER */}
      <section id="commander" className="container-page scroll-mt-20 py-14 md:py-20" aria-labelledby="titre-commander">
        <p className="eyebrow">Simple et rapide</p>
        <h2 id="titre-commander" className="mt-2 font-display text-3xl font-medium md:text-4xl">
          Commander en 3 étapes
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-sm border border-line bg-ivory p-6">
              <span className="font-display text-4xl font-medium italic text-gold">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------- HISTOIRE */}
      <section className="bg-olive text-ivory" aria-labelledby="titre-histoire">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-[5/6]">
            <ProductImage
              src={STORY_IMAGE}
              alt="Deux femmes en abayas claires sous une arche lumineuse"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow !text-sand">La boutique</p>
            <h2 id="titre-histoire" className="mt-3 font-display text-3xl font-medium leading-tight md:text-5xl">
              Une adresse de confiance, même à distance.
            </h2>
            <p className="mt-5 leading-relaxed text-ivory/85">
              {BOUTIQUE.name}, c’est une sélection pensée pour les femmes qui veulent être couvertes et élégantes,
              sous la chaleur de Cotonou comme lors des cérémonies. Chaque pièce est choisie pour la qualité de son
              tissu et la justesse de sa coupe.
            </p>
            <p className="mt-4 leading-relaxed text-ivory/85">
              Vous ne connaissez pas encore la boutique ? Aucun souci : envoyez-nous un message, nous vous
              envoyons des photos supplémentaires et nous livrons directement chez vous.
            </p>
            <div className="mt-8 flex items-start gap-3 text-sm">
              <PinIcon className="mt-0.5 size-5 shrink-0 text-sand" />
              <p>
                {BOUTIQUE.address.district}, {BOUTIQUE.address.city} ·{' '}
                <a
                  href={BOUTIQUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-sand underline-offset-4"
                >
                  Voir sur la carte
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- APPEL FINAL */}
      <section className="container-page py-16 text-center md:py-24">
        <h2 className="mx-auto max-w-xl font-display text-3xl font-medium leading-tight md:text-4xl">
          Une question sur une taille, une couleur, un délai ?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-brown-soft">
          Nous répondons sur WhatsApp : {BOUTIQUE.hours[0].days.toLowerCase()}, {BOUTIQUE.hours[0].time}.
        </p>
        <a
          href={whatsappUrl(GENERAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-8"
        >
          <WhatsAppIcon />
          Écrire sur WhatsApp
        </a>
      </section>
    </>
  );
}
