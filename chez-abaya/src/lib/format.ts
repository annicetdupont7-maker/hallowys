import { CURRENCY } from '@/config/boutique';

/** 25000 → « 25 000 FCFA » (espace normale, lisible dans WhatsApp). */
export function formatPrice(amount: number): string {
  const digits = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${digits} ${CURRENCY}`;
}
