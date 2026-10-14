# Chez Abaya — démo de mini-boutique

Mini-boutique en ligne pour une commerçante de hijabs, abayas, robes modestes et
accessoires à Cotonou. Les clientes parcourent le catalogue, voient les prix,
choisissent couleur et taille, puis **commandent sur WhatsApp** avec un message
pré-rempli. Pas de backend, pas de base de données, pas de paiement en ligne.

Stack : Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 — la même
que le reste du dépôt. Polices auto-hébergées (Fontsource), aucune dépendance
réseau au build.

## Démarrer

```bash
cd chez-abaya
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run typecheck
```

## Pages

| Route | Contenu |
| --- | --- |
| `/` | Accueil : message commercial, catégories, sélection, « Commander en 3 étapes », présentation, contact |
| `/boutique` | Catalogue complet, filtre par catégorie (`/boutique?categorie=abayas`, lien partageable) |
| `/produit/[slug]` | Fiche produit : photo, prix, choix couleur/taille, guide des tailles, bouton « Commander sur WhatsApp », « Partager à une amie » |

Quand un lien du site est partagé sur WhatsApp ou Facebook, l'aperçu affiche
l'image de la boutique (`src/app/opengraph-image.tsx`) ou, pour une fiche,
la photo, le nom et le prix du produit. `sitemap.xml` et `robots.txt` sont
générés automatiquement.

## ⚠️ Ce qu'il faut remplacer avant la mise en ligne

| Quoi | Où |
| --- | --- |
| **Numéro WhatsApp** (fictif : `2290100000000`) | `src/config/boutique.ts` → `whatsappNumber` et `phoneDisplay` |
| Nom de la boutique, adresse, lien Google Maps, horaires, Instagram | `src/config/boutique.ts` |
| Produits : noms, **prix**, couleurs, tailles, descriptions | `src/data/products.ts` |
| **Photos produits et catégories** | `src/data/products.ts` (champ `image`) — déposer les fichiers dans `public/images/produits/` puis écrire `image: '/images/produits/mon-fichier.jpg'` |
| Guides des tailles (mesures indicatives) | `src/data/products.ts` → `SIZE_GUIDES` |
| Favicon | `src/app/icon.svg` |
| Photos d'ambiance de l'accueil | `src/app/page.tsx` → `HERO_IMAGE`, `STORY_IMAGE` |
| Mention « site de démonstration » | `src/components/site-footer.tsx` |

Les photos actuelles sont des photos Unsplash (licence libre) servies par le CDN
d'Unsplash ; elles ne représentent pas les articles réels de la boutique.
Format conseillé pour les vraies photos : portrait 4:5 (ex. 1200 × 1500 px).

## Le message WhatsApp

Le bouton ouvre `https://wa.me/<numéro>?text=…` avec :

```
Bonjour Chez Abaya, je souhaite commander :

• Produit : Abaya brodée Champagne
• Couleur : Olive
• Taille : M (54)
• Prix : 35 000 FCFA

https://<votre-domaine>/produit/abaya-brodee-champagne

Est-il disponible ? Merci !
```

Si l'article a des tailles, le bouton demande d'en choisir une avant d'ouvrir
WhatsApp. **Le lien et le message ont été vérifiés automatiquement, mais
l'envoi réel n'a pas pu être testé** : le numéro est fictif. Après avoir mis le
vrai numéro, testez depuis un téléphone (et depuis WhatsApp Web sur ordinateur)
que la conversation s'ouvre bien avec la vendeuse et que le message est complet.

## Déployer sur Vercel

Le site est exporté en **HTML statique** (`chez-abaya/out/`), sans serveur.

**Sur cette branche**, le fichier `vercel.json` à la racine du dépôt indique à
Vercel de construire `chez-abaya/` au lieu de l'application Halloween : chaque
push sur la branche produit un aperçu de Chez Abaya. ⚠️ Ne pas fusionner ce
`vercel.json` dans `main`, sinon le site Halloween serait remplacé.

**Pour un site définitif**, créer plutôt un projet Vercel dédié à partir de ce
dépôt avec **Root Directory = `chez-abaya`** (le `vercel.json` racine n'est alors
pas utilisé). Aucune variable d'environnement n'est obligatoire : l'adresse du
site est déduite de Vercel. Avec un nom de domaine personnel, définir
`NEXT_PUBLIC_SITE_URL` (ex. `https://chezabaya.bj`) pour que les aperçus de
lien et le sitemap l'utilisent.
