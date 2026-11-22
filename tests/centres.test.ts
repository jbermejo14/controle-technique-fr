import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getAllDepartements,
  getDepartementByCode,
  getCentresByDepartement,
  getNationalStats
} from '../lib/centres';

describe('Base de données des centres de Contrôle Technique', () => {
  it('charge les 101 départements français avec leurs statistiques', () => {
    const depts = getAllDepartements();
    assert.equal(depts.length, 101);

    const paris = getDepartementByCode('75');
    assert.ok(paris);
    assert.equal(paris?.name, 'Paris');
    assert.ok(paris?.totalCentres && paris.totalCentres > 0);
    assert.ok(paris?.prixMoyen && paris.prixMoyen > 70);

    const rhone = getDepartementByCode('69');
    assert.ok(rhone);
    assert.equal(rhone?.name, 'Rhône');

    const corse = getDepartementByCode('2A');
    assert.ok(corse);
    assert.equal(corse?.name, 'Corse-du-Sud');
  });

  it('charge les statistiques nationales correctement', () => {
    const stats = getNationalStats();
    assert.ok(stats.totalCentres > 5000);
    assert.ok(stats.prixMoyen >= 70 && stats.prixMoyen <= 100);
    assert.ok(stats.prixMin > 30 && stats.prixMin < 70);
    assert.ok(stats.prixMax > 100);
    assert.equal(stats.topMoinsChers.length, 5);
    assert.equal(stats.topPlusChers.length, 5);
  });

  it('charge les centres d’un département spécifique et vérifie leurs données', () => {
    const centres75 = getCentresByDepartement('75');
    assert.ok(centres75.length > 0);

    const first = centres75[0];
    assert.ok(first.id);
    assert.ok(first.nom);
    assert.ok(first.adresse);
    assert.ok(first.cp.startsWith('75'));
    assert.ok(first.prixBase > 0);
    assert.equal(first.dep, '75');
  });
});
