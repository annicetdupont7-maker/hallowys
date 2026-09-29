# Assets images — HALLOWYS

Ce document est la contrepartie lisible de `src/lib/images.ts`, qui reste la
**source unique de vérité**. Toute modification se fait d'abord dans le registre.

**État : 16 assets — 16 visuels définitifs, 0 placeholder.**

Le site n'affiche que ce dont le visuel existe : tout produit ou catégorie sans
image a été retiré du catalogue plutôt que rempli d'un vide (voir §4).

---

## 1. Règles appliquées à tout le site

| Règle | Mise en œuvre |
| --- | --- |
| Aucune image externe | `next.config.ts` → `images.remotePatterns: []`. Une URL distante fait échouer le build. |
| Aucun texte dans les images | Titres, prix, promos, badges et CTA sont du HTML/CSS posé au-dessus des visuels, sur un voile dégradé (`.scrim` / `.scrim-hero`). |
| Aucun layout shift | `AssetImage` réserve la place via `aspect-ratio` **avant** le chargement ; les dimensions déclarées sont celles des fichiers réels. |
| Lazy loading par défaut | `loading="lazy"` sauf le visuel LCP de chaque page. |
| Responsive | Un `sizes` calibré par emplacement ; Next génère le `srcset` (AVIF puis WebP). |
| Jamais de vide | Aucun placeholder, aucune grille ni catégorie vide en production. Un produit sans visuel n'entre pas dans le catalogue. |
| Remplacement sans refonte | Placeholder et fichier final partagent chemin **et** dimensions. Déposer le fichier suffit. |

---

## 2. Inventaire complet

### Hero — 1280 × 720 (16:9) · définitif

| Fichier | Emplacement | Chargement | `sizes` |
| --- | --- | --- | --- |
| `/images/hero/halloween-hero.webp` | Accueil, section Hero plein écran | **priority** (LCP) | `100vw` |

Manoir victorien hanté à droite, moitié gauche volontairement sombre : c'est là
que se posent le titre, l'accroche et les CTA.

### Catégories — 1280 × 960 (4:3) · 5 définitifs

| Fichier | Contenu du visuel | Emplacement |
| --- | --- | --- |
| `categories/decorations.webp` | Intérieur décoré : citrouilles, squelette, corbeau, lanternes | Accueil carte 1 · en-tête `/categories/decorations` |
| `categories/costumes.webp` | Robe de sorcière sur mannequin, chapeau, miroir doré | Accueil carte 2 · `/categories/costumes` |
| `categories/lighting.webp` | Lanternes, bougies, citrouilles lumineuses | Accueil carte 3 · `/categories/lighting` |
| `categories/parties.webp` | Table dressée, vaisselle noire, candélabres | Accueil carte 4 · `/categories/parties` |
| `categories/gifts.webp` | Coffrets noirs à rubans orange, crâne doré | Accueil carte 5 · `/categories/gifts` |

Affichage : ratio `4 / 3` en carte, hauteur fixe (300 → 420 px) en bannière de
page. `sizes` : `(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw`.

### Produits — 1254 × 1254 (1:1) · 7 définitifs

| Fichier | Produit | Catégories |
| --- | --- | --- |
| `products/pumpkin-led.webp` | Citrouille LED Lumineuse | Décorations · Éclairage |
| `products/giant-skeleton.webp` | Squelette Géant 180 cm | Décorations |
| `products/witch-costume.webp` | Costume de Sorcière Ensorcelée | Costumes |
| `products/skull-lantern.webp` | Lanterne Crâne | Éclairage · Décorations |
| `products/ghost-decoration.webp` | Fantôme Suspendu | Décorations |
| `products/halloween-candles.webp` | Bougies d'Halloween | Éclairage · Fêtes |
| `products/halloween-tableware.webp` | Vaisselle d'Halloween | Fêtes · Cadeaux |

Chaque visuel produit sert trois emplacements, sans duplication de fichier :

1. **Grille accueil** (« Pièces phares », « Nouveautés ») — lazy, ratio 1:1 ;
2. **Grille catégorie** — lazy, ratio 1:1 ;
3. **Fiche produit** — `priority` (LCP), `sizes` surchargé à
   `(max-width:1024px) 100vw, 50vw` car le gabarit y est différent.

### Bannière — 1280 × 400 (16:5) · définitif

| Fichier | Emplacement | Chargement | `sizes` |
| --- | --- | --- | --- |
| `banners/halloween-sale.webp` | Accueil, bannière promo pleine largeur | lazy | `(max-width:1280px) 100vw, 1280px` |

Manoir et citrouilles à droite, gauche sombre : le titre promo, le code et le
CTA s'y posent en HTML. La même image sert donc toutes les opérations
commerciales, sans jamais être régénérée.

