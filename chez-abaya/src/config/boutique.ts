/**
 * ============================================================================
 *  CONFIGURATION DE LA BOUTIQUE — À PERSONNALISER AVANT LA MISE EN LIGNE
 * ============================================================================
 *
 *  Toutes les informations de contact du site viennent de ce fichier.
 *  Les valeurs ci-dessous sont FICTIVES (démonstration).
 *
 *  ⚠️  À REMPLACER :
 *    - whatsappNumber : le vrai numéro WhatsApp de la vendeuse
 *    - phoneDisplay   : le même numéro, tel qu'il doit s'afficher
 *    - address / mapsUrl / hours / instagram / tiktok
 *
 *  Les produits, prix et photos se modifient dans src/data/products.ts.
 */

export const BOUTIQUE = {
  name: 'Chez Abaya',
  tagline: 'Hijabs, abayas & robes modestes à Cotonou',

  /**
   * ⚠️ NUMÉRO FICTIF — À REMPLACER.
   * Format international, chiffres uniquement, sans « + » ni espaces.
   * Bénin : indicatif 229 + numéro à 10 chiffres commençant par 01.
   * Exemple : +229 01 97 12 34 56  →  '2290197123456'
   */
  whatsappNumber: '2290100000000',
  phoneDisplay: '+229 01 00 00 00 00',

  /** ⚠️ Adresse fictive — à remplacer. */
  address: {
    street: 'Rue 1234, près de la pharmacie (adresse fictive)',
    district: 'Haie Vive',
    city: 'Cotonou, Bénin',
  },
  /** ⚠️ Lien Google Maps de la boutique — à remplacer par le vrai lien de partage. */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Haie+Vive+Cotonou',

  hours: [
    { days: 'Lundi – Samedi', time: '9h – 19h' },
    { days: 'Dimanche', time: 'Sur rendez-vous' },
  ],

  /** ⚠️ Comptes fictifs — à remplacer (ou mettre à null pour les masquer). */
  instagram: 'chezabaya.cotonou' as string | null,
  tiktok: 'chezabaya' as string | null,

  delivery: 'Livraison à Cotonou, Abomey-Calavi et Porto-Novo',
  payment: 'Paiement à la livraison ou par Mobile Money',
} as const;

export const CURRENCY = 'FCFA';
