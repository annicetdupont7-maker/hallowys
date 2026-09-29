/**
 * REGISTRE D'ASSETS IMAGES — HALLOWYS
 * ----------------------------------------------------------------------------
 * Source unique de vérité pour TOUTES les images du site.
 *
 * Règles du projet :
 *  - Aucune image externe (Unsplash, Google, URL distante). Tout est local.
 *  - Aucun texte incrusté dans les images : titres / prix / promos / CTA sont
 *    toujours du HTML/CSS posé au-dessus de l'image.
 *  - Les fichiers finaux se déposent exactement aux chemins déclarés ici.
 *    Aucun changement de code n'est nécessaire lors du remplacement des
 *    placeholders par les visuels définitifs (mêmes chemins, mêmes dimensions).
 *
 * Chaque entrée porte : chemin, dimensions intrinsèques, alt descriptif,
 * et l'attribut `sizes` correspondant à son emplacement réel dans l'interface.
 */

export type ImageAsset = {
  /** Chemin public, identique pour le placeholder et le fichier final. */
  src: string;
  /** Largeur intrinsèque en px — fige le ratio, évite tout layout shift. */
  width: number;
  /** Hauteur intrinsèque en px. */
  height: number;
  /** Alt descriptif (jamais le nom du fichier). */
  alt: string;
  /** Valeur `sizes` adaptée à l'emplacement du visuel dans la grille. */
  sizes: string;
  /** Emplacement exact dans l'interface — documentation vivante. */
  placement: string;
  /** true = chargé en priorité (above the fold), false = lazy loading. */
  priority: boolean;
};

/**
 * Ratios normalisés par famille d'assets.
 * Ces dimensions sont celles des fichiers réellement livrés : aucun
 * ré-échantillonnage à l'import, et le ratio déclaré ici est exactement celui
 * de l'image, donc la place réservée est toujours juste.
 */
export const ASSET_RATIOS = {
  hero: { width: 1280, height: 720 }, // 16:9
  category: { width: 1280, height: 960 }, // 4:3
  product: { width: 1254, height: 1254 }, // 1:1
  /** Recadrages carrés du visuel de catégorie Accessoires. */
  productCrop: { width: 500, height: 500 }, // 1:1
  banner: { width: 1280, height: 400 }, // 16:5
  portrait: { width: 1254, height: 1254 }, // 1:1
} as const;

/**
 * Blur uniforme sombre (SVG 8x8 inline, ~250 octets).
 * Partagé par tous les assets : il reste valable après remplacement des
 * fichiers, donc aucune régénération n'est requise côté code.
 */
export const DARK_BLUR =
  'data:image/svg+xml;base64,' +
  /* <svg 8x8><rect fill="#150a1f"/><circle cx="4" cy="5" r="3" fill="#2d1440"/></svg>
     encodé en dur : le registre est aussi importé côté navigateur, où
     `Buffer` n'existe pas. */
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxNTBhMWYiLz48Y2lyY2xlIGN4PSI0IiBjeT0iNSIgcj0iMyIgZmlsbD0iIzJkMTQ0MCIvPjwvc3ZnPg==';

const GRID_CATEGORY_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
const GRID_PRODUCT_SIZES = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';

