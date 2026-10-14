'use client';

import { useEffect, useState } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import { ShareIcon } from './icons';

/**
 * « Partager à une amie » : feuille de partage du téléphone si elle existe,
 * sinon WhatsApp sans destinataire (la cliente choisit le contact).
 */
export function ShareButton({ title, text, path }: { title: string; text: string; path: string }) {
  const [url, setUrl] = useState(path);
  useEffect(() => setUrl(`${window.location.origin}${path}`), [path]);

  const onClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!navigator.share) return; // le lien WhatsApp prend le relais
    e.preventDefault();
    try {
      await navigator.share({ title, text, url });
    } catch {
      // partage annulé : rien à faire
    }
  };

  return (
    <a
      href={whatsappUrl(`${text}\n${url}`, null)}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline decoration-gold underline-offset-4 hover:text-olive"
    >
      <ShareIcon />
      Partager à une amie
    </a>
  );
}
