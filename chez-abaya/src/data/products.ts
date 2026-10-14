/**
 * ============================================================================
 *  CATALOGUE — PRODUITS, PRIX ET PHOTOS (DONNÉES FICTIVES DE DÉMONSTRATION)
 * ============================================================================
 *
 *  ⚠️ À REMPLACER : noms, prix, couleurs, descriptions et photos.
 *
 *  PHOTOS
 *  Les photos de démonstration viennent d'Unsplash (licence libre) via la
 *  fonction `unsplash()`. Pour utiliser les vraies photos de la boutique :
 *    1. déposer le fichier dans  public/images/produits/  (ex. abaya-nour.jpg),
 *       idéalement en portrait 4:5 (ex. 1200 × 1500 px) ;
 *    2. remplacer  image: unsplash('…')  par  image: '/images/produits/abaya-nour.jpg' ;
 *    3. supprimer la ligne `credit` du produit.
 *
 *  PRIX
 *  En francs CFA, nombre entier sans espace : 25000 s'affiche « 25 000 FCFA ».
 */

export type CategoryId = 'hijabs' | 'abayas' | 'robes' | 'accessoires';

export type Category = {
  id: CategoryId;
  label: string;
  /** Phrase courte affichée sous le nom de la catégorie. */
  blurb: string;
  image: string;
  imageAlt: string;
};

export type Color = {
  name: string;
  /** Pastille de couleur affichée sur la fiche produit. */
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  /** La première couleur est celle qui apparaît sur la photo. */
  colors: Color[];
  /** Tailles proposées ; omettre pour un article taille unique. */
  sizes?: string[];
  shortDescription: string;
  description: string;
  details: string[];
  image: string;
  imageAlt: string;
  /** Crédit de la photo de démonstration (à supprimer avec vos propres photos). */
  credit?: string;
  /** Mis en avant sur la page d'accueil. */
  featured?: boolean;
  badge?: string;
};

