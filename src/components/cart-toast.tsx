'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AssetImage } from '@/components/asset-image';
import { CheckIcon, CloseIcon } from '@/components/icons';
import { dismissNotice, useAddedNotice, useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/catalog';

/** Notification affichée après chaque ajout au panier, où que l'on soit. */
export function CartToast() {
  const notice = useAddedNotice();
  const { count, subtotal } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismissNotice, 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  /* Changer de page ferme la notification. */
  useEffect(() => {
    dismissNotice();
  }, [pathname]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-end p-4 sm:p-6">
      {notice ? (
        <div
          key={notice.id}
          className="toast-in pointer-events-auto w-full max-w-sm rounded-card border border-pumpkin/40 bg-surface p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-start gap-3">
            <AssetImage
              asset={notice.product.image}
              ratio="1 / 1"
              sizes="64px"
              decorative
              className="size-16 shrink-0 rounded-lg"
            />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-pumpkin">
                <CheckIcon /> Ajouté au panier
              </p>
              <p className="mt-1 truncate text-sm text-ink">
                {notice.quantity > 1 ? `${notice.quantity} × ` : ''}
                {notice.product.name}
                {notice.option ? ` (${notice.option})` : ''}
              </p>
              <p className="mt-0.5 text-xs text-ink-faint">
                Panier : {count} {count > 1 ? 'articles' : 'article'}, {formatPrice(subtotal)}
              </p>
            </div>
            <button
              type="button"
              onClick={dismissNotice}
              aria-label="Fermer la notification"
              className="-mr-1 -mt-1 grid size-9 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={dismissNotice}
              className="rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
            >
              Continuer
            </button>
            <Link
              href="/panier"
              className="rounded-full bg-pumpkin px-4 py-2.5 text-center text-sm font-semibold text-void transition-colors hover:bg-pumpkin-soft"
            >
              Voir le panier
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
