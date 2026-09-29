/**
 * GÉNÉRATEUR DE PLACEHOLDERS LOCAUX — HALLOWYS
 * ----------------------------------------------------------------------------
 *   node scripts/generate-placeholders.mjs          (ne touche pas l'existant)
 *   node scripts/generate-placeholders.mjs --force  (régénère tout)
 *
 * Écrit un .webp local À CHAQUE chemin déclaré dans le registre d'images, aux
 * dimensions exactes prévues. Objectif : le site tourne complet, sans 404 et
 * sans layout shift, avant l'arrivée des visuels définitifs.
 *
 * Ces fichiers sont :
 *  - LOCAUX (aucune source externe, aucune URL distante) ;
 *  - CLAIREMENT IDENTIFIÉS : filigrane « PLACEHOLDER » + chemin de l'asset
 *    inscrits dans l'image, impossible de les confondre avec un visuel final ;
 *  - INVENTORIÉS dans public/images/.placeholders.json (empreinte SHA-256), ce
 *    qui permet à `npm run assets:check` de dire lesquels restent à remplacer.
 *
 * Déposer le fichier définitif au même chemin suffit : aucune modification de
 * code, de dimension ou de composant n'est nécessaire.
 */

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { IMAGE_ASSETS } from '../src/lib/images.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const MANIFEST = path.join(PUBLIC_DIR, 'images', '.placeholders.json');
const FORCE = process.argv.includes('--force');

/** Palette alignée sur la direction artistique (src/app/globals.css). */
const PALETTE = {
  void: '#08040d',
  surface: '#1b1029',
  line: '#33204a',
  pumpkin: '#ff7a18',
  spectre: '#a855f7',
  ink: '#f7f1fb',
};

const escapeXml = (value) =>
  value.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]);

/** Silhouette de citrouille, centrée sur une boîte 100x100. */
const PUMPKIN_PATH =
  'M50 18c3 0 5 3 6 7 10-5 21 0 26 10 6 12 4 28-4 40-6 9-15 15-22 15-2 0-4-.5-6-1.5-2 1-4 1.5-6 1.5-7 0-16-6-22-15-8-12-10-28-4-40 5-10 16-15 26-10 1-4 3-7 6-7z';

function buildSvg({ width, height, label, family }) {
  const short = Math.min(width, height);
  const glyph = Math.round(short * 0.34);
  const glyphX = (width - glyph) / 2;
  const glyphY = (height - glyph) / 2 - short * 0.06;
  const captionSize = Math.max(13, Math.round(short * 0.032));
  const badgeSize = Math.max(11, Math.round(short * 0.026));
  const step = Math.max(28, Math.round(short / 14));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${PALETTE.surface}"/>
      <stop offset="100%" stop-color="${PALETTE.void}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${PALETTE.spectre}" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="${PALETTE.spectre}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="hatch" width="${step}" height="${step}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="${step}" stroke="${PALETTE.line}" stroke-width="2" stroke-opacity="0.55"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#hatch)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect x="6" y="6" width="${width - 12}" height="${height - 12}" fill="none"
        stroke="${PALETTE.pumpkin}" stroke-opacity="0.45" stroke-width="3" stroke-dasharray="18 12"/>

  <g transform="translate(${glyphX} ${glyphY}) scale(${glyph / 100})">
    <path d="${PUMPKIN_PATH}" fill="${PALETTE.pumpkin}" fill-opacity="0.22"
          stroke="${PALETTE.pumpkin}" stroke-opacity="0.7" stroke-width="2.5"/>
  </g>

  <text x="${width / 2}" y="${height / 2 + short * 0.19}" text-anchor="middle"
        font-family="monospace" font-size="${badgeSize}" letter-spacing="${badgeSize * 0.28}"
        fill="${PALETTE.pumpkin}" fill-opacity="0.95">PLACEHOLDER</text>

  <text x="${width / 2}" y="${height / 2 + short * 0.19 + captionSize * 1.9}" text-anchor="middle"
        font-family="monospace" font-size="${captionSize}" fill="${PALETTE.ink}" fill-opacity="0.72">${escapeXml(label)}</text>

  <text x="${width / 2}" y="${height / 2 + short * 0.19 + captionSize * 3.3}" text-anchor="middle"
        font-family="monospace" font-size="${badgeSize}" fill="${PALETTE.ink}" fill-opacity="0.45">${width} × ${height} · ${escapeXml(family)}</text>
</svg>`;
}

function familyOf(key) {
  return key.split('.')[0];
}

async function main() {
  const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : { files: {} };
  const created = [];
  const skipped = [];

  for (const [key, asset] of Object.entries(IMAGE_ASSETS)) {
    const target = path.join(PUBLIC_DIR, asset.src.replace(/^\//, ''));
    const known = manifest.files[asset.src];

    if (existsSync(target)) {
      const buffer = await readFile(target);
      const current = createHash('sha256').update(buffer).digest('hex');
      const isKnownPlaceholder = known?.sha256 === current;

      // Visuel définitif : on n'y touche JAMAIS, même avec --force.
      if (!isKnownPlaceholder) {
        skipped.push(asset.src);
        continue;
      }

      // Placeholder inventorié : on le régénère si on le demande explicitement,
      // ou si ses dimensions ne correspondent plus à celles du registre.
      const outdated = known.width !== asset.width || known.height !== asset.height;
      if (!FORCE && !outdated) {
        skipped.push(asset.src);
        continue;
      }
    }

    const svg = buildSvg({
      width: asset.width,
      height: asset.height,
      label: asset.src,
      family: familyOf(key),
    });

    await mkdir(path.dirname(target), { recursive: true });
    const buffer = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
    await writeFile(target, buffer);

    manifest.files[asset.src] = {
      sha256: createHash('sha256').update(buffer).digest('hex'),
      width: asset.width,
      height: asset.height,
      generatedAt: new Date().toISOString(),
    };
    created.push(asset.src);
  }

  manifest.note =
    'Empreintes des placeholders generes. Un fichier dont le SHA differe est considere comme le visuel definitif.';
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`\n  Placeholders generes : ${created.length}`);
  for (const src of created) console.log(`    + ${src}`);
  if (skipped.length) console.log(`  Fichiers deja presents, inchanges : ${skipped.length}`);
  console.log(`\n  Inventaire : public/images/.placeholders.json`);
  console.log(`  Verification : npm run assets:check\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
