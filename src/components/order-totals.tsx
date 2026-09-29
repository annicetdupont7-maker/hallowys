import { formatPrice } from '@/lib/catalog';
import type { summarize } from '@/lib/cart';

/** Lignes de totaux, identiques dans le panier et sur la page de commande. */
export function OrderTotals({ summary }: { summary: ReturnType<typeof summarize> }) {
  const { count, subtotal, savings, shipping, total } = summary;
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-ink-muted">
          Sous-total ({count} {count > 1 ? 'articles' : 'article'})
        </dt>
        <dd className="tabular-nums text-ink">{formatPrice(subtotal)}</dd>
      </div>
      {savings > 0 ? (
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">Dont économies</dt>
          <dd className="tabular-nums text-pumpkin">−{formatPrice(savings)}</dd>
        </div>
      ) : null}
      <div className="flex justify-between gap-4">
        <dt className="text-ink-muted">Livraison à domicile</dt>
        <dd className="tabular-nums text-ink">{shipping === 0 ? 'Offerte' : formatPrice(shipping)}</dd>
      </div>
      <div className="flex justify-between gap-4 border-t border-line/70 pt-3 text-base">
        <dt className="font-semibold text-ink">Total TTC</dt>
        <dd className="font-semibold tabular-nums text-ink">{formatPrice(total)}</dd>
      </div>
    </dl>
  );
}
