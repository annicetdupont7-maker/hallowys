'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { orderMessage, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/**
 * Choix de la couleur (et de la taille si l'article en a) + bouton
 * « Commander sur WhatsApp ». Le message est recalculé à chaque choix.
 * Sur mobile, le bouton est aussi répété dans une barre fixe en bas d'écran.
 */
export function OrderPanel({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [sizeMissing, setSizeMissing] = useState(false);

  // Adresse du site (connue seulement dans le navigateur) pour joindre le lien de la fiche au message.
  const [origin, setOrigin] = useState('');
  useEffect(() => setOrigin(window.location.origin), []);

  const needsSize = Boolean(product.sizes?.length);
  const ready = !needsSize || Boolean(size);

  const href = whatsappUrl(
    orderMessage(product, {
      color,
      size,
      productUrl: origin ? `${origin}/produit/${product.slug}` : undefined,
    }),
  );

  const order = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ready) return;
    e.preventDefault();
    setSizeMissing(true);
    document.getElementById('choix-taille')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const button = (extra: string) => (
    <a
      href={href}
      onClick={order}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary w-full ${extra}`}
    >
      <WhatsAppIcon />
      Commander sur WhatsApp
    </a>
  );

  return (
    <>
      {product.colors.length > 1 ? (
        <fieldset className="mt-7">
          <legend className="text-sm font-semibold">
            Couleur : <span className="font-normal text-brown-soft">{color}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => {
              const selected = c.name === color;
              return (
                <label
                  key={c.name}
                  className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-olive ${
                    selected ? 'border-brown bg-ivory-deep font-semibold' : 'border-line hover:border-brown-soft'
                  }`}
                >
                  <input
                    type="radio"
                    name="couleur"
                    value={c.name}
                    checked={selected}
                    onChange={() => setColor(c.name)}
                    className="sr-only"
                  />
                  <span
                    className="size-7 rounded-full border border-brown/15"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  {c.name}
                </label>
              );
            })}
          </div>
          {color !== product.colors[0].name && (
            <p className="mt-2 text-xs text-brown-soft">Photo présentée : coloris {product.colors[0].name}.</p>
          )}
        </fieldset>
      ) : (
        product.colors[0] && (
          <p className="mt-7 flex items-center gap-2 text-sm">
            <span
              className="size-5 rounded-full border border-brown/15"
              style={{ backgroundColor: product.colors[0].hex }}
              aria-hidden="true"
            />
            <span className="font-semibold">Couleur :</span>
            <span className="text-brown-soft">{product.colors[0].name}</span>
          </p>
        )
      )}

      {needsSize && (
        <fieldset id="choix-taille" className="mt-6 scroll-mt-24">
          <legend className="text-sm font-semibold">
            Taille{' '}
            {size ? (
              <span className="font-normal text-brown-soft">: {size}</span>
            ) : (
              <span className={`font-normal ${sizeMissing ? 'text-[#9b2c1f]' : 'text-brown-soft'}`}>
                — {sizeMissing ? 'choisissez une taille pour commander' : 'à choisir'}
              </span>
            )}
          </legend>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.sizes!.map((s) => {
              const selected = s === size;
              return (
                <label
                  key={s}
                  className={`flex min-h-11 cursor-pointer items-center justify-center rounded-sm border px-1 text-center text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-olive ${
                    selected
                      ? 'border-brown bg-brown font-semibold text-ivory'
                      : sizeMissing
                        ? 'border-[#9b2c1f]/50'
                        : 'border-line hover:border-brown-soft'
                  }`}
                >
                  <input
                    type="radio"
                    name="taille"
                    value={s}
                    checked={selected}
                    onChange={() => {
                      setSize(s);
                      setSizeMissing(false);
                    }}
                    className="sr-only"
                  />
                  {s}
                </label>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-brown-soft">Un doute sur la taille ? Demandez conseil dans votre message.</p>
        </fieldset>
      )}

      {button('mt-8 hidden md:inline-flex')}
      <p className="mt-3 hidden text-center text-xs text-brown-soft md:block">
        WhatsApp s’ouvre avec votre message prêt à envoyer. Rien n’est payé en ligne.
      </p>

      {/* Barre fixe mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 shrink-0">
            <p className="text-base font-semibold leading-tight">{formatPrice(product.price)}</p>
            <p className="max-w-[7.5rem] truncate text-xs text-brown-soft">
              {[product.colors.length > 1 ? color : null, size].filter(Boolean).join(' · ') || product.name}
            </p>
          </div>
          {button('flex-1 !px-3 text-sm whitespace-nowrap')}
        </div>
      </div>
    </>
  );
}
