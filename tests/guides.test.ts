import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getAllGuides, getGuideBySlug } from '../lib/guides';

describe('Guides pratiques du contrôle technique', () => {
  it('contient les 4 guides complets', () => {
    const guides = getAllGuides();
    assert.equal(guides.length, 4);
  });

  it('chaque guide a un titre, du contenu et des FAQs valides', () => {
    const guides = getAllGuides();
    for (const guide of guides) {
      assert.ok(guide.slug.length > 0);
      assert.ok(guide.title.length > 10);
      assert.ok(guide.sections.length >= 3);
      assert.ok(guide.faqs.length >= 2);
    }
  });

  it('récupère un guide par son slug', () => {
    const g = getGuideBySlug('delais-calendrier-controle-technique');
    assert.ok(g);
    assert.match(g?.title || '', /Délais et calendrier/);
  });
});

describe('metaTitle del guide sur la contre-visite', () => {
  it('utilise la formulation naturelle « Éviter la contre-visite … »', () => {
    const guide = getGuideBySlug('defaillances-contre-visite-eviter');
    assert.equal(guide?.metaTitle, 'Éviter la contre-visite du contrôle technique');
  });
});
