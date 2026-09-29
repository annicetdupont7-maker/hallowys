# HALLOWYS

Boutique Halloween : Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4.

Le site est construit **autour de son architecture d'images** : chaque visuel est
déclaré une seule fois dans un registre typé, et toute l'interface s'y branche.
Les fichiers définitifs se déposent à leur chemin ; rien d'autre ne bouge.

**État des visuels : 19 assets, tous définitifs.**
Le site n'affiche que ce dont le visuel existe : produits et catégories sans
image ont été retirés du catalogue plutôt que remplis d'un vide
(détail dans [`docs/IMAGE_ASSETS.md`](docs/IMAGE_ASSETS.md) §4).

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build de production / serveur |
| `npm run typecheck` | Vérification TypeScript |
| `npm run assets:import` | Convertit `assets-source/GENERATION_IMAGE` → `.webp` aux chemins du registre |
| `npm run assets:placeholders` | Crée les `.webp` manquants (n'écrase jamais un visuel final) |
| `npm run assets:check` | État de chaque asset : `FINAL` / `PLACEHOLDER` / `MANQUANT` / `DIMENSIONS` |

## Structure

```text
src/
  lib/catalog.ts       ← SOURCE UNIQUE : catégories, produits (prix, stock, options), recherche, filtres, tri
  lib/cart.ts          ← PANIER centralisé (localStorage, compteur, totaux, livraison)
  lib/faq.ts  lib/site.ts  lib/images.ts (registre d'assets)
  components/          header (menu mobile, recherche, compteur), cartes, panier, boutique, FAQ...
  app/
    page.tsx                     accueil
    boutique/                    recherche + filtres + tri (état dans l'URL)
    categories/[slug]/           6 catégories (SSG)
    products/[slug]/             9 fiches produits (SSG)
    promotions/  panier/  faq/  contact/
```

Le site est 100 % frontend : panier et inscription newsletter sont conservés
dans le `localStorage` du navigateur ; le formulaire de contact prépare un
e-mail dans la messagerie de l'utilisateur. Aucun paiement n'est branché.

## Règles d'images appliquées

1. **Emplacement prévu** pour chaque asset — champ `placement` du registre et
   `docs/IMAGE_ASSETS.md`.
2. **`next/image` partout**, via le wrapper `AssetImage`.
3. **Dimensions déclarées** = dimensions réelles des fichiers : hero 1280×720,
   catégories 1280×960, produits 1254×1254, bannière 1280×400, portraits
   1254×1254.
4. **Alt descriptif** pour chaque visuel, écrit une fois dans le registre.
5. **Responsive** : `sizes` calibré par emplacement, `srcset` AVIF/WebP généré
   par Next sur les breakpoints de `next.config.ts`.
6. **Zéro layout shift** : le conteneur réserve la place via `aspect-ratio`
   avant le chargement, avec un blur sombre inline.
7. **Lazy loading** partout sauf le visuel LCP de chaque page (hero de
   l'accueil, bannière de catégorie, visuel principal de la fiche produit).
8. **Aucune image externe** : `images.remotePatterns: []` fait échouer le build
   si une URL distante est introduite.

**Aucun texte n'est incrusté dans les images.** Titres, prix, prix barrés,
badges de remise, codes promo et CTA sont du HTML/CSS posé au-dessus du visuel,
sur un voile dégradé (`.scrim`) qui garantit le contraste.

## Remplacer un placeholder par le visuel final

1. Déposer le `.webp` au chemin exact, aux dimensions déclarées.
2. `npm run assets:check` → la ligne passe de `[PLACEHOLDER]` à `[FINAL]`.

Aucune modification de code. Détails et zones de sécurité pour la direction
artistique : [`docs/IMAGE_ASSETS.md`](docs/IMAGE_ASSETS.md).
