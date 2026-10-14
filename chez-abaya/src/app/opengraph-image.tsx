import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { BOUTIQUE } from '@/config/boutique';

/** Aperçu affiché quand le lien du site est partagé (WhatsApp, Facebook…). */
export const alt = `${BOUTIQUE.name} — ${BOUTIQUE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const serif = await readFile(
    path.join(
      process.cwd(),
      'node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff',
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f4ec',
          color: '#33241b',
          border: '18px solid #33241b',
        }}
      >
        <div style={{ width: 120, height: 2, background: '#a8874f' }} />
        <div style={{ fontFamily: 'Cormorant', fontSize: 132, marginTop: 36, lineHeight: 1 }}>{BOUTIQUE.name}</div>
        <div style={{ fontSize: 34, marginTop: 28, color: '#6a5546' }}>{BOUTIQUE.tagline}</div>
        <div
          style={{
            marginTop: 48,
            padding: '14px 34px',
            borderRadius: 999,
            background: '#5f6544',
            color: '#f8f4ec',
            fontSize: 28,
          }}
        >
          Commande sur WhatsApp · Livraison à Cotonou
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Cormorant', data: serif, weight: 500, style: 'normal' }] },
  );
}

export const dynamic = 'force-static';
