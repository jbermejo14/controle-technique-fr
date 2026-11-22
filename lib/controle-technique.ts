export type VehicleType = 'vp' | 'ctte' | 'moto' | 'collection' | 'taxi_vtc';

export interface CtCalculationInput {
  vehicleType: VehicleType;
  isFirstInspection: boolean;
  dateReference: string; // YYYY-MM-DD (date 1ère immatriculation si 1ère visite, ou date dernière visite favorable)
  todayOverride?: string; // pour tests reproductibles
}

export interface CtCalculationResult {
  dateLimite: string; // YYYY-MM-DD
  dateFenetreOuverture: string; // YYYY-MM-DD (quand on peut commencer à le passer)
  joursRestants: number;
  statut: 'valide' | 'a_prevoir' | 'expire';
  periodiciteLabel: string;
  regleExplication: string;
  visitePollutionRequise?: boolean;
  datePollutionIntermediaire?: string;
  amendeRisquee: {
    montantForfaitaire: number;
    montantMinore: number;
    montantMajore: number;
    points: number;
    immobilisation: boolean;
  };
  conseilVente: string;
}

export function calculateControleTechniqueDate(input: CtCalculationInput): CtCalculationResult {
  const { vehicleType, isFirstInspection, dateReference, todayOverride } = input;
  const refDate = new Date(`${dateReference}T00:00:00Z`);
  const today = todayOverride ? new Date(`${todayOverride}T00:00:00Z`) : new Date();

  if (isNaN(refDate.getTime())) {
    throw new Error('Date de référence invalide');
  }

  const limitDate = new Date(refDate.getTime());
  let windowStartDate = new Date(refDate.getTime());
  let periodiciteLabel = '';
  let regleExplication = '';
  let visitePollutionRequise = false;
  let datePollutionIntermediaire: string | undefined;

  switch (vehicleType) {
    case 'vp': {
      if (isFirstInspection) {
        // Premier contrôle : exactement dans les 6 mois précédant le 4ème anniversaire
        limitDate.setFullYear(limitDate.getFullYear() + 4);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 6);
        periodiciteLabel = '4 ans après la 1ère immatriculation, puis tous les 2 ans';
        regleExplication = 'Le premier contrôle technique d’une voiture particulière doit être effectué dans les 6 mois précédant le 4e anniversaire de sa première mise en circulation (Case B de la carte grise).';
      } else {
        // Contrôle périodique : 2 ans après le précédent
        limitDate.setFullYear(limitDate.getFullYear() + 2);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 2);
        periodiciteLabel = 'Tous les 2 ans';
        regleExplication = 'Pour les voitures de plus de 4 ans, le contrôle technique périodique est valide 2 ans à compter de la date du dernier contrôle favorable.';
      }
      break;
    }

    case 'ctte': {
      // Véhicule utilitaire léger (VUL / camionnette)
      if (isFirstInspection) {
        limitDate.setFullYear(limitDate.getFullYear() + 4);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 6);
        periodiciteLabel = '4 ans après 1ère immatriculation, puis tous les 2 ans avec visite pollution annuelle';
        regleExplication = 'Premier contrôle complet aux 4 ans du véhicule, suivi d’une visite complémentaire pollution entre le 11e et le 12e mois suivant chaque contrôle technique.';
      } else {
        limitDate.setFullYear(limitDate.getFullYear() + 2);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 2);

        // Visite intermédiaire pollution à 1 an
        const pollutionDate = new Date(refDate.getTime());
        pollutionDate.setFullYear(pollutionDate.getFullYear() + 1);
        visitePollutionRequise = true;
        datePollutionIntermediaire = pollutionDate.toISOString().split('T')[0];

        periodiciteLabel = 'Contrôle complet tous les 2 ans + Contrôle pollution intermédiaire annuel';
        regleExplication = 'Les camionnettes (CTTE) doivent passer une visite complémentaire pollution entre le 11e et le 12e mois suivant chaque contrôle technique complet.';
      }
      break;
    }

    case 'moto': {
      // Véhicules de catégorie L (2-3 roues, quad, voiturettes sans permis)
      if (isFirstInspection) {
        limitDate.setFullYear(limitDate.getFullYear() + 5);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 6);
        periodiciteLabel = '5 ans après 1ère immatriculation, puis tous les 3 ans';
        regleExplication = 'Le contrôle technique des deux-roues et de la catégorie L doit être passé aux 5 ans du véhicule, puis renouvelé tous les 3 ans.';
      } else {
        limitDate.setFullYear(limitDate.getFullYear() + 3);
        windowStartDate = new Date(limitDate.getTime());
        windowStartDate.setMonth(windowStartDate.getMonth() - 2);
        periodiciteLabel = 'Tous les 3 ans';
        regleExplication = 'Le contrôle technique moto et catégorie L est valable 3 ans.';
      }
      break;
    }

    case 'collection': {
      // Véhicule avec mention "Collection" sur la carte grise
      limitDate.setFullYear(limitDate.getFullYear() + 5);
      windowStartDate = new Date(limitDate.getTime());
      windowStartDate.setMonth(windowStartDate.getMonth() - 2);
      periodiciteLabel = 'Tous les 5 ans';
      regleExplication = 'Pour les véhicules disposant d’un certificat d’immatriculation avec mention « collection » (PTAC ≤ 3,5 t), le contrôle technique a une validité de 5 ans. Les véhicules mis en circulation avant 1960 sont totalement dispensés de contrôle.';
      break;
    }

    case 'taxi_vtc': {
      // Taxis, VTC, ambulances : visite annuelle
      limitDate.setFullYear(limitDate.getFullYear() + 1);
      windowStartDate = new Date(limitDate.getTime());
      windowStartDate.setMonth(windowStartDate.getMonth() - 2);
      periodiciteLabel = 'Tous les ans';
      regleExplication = 'Les véhicules de transport rémunéré de personnes (Taxi, VTC, ambulance) sont soumis à un contrôle technique obligatoire chaque année (dès le 1er anniversaire).';
      break;
    }
  }

  const diffMs = limitDate.getTime() - today.getTime();
  const joursRestants = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  let statut: 'valide' | 'a_prevoir' | 'expire' = 'valide';
  if (joursRestants < 0) {
    statut = 'expire';
  } else if (joursRestants <= 60) {
    statut = 'a_prevoir';
  }

  return {
    dateLimite: limitDate.toISOString().split('T')[0],
    dateFenetreOuverture: windowStartDate.toISOString().split('T')[0],
    joursRestants,
    statut,
    periodiciteLabel,
    regleExplication,
    visitePollutionRequise,
    datePollutionIntermediaire,
    amendeRisquee: {
      montantForfaitaire: 135,
      montantMinore: 90,
      montantMajore: 375,
      points: 0,
      immobilisation: true
    },
    conseilVente: 'En cas de vente du véhicule à un particulier de plus de 4 ans, le procès-verbal de contrôle technique doit dater de moins de 6 mois (ou moins de 2 mois si une contre-visite est prescrite).'
  };
}

export function formatDateFrench(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;
  const months = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  const mIndex = parseInt(month, 10) - 1;
  return `${parseInt(day, 10)} ${months[mIndex] || month} ${year}`;
}
