'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AssetImage } from '@/components/asset-image';
import { CheckIcon } from '@/components/icons';
import { OrderTotals } from '@/components/order-totals';
import { clearCart, useCart, useHydrated, type CartLine } from '@/lib/cart';
import { formatPrice } from '@/lib/catalog';
import {
  EMPTY_CUSTOMER,
  buildOrderMessage,
  createOrderNumber,
  validateCustomer,
  whatsappUrl,
  type CustomerDetails,
  type CustomerErrors,
} from '@/lib/order';
import { WHATSAPP } from '@/lib/site';

type ConfirmedOrder = {
  orderNumber: string;
  url: string;
  firstName: string;
  total: number;
  items: { key: string; name: string; option?: string; quantity: number; lineTotal: number }[];
};

/** Commande validée : conservée le temps de la session pour survivre à un rechargement. */
const CONFIRMED_KEY = 'hallowys.order.confirmed';

function readConfirmed(): ConfirmedOrder | null {
  try {
    const stored = window.sessionStorage.getItem(CONFIRMED_KEY);
    return stored ? (JSON.parse(stored) as ConfirmedOrder) : null;
  } catch {
    return null;
  }
}

const FIELDS: {
  key: keyof CustomerDetails;
  label: string;
  autoComplete: string;
  placeholder?: string;
  type?: string;
  inputMode?: 'tel' | 'numeric' | 'email';
  optional?: boolean;
  wide?: boolean;
}[] = [
  { key: 'firstName', label: 'Prénom', autoComplete: 'given-name' },
  { key: 'lastName', label: 'Nom', autoComplete: 'family-name' },
  { key: 'phone', label: 'Téléphone', autoComplete: 'tel', type: 'tel', inputMode: 'tel', placeholder: '06 12 34 56 78' },
  { key: 'email', label: 'E-mail', autoComplete: 'email', type: 'email', inputMode: 'email', placeholder: 'vous@domaine.fr', optional: true },
  { key: 'address', label: 'Adresse', autoComplete: 'address-line1', placeholder: 'Numéro et nom de rue', wide: true },
  { key: 'addressExtra', label: "Complément d'adresse", autoComplete: 'address-line2', placeholder: 'Bâtiment, étage, digicode...', optional: true, wide: true },
  { key: 'postalCode', label: 'Code postal', autoComplete: 'postal-code', inputMode: 'numeric', placeholder: '75001' },
  { key: 'city', label: 'Ville', autoComplete: 'address-level2' },
];

const inputClass =
  'mt-1.5 w-full rounded-xl border border-line bg-void px-4 py-3 text-base text-ink placeholder:text-ink-faint aria-[invalid=true]:border-blood sm:text-sm';