### Témoignages — 1254 × 1254 (1:1) · 2 définitifs

| Fichier | Emplacement | Chargement | `sizes` |
| --- | --- | --- | --- |
| `testimonials/portrait-1.webp` | Accueil, section Avis, avatar rond 72 px (carte 1) | lazy | `72px` |
| `testimonials/portrait-2.webp` | Accueil, section Avis, avatar rond 72 px (carte 2) | lazy | `72px` |

Les citations, noms et villes sont du contenu de démonstration
(`src/components/testimonials.tsx`) — à remplacer par de vrais avis.

---

## 3. Zone de sécurité pour la direction artistique

Le texte étant posé en HTML, chaque visuel doit garder une zone calme :

| Famille | Zone à préserver | Raison |
| --- | --- | --- |
| Hero | moitié **gauche** en desktop, **bas** en mobile | titre + accroche + CTA |
| Catégorie | **gauche** et **bas** | nom de catégorie + fil d'Ariane |
| Produit | **haut** sur ~15 % (coins) | badge promo et badge produit |
| Bannière | moitié **gauche** en desktop, **bas** en mobile | titre promo + code + CTA |
| Portrait | visage centré, cadrage buste | recadrage en cercle de 72 px |

Les visuels livrés respectent déjà ces zones. `object-cover` recadre les bords
selon le format d'écran.

---

## 4. Ce qui a été retiré faute de visuel

Règle appliquée : **pas de placeholder, pas de grille vide.** Les entrées sans
image n'existent plus dans le catalogue ni dans le registre.

### 5 produits retirés

| Produit | Fichier attendu si réintégration |
| --- | --- |
| Guirlande de Citrouilles | `public/images/products/pumpkin-garland.webp` |
| Toile d'Araignée Géante | `public/images/products/giant-spider-web.webp` |
| Cape de Vampire Velours | `public/images/products/vampire-cape.webp` |
| Masque d'Halloween Sculpté | `public/images/products/halloween-mask.webp` |
| Chauves-souris 3D | `public/images/products/bat-decoration.webp` |

### 1 catégorie retirée

**Accessoires** : ses deux seuls produits (masque, cape) étant partis, la page
aurait été vide. Son visuel de catégorie existe pourtant — il reste dans
`assets-source/`, et la ligne d'import est conservée en commentaire à la fin de
`scripts/import-source-images.mjs`.

### Réintégrer un produit

1. Générer le visuel en **carré 1254 × 1254**, fond sombre, lueur orange,
   **sans aucun texte**, sujet centré, coins hauts dégagés (badges promo).
2. Le déposer au chemin ci-dessus.
3. Ajouter l'entrée `product.<slug>` dans `src/lib/images.ts`, puis le produit
   dans `PRODUCTS` (`src/lib/catalog.ts`).
4. `npm run assets:check` doit afficher `[FINAL]` sur chaque ligne.

Pour la catégorie Accessoires, réactiver en plus la ligne d'import commentée et
l'entrée `CATEGORIES` — uniquement si au moins un produit accessoire a un
visuel, sinon la page redeviendrait vide.

---

## 5. Import et vérification

```bash
npm run assets:import        # convertit assets-source/GENERATION_IMAGE → .webp aux bons chemins
npm run assets:placeholders  # crée les .webp manquants (n'écrase jamais un visuel final)
npm run assets:check         # état : FINAL / PLACEHOLDER / MANQUANT / DIMENSIONS
```

- `scripts/import-source-images.mjs` porte la table de correspondance
  fichier source → chemin public. Conversion WebP qualité 78, **sans
  redimensionnement** : les ratios des sources correspondent déjà aux
  emplacements.
- Les originaux restent dans `assets-source/GENERATION_IMAGE/`, **hors de
  `public/`** pour ne pas être déployés.
- `scripts/generate-placeholders.mjs` ne touche jamais un fichier qu'il n'a pas
  lui-même généré (empreinte SHA-256 dans `public/images/.placeholders.json`),
  même avec `--force`.

**Remplacer un visuel :** déposer le `.webp` au chemin exact, aux dimensions
déclarées, puis `npm run assets:check`. Aucune modification de code. Si le
fichier a d'autres dimensions, l'audit sort en erreur : corriger le fichier, ou
mettre à jour la clé correspondante dans `src/lib/images.ts` (un seul endroit).

---

## 6. Ajouter un nouvel asset

1. Ajouter l'entrée dans `IMAGE_ASSETS` (`src/lib/images.ts`) : chemin,
   dimensions, `alt`, `sizes`, `placement`, `priority`.
2. L'utiliser via `<AssetImage asset="ma.cle" />`. TypeScript refuse toute clé
   inconnue, donc aucun chemin en dur ne peut s'introduire.
3. `npm run assets:placeholders` pour générer le visuel temporaire.
