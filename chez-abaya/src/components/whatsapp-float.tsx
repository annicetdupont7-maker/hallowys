'use client';

import { usePathname } from 'next/navigation';
import { GENERAL_MESSAGE, whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/**
 * Bouton WhatsApp flottant, visible partout sauf sur les fiches produit,
 * qui ont déjà leur propre bouton « Commander sur WhatsApp ».
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname.startsWith('/produit/')) return null;

  return (
    <a
      href={whatsappUrl(GENERAL_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrire à la boutique sur WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-olive pl-4 pr-5 font-semibold text-ivory shadow-lg shadow-brown/25 transition-colors hover:bg-brown md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="text-sm">WhatsApp</span>
    </a>
  );
}