/** URL d'une photo Unsplash, redimensionnée à la volée par leur CDN. */
export function unsplash(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}`;
}

export const CATEGORIES: Category[] = [
  {
    id: 'hijabs',
    label: 'Hijabs',
    blurb: 'Mousseline, crêpe, soie de Médine',
    image: unsplash('1665577663675-53a3971f3f8d'),
    imageAlt: 'Jeune femme souriante en hijab orange et salopette assortie',
  },
  {
    id: 'abayas',
    label: 'Abayas',
    blurb: 'Fluides, brodées, de cérémonie',
    image: unsplash('1757899525290-731fc4745499'),
    imageAlt: 'Femme en hijab blanc et abaya brune brodée, assise devant un mur patiné',
  },
  {
    id: 'robes',
    label: 'Robes',
    blurb: 'Satin, broderies, pièces de fête',
    image: unsplash('1787779351008-7b519c9f4223'),
    imageAlt: 'Femme en robe de satin bleu ciel qui virevolte dans la rue',
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    blurb: 'Turbans, broches, bijoux',
    image: unsplash('1752074211067-1357a3359a1b'),
    imageAlt: 'Femme en turban rayé crème et cardigan anthracite',
  },
];

/** ⚠️ Photos d'ambiance de la page d'accueil (démo) — à remplacer par celles de la boutique. */
export const HOME_IMAGES = {
  hero: {
    src: unsplash('1613115015227-462623fb2491'),
    alt: 'Femme souriante en hijab blanc et robe en wax, sur fond orange',
  },
  story: {
    src: unsplash('1773858441059-d741dc584aa7'),
    alt: 'Femme en robe de satin bronze et voile assorti, au marché parmi les pastèques',
  },
  ceremony: {
    src: unsplash('1747180961915-a11693ef4849'),
    alt: 'Femme en jilbab sable, assise dans une lumière chaude',
  },
};

/** Galerie « Inspirations » de l'accueil (démo). */
export const LOOKBOOK = [
  { src: unsplash('1773991188331-5a62224146f6'), alt: 'Robe bleu nuit brodée d’or et hijab orange' },
  { src: unsplash('1738853128950-f21b3ab6d168'), alt: 'Robe fleurie orange et turban crème, au milieu des plantes' },
  { src: unsplash('1586682643135-060f061868b6'), alt: 'Hijab vert émeraude et chemise blanche' },
  { src: unsplash('1746366618640-9b0257c3cd64'), alt: 'Ensemble rose poudré avec hijab assorti et sac noir' },
  { src: unsplash('1640154852340-9de73a0643a8'), alt: 'Hijab taupe et robe fleurie à manches longues' },
];

export type SizeGuide = { columns: string[]; rows: string[][]; note: string };

/**
 * Guides des tailles affichés sur les fiches produit.
 * ⚠️ Mesures indicatives : à vérifier avec les vrais modèles de la boutique.
 */
export const SIZE_GUIDES: Partial<Record<CategoryId, SizeGuide>> = {
  abayas: {
    columns: ['Taille', 'Longueur', 'Votre hauteur'],
    rows: [
      ['S (52)', '132 cm', '1,50 – 1,58 m'],
      ['M (54)', '137 cm', '1,58 – 1,65 m'],
      ['L (56)', '142 cm', '1,65 – 1,72 m'],
      ['XL (58)', '147 cm', '1,72 – 1,80 m'],
    ],
    note: 'Le chiffre entre parenthèses est la longueur en pouces. Coupe ample : choisissez selon votre hauteur.',
  },
  robes: {
    columns: ['Taille', 'Équivalent', 'Tour de poitrine'],
    rows: [
      ['S', '36 – 38', '84 – 90 cm'],
      ['M', '40 – 42', '91 – 98 cm'],
      ['L', '44 – 46', '99 – 106 cm'],
      ['XL', '48 – 50', '107 – 114 cm'],
    ],
    note: 'Entre deux tailles, prenez la plus grande. Longueur environ 140 cm.',
  },
};

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- HIJABS
  {
    slug: 'hijab-soie-blanc-nacre',
    name: 'Hijab soie Blanc nacré',
    category: 'hijabs',
    price: 6500,
    colors: [
      { name: 'Blanc nacré', hex: '#F4EFE6' },
      { name: 'Crème', hex: '#E8DCC4' },
      { name: 'Rose poudré', hex: '#E7C6BE' },
      { name: 'Noir', hex: '#1F1B18' },
    ],
    shortDescription: 'Soie de Médine mate, lumineuse sur le teint.',
    description:
      'Un blanc nacré qui illumine le visage, pour les cérémonies comme pour le vendredi. La soie de Médine tombe souplement, reste opaque et ne glisse pas.',
    details: ['Soie de Médine (polyester haut de gamme)', '180 × 70 cm', 'Opaque, ne glisse pas', 'Repassage doux'],
    image: unsplash('1614398077777-d98640aeb925'),
    imageAlt: 'Femme souriante en hijab blanc nacré, mains jointes, sur fond orange',
    credit: 'Tobi Oshinnaike / Unsplash',
    featured: true,
    badge: 'Best-seller',
  },
  {
    slug: 'hijab-mousseline-caramel',
    name: 'Hijab mousseline Caramel',
    category: 'hijabs',
    price: 5000,
    colors: [
      { name: 'Caramel', hex: '#9C6B43' },
      { name: 'Sable', hex: '#D8BF9A' },
      { name: 'Chocolat', hex: '#4A2C22' },
    ],
    shortDescription: 'Voile léger et opaque, tombé fluide.',
    description:
      "Notre mousseline la plus demandée : légère pour la chaleur de Cotonou, opaque pour un port serein. Le caramel se marie avec toutes les tenues, du wax au noir.",
    details: ['Mousseline premium', '180 × 75 cm', 'Ne se froisse presque pas', 'Lavage main ou délicat 30 °C'],
    image: unsplash('1577614742608-393919945ee2'),
    imageAlt: 'Visage de femme en hijab caramel baigné de lumière dorée',
    credit: 'Satria Hutama / Unsplash',
    featured: true,
  },
  {
    slug: 'hijab-crepe-sauge',
    name: 'Hijab crêpe Sauge',
    category: 'hijabs',
    price: 5500,
    colors: [
      { name: 'Sauge', hex: '#8E9A7E' },
      { name: 'Olive', hex: '#5F6B3A' },
      { name: 'Gris perle', hex: '#CFCBC3' },
    ],
    shortDescription: 'Crêpe texturé, se drape sans épingle.',
    description:
      'Un crêpe légèrement texturé qui tient en place tout seul. Le vert sauge, doux et naturel, apporte une touche de fraîcheur à vos tenues neutres.',
    details: ['Crêpe gaufré', '180 × 70 cm', 'Tient sans épingle', 'Lavage machine 30 °C'],
    image: unsplash('1613837770636-cae46b162c28'),
    imageAlt: 'Femme en hijab crêpe vert sauge drapé sur les épaules',
    credit: 'Raamin ka / Unsplash',
    featured: true,
    badge: 'Nouveau',
  },
  {
    slug: 'hijab-soie-fuchsia',
    name: 'Hijab soie Fuchsia',
    category: 'hijabs',
    price: 6500,
    colors: [
      { name: 'Fuchsia', hex: '#D9619A' },
      { name: 'Rose poudré', hex: '#E7C6BE' },
      { name: 'Bordeaux', hex: '#5B1F2A' },
    ],
    shortDescription: 'La couleur qui fait sourire, pour les fêtes.',
    description:
      'Un rose vif et joyeux pour les mariages, les baptêmes et les jours de fête. Brodé discrètement sur un coin, il se porte drapé ou en khimar.',
    details: ['Soie de Médine brodée', '190 × 75 cm', 'Broderie ton sur ton', 'Lavage délicat 30 °C'],
    image: unsplash('1657889023207-65f6d46534c9'),
    imageAlt: 'Femme en hijab et tenue rose fuchsia, assise sur fond sombre',
    credit: 'Qwerqu McBrew / Unsplash',
    featured: true,
  },

  // ---------------------------------------------------------------- ABAYAS
  {
    slug: 'jilbab-sable',
    name: 'Jilbab Sable',
    category: 'abayas',
    price: 32000,
    colors: [
      { name: 'Sable', hex: '#C9AE86' },
      { name: 'Noir', hex: '#1F1B18' },
      { name: 'Taupe', hex: '#8C7A6B' },
    ],
    sizes: ['S (52)', 'M (54)', 'L (56)', 'XL (58)'],
    shortDescription: 'Deux pièces : khimar long et jupe ample.',
    description:
      'Un jilbab deux pièces enveloppant : le khimar couvre jusqu’aux genoux, la jupe tombe jusqu’aux chevilles. Une tenue de prière et de sortie, d’une grande douceur.',
    details: ['Nidha légère, mate', 'Khimar + jupe', 'Manches intégrées au khimar', 'Taille élastiquée'],
    image: unsplash('1747180961915-a11693ef4849'),
    imageAlt: 'Femme en jilbab sable, assise dans une lumière chaude et dorée',
    credit: 'Nasiru Shaibu / Unsplash',
    featured: true,
    badge: 'Coup de cœur',
  },
  {
    slug: 'abaya-brodee-champagne',
    name: 'Abaya brodée Champagne',
    category: 'abayas',
    price: 35000,
    colors: [
      { name: 'Champagne', hex: '#E3D3BC' },
      { name: 'Olive', hex: '#5F6B3A' },
    ],
    sizes: ['S (52)', 'M (54)', 'L (56)', 'XL (58)'],
    shortDescription: 'Broderie ton sur ton, coupe évasée.',
    description:
      "Une abaya de cérémonie aux broderies délicates sur le buste et les manches. La coupe légèrement évasée accompagne chaque pas : idéale pour l'Aïd, les mariages et les baptêmes.",
    details: ['Crêpe de Dubaï', 'Broderie ton sur ton', 'Ceinture assortie incluse', 'Longueur : 137 cm (taille M)'],
    image: unsplash('1760083545495-b297b1690672'),
    imageAlt: 'Abaya champagne aux broderies fines portée par une femme en hijab',
    credit: 'Abayas Boutique / Unsplash',
    featured: true,
    badge: 'Cérémonie',
  },
  {
    slug: 'abaya-nour-noir-et-or',
    name: 'Abaya Nour noir & or',
    category: 'abayas',
    price: 28000,
    colors: [
      { name: 'Noir & or', hex: '#1F1B18' },
      { name: 'Marine & or', hex: '#22283A' },
    ],
    sizes: ['S (52)', 'M (54)', 'L (56)', 'XL (58)'],
    shortDescription: 'Galon doré, intemporelle.',
    description:
      "L'abaya noire, sublimée par un galon doré le long de l'ouverture et des poignets. Un classique qui se porte toute l'année, du marché à la mosquée.",
    details: ['Nidha légère', 'Galon doré tissé', 'Fermeture boutons pression', 'Longueur : 137 cm (taille M)'],
    image: unsplash('1724412665971-114bd351a42d'),
    imageAlt: 'Femme en abaya noire bordée d’un galon doré et hijab beige',
    credit: 'malbus pak / Unsplash',
  },

  // ----------------------------------------------------------------- ROBES
  {
    slug: 'robe-satin-bronze',
    name: 'Robe satin Bronze',
    category: 'robes',
    price: 27000,
    colors: [
      { name: 'Bronze', hex: '#7A4A2C' },
      { name: 'Émeraude', hex: '#1F5A4A' },
      { name: 'Prune', hex: '#4B2234' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: 'Satin lumineux, voile assorti offert.',
    description:
      'Une robe ample en satin au reflet cuivré, avec son voile assorti. Elle capte la lumière à chaque mouvement : la pièce qui ne passe pas inaperçue.',
    details: ['Satin épais, non transparent', 'Voile assorti inclus', 'Manches bouffantes', 'Longueur : 145 cm'],
    image: unsplash('1773858437929-60fbf3900bfc'),
    imageAlt: 'Femme en robe de satin bronze et voile assorti, posant au marché',
    credit: 'K Studios / Unsplash',
    featured: true,
    badge: 'Nouveau',
  },
  {
    slug: 'robe-brodee-safiya',
    name: 'Robe brodée Safiya',
    category: 'robes',
    price: 30000,
    colors: [{ name: 'Bordeaux & or', hex: '#4B1F22' }],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: 'Broderies dorées, pièce de fête.',
    description:
      'Une robe de fête aux broderies dorées et turquoise, ceinturée à la taille. Une pièce forte pour les grandes occasions, à associer à un hijab uni.',
    details: ['Crêpe épais', 'Broderies or et turquoise', 'Ceinture brodée assortie', 'Pièce en petite quantité'],
    image: unsplash('1673547991911-c8b25dde4b9b'),
    imageAlt: 'Femme en robe bordeaux aux broderies dorées et hijab assorti',
    credit: 'Sẹ́gun Toríọlá / Unsplash',
    featured: true,
    badge: 'Édition limitée',
  },
  {
    slug: 'robe-dentelle-olive',
    name: 'Robe dentelle Olive',
    category: 'robes',
    price: 34000,
    colors: [
      { name: 'Olive', hex: '#5F6B3A' },
      { name: 'Ivoire', hex: '#F1EADB' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    shortDescription: 'Buste en dentelle, jupe en tulle.',
    description:
      'Un buste en dentelle ivoire sur un velours olive, et une jupe en tulle qui virevolte. La robe des mariages et des soirées, à porter avec un hijab crème.',
    details: ['Velours, dentelle et tulle', 'Doublée', 'Fermeture éclair dos', 'Longueur : 140 cm'],
    image: unsplash('1640131512569-a473df73f4a6'),
    imageAlt: 'Femme en robe olive à buste en dentelle et jupe en tulle, hijab crème',
    credit: 'Azaria AC / Unsplash',
  },

  // ----------------------------------------------------------- ACCESSOIRES
  {
    slug: 'turban-raye-creme',
    name: 'Turban rayé Crème',
    category: 'accessoires',
    price: 4500,
    colors: [
      { name: 'Crème & noir', hex: '#E8DCC4' },
      { name: 'Terracotta', hex: '#B4532A' },
    ],
    shortDescription: 'Turban prêt à porter, nœud sculpté.',
    description:
      'Un turban déjà noué, à enfiler en deux secondes. Parfait sous un hijab léger ou seul pour les jours décontractés.',
    details: ['Jersey extensible', 'Taille unique', 'Nœud cousu', 'Lavage main'],
    image: unsplash('1752074211067-1357a3359a1b'),
    imageAlt: 'Femme en turban rayé crème et noir, cardigan anthracite',
    credit: 'Roman Manshin / Unsplash',
  },
  {
    slug: 'epingles-et-broches-dorees',
    name: 'Épingles & broches dorées',
    category: 'accessoires',
    price: 3500,
    colors: [{ name: 'Doré', hex: '#C2A060' }],
    shortDescription: 'Pour fixer le hijab avec élégance.',
    description:
      'Un assortiment d’épingles et de broches dorées pour fixer et sublimer le hijab. Prix à la pièce ; demandez les modèles disponibles sur WhatsApp.',
    details: ['Métal doré, sans nickel', 'Fermoir sécurisé', 'Prix à la pièce', 'Modèles selon arrivage'],
    image: unsplash('1775135946138-adec67b17ea0'),
    imageAlt: 'Écrin de broches et boucles dorées, certaines serties de perles',
    credit: 'Aliona Zahrai / Unsplash',
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Catégorie inconnue : ${id}`);
  return category;
}

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}
