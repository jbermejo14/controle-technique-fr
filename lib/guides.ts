export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  sections: Array<{
    heading: string;
    content: string[];
  }>;
  faqs: GuideFaq[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'delais-calendrier-controle-technique',
    title: 'Délais et calendrier du contrôle technique : quand le passer ?',
    metaTitle: 'Date limite du contrôle technique : calendrier 2026',
    metaDescription: 'Quand devez-vous passer le contrôle technique ? Règle des 4 ans pour un véhicule neuf, renouvellement tous les 2 ans, et délai de 6 mois en cas de revente.',
    summary: 'Comprendre les échéances légales pour votre voiture, utilitaire ou moto, le calcul à partir de la date de 1ère immatriculation et les délais stricts pour éviter l’amende de 135 €.',
    readTime: '6 min',
    publishedAt: '2026-01-15',
    updatedAt: '2026-11-22',
    sections: [
      {
        heading: '1. Véhicule neuf : le premier contrôle technique aux 4 ans',
        content: [
          'Pour tout véhicule particulier neuf (VP) ou utilitaire léger (CTTE), le premier contrôle technique doit être effectué impérativement au cours des 6 mois précédant le 4e anniversaire de sa première mise en circulation.',
          'Cette date de première mise en circulation se trouve sur la carte grise (certificat d’immatriculation) à la ligne (B). Par exemple, pour un véhicule immatriculé le 15 mai 2022, le premier contrôle technique doit être passé entre le 15 novembre 2025 et le 15 mai 2026 au plus tard.',
          'Attention : aucune convocation ni courrier de rappel ne vous est envoyé par l’administration. Il relève de la responsabilité exclusive du propriétaire de respecter cette échéance.'
        ]
      },
      {
        heading: '2. Véhicule de plus de 4 ans : la périodicité de 2 ans',
        content: [
          'Une fois le premier contrôle technique passé avec succès, le contrôle périodique doit être renouvelé tous les 2 ans. La date limite exacte est inscrite sur le timbre collé sur la carte grise et sur la vignette apposée sur le pare-brise.',
          'Vous pouvez réaliser votre contrôle technique par anticipation à tout moment sans attendre le dernier jour. Cependant, la nouvelle validité de 2 ans commencera le jour même de ce nouveau contrôle.'
        ]
      },
      {
        heading: '3. Cas particulier de la revente d’un véhicule d’occasion',
        content: [
          'Si vous vendez votre véhicule de plus de 4 ans à un particulier, le procès-verbal de contrôle technique remis à l’acquéreur doit dater de moins de 6 mois au jour de la cession.',
          'Si le contrôle a révélé une contre-visite, la vente reste légalement possible à condition que le procès-verbal de la visite initiale date de moins de 2 mois.',
          'En revanche, la vente à un professionnel de l’automobile (concessionnaire, garage) ne nécessite aucun contrôle technique préalable.'
        ]
      },
      {
        heading: '4. Sanctions en cas de défaut de contrôle technique valide',
        content: [
          'Rouler avec un contrôle technique périmé constitue une infraction au Code de la route (article R323-1) passible d’une amende forfaitaire de 135 € (minorée à 90 € en cas de paiement rapide sous 15 jours, et majorée à 375 € au-delà de 45 jours).',
          'Aucun point n’est retiré sur le permis de conduire. Toutefois, les forces de l’ordre peuvent confisquer la carte grise et délivrer une fiche de circulation provisoire valable 7 jours pour vous permettre de réaliser le contrôle technique en urgence.',
          'En cas d’accident responsable, votre compagnie d’assurance peut également réduire ou refuser certaines indemnisations prévues au contrat dommages tous accidents.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Existe-t-il un délai de grâce ou de tolérance après la date limite ?',
        answer: 'Non, le Code de la route ne prévoit aucun délai de tolérance. Dès le lendemain de la date limite figurant sur votre vignette, votre véhicule est en infraction et vous risquez l’amende de 135 €.'
      },
      {
        question: 'Puis-je passer le contrôle technique dans n’importe quel département ?',
        answer: 'Oui, vous pouvez passer votre contrôle technique dans n’importe quel centre agréé en France métropolitaine et d’outre-mer, quel que soit votre département de résidence ou d’immatriculation.'
      },
      {
        question: 'Où trouver la date exacte de mon contrôle technique ?',
        answer: 'La date limite figure sur la vignette carrée sur votre pare-brise ainsi que sur le timbre autocollant rectangulaire apposé au verso de votre certificat d’immatriculation (carte grise).'
      }
    ]
  },
  {
    slug: 'prix-tarifs-controle-technique-france',
    title: 'Prix du contrôle technique en France : comparatif et astuces pour payer moins cher',
    metaTitle: 'Prix du contrôle technique 2026 : tarifs par région',
    metaDescription: 'Quel est le prix moyen du contrôle technique en France ? De 45 € à 140 €, découvrez les tarifs par département et nos astuces pour économiser.',
    summary: 'En France, les tarifs du contrôle technique sont totalement libres. Analyse des prix moyens observés (84 € au national), des écarts territoriaux et des conseils pour trouver le centre le moins cher.',
    readTime: '5 min',
    publishedAt: '2026-02-10',
    updatedAt: '2026-11-22',
    sections: [
      {
        heading: '1. Des prix libres fixés par chaque centre agréé',
        content: [
          'Contrairement aux tarifs des cartes grises ou des amendes, les prix des contrôles techniques ne sont pas régulés par l’État. Chaque centre de contrôle fixe librement ses tarifs pour chaque catégorie de véhicule et chaque motorisation.',
          'En France métropolitaine, le prix moyen constaté pour une voiture particulière essence ou diesel s’établit à 84 €. Cependant, la fourchette réelle s’étend de 45 € dans certaines zones concurrentielles à plus de 135 € en région parisienne et dans les zones frontalières.'
        ]
      },
      {
        heading: '2. Pourquoi de telles disparités selon les départements ?',
        content: [
          'Trois facteurs principaux expliquent ces écarts de tarifs :',
          '• Le coût des loyers commerciaux et de la main-d’œuvre : les centres situés à Paris, dans les Hauts-de-Seine ou en Haute-Savoie supportent des coûts immobiliers et salariaux bien supérieurs à la Creuse ou l’Ariège.',
          '• La densité de concurrence : dans les zones périurbaines abritant plusieurs enseignes (Dekra, Securitest, Autosur, Autovision), la concurrence pousse les prix à la baisse.',
          '• La motorisation : les véhicules hybrides, électriques, 4x4 et GPL nécessitent des temps de vérification supplémentaires (contrôle des câbles haute tension, étanchéité gaz) et coûtent généralement 5 € à 15 € plus cher qu’un modèle thermique.'
        ]
      },
      {
        heading: '3. Attention au coût de la contre-visite',
        content: [
          'En cas de défaillance majeure ou critique, le véhicule doit être représenté pour une contre-visite dans un délai de 2 mois.',
          'Certains centres affichent un tarif d’appel très bas pour le contrôle initial (ex: 60 €) mais facturent la contre-visite 25 € à 35 €, tandis que d’autres proposent la contre-visite gratuite ou à prix réduit (10 € à 15 €).',
          'Vérifiez systématiquement le coût total potentiel (visite + contre-visite) avant de réserver.'
        ]
      },
      {
        heading: '4. Astuces concrètes pour réduire la facture',
        content: [
          '• Réservez en ligne sur les créneaux d’heures creuses (souvent le matin en milieu de semaine) pour profiter de promotions jusqu’à -30 %.',
          '• Comparez les centres de votre département grâce à notre comparateur Ododex connecté à la base de données officielle du Ministère de l’Économie.',
          '• Faites pré-vérifier vos ampoules et la pression de vos pneus avant la visite pour éviter une contre-visite payante.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quel est le département le moins cher de France pour le contrôle technique ?',
        answer: 'D’après les données officielles de la DGCCRF, le département du Loiret (45) ainsi que l’Ariège (09) et la Moselle (57) affichent les tarifs moyens les plus bas, souvent autour de 72 € à 74 €.'
      },
      {
        question: 'Pourquoi le contrôle technique est-il plus cher pour les voitures électriques ?',
        answer: 'Le contrôle d’un véhicule électrique comporte 11 points de contrôle spécifiques supplémentaires (état du pack batterie, câbles haute tension orange, continuité des masses, prise de charge), nécessitant des équipements isolés et un habilitation technique spécifique du contrôleur.'
      },
      {
        question: 'La contre-visite peut-elle être effectuée dans un autre centre ?',
        answer: 'Oui, vous avez le droit de passer votre contre-visite dans un centre différent de celui ayant réalisé la visite initiale, en fournissant le procès-verbal original.'
      }
    ]
  },
  {
    slug: 'defaillances-contre-visite-eviter',
    title: 'Défaillances du contrôle technique : comment éviter la contre-visite ?',
    metaTitle: 'Éviter la contre-visite du contrôle technique',
    metaDescription: 'Défaillance mineure, majeure ou critique : découvrez les motifs les plus fréquents de contre-visite et notre check-list simple pour réussir du premier coup.',
    summary: 'Avec 133 points de contrôle et plus de 600 défaillances possibles, près d’un véhicule sur cinq est recalé au contrôle technique. Voici les vérifications faciles à faire vous-même pour passer sans encombre.',
    readTime: '7 min',
    publishedAt: '2026-02-18',
    updatedAt: '2026-11-22',
    sections: [
      {
        heading: '1. Les 3 niveaux de défaillances depuis la réforme européenne',
        content: [
          'Depuis mai 2018, les anomalies relevées lors du contrôle technique sont classées en 3 catégories de gravité croissante :',
          '• Défaillance mineure : anomalie sans impact direct sur la sécurité ni l’environnement (ex: ampoule d’éclairage de plaque défaillante, usure discrète des balais d’essuie-glace). Le contrôle est favorable (lettre A), pas de contre-visite obligatoire.',
          '• Défaillance majeure : anomalie compromettant la sécurité ou ayant un impact négatif sur l’environnement (ex: feux stop inopérants, pneu lisse, plaquettes usées au-delà de la limite). Le contrôle est défavorable (lettre S), vous avez 2 mois pour effectuer les réparations et passer la contre-visite.',
          '• Défaillance critique : danger immédiat pour la sécurité routière (ex: absence de liquide de frein, fissure majeure du châssis, pneu déchiré avec armature visible). Le véhicule est interdit de circuler dès minuit le jour du contrôle (lettre R) jusqu’à réparation.'
        ]
      },
      {
        heading: '2. Le Top 5 des motifs de rejet les plus fréquents',
        content: [
          '1. Éclairage et signalisation (30 % des contre-visites) : ampoules grillées, phares mal réglés, feux stop ou clignotants inopérants.',
          '2. Essieux, roues et pneus (20 %) : profondeur des sculptures inférieure à 1,6 mm, hernie sur le flanc, pneus différents sur le même essieu.',
          '3. Freinage (15 %) : déséquilibre important gauche/droite, fuite de liquide, disques ou plaquettes hors cote.',
          '4. Émissions polluantes (15 %) : opacité des fumées diesel, taux de CO trop élevé, voyant moteur (MIL) allumé au tableau de bord.',
          '5. Visibilité (10 %) : impact dans le champ de vision du conducteur de plus de 3 cm, rétroviseur cassé, essuie-glaces déchirés.'
        ]
      },
      {
        heading: '3. La check-list d’auto-contrôle avant votre rendez-vous',
        content: [
          'Pour mettre toutes les chances de votre côté sans passer par un garage payant :',
          '• Allumez tous vos feux contre un mur pour vérifier vos veilleuses, feux de croisement, feux de route, antibrouillards et feux de recul.',
          '• Vérifiez le témoin d’usure de vos pneumatiques et ajustez la pression à froid.',
          '• Remplissez votre bocal de lave-glace et vérifiez que les balais essuient sans laisser de trace opaque.',
          '• Testez le bon fonctionnement de toutes les ceintures de sécurité (enclenchement et enroulement).',
          '• Avant la visite antipollution d’un diesel, roulez 20 minutes sur autoroute à régime soutenu (3 000 tr/min) pour décrasser le filtre à particules (FAP) et la vanne EGR.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Quel est le délai pour passer la contre-visite ?',
        answer: 'Le délai légal est de 2 mois jour pour jour à compter de la date du contrôle technique défavorable. Si vous dépassez ce délai même d’un seul jour, vous devrez repasser un contrôle technique complet payant.'
      },
      {
        question: 'Un voyant moteur allumé entraîne-t-il obligatoirement une contre-visite ?',
        answer: 'Oui, un voyant d’anomalie moteur (voyant orange MIL) allumé en continu au tableau de bord constitue une défaillance majeure systématique au titre du contrôle antipollution OBD.'
      },
      {
        question: 'Peut-on vendre une voiture soumise à contre-visite ?',
        answer: 'Oui, vous pouvez vendre une voiture avec contre-visite à un particulier à la condition stricte que le contrôle technique initial date de moins de 2 mois.'
      }
    ]
  },
  {
    slug: 'controle-technique-moto-2024-2025',
    title: 'Contrôle technique moto et catégorie L : règles, tarifs et calendrier',
    metaTitle: 'Contrôle technique moto et scooter : règles et prix',
    metaDescription: 'Tout savoir sur le contrôle technique obligatoire des motos, scooters, 50cc, quads et voiturettes : calendrier, durée de validité et prix.',
    summary: 'Instauré en France depuis avril 2024, le contrôle technique de la catégorie L concerne tous les 2-roues, 3-roues et voiturettes. Calendrier de déploiement, points vérifiés et tarifs constatés.',
    readTime: '6 min',
    publishedAt: '2026-03-05',
    updatedAt: '2026-11-22',
    sections: [
      {
        heading: '1. Quels sont les véhicules concernés par la catégorie L ?',
        content: [
          'Le contrôle technique des deux-roues motorisés concerne l’ensemble des véhicules de la catégorie L au sens du Code de la route :',
          '• Cyclomoteurs et scooters 50 cm³ (catégorie L1e / L2e)',
          '• Motocyclettes légères 125 cm³ et grosses cylindrées (catégorie L3e / L4e avec side-car)',
          '• Tricycles à moteur (catégorie L5e, type Piaggio MP3)',
          '• Quads légers et lourds (catégorie L6e / L7e)',
          '• Voitures sans permis / voiturettes (catégorie L6e)',
          'Sont exemptées uniquement les motos d’enduro et de trial de compétition licenciées auprès de la FFM.'
        ]
      },
      {
        heading: '2. Périodicité et durée de validité pour les motos',
        content: [
          'Pour un deux-roues neuf, le premier contrôle technique doit être passé aux 5 ans du véhicule.',
          'Par la suite, la périodicité du renouvellement est de 3 ans (contre 2 ans pour les voitures particulières).',
          'En cas de revente à un particulier, le procès-verbal doit dater de moins de 6 mois si le véhicule a plus de 5 ans.'
        ]
      },
      {
        heading: '3. Les points inspectés lors du contrôle deux-roues',
        content: [
          'Le contrôle technique moto dure environ 30 à 45 minutes et inspecte près de 80 points :',
          '• Direction, fourche, suspensions et amortisseurs',
          '• Système de freinage (disques, plaquettes, durites, efficacité)',
          '• Éclairage, clignotants et avertisseur sonore',
          '• État et homologation des pneumatiques',
          '• Niveau sonore du silencieux d’échappement et émissions de gaz polluants',
          '• Présence et conformité de la plaque d’immatriculation et du rétroviseur'
        ]
      },
      {
        heading: '4. Combien coûte le contrôle technique moto ?',
        content: [
          'Les tarifs moyens constatés en France se situent entre 50 € et 75 € selon les régions et les équipements du centre (pont moto élévateur spécifique, sonomètre).',
          'Tous les centres auto ne sont pas encore équipés ni agréés pour les motos. Utilisez notre annuaire Ododex pour filtrer les centres habilités deux-roues près de chez vous.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Un pot d’échappement adaptable non d’origine est-il recalé ?',
        answer: 'Un pot d’échappement adaptable est accepté s’il dispose d’une homologation européenne gravée (marquage CE ou E-mark) et s’il intègre son réducteur de bruit (chicane / dB-killer).'
      },
      {
        question: 'Les motos de collection doivent-elles passer le contrôle ?',
        answer: 'Les motos en carte grise collection dont la première mise en circulation est antérieure au 1er janvier 1960 sont totalement exemptées de contrôle technique. Celles mises en circulation après 1960 doivent passer le contrôle tous les 5 ans.'
      },
      {
        question: 'Le contrôle technique est-il obligatoire pour une 50cc ?',
        answer: 'Oui, tous les cyclomoteurs 50cc (scooters et mécaboîtes) immatriculés sont soumis au contrôle technique selon le calendrier légal.'
      }
    ]
  }
];

export function getAllGuides(): GuideArticle[] {
  return GUIDES;
}

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDES.find(g => g.slug === slug);
}
