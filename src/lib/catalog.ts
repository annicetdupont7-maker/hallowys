/**
 * CATALOGUE HALLOWYS
 * ----------------------------------------------------------------------------
 * Source unique des catégories et des produits. Accueil, boutique, catégories,
 * recherche, promotions, fiches produits et panier lisent tous ces données :
 * un prix ou un stock ne se modifie donc qu'ici.
 *
 * Chaque catégorie et chaque produit référence une clé du registre d'images
 * (`src/lib/images.ts`), jamais un chemin en dur.
 */

import type { AssetKey } from './images';

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: Extract<AssetKey, `category.${string}`>;
};

export type ProductOption = {
  /** Libellé du choix (« Taille »...). */
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Prix en centimes : évite les arrondis flottants. */
  price: number;
  /** Ancien prix barré, en centimes, si le produit est en promotion. */
  oldPrice?: number;
  /** Première entrée = catégorie principale (fil d'Ariane). */
  categories: string[];
  shortDescription: string;
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
  badge?: string;
  /** Unités disponibles. 0 = rupture : l'ajout au panier est bloqué. */
  stock: number;
  /** Date de mise en rayon (ISO), utilisée pour le tri « Nouveautés ». */
  addedAt: string;
  options?: ProductOption;
  image: Extract<AssetKey, `product.${string}`>;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'decorations',
    name: 'Décorations',
    tagline: 'Transformez chaque pièce en manoir hanté',
    description:
      "Citrouilles lumineuses, squelettes grandeur nature et fantômes suspendus : la base de toute maison hantée réussie.",
    image: 'category.decorations',
  },
  {
    slug: 'costumes',
    name: 'Costumes',
    tagline: 'Devenez la créature de la nuit',
    description:
      'Des costumes travaillés dans le détail, pour une silhouette qui marque les esprits toute la soirée.',
    image: 'category.costumes',
  },
  {
    slug: 'accessories',
    name: 'Accessoires',
    tagline: 'Le détail qui change tout',
    description:
      'Masques vénitiens et pièces ornementales pour parfaire un costume ou intriguer vos invités.',
    image: 'category.accessories',
  },
  {
    slug: 'lighting',
    name: 'Éclairage',
    tagline: "La lumière qui crée l'ombre",
    description:
      "Lanternes, bougies et citrouilles lumineuses : l'atmosphère d'Halloween se joue d'abord à la lueur.",
    image: 'category.lighting',
  },
  {
    slug: 'parties',
    name: 'Fêtes & Soirées',
    tagline: 'Une table digne du sabbat',
    description:
      'Vaisselle, bougies et art de la table pour recevoir vos invités dans un décor sans fausse note.',
    image: 'category.parties',
  },
  {
    slug: 'gifts',
    name: 'Cadeaux',
    tagline: 'Des surprises ensorcelées',
    description:
      'Des idées cadeaux pour offrir un peu de magie noire à celles et ceux qui aiment frissonner.',
    image: 'category.gifts',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'HLW-001',
    slug: 'pumpkin-led',
    name: 'Citrouille LED Lumineuse',
    price: 2490,
    oldPrice: 3490,
    categories: ['decorations', 'lighting'],
    shortDescription: 'Citrouille sculptée à LED chaudes, sans flamme, pour l’intérieur et l’extérieur.',
    description:
      "Une citrouille sculptée en résine dont les LED reproduisent le vacillement d'une bougie, sans flamme ni fumée. Résistante aux intempéries, elle veille aussi bien sur un perron que sur une cheminée.",
    highlights: ['LED blanc chaud à effet flamme', 'Résine résistante aux intempéries', 'Minuterie 6 h intégrée', 'Hauteur 24 cm'],
    rating: 4.8,
    reviews: 312,
    badge: 'Best-seller',
    stock: 42,
    addedAt: '2026-08-18',
    image: 'product.pumpkin-led',
  },
  {
    id: 'HLW-002',
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
    stock: 4,
    addedAt: '2026-08-25',
    image: 'product.giant-skeleton',
  },
  {
    id: 'HLW-003',
    slug: 'witch-costume',
    name: 'Costume de Sorcière Ensorcelée',
    price: 5490,
    oldPrice: 6900,
    categories: ['costumes'],
    shortDescription: 'Robe longue en dentelle noire, cape et chapeau pointu structuré.',
    description:
      "Une robe longue en dentelle noire doublée de satin, accompagnée d'une cape à capuche et d'un chapeau pointu structuré qui garde sa forme toute la soirée.",
    highlights: ['Robe, cape et chapeau', 'Dentelle doublée satin', 'Tailles XS à XXL', 'Lavable à la main'],
    rating: 4.7,
    reviews: 243,
    stock: 18,
    addedAt: '2026-09-02',
    options: { name: 'Taille', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    image: 'product.witch-costume',
  },
  {
    id: 'HLW-004',
    slug: 'skull-lantern',
    name: 'Lanterne Crâne',
    price: 3290,
    categories: ['lighting', 'decorations'],
    shortDescription: 'Lanterne crâne en résine patinée à lumière vacillante.',
    description:
      "Un crâne en résine patinée dont les orbites laissent filtrer une lumière chaude et vacillante. Son anse métallique permet de le suspendre ou de le poser.",
    highlights: ['Résine patinée à la main', 'Effet flamme vacillante', 'Anse métallique', 'Hauteur 28 cm'],
    rating: 4.7,
    reviews: 134,
    badge: 'Nouveauté',
    stock: 25,
    addedAt: '2026-09-22',
    image: 'product.skull-lantern',
  },
  {
    id: 'HLW-005',
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
    stock: 0,
    addedAt: '2026-08-30',
    image: 'product.ghost-decoration',
  },
  {
    id: 'HLW-006',
    slug: 'halloween-candles',
    name: "Bougies d'Halloween",
    price: 2290,
    oldPrice: 2890,
    categories: ['lighting', 'parties'],
    shortDescription: 'Lot de 6 bougies noires sculptées de crânes, citrouilles et serpents.',
    description:
      "Six bougies de hauteurs différentes, en cire noire patinée de cuivre, sculptées de crânes, de citrouilles et de serpents. Leurs coulures composent un décor, même éteintes. Mèche en coton non traité.",
    highlights: ['Lot de 6, en 3 hauteurs', 'Motifs sculptés dans la cire', 'Mèche en coton non traité', 'Environ 25 h de combustion par bougie'],
    rating: 4.5,
    reviews: 267,
    stock: 30,
    addedAt: '2026-09-08',
    image: 'product.halloween-candles',
  },
  {
    id: 'HLW-007',
    slug: 'halloween-tableware',
    name: "Vaisselle d'Halloween",
    price: 3490,
    categories: ['parties', 'gifts'],
    shortDescription: 'Service complet pour 8 convives, noir et orange.',
    description:
      "Assiettes, gobelets et serviettes assortis pour huit convives, en carton épais recyclable. Les motifs sombres se marient avec toute table dressée en noir.",
    highlights: ['Service pour 8 personnes', 'Carton épais recyclable', 'Assiettes, gobelets et serviettes', 'Motifs imprimés sans plastique'],
    rating: 4.4,
    reviews: 142,
    stock: 15,
    addedAt: '2026-09-12',
    image: 'product.halloween-tableware',
  },
  {
    id: 'HLW-008',
    slug: 'vampire-mask',
    name: 'Masque de Vampire Vénitien',
    price: 3990,
    oldPrice: 4990,
    categories: ['accessories', 'costumes', 'gifts'],
    shortDescription: 'Masque ivoire à filigranes dorés, crocs sculptés et coulures rouges.',
    description:
      "Un masque intégral en résine ivoire, rehaussé de filigranes dorés peints à la main. Les crocs sculptés et les coulures rouges lui donnent un air aussi raffiné qu'inquiétant. Ruban de satin noir pour l'attacher.",
    highlights: ['Résine légère peinte à la main', 'Filigranes dorés en relief', 'Ruban de satin ajustable', 'Taille unique adulte'],
    rating: 4.8,
    reviews: 96,
    badge: 'Nouveauté',
    stock: 12,
    addedAt: '2026-09-25',
    image: 'product.vampire-mask',
  },
  {
    id: 'HLW-009',
    slug: 'feather-mask',
    name: 'Masque Vénitien à Plumes',
    price: 2990,
    categories: ['accessories', 'gifts'],
    shortDescription: 'Loup en dentelle métallique dorée, plumes noires et roses pourpres.',
    description:
      "Un loup en dentelle métallique dorée, couronné d'une gerbe de plumes noires et de roses pourpres. Idéal pour un bal masqué ou pour compléter une robe de sorcière.",
    highlights: ['Dentelle métallique ajourée', 'Plumes et roses en tissu', 'Rubans de satin noirs', 'Taille unique adulte'],
    rating: 4.6,
    reviews: 71,
    stock: 20,
    addedAt: '2026-09-18',
    image: 'product.feather-mask',
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

export function isOnSale(product: Product): boolean {
  return product.oldPrice !== undefined && product.oldPrice > product.price;
}

export function getPromotions(): Product[] {
  return PRODUCTS.filter(isOnSale);
}

export function isInStock(product: Product): boolean {
  return product.stock > 0;
}

/** Formate un prix stocké en centimes. */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

/** Pourcentage de remise arrondi, ou null si le produit n'est pas remisé. */
export function discountPercent(product: Product): number | null {
  if (!isOnSale(product)) return null;
  return Math.round((1 - product.price / product.oldPrice!) * 100);
}

/** Plus forte remise du catalogue : alimente les accroches promotionnelles. */
export function maxDiscountPercent(): number {
  return Math.max(0, ...PRODUCTS.map((p) => discountPercent(p) ?? 0));
}

/* ------------------------------------------------------------ RECHERCHE -- */

/** Minuscules sans accents : « Éclairage » et « eclairage » se rejoignent. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function searchableText(product: Product): string {
  const categoryNames = product.categories.map((slug) => getCategory(slug)?.name ?? '');
  return normalize(
    [product.name, ...categoryNames, product.shortDescription, product.description, ...product.highlights].join(' '),
  );
}

/** Tous les mots saisis doivent apparaître (nom, catégories ou descriptions). */
export function matchesQuery(product: Product, query: string): boolean {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = searchableText(product);
  return terms.every((term) => haystack.includes(term));
}

/* ------------------------------------------------------- FILTRES ET TRI -- */

export const PRICE_RANGES = [
  { value: 'moins-25', label: 'Moins de 25 €', min: 0, max: 2500 },
  { value: '25-50', label: 'De 25 à 50 €', min: 2500, max: 5000 },
  { value: 'plus-50', label: 'Plus de 50 €', min: 5000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { value: 'pertinence', label: 'Popularité' },
  { value: 'nouveautes', label: 'Nouveautés' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
  { value: 'note', label: 'Meilleures notes' },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export type ShopFilters = {
  query: string;
  category: string;
  price: string;
  inStock: boolean;
  onSale: boolean;
  sort: string;
};

export function filterProducts(filters: ShopFilters): Product[] {
  const range = PRICE_RANGES.find((r) => r.value === filters.price);

  const result = PRODUCTS.filter(
    (p) =>
      matchesQuery(p, filters.query) &&
      (!filters.category || p.categories.includes(filters.category)) &&
      (!range || (p.price >= range.min && p.price < range.max)) &&
      (!filters.inStock || isInStock(p)) &&
      (!filters.onSale || isOnSale(p)),
  );

  return sortProducts(result, filters.sort);
}

export function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'prix-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'prix-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'nouveautes':
      return sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case 'note':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      /* Popularité : nombre d'avis, reflet des ventes. */
      return sorted.sort((a, b) => b.reviews - a.reviews);
  }
}
