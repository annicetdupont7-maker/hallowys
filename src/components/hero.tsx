import Link from 'next/link';
import { AssetImage } from '@/components/asset-image';

/**
 * HERO : asset `hero.main` (/images/hero/halloween-hero.webp).
 *
 * Seul visuel du site chargé en priorité (LCP). L'image ne porte aucun texte :
 * titre, accroche et CTA sont du HTML posé au-dessus, via un voile dégradé qui
 * garantit le contraste quelle que soit la photo finale.
 */
export function Hero() {
  return (
    <section className="relative isolate">
      <AssetImage
        asset="hero.main"
        ratio={null}
        className="h-[78svh] min-h-[520px] w-full sm:h-[72svh] lg:h-[86svh]"
        imageClassName="object-center"
      />

      {/* Voile de lisibilité : au-dessus de l'image, sous le texte. */}
      <div aria-hidden className="scrim-hero absolute inset-0" />

      <div className="absolute inset-0 flex items-end pb-14 sm:items-center sm:pb-0">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-pumpkin/40 bg-void/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-pumpkin backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-pumpkin" />
              Collection 31 octobre
            </p>

            <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              La nuit
              <span className="block text-pumpkin">vous va si bien.</span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
              Décors, costumes et lumières réunis dans un même univers visuel, pour une maison
              hantée qui se tient jusque dans les détails.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/boutique"
                className="rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void shadow-[0_0_40px_-10px_var(--color-pumpkin)] transition-transform hover:scale-[1.02]"
              >
                Découvrir la boutique
              </Link>
              <Link
                href="/promotions"
                className="rounded-full border border-line bg-void/50 px-6 py-3 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
              >
                Voir les promotions
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                ['Livraison', 'Offerte dès 49 €'],
                ['Expédition', 'Sous 24 h'],
                ['Retours', '30 jours'],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs uppercase tracking-wider text-ink-faint">{label}</dt>
                  <dd className="mt-0.5 font-medium text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
