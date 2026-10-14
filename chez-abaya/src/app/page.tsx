import Link from 'next/link';
import { ArrowRightIcon, CheckIcon, PinIcon, TruckIcon, WhatsAppIcon } from '@/components/icons';
import { ProductCard } from '@/components/product-card';
import { ProductImage } from '@/components/product-image';
import { BOUTIQUE } from '@/config/boutique';
import { CATEGORIES, HOME_IMAGES, LOOKBOOK, PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { GENERAL_MESSAGE, whatsappUrl } from '@/lib/whatsapp';

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
  const ceremony = PRODUCTS.find((p) => p.slug === 'jilbab-sable');

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="relative isolate overflow-hidden bg-brown text-ivory md:grid md:min-h-[38rem] md:grid-cols-2">
        <div className="absolute inset-0 -z-10 md:relative md:order-2 md:z-0">
          <ProductImage
            src={HOME_IMAGES.hero.src}
            alt={HOME_IMAGES.hero.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-[50%_20%]"
          />
          {/* Voile sombre en bas de photo pour la lisibilité du texte (mobile uniquement). */}
          <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/45 to-transparent md:hidden" />
        </div>

        <div className="flex min-h-[calc(100svh-6.5rem)] flex-col justify-end px-5 pb-10 pt-40 md:order-1 md:min-h-0 md:justify-center md:px-12 md:py-20 lg:px-20">
          <p className="ornament text-[0.65rem]">◆</p>
          <p className="eyebrow mt-4 !text-gold-light">Nouvelle collection · Cotonou</p>
          <h1 className="mt-3 font-display text-[2.9rem] font-medium leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            L’élégance modeste,
            <br />
            <em className="text-gold-light">livrée chez vous.</em>
          </h1>
          <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory/85 md:text-base">
            Hijabs, abayas et robes choisis avec soin, pour le quotidien comme pour les grandes occasions.
            Choisissez ici, commandez sur WhatsApp, recevez chez vous.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/boutique" className="btn btn-gold">
              Découvrir la collection
              <ArrowRightIcon />
            </Link>
            <a
              href={whatsappUrl(GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              <WhatsAppIcon />
              Poser une question
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- ATOUTS */}
      <section className="border-b border-line bg-ivory-deep">
        <ul className="container-page grid grid-cols-1 gap-3 py-5 text-sm sm:grid-cols-3 sm:gap-6">
          <li className="flex items-center gap-3">
            <TruckIcon className="size-5 shrink-0 text-terracotta" />
            {BOUTIQUE.delivery}
          </li>
          <li className="flex items-center gap-3">
            <CheckIcon className="size-5 shrink-0 text-terracotta" />
            {BOUTIQUE.payment}
          </li>
          <li className="flex items-center gap-3">
            <WhatsAppIcon className="size-5 shrink-0 text-terracotta" />
            Conseils personnalisés sur WhatsApp
          </li>
        </ul>
      </section>

      {/* ------------------------------------------------------ CATÉGORIES */}
      <section className="py-14 md:py-20" aria-labelledby="titre-categories">
        <div className="container-page">
          <p className="eyebrow">Nos univers</p>
          <h2 id="titre-categories" className="mt-2 font-display text-4xl font-medium md:text-5xl">
            Que cherchez-vous ?
          </h2>
        </div>
        {/* Défilement horizontal sur mobile, grille sur grand écran. */}
        <ul className="container-page mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-5 md:overflow-visible">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto">
              <Link href={`/boutique?categorie=${c.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-sand">
                  <ProductImage
                    src={c.image}
                    alt={c.imageAlt}
                    sizes="(min-width: 768px) 24vw, 68vw"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown/85 via-brown/30 to-transparent p-4 pt-20 md:p-5">
                    <p className="font-display text-3xl font-semibold text-ivory">{c.label}</p>
                    <p className="mt-1 text-sm text-ivory/85">{c.blurb}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light">
                      Voir <ArrowRightIcon className="size-3.5" />
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------- SÉLECTION */}
      <section className="bg-ivory-deep py-14 md:py-20" aria-labelledby="titre-selection">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Les préférées</p>
              <h2 id="titre-selection" className="mt-2 font-display text-4xl font-medium md:text-5xl">
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
          <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-4 md:gap-x-6">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <Link href="/boutique" className="btn btn-primary mt-10 w-full sm:hidden">
            Voir les {PRODUCTS.length} articles
          </Link>
        </div>
      </section>

      {/* ----------------------------------------------------- CÉRÉMONIE */}
      {ceremony && (
        <section className="bg-cacao text-ivory" aria-labelledby="titre-ceremonie">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[36rem]">
              <ProductImage src={HOME_IMAGES.ceremony.src} alt={HOME_IMAGES.ceremony.alt} sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col justify-center px-5 py-12 md:px-12 lg:px-20">
              <p className="eyebrow !text-gold-light">Aïd · Mariages · Baptêmes</p>
              <h2 id="titre-ceremonie" className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">
                Pour les jours qui comptent.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ivory/80">
                Satin, broderies dorées, voiles assortis : nos pièces de cérémonie sont choisies pour être
                remarquées, tout en restant pudiques et confortables.
              </p>
              <p className="mt-6 font-display text-2xl">
                {ceremony.name} <span className="text-gold-light">· {formatPrice(ceremony.price)}</span>
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/produit/${ceremony.slug}`} className="btn btn-gold">
                  Voir le {ceremony.name}
                </Link>
                <Link href="/boutique?categorie=robes" className="btn btn-ghost-light">
                  Robes de fête
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------- INSPIRATIONS */}
      <section className="py-14 md:py-20" aria-labelledby="titre-inspirations">
        <div className="container-page text-center">
          <p className="ornament justify-center text-[0.65rem]">◆</p>
          <h2 id="titre-inspirations" className="mt-3 font-display text-4xl font-medium md:text-5xl">
            Inspirations
          </h2>
          <p className="mx-auto mt-3 max-w-md text-brown-soft">
            Des idées de tenues pour porter le hijab avec style, du wax aux tons pastel.
          </p>
        </div>
        <ul className="container-page mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {LOOKBOOK.map((img, i) => (
            <li
              key={img.src}
              className={`relative overflow-hidden rounded-md bg-sand ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square md:col-span-2 md:aspect-auto' : 'aspect-[3/4]'
              }`}
            >
              <ProductImage
                src={img.src}
                alt={img.alt}
                sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------- COMMENT COMMANDER */}
      <section id="commander" className="scroll-mt-20 bg-ivory-deep py-14 md:py-20" aria-labelledby="titre-commander">
        <div className="container-page">
          <p className="eyebrow">Simple et rapide</p>
          <h2 id="titre-commander" className="mt-2 font-display text-4xl font-medium md:text-5xl">
            Commander en 3 étapes
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-md border border-line bg-ivory p-6 shadow-sm shadow-brown/5">
                <span className="grid size-12 place-items-center rounded-full bg-terracotta font-display text-2xl font-semibold text-ivory">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- HISTOIRE */}
      <section className="bg-olive text-ivory" aria-labelledby="titre-histoire">
        <div className="container-page grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14 md:py-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md">
            <ProductImage src={HOME_IMAGES.story.src} alt={HOME_IMAGES.story.alt} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div>
            <p className="eyebrow !text-gold-light">La boutique</p>
            <h2 id="titre-histoire" className="mt-3 font-display text-4xl font-medium leading-tight md:text-5xl">
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
              <PinIcon className="mt-0.5 size-5 shrink-0 text-gold-light" />
              <p>
                {BOUTIQUE.address.district}, {BOUTIQUE.address.city} ·{' '}
                <a
                  href={BOUTIQUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold-light underline-offset-4"
                >
                  Voir sur la carte
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- APPEL FINAL */}
      <section className="bg-brown py-16 text-center text-ivory md:py-24">
        <div className="container-page">
          <p className="ornament justify-center text-[0.65rem]">◆</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-4xl font-medium leading-tight md:text-5xl">
            Une question sur une taille, une couleur, un délai ?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ivory/75">
            Nous répondons sur WhatsApp : {BOUTIQUE.hours[0].days.toLowerCase()}, {BOUTIQUE.hours[0].time}.
          </p>
          <a
            href={whatsappUrl(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold mt-8"
          >
            <WhatsAppIcon />
            Écrire sur WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
