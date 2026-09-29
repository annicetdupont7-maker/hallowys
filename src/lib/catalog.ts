/**
 * CATALOGUE HALLOWYS
 * ----------------------------------------------------------------------------
 * Données de démonstration. Chaque catégorie et chaque produit référence une
 * clé du registre d'images (`src/lib/images.ts`) — jamais un chemin en dur.
 * Le typage garantit qu'aucun visuel hors registre ne peut être introduit.
 */

import type { AssetKey } from './images';

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: Extract<AssetKey, `category.${string}`>;
};

export type Product = {
  slug: string;
  name: string;
  /** Prix en centimes — évite les arrondis flottants. */
  price: number;
  /** Prix barré éventuel, en centimes. */
  compareAtPrice?: number;
  categories: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
  badge?: string;
  image: Extract<AssetKey, `product.${string}`>;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'decorations',
    name: 'Décorations',
    tagline: 'Transformez chaque pièce en manoir hanté',
    description:
      "Citrouilles sculptées, squelettes grandeur nature, toiles d'araignée : la base de toute maison hantée réussie.",
    image: 'category.decorations',
  },
  {
    slug: 'costumes',
    name: 'Costumes',
    tagline: 'Devenez la créature de la nuit',
    description:
      'Sorcières, vampires, revenants : des costumes travaillés pour une silhouette qui marque les esprits.',
    image: 'category.costumes',
  },
  {
    slug: 'accessories',
    name: 'Accessoires',
    tagline: 'Le détail qui fait frissonner',
    description:
      'Masques, bijoux gothiques et maquillage pour parfaire une apparition inoubliable.',
    image: 'category.accessories',
  },
  {
    slug: 'lighting',
    name: 'Éclairage',
    tagline: "La lumière qui crée l'ombre",
    description:
      "Guirlandes, lanternes et bougies : l'atmosphère d'Halloween se joue d'abord à la lueur.",
    image: 'category.lighting',
  },
  {
    slug: 'parties',
    name: 'Fêtes',
    tagline: 'Une table digne du sabbat',
    description:
      'Vaisselle, nappes et art de la table pour recevoir vos invités dans un décor sans fausse note.',
    image: 'category.parties',
  },
  {
    slug: 'gifts',
    name: 'Cadeaux',
    tagline: 'Des surprises ensorcelées',
    description:
      'Coffrets et idées cadeaux pour offrir un peu de magie noire à celles et ceux qui aiment frissonner.',
    image: 'category.gifts',
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'pumpkin-led',
    name: 'Citrouille LED Lumineuse',
    price: 2490,
    compareAtPrice: 3490,
    categories: ['decorations', 'lighting'],
    shortDescription: 'Citrouille sculptée à LED chaudes, sans flamme, intérieur et extérieur.',
    description:
      "Une citrouille sculptée en résine dont les LED reproduisent le vacillement d'une bougie, sans flamme ni fumée. Résistante aux intempéries, elle veille aussi bien sur un perron que sur une cheminée.",
    highlights: ['LED blanc chaud à effet flamme', 'Résine résistante aux intempéries', 'Minuterie 6 h intégrée', 'Hauteur 24 cm'],
    rating: 4.8,
    reviews: 312,
    badge: 'Best-seller',
    image: 'product.pumpkin-led',
  },
  {
    slug: 'giant-skeleton',
    name: 'Squelette Géant 180 cm',
    price: 8900,
    categories: ['decorations'],
    shortDescription: 'Squelette articulé taille réelle pour jardin, allée ou entrée.',
    description:
      "Un squelette articulé de 180 cm dont les membres se positionnent librement pour composer la scène de votre choix. Crâne et cage thoracique moulés dans le détail, finition os patiné.",
    highlights: ['180 cm, articulations mobiles', 'Finition os patiné', 'Usage intérieur et extérieur', 'Socles de maintien fournis'],
    rating: 4.9,
    reviews: 187,
    badge: 'Pièce maîtresse',
    image: 'product.giant-skeleton',
  },
  {
    slug: 'witch-costume',
    name: 'Costume de Sorcière Ensorcelée',
    price: 5490,
    compareAtPrice: 6900,
    categories: ['costumes'],
    shortDescription: 'Robe longue en dentelle noire, cape et chapeau pointu structuré.',
    description:
      "Une robe longue en dentelle noire doublée de satin, accompagnée d'une cape à capuche et d'un chapeau pointu structuré qui garde sa forme toute la soirée.",
    highlights: ['Robe + cape + chapeau', 'Dentelle doublée satin', 'Tailles XS à XXL', 'Lavable à la main'],
    rating: 4.7,
    reviews: 243,
    image: 'product.witch-costume',
  },
  {
    slug: 'pumpkin-garland',
    name: 'Guirlande de Citrouilles',
    price: 1990,
    categories: ['lighting', 'decorations'],
    shortDescription: 'Guirlande de 20 citrouilles lumineuses sur 4 mètres.',
    description:
      'Vingt petites citrouilles orangées réparties sur quatre mètres de fil cuivré souple. Huit modes lumineux, du fixe au scintillement lent.',
    highlights: ['4 m · 20 citrouilles', '8 modes lumineux', 'Alimentation USB ou piles', 'Fil cuivré modelable'],
    rating: 4.6,
    reviews: 421,
    image: 'product.pumpkin-garland',
  },
  {
    slug: 'giant-spider-web',
    name: "Toile d'Araignée Géante",
    price: 1290,
    categories: ['decorations'],
    shortDescription: 'Toile extensible 5 m avec six araignées noires incluses.',
    description:
      "Une toile en fibre extensible qui se déploie jusqu'à cinq mètres pour habiller un angle de mur, une porte ou une haie. Six araignées noires sont fournies.",
    highlights: ['Extensible jusqu’à 5 m', '6 araignées incluses', 'Réutilisable', 'Pose sans outil'],
    rating: 4.4,
    reviews: 158,
    image: 'product.giant-spider-web',
  },
  {
    slug: 'vampire-cape',
    name: 'Cape de Vampire Velours',
    price: 3990,
    categories: ['costumes', 'accessories'],
    shortDescription: 'Cape en velours noir, doublure rouge sang et col montant.',
    description:
      "Une cape en velours épais doublée de satin rouge sang, dont le col montant tient droit grâce à une armature discrète. Attache à crochet dissimulée.",
    highlights: ['Velours doublé satin', 'Col montant armaturé', 'Longueur 140 cm', 'Taille unique adulte'],
    rating: 4.8,
    reviews: 96,
    image: 'product.vampire-cape',
  },
  {
    slug: 'skull-lantern',
    name: 'Lanterne Crâne',
    price: 3290,
    categories: ['lighting', 'decorations'],
    shortDescription: 'Lanterne crâne en résine patinée à lumière vacillante.',
    description:
      "Un crâne en résine patinée dont les orbites laissent filtrer une lumière chaude et vacillante. Anse métallique pour la suspendre ou la poser.",
    highlights: ['Résine patinée à la main', 'Effet flamme vacillante', 'Anse métallique', 'Hauteur 28 cm'],
    rating: 4.7,
    reviews: 134,
    badge: 'Nouveauté',
    image: 'product.skull-lantern',
  },
  {
    slug: 'halloween-mask',
    name: "Masque d'Halloween Sculpté",
    price: 2790,
    categories: ['accessories', 'costumes'],
    shortDescription: 'Masque latex souple, finition peinte à la main.',
    description:
      "Un masque en latex souple peint à la main, dont les reliefs restent lisibles même dans la pénombre. Élastique réglable et intérieur doublé pour un port prolongé.",
    highlights: ['Latex souple peint main', 'Élastique réglable', 'Intérieur doublé', 'Taille unique adulte'],
    rating: 4.5,
    reviews: 205,
    image: 'product.halloween-mask',
  },
  {
    slug: 'ghost-decoration',
    name: 'Fantôme Suspendu',
    price: 1690,
    categories: ['decorations'],
    shortDescription: 'Fantôme en voile blanc à suspendre, lueur douce intégrée.',
    description:
      "Un fantôme en voile de coton blanc dont les plis flottent au moindre courant d'air. Une LED douce logée dans la tête lui donne une présence discrète.",
    highlights: ['Voile de coton blanc', 'LED douce intégrée', 'Fil de suspension fourni', 'Hauteur 60 cm'],
    rating: 4.6,
    reviews: 178,
    image: 'product.ghost-decoration',
  },
  {
    slug: 'halloween-candles',
    name: "Bougies d'Halloween",
    price: 2290,
    compareAtPrice: 2890,
    categories: ['lighting', 'parties'],
    shortDescription: 'Lot de 6 bougies noires sculptées de crânes, citrouilles et serpents.',
    description:
      "Six bougies de hauteurs différentes, en cire noire patinée de cuivre, sculptées de crânes, de citrouilles et de serpents. Leurs coulures composent un décor même éteintes. Mèche en coton non traité.",
    highlights: ['Lot de 6 · 3 hauteurs', 'Motifs sculptés dans la cire', 'Mèche coton non traitée', 'Durée ~25 h par bougie'],
    rating: 4.5,
    reviews: 267,
    image: 'product.halloween-candles',
  },
  {
    slug: 'bat-decoration',
    name: 'Chauves-souris 3D',
    price: 1190,
    categories: ['decorations'],
    shortDescription: 'Lot de 24 chauves-souris noires en relief, repositionnables.',
    description:
      'Vingt-quatre chauves-souris découpées dans un carton noir mat, à ailes pliables pour un rendu en relief. Pastilles adhésives repositionnables incluses.',
    highlights: ['Lot de 24 · 3 tailles', 'Carton noir mat', 'Ailes pliables en relief', 'Adhésifs sans trace'],
    rating: 4.3,
    reviews: 389,
    image: 'product.bat-decoration',
  },
  {
    slug: 'halloween-tableware',
    name: "Vaisselle d'Halloween",
    price: 3490,
    categories: ['parties', 'gifts'],
    shortDescription: 'Service complet pour 8 convives, noir et orange.',
    description:
      "Assiettes, gobelets et serviettes assortis pour huit convives, en carton épais recyclable. Les motifs sombres se marient avec toute table dressée en noir.",
    highlights: ['Service pour 8 personnes', 'Carton épais recyclable', 'Assiettes, gobelets, serviettes', 'Motifs imprimés sans plastique'],
    rating: 4.4,
    reviews: 142,
    image: 'product.halloween-tableware',
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.categories.includes(slug));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c)),
  ).slice(0, limit);
}

/** Formate un prix stocké en centimes. */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

/** Pourcentage de remise arrondi, ou null si le produit n'est pas remisé. */
export function discountPercent(product: Product): number | null {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}
