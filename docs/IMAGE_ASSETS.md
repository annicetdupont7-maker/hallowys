# Assets images — HALLOWYS

Ce document est la contrepartie lisible de `src/lib/images.ts`, qui reste la
**source unique de vérité**. Toute modification se fait d'abord dans le registre.

**État au dernier import : 22 assets — 17 visuels définitifs, 5 placeholders.**

---

## 1. Règles appliquées à tout le site

| Règle | Mise en œuvre |
| --- | --- |
| Aucune image externe | `next.config.ts` → `images.remotePatterns: []`. Une URL distante fait échouer le build. |
| Aucun texte dans les images | Titres, prix, promos, badges et CTA sont du HTML/CSS posé au-dessus des visuels, sur un voile dégradé (`.scrim` / `.scrim-hero`). |
| Aucun layout shift | `AssetImage` réserve la place via `aspect-ratio` **avant** le chargement ; les dimensions déclarées sont celles des fichiers réels. |
| Lazy loading par défaut | `loading="lazy"` sauf le visuel LCP de chaque page. |
| Responsive | Un `sizes` calibré par emplacement ; Next génère le `srcset` (AVIF puis WebP). |
| Remplacement sans refonte | Placeholder et fichier final partagent chemin **et** dimensions. Déposer le fichier suffit. |

---

## 2. Inventaire complet

### Hero — 1280 × 720 (16:9) · définitif

| Fichier | Emplacement | Chargement | `sizes` |
| --- | --- | --- | --- |
| `/images/hero/halloween-hero.webp` | Accueil, section Hero plein écran | **priority** (LCP) | `100vw` |

Manoir victorien hanté à droite, moitié gauche volontairement sombre : c'est là
que se posent le titre, l'accroche et les CTA.

### Catégories — 1280 × 960 (4:3) · 6/6 définitifs

| Fichier | Contenu du visuel | Emplacement |
| --- | --- | --- |
| `categories/decorations.webp` | Intérieur décoré : citrouilles, squelette, corbeau, lanternes | Accueil carte 1 · en-tête `/categories/decorations` |
| `categories/costumes.webp` | Robe de sorcière sur mannequin, chapeau, miroir doré | Accueil carte 2 · `/categories/costumes` |
| `categories/accessories.webp` | Masques ouvragés, bijoux à pierres rouges, gants, dents | Accueil carte 3 · `/categories/accessories` |
| `categories/lighting.webp` | Lanternes, bougies, citrouilles lumineuses | Accueil carte 4 · `/categories/lighting` |
| `categories/parties.webp` | Table dressée, vaisselle noire, candélabres | Accueil carte 5 · `/categories/parties` |
| `categories/gifts.webp` | Coffrets noirs à rubans orange, crâne doré | Accueil carte 6 · `/categories/gifts` |

Affichage : ratio `4 / 3` en carte, hauteur fixe (300 → 420 px) en bannière de
page. `sizes` : `(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw`.

### Produits — 1254 × 1254 (1:1) · 7 définitifs, 5 à fournir

| Fichier | Produit | État |
| --- | --- | --- |
| `products/pumpkin-led.webp` | Citrouille LED Lumineuse | **définitif** |
| `products/giant-skeleton.webp` | Squelette Géant 180 cm | **définitif** |
| `products/witch-costume.webp` | Costume de Sorcière Ensorcelée | **définitif** |
| `products/skull-lantern.webp` | Lanterne Crâne | **définitif** |
| `products/ghost-decoration.webp` | Fantôme Suspendu | **définitif** |
| `products/halloween-candles.webp` | Bougies d'Halloween | **définitif** |
| `products/halloween-tableware.webp` | Vaisselle d'Halloween | **définitif** |
| `products/pumpkin-garland.webp` | Guirlande de Citrouilles | placeholder |
| `products/giant-spider-web.webp` | Toile d'Araignée Géante | placeholder |
| `products/vampire-cape.webp` | Cape de Vampire Velours | placeholder |
| `products/halloween-mask.webp` | Masque d'Halloween Sculpté | placeholder |
| `products/bat-decoration.webp` | Chauves-souris 3D | placeholder |

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

## 4. Les 5 visuels encore à produire

Pour rester dans l'identité HALLOWYS, générer en **carré 1:1**, fond sombre,
lueur orange, **sans aucun texte**, sujet centré, coins hauts dégagés :

| Fichier à déposer | Sujet |
| --- | --- |
| `public/images/products/pumpkin-garland.webp` | Guirlande de petites citrouilles orangées lumineuses sur fil cuivré, suspendue devant un mur sombre |
| `public/images/products/giant-spider-web.webp` | Grande toile d'araignée blanche tendue dans un angle sombre, araignées noires, bougies au loin |
| `public/images/products/vampire-cape.webp` | Cape de vampire en velours noir doublée de satin rouge, col montant, sur mannequin |
| `public/images/products/halloween-mask.webp` | Masque d'Halloween sculpté posé sur un support, ombres marquées, fond noir |
| `public/images/products/bat-decoration.webp` | Chauves-souris noires en relief fixées sur un mur sombre, lueur orangée rasante |

Dimensions attendues : **1254 × 1254**. Après dépôt, `npm run assets:check`
doit afficher `[FINAL]` sur chaque ligne.

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
