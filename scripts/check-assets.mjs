/**
 * AUDIT DES ASSETS IMAGES — HALLOWYS
 * ----------------------------------------------------------------------------
 *   npm run assets:check
 *
 * Pour chaque entrée du registre, vérifie :
 *   1. que le fichier existe au chemin exact attendu ;
 *   2. s'il s'agit encore d'un placeholder généré ou du visuel définitif ;
 *   3. que ses dimensions réelles correspondent à celles déclarées — un écart
 *      de ratio réintroduirait du layout shift et un recadrage non voulu ;
 *   4. qu'aucune image n'est référencée en dehors du registre.
 *
 * Sort en code 1 si un visuel final a de mauvaises dimensions : le remplacement
 * d'un placeholder ne doit jamais dégrader silencieusement la mise en page.
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { IMAGE_ASSETS } from '../src/lib/images.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const MANIFEST = path.join(PUBLIC_DIR, 'images', '.placeholders.json');

const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : { files: {} };

let missing = 0;
let placeholders = 0;
let final = 0;
let errors = 0;

console.log('\n  ASSETS HALLOWYS — etat des visuels\n');

for (const [key, asset] of Object.entries(IMAGE_ASSETS)) {
  const target = path.join(PUBLIC_DIR, asset.src.replace(/^\//, ''));

  if (!existsSync(target)) {
    console.log(`  [MANQUANT]     ${asset.src}`);
    console.log(`                 attendu : ${asset.width}x${asset.height}  (cle: ${key})`);
    missing += 1;
    continue;
  }

  const buffer = await readFile(target);
  const sha = createHash('sha256').update(buffer).digest('hex');
  const isPlaceholder = manifest.files?.[asset.src]?.sha256 === sha;

  const meta = await sharp(buffer).metadata();
  const sizeOk = meta.width === asset.width && meta.height === asset.height;

  if (isPlaceholder) {
    placeholders += 1;
    console.log(`  [PLACEHOLDER]  ${asset.src}  ${meta.width}x${meta.height}`);
  } else if (!sizeOk) {
    errors += 1;
    console.log(`  [DIMENSIONS]   ${asset.src}`);
    console.log(`                 fichier : ${meta.width}x${meta.height} — attendu : ${asset.width}x${asset.height}`);
    console.log(`                 corriger le fichier, ou ajuster la cle "${key}" dans src/lib/images.ts`);
  } else {
    final += 1;
    console.log(`  [FINAL]        ${asset.src}  ${meta.width}x${meta.height}  ${(buffer.length / 1024).toFixed(0)} Ko`);
  }
}

/* --- Fichiers presents dans /public/images mais absents du registre -------- */
const declared = new Set(Object.values(IMAGE_ASSETS).map((a) => a.src));
const orphans = [];

async function walk(dir, prefix) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    const publicPath = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) await walk(full, publicPath);
    else if (!declared.has(publicPath)) orphans.push(publicPath);
  }
}
if (existsSync(path.join(PUBLIC_DIR, 'images'))) {
  await walk(path.join(PUBLIC_DIR, 'images'), '/images');
}

console.log(
  `\n  Total ${Object.keys(IMAGE_ASSETS).length} assets — ${final} final(s), ${placeholders} placeholder(s), ${missing} manquant(s)`,
);

if (orphans.length) {
  console.log(`\n  Hors registre (non utilises par le site) :`);
  for (const o of orphans) console.log(`    ? ${o}`);
}

if (errors) {
  console.log(`\n  ${errors} fichier(s) aux mauvaises dimensions — risque de layout shift.\n`);
  process.exit(1);
}

if (missing) {
  console.log(`\n  Generer les placeholders manquants : npm run assets:placeholders\n`);
} else {
  console.log('');
}
