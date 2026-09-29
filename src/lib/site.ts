/** Coordonnées de la boutique, partagées par le footer, la page Contact et la commande. */
export const CONTACT = {
  email: 'contact@hallowys.fr',
  hours: 'Du lundi au vendredi, de 9 h à 18 h',
} as const;

/**
 * Numéro WhatsApp qui reçoit les commandes.
 * Numéro fictif : la plage 06 39 98 est réservée par l'ARCEP aux œuvres de
 * fiction et ne joint personne. Remplacer par le vrai numéro de la boutique
 * (format international sans « + » ni espaces pour `number`).
 */
export const WHATSAPP = {
  number: '33639980000',
  display: '+33 6 39 98 00 00',
} as const;
