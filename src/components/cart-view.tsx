'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AssetImage } from '@/components/asset-image';
import { TrashIcon } from '@/components/icons';
import { OrderTotals } from '@/components/order-totals';
import { QuantityStepper } from '@/components/quantity-stepper';
import {
  FREE_SHIPPING_THRESHOLD,
  clearCart,
  removeFromCart,
  setQuantity,
  useCart,
  useHydrated,
} from '@/lib/cart';
import { formatPrice } from '@/lib/catalog';

export function CartView() {
  const hydrated = useHydrated();
  const summary = useCart();
  const { lines, subtotal } = summary;
  const [confirmClear, setConfirmClear] = useState(false);

  /* Avant la lecture de localStorage : réserve la place sans rien affirmer. */
  if (!hydrated) {
    return <div className="mt-10 h-64 animate-pulse rounded-card border border-line/70 bg-surface/40" />;
  }

  if (lines.length === 0) {
    return (
      <div className="mt-10 rounded-card border border-line/70 bg-surface/60 px-6 py-14 text-center">
        <p className="font-display text-2xl text-ink">Votre panier est encore vide.</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
          Citrouilles, costumes, masques et bougies vous attendent dans la boutique.
        </p>
        <Link
          href="/boutique"
          className="mt-8 inline-block rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
        >
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  const missingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <section aria-labelledby="cart-items-title">
        <h2 id="cart-items-title" className="sr-only">
          Articles du panier
        </h2>
        <ul className="divide-y divide-line/70 rounded-card border border-line/70 bg-surface/60">
          {lines.map((line) => {
            const { product } = line;
            const others = lines
              .filter((other) => other.slug === line.slug && other.key !== line.key)
              .reduce((sum, other) => sum + other.quantity, 0);
            const max = product.stock - others;

            return (
              <li key={line.key} className="flex gap-4 p-4 sm:p-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="shrink-0"
                  tabIndex={-1}
                  aria-hidden
                >
                  <AssetImage
                    asset={product.image}
                    ratio="1 / 1"
                    sizes="112px"
                    decorative
                    className="size-20 rounded-xl border border-line/70 sm:size-28"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div className="min-w-0">
                      <h3 className="font-medium leading-snug text-ink">
                        <Link href={`/products/${product.slug}`} className="hover:text-pumpkin">
                          {product.name}
                        </Link>
                      </h3>
                      {line.option && product.options ? (
                        <p className="mt-0.5 text-sm text-ink-muted">
                          {product.options.name} : {line.option}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm text-ink-faint">
                        {formatPrice(product.price)} l&apos;unité
                        {product.oldPrice ? (
                          <span className="ml-2 line-through">{formatPrice(product.oldPrice)}</span>
                        ) : null}
                      </p>
                    </div>
                    <p className="text-base font-semibold tabular-nums text-ink">
                      {formatPrice(line.lineTotal)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <QuantityStepper
                      size="sm"
                      label={`Quantité de ${product.name}`}
                      value={line.quantity}
                      min={0}
                      max={max}
                      onChange={(value) => setQuantity(line.key, value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.key)}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-blood"
                    >
                      <TrashIcon />
                      Supprimer
                      <span className="sr-only"> {product.name}</span>
                    </button>
                  </div>
                  {line.quantity >= max ? (
                    <p className="text-xs text-ink-faint">Quantité maximale disponible atteinte.</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/boutique"
            className="inline-flex min-h-10 items-center text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
          >
            ← Continuer mes achats
          </Link>

          {confirmClear ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-ink-muted">Vider tout le panier ?</span>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setConfirmClear(false);
                }}
                className="min-h-10 rounded-full bg-blood px-4 font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Oui, vider
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="min-h-10 rounded-full border border-line px-4 text-ink transition-colors hover:border-pumpkin/50"
              >
                Annuler
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-blood"
            >
              <TrashIcon />
              Vider le panier
            </button>
          )}
        </div>
      </section>

      <aside
        aria-labelledby="summary-title"
        className="rounded-card border border-line/70 bg-surface/60 p-5 sm:p-6 lg:sticky lg:top-24"
      >
        <h2 id="summary-title" className="font-display text-2xl text-ink">
          Récapitulatif
        </h2>

        <div className="mt-5">
          <OrderTotals summary={summary} />
        </div>

        <p className="mt-5 rounded-xl bg-void/60 px-4 py-3 text-sm text-ink-muted">
          {missingForFreeShipping > 0
            ? `Plus que ${formatPrice(missingForFreeShipping)} d'achat pour profiter de la livraison offerte.`
            : 'La livraison vous est offerte.'}
        </p>

        <Link
          href="/commande"
          className="mt-5 block rounded-full bg-pumpkin px-6 py-3.5 text-center text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.01]"
        >
          Passer commande
        </Link>

        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          Votre panier est conservé sur cet appareil : vous le retrouverez à votre prochaine
          visite.
        </p>
      </aside>
    </div>
  );
}
