import { BOUTIQUE } from '@/config/boutique';
import type { Product } from '@/data/products';
import { formatPrice } from './format';

/**
 * Lien wa.me : ouvre WhatsApp (application ou web) avec le message pré-rempli.
 * Par défaut adressé à la boutique ; `null` laisse la personne choisir le contact.
 */
export function whatsappUrl(message: string, to: string | null = BOUTIQUE.whatsappNumber): string {
  return `https://wa.me/${to ?? ''}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_MESSAGE = `Bonjour ${BOUTIQUE.name}, je viens de votre site et j'aimerais avoir des informations.`;

type OrderChoice = {
  color?: string;
  size?: string;
  /** Lien absolu vers la fiche produit, pour que la vendeuse reconnaisse l'article. */
  productUrl?: string;
};

/** Message de commande : produit, couleur, taille, prix. */
export function orderMessage(product: Product, choice: OrderChoice = {}): string {
  const lines = [
    `Bonjour ${BOUTIQUE.name}, je souhaite commander :`,
    '',
    `• Produit : ${product.name}`,
  ];
  if (choice.color) lines.push(`• Couleur : ${choice.color}`);
  if (choice.size) lines.push(`• Taille : ${choice.size}`);
  lines.push(`• Prix : ${formatPrice(product.price)}`);
  if (choice.productUrl) lines.push('', choice.productUrl);
  lines.push('', 'Est-il disponible ? Merci !');
  return lines.join('\n');
}