export function CheckoutView() {
  const hydrated = useHydrated();
  const summary = useCart();
  const [values, setValues] = useState<CustomerDetails>(EMPTY_CUSTOMER);
  const [errors, setErrors] = useState<CustomerErrors>({});
  const [confirmed, setConfirmed] = useState<ConfirmedOrder | null>(null);

  useEffect(() => {
    setConfirmed(readConfirmed());
  }, []);

  if (!hydrated) {
    return <div className="mt-10 h-96 animate-pulse rounded-card border border-line/70 bg-surface/40" />;
  }

  /* Une confirmation n'est montrée que tant qu'aucun nouvel article n'a été ajouté. */
  if (confirmed && summary.lines.length === 0) {
    return <Confirmation order={confirmed} onNewOrder={() => {
      try {
        window.sessionStorage.removeItem(CONFIRMED_KEY);
      } catch {
        /* Stockage indisponible : rien à effacer. */
      }
      setConfirmed(null);
    }} />;
  }

  if (summary.lines.length === 0) {
    return (
      <div className="mt-10 rounded-card border border-line/70 bg-surface/60 px-6 py-14 text-center">
        <p className="font-display text-2xl text-ink">Votre panier est encore vide.</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
          Ajoutez des articles à votre panier pour passer commande.
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

  function update(key: keyof CustomerDetails, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCustomer(values);
    setErrors(nextErrors);
    const firstInvalid = FIELDS.find((field) => nextErrors[field.key]);
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid.key}`)?.focus();
      return;
    }

    const orderNumber = createOrderNumber();
    const url = whatsappUrl(buildOrderMessage(orderNumber, values, summary));
    const order: ConfirmedOrder = {
      orderNumber,
      url,
      firstName: values.firstName.trim(),
      total: summary.total,
      items: summary.lines.map((line) => ({
        key: line.key,
        name: line.product.name,
        option: line.option,
        quantity: line.quantity,
        lineTotal: line.lineTotal,
      })),
    };

    window.open(url, '_blank', 'noopener');
    try {
      window.sessionStorage.setItem(CONFIRMED_KEY, JSON.stringify(order));
    } catch {
      /* Stockage indisponible : la confirmation reste affichée jusqu'au rechargement. */
    }
    clearCart();
    setConfirmed(order);
    window.scrollTo({ top: 0 });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <section
        aria-labelledby="delivery-title"
        className="rounded-card border border-line/70 bg-surface/60 p-5 sm:p-8"
      >
        <h2 id="delivery-title" className="font-display text-2xl text-ink">
          Livraison à domicile
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Les champs sans mention « facultatif » sont obligatoires.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {FIELDS.map((field) => {
            const id = `checkout-${field.key}`;
            const error = errors[field.key];
            return (
              <div key={field.key} className={field.wide ? 'sm:col-span-2' : undefined}>
                <label htmlFor={id} className="text-sm font-medium text-ink">
                  {field.label}
                  {field.optional ? <span className="font-normal text-ink-faint"> (facultatif)</span> : null}
                </label>
                <input
                  id={id}
                  type={field.type ?? 'text'}
                  inputMode={field.inputMode}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={!field.optional}
                  value={values[field.key]}
                  onChange={(event) => update(field.key, event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${id}-error` : undefined}
                  className={inputClass}
                />
                {error ? (
                  <p id={`${id}-error`} className="mt-1.5 text-sm text-pumpkin-soft">
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}

          <div className="sm:col-span-2">
            <label htmlFor="checkout-notes" className="text-sm font-medium text-ink">
              Précisions pour la commande
              <span className="font-normal text-ink-faint"> (facultatif)</span>
            </label>
            <textarea
              id="checkout-notes"
              rows={3}
              value={values.notes}
              onChange={(event) => update('notes', event.target.value)}
              placeholder="Créneau de livraison, message cadeau..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <aside
        aria-labelledby="checkout-summary-title"
        className="rounded-card border border-line/70 bg-surface/60 p-5 sm:p-6 lg:sticky lg:top-24"
      >
        <h2 id="checkout-summary-title" className="font-display text-2xl text-ink">
          Votre commande
        </h2>

        <ul className="mt-5 space-y-4 border-b border-line/70 pb-5">
          {summary.lines.map((line) => (
            <SummaryLine key={line.key} line={line} />
          ))}
        </ul>

        <div className="mt-5">
          <OrderTotals summary={summary} />
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pumpkin px-6 py-3.5 text-sm font-semibold text-void shadow-[0_0_40px_-12px_var(--color-pumpkin)] transition-transform hover:scale-[1.01]"
        >
          <WhatsAppIcon />
          Valider la commande
        </button>

        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
          En validant, WhatsApp s&apos;ouvre avec le récapitulatif de votre commande, prêt à être
          envoyé au {WHATSAPP.display}. Nous vous répondons pour confirmer la disponibilité et
          le paiement.
        </p>

        <Link
          href="/panier"
          className="mt-4 inline-flex min-h-10 items-center text-sm font-medium text-pumpkin transition-colors hover:text-pumpkin-soft"
        >
          ← Modifier mon panier
        </Link>
      </aside>
    </form>
  );
}

function SummaryLine({ line }: { line: CartLine }) {
  return (
    <li className="flex items-center gap-3">
      <AssetImage
        asset={line.product.image}
        ratio="1 / 1"
        sizes="56px"
        decorative
        className="size-14 shrink-0 rounded-lg border border-line/70"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink">{line.product.name}</p>
        <p className="text-xs text-ink-faint">
          {line.quantity} × {formatPrice(line.product.price)}
          {line.option && line.product.options ? `, ${line.product.options.name} ${line.option}` : ''}
        </p>
      </div>
      <p className="text-sm font-medium tabular-nums text-ink">{formatPrice(line.lineTotal)}</p>
    </li>
  );
}

function Confirmation({ order, onNewOrder }: { order: ConfirmedOrder; onNewOrder: () => void }) {
  return (
    <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
      <section className="rounded-card border border-pumpkin/40 bg-surface/60 p-6 sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-pumpkin text-void">
          <CheckIcon className="size-6" />
        </span>
        <h2 className="mt-5 font-display text-3xl text-ink">
          Merci {order.firstName}, votre commande est prête.
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Numéro de commande :{' '}
          <span className="whitespace-nowrap font-mono font-semibold text-ink">{order.orderNumber}</span>
        </p>

        <ol className="mt-8 space-y-4 text-sm text-ink-muted">
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-pumpkin/50 text-xs font-semibold text-pumpkin">
              1
            </span>
            <span>
              WhatsApp s&apos;est ouvert avec votre récapitulatif. <strong className="text-ink">Envoyez le message</strong> pour
              transmettre la commande.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-pumpkin/50 text-xs font-semibold text-pumpkin">
              2
            </span>
            <span>Nous vous confirmons la disponibilité des articles et les modalités de paiement.</span>
          </li>
          <li className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-pumpkin/50 text-xs font-semibold text-pumpkin">
              3
            </span>
            <span>Votre colis part sous 24 h ouvrées après confirmation.</span>
          </li>
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={order.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-pumpkin px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon />
            Ouvrir WhatsApp
          </a>
          <Link
            href="/boutique"
            onClick={onNewOrder}
            className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-pumpkin/50 hover:text-pumpkin"
          >
            Retour à la boutique
          </Link>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          WhatsApp ne s&apos;est pas ouvert ? Utilisez le bouton « Ouvrir WhatsApp » ci-dessus.
        </p>
      </section>

      <aside className="rounded-card border border-line/70 bg-surface/60 p-5 sm:p-6">
        <h2 className="font-display text-2xl text-ink">Récapitulatif</h2>
        <ul className="mt-5 space-y-3 border-b border-line/70 pb-5 text-sm">
          {order.items.map((item) => (
            <li key={item.key} className="flex justify-between gap-4">
              <span className="text-ink-muted">
                {item.quantity} × {item.name}
                {item.option ? ` (${item.option})` : ''}
              </span>
              <span className="tabular-nums text-ink">{formatPrice(item.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between gap-4 text-base font-semibold text-ink">
          <span>Total TTC</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </p>
      </aside>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-5">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
