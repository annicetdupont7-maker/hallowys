import Link from 'next/link';
import { AssetImage } from '@/components/asset-image';

/**
 * BANNIÈRE PROMO — asset `banner.sale` (/images/banners/halloween-sale.webp).
 *
 * L'image ne fournit que l'ambiance. Le pourcentage, le code promo, la date de
 * fin et le CTA sont du HTML : la même image sert donc à toutes les opérations
 * commerciales, sans jamais être régénérée.
 */
export function SaleBanner() {
  return (
    <section
      id="promotions"
      aria-labelledby="promo-title"
      className="relative isolate overflow-hidden rounded-card border border-pumpkin/25"
    >
      <AssetImage
        asset="banner.sale"
        ratio={null}
        className="h-[380px] w-full sm:h-[300px] lg:h-[340px]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,4,13,0.94),rgba(8,4,13,0.55)_60%,rgba(8,4,13,0.25))] sm:bg-[linear-gradient(to_right,rgba(8,4,13,0.95),rgba(8,4,13,0.6)_55%,rgba(8,4,13,0.15))]"
      />

      <div className="absolute inset-0 flex items-end sm:items-center">
        <div className="w-full p-6 sm:p-10 lg:p-12">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pumpkin">
              Nuit des offres
            </p>
            <h2
              id="promo-title"
              className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl"
            >
              Jusqu&apos;à −40 % sur la collection hantée
            </h2>
            <p className="mt-3 text-sm text-ink-muted sm:text-base">
              Du 20 au 31 octobre, avec le code{' '}
              <span className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-ink">HALLOWYS40</span>{' '}
              — cumulable avec la livraison offerte dès 49 €.
            </p>
            <Link
              href="/categories/decorations"
              className="mt-7 inline-block rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.02]"
            >
              Profiter des offres
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
