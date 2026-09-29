'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { CheckIcon } from '@/components/icons';
import { QuantityStepper } from '@/components/quantity-stepper';
import { addToCart, useHydrated, useQuantityInCart } from '@/lib/cart';
import type { Product } from '@/lib/catalog';

/**
 * Bloc d'achat de la fiche produit : option (taille), quantité et ajout.
 * La quantité proposée est plafonnée au stock restant, panier déduit.
 */
export function AddToCartForm({ product }: { product: Product }) {
  const optionId = useId();
  const hydrated = useHydrated();
  const inCart = useQuantityInCart(product.slug);
  const remaining = Math.max(0, product.stock - (hydrated ? inCart : 0));

  const [option, setOption] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState<number | null>(null);
  const [error, setError] = useState('');

  /* Confirmation visible sur le bouton, en plus de la notification globale. */
  useEffect(() => {
    if (added === null) return;
    const timer = window.setTimeout(() => setAdded(null), 2500);
    return () => window.clearTimeout(timer);
  }, [added]);

  const safeQuantity = Math.max(1, Math.min(quantity, remaining));

  if (product.stock === 0) {
    return (
      <div className="mt-8 rounded-card border border-line/70 bg-surface/60 p-5">
        <p className="font-semibold text-ink">Victime de son succès</p>
        <p className="mt-1 text-sm text-ink-muted">
          Ce produit est en rupture de stock. Découvrez les autres pièces de la même catégorie
          ci-dessous.
        </p>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (product.options && !option) {
      setError(`Choisissez une ${product.options.name.toLowerCase()} avant d'ajouter au panier.`);
      return;
    }
    const count = addToCart(product.slug, safeQuantity, option || undefined);
    if (count > 0) {
      setAdded(count);
      setQuantity(1);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
      {product.options ? (
        <fieldset>
          <legend className="text-sm font-medium text-ink">
            {product.options.name}
            {option ? <span className="text-ink-muted"> : {option}</span> : null}
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.options.values.map((value) => (
              <label key={value} className="cursor-pointer">
                <input
                  type="radio"
                  name={optionId}
                  value={value}
                  checked={option === value}
                  onChange={() => {
                    setOption(value);
                    setError('');
                  }}
                  className="peer sr-only"
                />
                <span className="grid h-11 min-w-12 place-items-center rounded-full border border-line px-4 text-sm text-ink-muted transition-colors peer-checked:border-pumpkin peer-checked:bg-pumpkin/10 peer-checked:text-pumpkin peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pumpkin hover:border-pumpkin/50">
                  {value}
                </span>
              </label>
            ))}
          </div>
          {error ? (
            <p role="alert" className="mt-2 text-sm text-pumpkin-soft">
              {error}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper
          label="Quantité"
          value={safeQuantity}
          onChange={setQuantity}
          max={Math.max(1, remaining)}
        />
        <button
          type="submit"
          disabled={remaining === 0}
          className="flex-1 rounded-full bg-pumpkin px-8 py-3.5 text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:flex-none"
        >
          {added !== null ? (
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> {added > 1 ? `${added} articles ajoutés` : 'Ajouté au panier'}
            </span>
          ) : (
            'Ajouter au panier'
          )}
        </button>
      </div>

      <p className="text-sm text-ink-faint">
        {remaining === 0
          ? 'Vous avez déjà ajouté tout le stock disponible à votre panier.'
          : product.stock <= 5
            ? `Plus que ${product.stock} en stock.`
            : 'En stock, expédié sous 24 h.'}
      </p>
    </form>
  );
}

/**
 * Ajout rapide depuis une carte produit. Un produit à options renvoie vers sa
 * fiche pour choisir, plutôt que d'ajouter une taille au hasard.
 */
export function QuickAddButton({ product }: { product: Product }) {
  const hydrated = useHydrated();
  const inCart = useQuantityInCart(product.slug);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timer = window.setTimeout(() => setDone(false), 2000);
    return () => window.clearTimeout(timer);
  }, [done]);

  const className =
    'relative z-10 inline-flex min-h-10 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-colors sm:px-4';

  if (product.stock === 0) {
    return (
      <span className={`${className} border border-line text-ink-faint`}>
        Rupture<span className="hidden sm:inline">&nbsp;de stock</span>
      </span>
    );
  }

  if (product.options) {
    return (
      <Link
        href={`/products/${product.slug}`}
        aria-label={`Choisir une ${product.options.name.toLowerCase()} pour ${product.name}`}
        className={`${className} border border-pumpkin/50 text-pumpkin hover:bg-pumpkin/10`}
      >
        Choisir<span className="hidden sm:inline">&nbsp;une {product.options.name.toLowerCase()}</span>
      </Link>
    );
  }

  const soldOut = hydrated && inCart >= product.stock;

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => {
        if (addToCart(product.slug, 1) > 0) setDone(true);
      }}
      aria-label={`Ajouter ${product.name} au panier`}
      className={`${className} bg-pumpkin text-void hover:bg-pumpkin-soft disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-ink-faint`}
    >
      {done ? (
        <>
          <CheckIcon /> Ajouté
        </>
      ) : soldOut ? (
        'Stock atteint'
      ) : (
        <>
          Ajouter<span className="hidden sm:inline">&nbsp;au panier</span>
        </>
      )}
    </button>
  );
}
