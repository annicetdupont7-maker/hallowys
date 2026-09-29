import Link from 'next/link';
import { AssetImage } from '@/components/asset-image';
import { getPromotions, maxDiscountPercent } from '@/lib/catalog';

/**
 * BANNIÈRE PROMO : asset `banner.sale` (/images/banners/halloween-sale.webp).
 *
 * L'image ne fournit que l'ambiance. Le pourcentage est calculé depuis le
 * catalogue : l'accroche reste donc toujours fidèle aux remises réelles.
 */
export function SaleBanner() {
  const promotions = getPromotions();
  if (promotions.length === 0) return null;

  return (
    <section
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
              Jusqu&apos;à −{maxDiscountPercent()} % sur la collection hantée
            </h2>
            <p className="mt-3 text-sm text-ink-muted sm:text-base">
              {promotions.length} {promotions.length > 1 ? 'pièces' : 'pièce'} à prix réduit jusqu&apos;au 31 octobre, remise déjà
              appliquée. Livraison offerte dès 49 € d&apos;achat.
            </p>
            <Link
              href="/promotions"
              className="mt-7 inline-block rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.02]"
            >
              Voir les promotions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
