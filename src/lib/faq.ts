/** Questions fréquentes : affichées sur l'accueil (extrait) et sur /faq (complet). */

export type FaqItem = { id: string; question: string; answer: string };

export const FAQ: FaqItem[] = [
  {
    id: 'commander',
    question: 'Comment passer commande ?',
    answer:
      "Ajoutez vos articles au panier, cliquez sur « Passer commande » puis renseignez votre adresse de livraison. En validant, WhatsApp s'ouvre avec le récapitulatif complet de votre commande : il vous suffit d'envoyer le message. Nous vous répondons pour confirmer la disponibilité et le paiement.",
  },
  {
    id: 'livraison-delais',
    question: 'Sous combien de temps ma commande est-elle expédiée ?',
    answer:
      "Toute commande confirmée avant 14 h (du lundi au vendredi) part le jour même. Comptez ensuite 2 à 3 jours ouvrés de livraison en France métropolitaine. Un numéro de suivi vous est envoyé dès l'expédition.",
  },
  {
    id: 'livraison-frais',
    question: 'Combien coûte la livraison ?',
    answer:
      "La livraison est offerte dès 49 € d'achat. En dessous, elle est facturée 4,90 €. Le montant exact s'affiche dans votre panier et dans le récapitulatif envoyé sur WhatsApp.",
  },
  {
    id: 'livraison-halloween',
    question: 'Serai-je livré à temps pour le 31 octobre ?',
    answer:
      "Pour une livraison garantie avant Halloween, commandez au plus tard le 27 octobre avant 14 h. Passé cette date, nous faisons au mieux mais ne pouvons pas nous engager sur les délais du transporteur.",
  },
  {
    id: 'retours',
    question: 'Puis-je retourner un article ?',
    answer:
      "Oui, vous disposez de 30 jours après réception pour nous retourner un article non utilisé, dans son emballage d'origine. Le remboursement intervient sous 5 jours ouvrés après réception du colis.",
  },
  {
    id: 'tailles',
    question: 'Comment choisir la taille de mon costume ?',
    answer:
      "Nos costumes suivent les tailles françaises standard : XS (34), S (36-38), M (40-42), L (44-46), XL (48-50) et XXL (52-54). Entre deux tailles, prenez la plus grande : les robes se portent amples et la cape s'ajuste au cou.",
  },
  {
    id: 'paiement',
    question: 'Comment se passe le paiement ?',
    answer:
      'Après réception de votre commande sur WhatsApp, nous vous confirmons la disponibilité des articles et vous envoyons un lien de paiement sécurisé par carte bancaire. Votre colis est expédié dès le paiement reçu.',
  },
  {
    id: 'panier',
    question: 'Mon panier est-il conservé si je quitte le site ?',
    answer:
      "Oui. Votre panier est enregistré sur votre appareil : vous le retrouvez intact en revenant, même après avoir fermé votre navigateur.",
  },
  {
    id: 'rupture',
    question: 'Un article est en rupture de stock, va-t-il revenir ?',
    answer:
      "La plupart de nos pièces sont réassorties en quelques jours pendant la saison. Écrivez-nous depuis la page Contact en précisant le produit : nous vous prévenons dès son retour.",
  },
];
