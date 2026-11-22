'use client';

import React, { useId, useMemo, useState } from 'react';
import {
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Car,
  Truck,
  Bike,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  calculateControleTechniqueDate,
  formatDateFrench,
  VehicleType
} from '@/lib/controle-technique';

export function CtDateCalculator() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('vp');
  const [isFirst, setIsFirst] = useState<boolean>(false);
  const [refDateString, setRefDateString] = useState<string>('2024-05-15');
  const vehicleTypeId = useId();
  const inspectionTypeId = useId();
  const refDateId = useId();

  const result = useMemo(() => {
    if (!refDateString) return null;
    try {
      return calculateControleTechniqueDate({
        vehicleType,
        isFirstInspection: isFirst,
        dateReference: refDateString
      });
    } catch {
      return null;
    }
  }, [vehicleType, isFirst, refDateString]);

  return (
    <div className="card border-line bg-surface p-6 rounded-2xl shadow-sm space-y-6">
      <div className="border-b border-line pb-4">
        <h2 className="text-xl font-bold text-fg flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Calculateur de date de contrôle technique
        </h2>
        <p className="text-xs text-secondary mt-1">
          Renseignez la date de votre carte grise pour connaître instantanément votre date limite et la fenêtre de passage recommandée.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type de véhicule */}
        <div>
          <label htmlFor={vehicleTypeId} className="block text-xs font-semibold text-fg uppercase tracking-wider mb-2">
            Type de véhicule
          </label>
          <select
            id={vehicleTypeId}
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="w-full bg-elevated border border-line rounded-lg px-3 py-2 text-sm text-fg focus:outline-none focus:border-accent"
          >
            <option value="vp">🚗 Voiture particulière (VP)</option>
            <option value="ctte">🚚 Utilitaire léger (CTTE / Camionnette)</option>
            <option value="moto">🏍️ Moto, scooter ou quad (Catégorie L)</option>
            <option value="collection">🎖️ Véhicule de collection</option>
            <option value="taxi_vtc">🚕 Taxi, VTC ou ambulance</option>
          </select>
        </div>

        {/* Premier contrôle ou périodique */}
        <div>
          <label htmlFor={inspectionTypeId} className="block text-xs font-semibold text-fg uppercase tracking-wider mb-2">
            Type de visite
          </label>
          <select
            id={inspectionTypeId}
            value={isFirst ? 'first' : 'periodic'}
            onChange={(e) => setIsFirst(e.target.value === 'first')}
            className="w-full bg-elevated border border-line rounded-lg px-3 py-2 text-sm text-fg focus:outline-none focus:border-accent"
          >
            <option value="first">Véhicule neuf (1er contrôle)</option>
            <option value="periodic">Contrôle périodique (renouvellement)</option>
          </select>
        </div>

        {/* Date de référence */}
        <div>
          <label htmlFor={refDateId} className="block text-xs font-semibold text-fg uppercase tracking-wider mb-2">
            {isFirst ? 'Date 1ère mise en circulation (Case B)' : 'Date dernier contrôle favorable'}
          </label>
          <input
            id={refDateId}
            type="date"
            value={refDateString}
            onChange={(e) => setRefDateString(e.target.value)}
            className="w-full bg-elevated border border-line rounded-lg px-3 py-2 text-sm text-fg focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div className="pt-2">
          {result.statut === 'expire' ? (
            <div className="p-4 rounded-xl border border-negative-line bg-negative-soft text-negative space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Contrôle technique EXPIRÉ depuis le {formatDateFrench(result.dateLimite)}</span>
              </div>
              <p className="text-xs leading-relaxed">
                Votre véhicule a dépassé la date limite de {Math.abs(result.joursRestants)} jours. Vous êtes en infraction et risquez une amende forfaitaire de 135 € en cas de contrôle de police ou gendarmerie.
              </p>
            </div>
          ) : result.statut === 'a_prevoir' ? (
            <div className="p-4 rounded-xl border border-warning-line bg-warning-soft text-warning space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Clock className="w-5 h-5 shrink-0" />
                <span>À prévoir très bientôt : date limite le {formatDateFrench(result.dateLimite)}</span>
              </div>
              <p className="text-xs leading-relaxed">
                Il vous reste <strong>{result.joursRestants} jours</strong> pour effectuer le contrôle. Prenez rendez-vous dès maintenant pour éviter l’engorgement des plannings.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-positive-line bg-positive-soft text-positive space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Contrôle technique VALIDE jusqu’au {formatDateFrench(result.dateLimite)}</span>
              </div>
              <p className="text-xs leading-relaxed">
                Votre contrôle est parfaitement en règle. Il vous reste encore <strong>{result.joursRestants} jours</strong>.
              </p>
            </div>
          )}

          {/* Détails techniques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-xs">
            <div className="p-3 bg-elevated rounded-lg border border-line">
              <span className="text-secondary block">Date limite légale</span>
              <strong className="text-fg text-sm block mt-0.5">{formatDateFrench(result.dateLimite)}</strong>
            </div>

            <div className="p-3 bg-elevated rounded-lg border border-line">
              <span className="text-secondary block">Fenêtre conseillée</span>
              <strong className="text-fg text-sm block mt-0.5">
                Dès le {formatDateFrench(result.dateFenetreOuverture)}
              </strong>
            </div>

            <div className="p-3 bg-elevated rounded-lg border border-line">
              <span className="text-secondary block">Périodicité</span>
              <strong className="text-fg text-sm block mt-0.5">{result.periodiciteLabel}</strong>
            </div>
          </div>

          {/* Notification VUL pollution intermédiaire si CTTE */}
          {result.visitePollutionRequise && result.datePollutionIntermediaire && (
            <div className="mt-3 p-3 bg-elevated border-l-4 border-accent rounded-r-lg text-xs space-y-1">
              <span className="font-bold text-fg flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-accent" />
                Rappel obligatoire pour les camionnettes (CTTE) :
              </span>
              <p className="text-secondary">
                Une visite complémentaire antipollution intermédiaire doit être passée avant le{' '}
                <strong>{formatDateFrench(result.datePollutionIntermediaire)}</strong> (entre le 11e et le 12e mois suivant le contrôle complet).
              </p>
            </div>
          )}

          {/* Sanction et conseil revente */}
          <div className="mt-4 pt-4 border-t border-line grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-secondary">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <div>
                <strong className="text-fg block">Sanction en cas de défaut :</strong>
                Amende forfaitaire de {result.amendeRisquee.montantForfaitaire} € ({result.amendeRisquee.montantMinore} € minorée), confiscation possible de la carte grise avec fiche provisoire de 7 jours (0 point retiré).
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <strong className="text-fg block">En cas de vente du véhicule :</strong>
                {result.conseilVente}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
