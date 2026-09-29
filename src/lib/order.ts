/**
 * COMMANDE WHATSAPP
 * ----------------------------------------------------------------------------
 * Sans backend, la commande est validée en envoyant un message WhatsApp
 * pré-rempli à la boutique : coordonnées, articles, quantités et totaux.
 * Tous les montants proviennent du panier, lui-même relu dans le catalogue.
 */

import type { summarize } from './cart';
import { formatPrice } from './catalog';
import { WHATSAPP } from './site';

export type CustomerDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  addressExtra: string;
  postalCode: string;
  city: string;
  notes: string;
};

export const EMPTY_CUSTOMER: CustomerDetails = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  addressExtra: '',
  postalCode: '',
  city: '',
  notes: '',
};

export type CustomerErrors = Partial<Record<keyof CustomerDetails, string>>;

export function validateCustomer(values: CustomerDetails): CustomerErrors {
  const errors: CustomerErrors = {};
  if (!values.firstName.trim()) errors.firstName = 'Indiquez votre prénom.';
  if (!values.lastName.trim()) errors.lastName = 'Indiquez votre nom.';
  const digits = values.phone.replace(/[\s.\-()]/g, '');
  if (!/^(\+33|0033|0)[1-9]\d{8}$/.test(digits))
    errors.phone = 'Saisissez un numéro de téléphone français valide, par exemple 06 12 34 56 78.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Saisissez une adresse e-mail valide ou laissez le champ vide.';
  if (values.address.trim().length < 5) errors.address = 'Indiquez votre adresse de livraison.';
  if (!/^\d{5}$/.test(values.postalCode.trim())) errors.postalCode = 'Le code postal doit contenir 5 chiffres.';
  if (!values.city.trim()) errors.city = 'Indiquez votre ville.';
  return errors;
}

/** Numéro de commande lisible : HLW-AAMMJJ-XXXX. */
export function createOrderNumber(date = new Date()): string {
  const stamp = [date.getFullYear() % 100, date.getMonth() + 1, date.getDate()]
    .map((n) => String(n).padStart(2, '0'))
    .join('');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, '0');
  return `HLW-${stamp}-${suffix}`;
}

type Summary = ReturnType<typeof summarize>;

export function buildOrderMessage(orderNumber: string, customer: CustomerDetails, cart: Summary): string {
  const clean = (value: string) => value.trim();
  const lines = cart.lines.map((line) => {
    const option = line.option && line.product.options ? ` (${line.product.options.name} : ${line.option})` : '';
    return `• ${line.quantity} × ${line.product.name}${option} [${line.product.id}] : ${formatPrice(line.lineTotal)}`;
  });

  return [
    `Bonjour HALLOWYS, je souhaite valider ma commande ${orderNumber}.`,
    '',
    '*Articles*',
    ...lines,
    '',
    `Sous-total : ${formatPrice(cart.subtotal)}`,
    `Livraison : ${cart.shipping === 0 ? 'offerte' : formatPrice(cart.shipping)}`,
    `*Total TTC : ${formatPrice(cart.total)}*`,
    '',
    '*Livraison à domicile*',
    `${clean(customer.firstName)} ${clean(customer.lastName)}`,
    clean(customer.address),
    ...(clean(customer.addressExtra) ? [clean(customer.addressExtra)] : []),
    `${clean(customer.postalCode)} ${clean(customer.city)}`,
    `Tél. : ${clean(customer.phone)}`,
    ...(clean(customer.email) ? [`E-mail : ${clean(customer.email)}`] : []),
    ...(clean(customer.notes) ? ['', `Précisions : ${clean(customer.notes)}`] : []),
  ].join('\n');
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;
}
