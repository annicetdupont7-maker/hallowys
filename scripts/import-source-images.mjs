/**
 * IMPORT DES VISUELS SOURCES — HALLOWYS
 * ----------------------------------------------------------------------------
 *   node scripts/import-source-images.mjs
 *
 * Convertit les fichiers fournis dans `assets-source/GENERATION_IMAGE` en .webp
 * et les dépose aux chemins exacts attendus par le registre (`src/lib/images.ts`).
 *
 * Aucune image n'est recadrée ni redimensionnée : les ratios des sources
 * correspondent déjà aux emplacements prévus (16:9 hero, 4:3 catégories,
 * 1:1 produits et portraits, 3.2:1 bannière). Les dimensions déclarées dans le
 * registre ont été alignées sur celles des fichiers réels, ce qui évite tout
 * ré-échantillonnage et tout layout shift.
 *
 * Le script est idempotent : le relancer réécrit simplement les mêmes .webp.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'assets-source', 'GENERATION_IMAGE');
const PUBLIC_DIR = path.join(ROOT, 'public');

/** Qualité WebP : compromis net/poids pour des photos sombres et texturées. */
const WEBP_QUALITY = 78;

/**
 * Correspondance fichier source → chemin public final.
 * Établie visuellement, image par image.
 */
const MAPPING = [
  // --- Hero : maison hantée, moitié gauche volontairement vide (place au texte)
  ['WhatsApp Image 2026-09-29 at 20.57.48.jpeg', 'images/hero/halloween-hero.webp'],

  // --- Catégories (4:3)
  ['WhatsApp Image 2026-09-29 at 20.57.48 (1).jpeg', 'images/categories/decorations.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.49.jpeg', 'images/categories/costumes.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.51 (1).jpeg', 'images/categories/lighting.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.52.jpeg', 'images/categories/parties.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.52 (1).jpeg', 'images/categories/gifts.webp'],

  // --- Produits (1:1)
  ['WhatsApp Image 2026-09-29 at 20.57.52 (2).jpeg', 'images/products/pumpkin-led.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.53.jpeg', 'images/products/giant-skeleton.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.53 (1).jpeg', 'images/products/witch-costume.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.53 (2).jpeg', 'images/products/halloween-tableware.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.54 (2).jpeg', 'images/products/ghost-decoration.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.55.jpeg', 'images/products/skull-lantern.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.55 (1).jpeg', 'images/products/halloween-candles.webp'],

  // --- Bannière promotionnelle (3.2:1), sujet à droite, gauche libre
  ['WhatsApp Image 2026-09-29 at 20.57.53 (3).jpeg', 'images/banners/halloween-sale.webp'],

  // --- Portraits : section Avis clients
  ['WhatsApp Image 2026-09-29 at 20.57.54.jpeg', 'images/testimonials/portrait-1.webp'],
  ['WhatsApp Image 2026-09-29 at 20.57.54 (1).jpeg', 'images/testimonials/portrait-2.webp'],
];

/**
 * EN RÉSERVE — visuel disponible mais volontairement non importé.
 *
 * La catégorie « Accessoires » a été retirée du catalogue : aucun produit
 * accessoire ne dispose d'un visuel, la page aurait donc été vide. Son image
 * de catégorie reste disponible dans `assets-source/`.
 *
 * Pour la réactiver : déplacer la ligne ci-dessous dans MAPPING, remettre
 * l'entrée `category.accessories` dans `src/lib/images.ts`, et la catégorie
 * dans `CATEGORIES` (`src/lib/catalog.ts`) — avec au moins un produit.
 *
 *   ['WhatsApp Image 2026-09-29 at 20.57.51.jpeg', 'images/categories/accessories.webp'],
 */

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(`\n  Dossier source introuvable : ${SOURCE_DIR}\n`);
    process.exit(1);
  }

  let imported = 0;
  console.log('');

  for (const [sourceName, publicPath] of MAPPING) {
    const source = path.join(SOURCE_DIR, sourceName);
    if (!existsSync(source)) {
      console.log(`  [ABSENT]  ${sourceName}`);
      continue;
    }

    const target = path.join(PUBLIC_DIR, publicPath);
    await mkdir(path.dirname(target), { recursive: true });

    const input = await readFile(source);
    const { width, height } = await sharp(input).metadata();
    const output = await sharp(input).webp({ quality: WEBP_QUALITY, effort: 6 }).toBuffer();
    await writeFile(target, output);

    const saved = Math.round((1 - output.length / input.length) * 100);
    console.log(
      `  [OK]  /${publicPath.padEnd(42)} ${String(`${width}x${height}`).padEnd(11)} ` +
        `${(output.length / 1024).toFixed(0)} Ko (${saved >= 0 ? '-' : '+'}${Math.abs(saved)}%)`,
    );
    imported += 1;
  }

  console.log(`\n  ${imported} visuels importes en WebP.`);
  console.log('  Verification : npm run assets:check\n');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