export const IMAGE_ASSETS = {
  /* ---------------------------------------------------------------- HERO -- */
  'hero.main': {
    src: '/images/hero/halloween-hero.webp',
    ...ASSET_RATIOS.hero,
    alt: "Nuit d'Halloween : citrouilles sculptées illuminées et lanternes devant un manoir victorien hanté, pavés humides et brume sous la pleine lune",
    sizes: '100vw',
    placement: 'Accueil, visuel plein écran de la section Hero (au-dessus de la ligne de flottaison)',
    priority: true,
  },

  /* ---------------------------------------------------------- CATÉGORIES -- */
  'category.decorations': {
    src: '/images/categories/decorations.webp',
    ...ASSET_RATIOS.category,
    alt: "Décorations d'Halloween : citrouilles, toiles d'araignée et crânes disposés dans un salon sombre",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 1) · En-tête de /categories/decorations',
    priority: false,
  },
  'category.costumes': {
    src: '/images/categories/costumes.webp',
    ...ASSET_RATIOS.category,
    alt: "Robe de sorcière noire en dentelle présentée sur un mannequin, chapeau pointu et grand miroir doré dans une pièce éclairée aux bougies",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 2) · En-tête de /categories/costumes',
    priority: false,
  },
  'category.accessories': {
    src: '/images/categories/accessories.webp',
    ...ASSET_RATIOS.category,
    alt: "Accessoires d'Halloween : masques vénitiens, dentier de vampire, colliers gothiques et gants de dentelle sur une table éclairée aux bougies",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 3) · En-tête de /categories/accessories',
    priority: false,
  },
  'category.lighting': {
    src: '/images/categories/lighting.webp',
    ...ASSET_RATIOS.category,
    alt: "Éclairage d'Halloween : guirlandes orangées, lanternes et bougies illuminant une pièce obscure",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 4) · En-tête de /categories/lighting',
    priority: false,
  },
  'category.parties': {
    src: '/images/categories/parties.webp',
    ...ASSET_RATIOS.category,
    alt: "Table de fête d'Halloween dressée avec vaisselle noire, bougies et décor de citrouilles",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 5) · En-tête de /categories/parties',
    priority: false,
  },
  'category.gifts': {
    src: '/images/categories/gifts.webp',
    ...ASSET_RATIOS.category,
    alt: "Coffrets cadeaux d'Halloween emballés de noir et d'orange, rubans et étiquettes sombres",
    sizes: GRID_CATEGORY_SIZES,
    placement: 'Accueil, grille Catégories (carte 6) · En-tête de /categories/gifts',
    priority: false,
  },

  /* ------------------------------------------------------------ PRODUITS -- */
  'product.pumpkin-led': {
    src: '/images/products/pumpkin-led.webp',
    ...ASSET_RATIOS.product,
    alt: 'Citrouille décorative LED au sourire sculpté diffusant une lueur orangée dans le noir',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.giant-skeleton': {
    src: '/images/products/giant-skeleton.webp',
    ...ASSET_RATIOS.product,
    alt: "Squelette géant articulé dressé devant l'entrée d'une demeure, entouré de lanternes allumées et de citrouilles sculptées",
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.witch-costume': {
    src: '/images/products/witch-costume.webp',
    ...ASSET_RATIOS.product,
    alt: 'Costume de sorcière complet avec chapeau pointu et cape en dentelle noire',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.skull-lantern': {
    src: '/images/products/skull-lantern.webp',
    ...ASSET_RATIOS.product,
    alt: 'Lanterne en forme de crâne dont les orbites diffusent une lumière chaude vacillante',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.ghost-decoration': {
    src: '/images/products/ghost-decoration.webp',
    ...ASSET_RATIOS.product,
    alt: 'Fantôme décoratif en voile blanc suspendu, illuminé de l’intérieur par une lueur orangée',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.halloween-candles': {
    src: '/images/products/halloween-candles.webp',
    ...ASSET_RATIOS.product,
    alt: "Bougies noires sculptées de crânes et de citrouilles, flammes vives et cire coulante sur un buffet ancien",
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.halloween-tableware': {
    src: '/images/products/halloween-tableware.webp',
    ...ASSET_RATIOS.product,
    alt: "Vaisselle d'Halloween noire et orangée dressée sur une nappe sombre",
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },

  'product.vampire-mask': {
    src: '/images/products/vampire-mask.webp',
    ...ASSET_RATIOS.productCrop,
    alt: 'Masque de vampire ivoire à filigranes dorés, crocs et coulures rouges, posé sur un support noir',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },
  'product.feather-mask': {
    src: '/images/products/feather-mask.webp',
    ...ASSET_RATIOS.productCrop,
    alt: 'Masque vénitien en dentelle métallique dorée, orné de plumes noires et de roses pourpres',
    sizes: GRID_PRODUCT_SIZES,
    placement: 'Grilles produits (accueil, catégorie, recherche) · Visuel principal de la fiche produit',
    priority: false,
  },

  /* ------------------------------------------------------------ BANNIÈRE -- */
  'banner.sale': {
    src: '/images/banners/halloween-sale.webp',
    ...ASSET_RATIOS.banner,
    alt: "Manoir hanté sous une lune orangée, citrouilles illuminées et chauves-souris dans un ciel de nuit",
    sizes: '(max-width: 1280px) 100vw, 1280px',
    placement: 'Accueil, bannière promotionnelle pleine largeur, sous la grille produits',
    priority: false,
  },

  /* --------------------------------------------------------- TÉMOIGNAGES -- */
  'testimonial.1': {
    src: '/images/testimonials/portrait-1.webp',
    ...ASSET_RATIOS.portrait,
    alt: 'Portrait souriant d’une cliente HALLOWYS sur fond orangé',
    sizes: '72px',
    placement: 'Accueil, section Avis clients, avatar circulaire de la carte 1',
    priority: false,
  },
  'testimonial.2': {
    src: '/images/testimonials/portrait-2.webp',
    ...ASSET_RATIOS.portrait,
    alt: 'Portrait souriant d’un client HALLOWYS sur fond orangé',
    sizes: '72px',
    placement: 'Accueil, section Avis clients, avatar circulaire de la carte 2',
    priority: false,
  },
} as const satisfies Record<string, ImageAsset>;

export type AssetKey = keyof typeof IMAGE_ASSETS;

/** Récupère un asset typé. Erreur à la compilation si la clé n'existe pas. */
export function getAsset(key: AssetKey): ImageAsset {
  return IMAGE_ASSETS[key];
}

