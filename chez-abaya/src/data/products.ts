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
    blurb: 'Mousseline, jersey, soie de Médine',
    image: unsplash('1619545010907-ca2217d296ce'),
    imageAlt: 'Femme portant un hijab taupe et une chemise blanche',
  },
  {
    id: 'abayas',
    label: 'Abayas',
    blurb: 'Coupes fluides, finitions brodées',
    image: unsplash('1728487235101-664d87965931'),
    imageAlt: 'Femme en abaya noire ouverte sur une robe ivoire, debout dans un escalier',
  },
  {
    id: 'robes',
    label: 'Robes',
    blurb: 'Longues, couvrantes, élégantes',
    image: unsplash('1668028554854-245f8ccae15b'),
    imageAlt: 'Deux femmes en robes longues noires devant un drapé beige',
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    blurb: 'Épingles, bijoux, tasbih, sacs',
    image: unsplash('1713425886143-6ea8c776bf2d'),
    imageAlt: 'Sac à main marron posé sur un socle blanc',
  },
];

const ABAYA_SIZES = ['S (52)', 'M (54)', 'L (56)', 'XL (58)'];
const DRESS_SIZES = ['S', 'M', 'L', 'XL'];

export const PRODUCTS: Product[] = [
  // ---------------------------------------------------------------- HIJABS
  {
    slug: 'hijab-mousseline-sable',
    name: 'Hijab mousseline Sable',
    category: 'hijabs',
    price: 5000,
    colors: [
      { name: 'Sable', hex: '#D8BF9A' },
      { name: 'Ivoire', hex: '#F1EADB' },
      { name: 'Taupe', hex: '#9C8878' },
      { name: 'Noir', hex: '#1F1B18' },
    ],
    shortDescription: 'Voile léger et opaque, tombé fluide.',
    description:
      "Notre mousseline la plus demandée : légère pour la chaleur de Cotonou, opaque pour un port serein. Elle se drape facilement et ne glisse pas.",
    details: ['Mousseline premium', '180 × 75 cm', 'Ne se froisse presque pas', 'Lavage main ou délicat 30 °C'],
    image: unsplash('1619545307432-9fc73f8135ff'),
    imageAlt: 'Femme portant un hijab en mousseline couleur sable, sur fond blanc',
    credit: 'Muhammad Ruqi Yaddin / Unsplash',
    featured: true,
    badge: 'Best-seller',
  },
  {
    slug: 'hijab-jersey-chocolat',
    name: 'Hijab jersey Chocolat',
    category: 'hijabs',
    price: 4500,
    colors: [
      { name: 'Chocolat', hex: '#4A2C22' },
      { name: 'Prune', hex: '#5B2E3A' },
      { name: 'Noir', hex: '#1F1B18' },
    ],
    shortDescription: 'Jersey extensible, tient sans épingle.',
    description:
      "Un jersey doux et extensible qui tient en place toute la journée, sans épingle. Idéal pour le travail, l'école ou les journées chargées.",
    details: ['Jersey viscose extensible', '170 × 60 cm', 'Ne glisse pas', 'Lavage machine 30 °C'],
    image: unsplash('1673546975316-f2a195a08974'),
    imageAlt: 'Femme portant un hijab en jersey brun chocolat sur fond terracotta',
    credit: 'Sẹ́gun Toríọlá / Unsplash',
    featured: true,
  },
  {
    slug: 'khimar-sauge',
    name: 'Khimar Sauge',
    category: 'hijabs',
    price: 12000,
    colors: [
      { name: 'Sauge', hex: '#C9CDB8' },
      { name: 'Gris perle', hex: '#D4D2CC' },
      { name: 'Beige', hex: '#D9C7AE' },
    ],
    shortDescription: 'Khimar long, couvre les épaules et la poitrine.',
    description:
      'Un khimar enveloppant qui couvre généreusement épaules et poitrine. Se porte en un geste, parfait pour la prière comme pour sortir.',
    details: ['Crêpe soyeux', 'Longueur dos : 110 cm', 'Visage ajusté avec élastique doux', 'Lavage délicat 30 °C'],
    image: unsplash('1619544592515-8aae927088bc'),
    imageAlt: 'Femme portant un khimar vert sauge pâle, mains jointes, sur fond blanc',
    credit: 'Muhammad Ruqi Yaddin / Unsplash',
  },
  {
    slug: 'hijab-soie-de-medine-ivoire',
    name: 'Hijab soie de Médine Ivoire',
    category: 'hijabs',
    price: 6500,
    colors: [
      { name: 'Ivoire', hex: '#F1EADB' },
      { name: 'Crème', hex: '#E8DCC4' },
      { name: 'Rose poudré', hex: '#E4C9C0' },
    ],
    shortDescription: 'Soie de Médine mate, rendu chic.',
    description:
      'La soie de Médine offre un tombé souple et un aspect mat très élégant. Notre ivoire illumine le teint, pour les cérémonies comme au quotidien.',
    details: ['Soie de Médine (polyester haut de gamme)', '180 × 70 cm', 'Opaque', 'Repassage doux'],
    image: unsplash('1545266241-3516e2a6e016'),
    imageAlt: 'Portrait d’une femme en hijab ivoire et boucles d’oreilles dorées',
    credit: 'Damon Zaidmus / Unsplash',
    badge: 'Nouveau',
  },

  // ---------------------------------------------------------------- ABAYAS
  {
    slug: 'abaya-brodee-champagne',
    name: 'Abaya brodée Champagne',
    category: 'abayas',
    price: 35000,
    colors: [
      { name: 'Champagne', hex: '#E3D3BC' },
      { name: 'Olive', hex: '#7A7F5A' },
    ],
    sizes: ABAYA_SIZES,
    shortDescription: 'Broderie ton sur ton, coupe évasée.',
    description:
      "Une abaya de cérémonie aux broderies délicates sur le buste et les manches. La coupe légèrement évasée accompagne chaque pas : idéale pour l'Aïd, les mariages et les baptêmes.",
    details: ['Crêpe de Dubaï', 'Broderie ton sur ton', 'Ceinture assortie incluse', 'Longueur : 140 cm (taille M)'],
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
    sizes: ABAYA_SIZES,
    shortDescription: 'Galon doré, intemporelle.',
    description:
      "L'abaya noire, sublimée par un galon doré le long de l'ouverture et des poignets. Un classique qui se porte toute l'année, du marché à la mosquée.",
    details: ['Nidha légère', 'Galon doré tissé', 'Fermeture boutons pression', 'Longueur : 140 cm (taille M)'],
    image: unsplash('1724412665971-114bd351a42d'),
    imageAlt: 'Femme en abaya noire bordée d’un galon doré et hijab beige',
    credit: 'malbus pak / Unsplash',
    featured: true,
  },
  {
    slug: 'abaya-kimono-camel',
    name: 'Abaya kimono Camel',
    category: 'abayas',
    price: 25000,
    colors: [
      { name: 'Camel', hex: '#C8AE8C' },
      { name: 'Noir', hex: '#1F1B18' },
      { name: 'Taupe', hex: '#9C8878' },
    ],
    sizes: ABAYA_SIZES,
    shortDescription: 'Ouverte, à superposer sur une robe.',
    description:
      'Une abaya ouverte de style kimono, à porter sur une robe ou un ensemble. Manches larges et tissu respirant pour rester à l’aise toute la journée.',
    details: ['Lin mélangé', 'Ouverte devant, ceinture amovible', 'Poches latérales', 'Longueur : 138 cm (taille M)'],
    image: unsplash('1762605135012-56a59a059e60'),
    imageAlt: 'Femme en abaya kimono camel descendant un escalier clair',
    credit: 'Mina Rad / Unsplash',
  },

  // ----------------------------------------------------------------- ROBES
  {
    slug: 'robe-satin-layla',
    name: 'Robe satin Layla',
    category: 'robes',
    price: 22000,
    colors: [
      { name: 'Sauge', hex: '#B9C4AA' },
      { name: 'Terracotta', hex: '#A4532F' },
    ],
    sizes: DRESS_SIZES,
    shortDescription: 'Satin fluide, manches longues, taille cintrée.',
    description:
      'Une robe longue en satin au tombé lumineux, cintrée à la taille par une ceinture nouée. Disponible en sauge et en terracotta, comme sur la photo.',
    details: ['Satin de soie artificielle', 'Manches longues', 'Ceinture à nouer', 'Doublée jusqu’au genou'],
    image: unsplash('1668028563825-f3b7138db3de'),
    imageAlt: 'Deux femmes en robes longues en satin, l’une terracotta, l’autre vert sauge',
    credit: 'Redd Francisco / Unsplash',
    featured: true,
  },
  {
    slug: 'robe-brodee-safiya',
    name: 'Robe brodée Safiya',
    category: 'robes',
    price: 30000,
    colors: [{ name: 'Bordeaux & or', hex: '#4B1F22' }],
    sizes: DRESS_SIZES,
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
    slug: 'robe-amira',
    name: 'Robe Amira',
    category: 'robes',
    price: 18000,
    colors: [
      { name: 'Noir', hex: '#1F1B18' },
      { name: 'Olive', hex: '#5E6444' },
    ],
    sizes: DRESS_SIZES,
    shortDescription: 'La robe longue du quotidien.',
    description:
      "Simple, couvrante et facile à porter : la robe Amira passe du bureau au dîner. Encolure ronde, manches longues et jupe ample.",
    details: ['Crêpe souple', 'Fermeture éclair dos', 'Manches longues', 'Lavage machine 30 °C'],
    image: unsplash('1668028554553-f83cac89ce0f'),
    imageAlt: 'Femme en robe longue noire assise, tenant un bouquet de fleurs blanches',
    credit: 'Redd Francisco / Unsplash',
  },

  // ----------------------------------------------------------- ACCESSOIRES
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
  {
    slug: 'tasbih-en-bois',
    name: 'Tasbih en bois',
    category: 'accessoires',
    price: 4000,
    colors: [
      { name: 'Bois naturel', hex: '#8A6A4A' },
      { name: 'Bois foncé', hex: '#4A3426' },
    ],
    shortDescription: '33 grains, bois poli à la main.',
    description:
      'Un chapelet de 33 grains en bois poli, agréable sous les doigts. Livré dans une pochette en tissu : une jolie idée de cadeau.',
    details: ['33 grains en bois', 'Pompon en coton', 'Pochette cadeau incluse'],
    image: unsplash('1783878734762-006feec41972'),
    imageAlt: 'Chapelets de grains en bois aux tons naturels suspendus dans la lumière',
    credit: 'Mohamed Benziane / Unsplash',
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
