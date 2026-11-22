import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateControleTechniqueDate,
  formatDateFrench
} from '../lib/controle-technique';

describe('Calculateur de Contrôle Technique', () => {
  it('calcule la date limite du premier contrôle pour une voiture neuve (4 ans)', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'vp',
      isFirstInspection: true,
      dateReference: '2022-05-15',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2026-05-15');
    assert.equal(res.dateFenetreOuverture, '2025-11-15');
    assert.equal(res.statut, 'valide');
    assert.ok(res.joursRestants > 100);
    assert.equal(res.amendeRisquee.montantForfaitaire, 135);
    assert.equal(res.amendeRisquee.points, 0);
  });

  it('calcule la date d’un contrôle périodique voiture particulière (2 ans)', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'vp',
      isFirstInspection: false,
      dateReference: '2024-06-10',
      todayOverride: '2026-05-01'
    });

    assert.equal(res.dateLimite, '2026-06-10');
    assert.equal(res.statut, 'a_prevoir'); // Moins de 60 jours
    assert.ok(res.joursRestants <= 60 && res.joursRestants > 0);
  });

  it('détecte un contrôle technique expiré', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'vp',
      isFirstInspection: false,
      dateReference: '2023-01-01',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2025-01-01');
    assert.equal(res.statut, 'expire');
    assert.ok(res.joursRestants < 0);
  });

  it('calcule le contrôle complet et la visite pollution pour un utilitaire léger (CTTE)', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'ctte',
      isFirstInspection: false,
      dateReference: '2025-03-01',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2027-03-01');
    assert.equal(res.visitePollutionRequise, true);
    assert.equal(res.datePollutionIntermediaire, '2026-03-01');
  });

  it('calcule la périodicité de 3 ans pour une moto (catégorie L)', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'moto',
      isFirstInspection: false,
      dateReference: '2024-04-15',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2027-04-15');
    assert.match(res.periodiciteLabel, /3 ans/);
  });

  it('calcule la périodicité de 5 ans pour un véhicule de collection', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'collection',
      isFirstInspection: false,
      dateReference: '2022-01-01',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2027-01-01');
    assert.match(res.periodiciteLabel, /5 ans/);
  });

  it('calcule la périodicité de 1 an pour un taxi / VTC', () => {
    const res = calculateControleTechniqueDate({
      vehicleType: 'taxi_vtc',
      isFirstInspection: false,
      dateReference: '2025-04-01',
      todayOverride: '2026-01-01'
    });

    assert.equal(res.dateLimite, '2026-04-01');
    assert.match(res.periodiciteLabel, /Tous les ans/);
  });

  it('formate correctement les dates en français', () => {
    assert.equal(formatDateFrench('2026-05-15'), '15 mai 2026');
    assert.equal(formatDateFrench('2026-01-01'), '1 janvier 2026');
    assert.equal(formatDateFrench('2026-12-31'), '31 décembre 2026');
  });
});
