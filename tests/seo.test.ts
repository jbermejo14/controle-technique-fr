import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import { getAllDepartements, getDepartementByCode } from '../lib/centres';
import { getAllGuides } from '../lib/guides';
import { getDepartementLocative, getDepartementLocativeCodes } from '../lib/departement-articles';
import {
  SEO_DESCRIPTION_MAX_LENGTH,
  SEO_DESCRIPTION_MIN_LENGTH,
  SEO_OG_IMAGE_HEIGHT,
  SEO_OG_IMAGE_PATH,
  SEO_OG_IMAGE_WIDTH,
  SEO_TITLE_MAX_LENGTH,
  SEO_TITLE_TARGET_LENGTH,
  seoDepartementMetadata,
  seoDepartementTitle,
  seoGuideMetadata,
  seoRootMetadata
} from '../lib/seo';
import { absoluteUrl } from '../lib/site';
import { metadata as confidentialiteMetadata } from '../app/confidentialite/page';
import { metadata as cookiesMetadata } from '../app/cookies/page';
import { metadata as mentionsMetadata } from '../app/mentions-legales/page';

const BRAND = 'Ododex';
const BRAND_SUFFIX = ` | ${BRAND}`;

interface PageCase {
  label: string;
  metadata: Metadata;
}

/** Reproduce las rutas de `generateStaticParams`, la home y las páginas legales con sus metadatos reales. */
function collectPages(): PageCase[] {
  const pages: PageCase[] = [{ label: 'accueil', metadata: seoRootMetadata() }];
  for (const dept of getAllDepartements()) {
    pages.push({ label: `departement/${dept.code}`, metadata: seoDepartementMetadata(dept) });
  }
  for (const guide of getAllGuides()) {
    pages.push({ label: `guide/${guide.slug}`, metadata: seoGuideMetadata(guide) });
  }
  pages.push(
    { label: 'mentions-legales', metadata: mentionsMetadata },
    { label: 'confidentialite', metadata: confidentialiteMetadata },
    { label: 'cookies', metadata: cookiesMetadata }
  );
  return pages;
}

function titleOf(metadata: Metadata): string {
  assert.equal(typeof metadata.title, 'string');
  return metadata.title as string;
}

describe('SEO : titres et descriptions', () => {
  it('couvre accueil, départements, guides et pages légales', () => {
    assert.equal(collectPages().length, 1 + getAllDepartements().length + getAllGuides().length + 3);
  });

  it('chaque titre complet fait 60 caractères au plus (maximum toléré : 65), avec la marque une seule fois', () => {
    for (const { label, metadata } of collectPages()) {
      const title = titleOf(metadata);
      assert.ok(title.length <= SEO_TITLE_TARGET_LENGTH, `${label} : ${title.length} car. « ${title} »`);
      assert.ok(title.endsWith(BRAND_SUFFIX), `${label} : marque absente`);
      assert.ok(!title.includes(`${BRAND_SUFFIX}${BRAND_SUFFIX}`), `${label} : marque répétée`);
      assert.equal(title.split(BRAND).length - 1, 1, `${label} : marque répétée`);
    }
  });

  it('chaque description fait entre 120 et 160 caractères', () => {
    for (const { label, metadata } of collectPages()) {
      const length = (metadata.description ?? '').length;
      assert.ok(
        length >= SEO_DESCRIPTION_MIN_LENGTH && length <= SEO_DESCRIPTION_MAX_LENGTH,
        `${label} : ${length} car.`
      );
    }
  });

  it('titres et descriptions sont uniques', () => {
    const pages = collectPages();
    assert.equal(new Set(pages.map((page) => page.metadata.title)).size, pages.length);
    assert.equal(new Set(pages.map((page) => page.metadata.description)).size, pages.length);
  });

  it('aucune page ne se présente comme officielle', () => {
    for (const { label, metadata } of collectPages()) {
      assert.doesNotMatch(`${metadata.title} ${metadata.description}`, /officiel/i, label);
    }
  });
});

describe('SEO : articles des départements', () => {
  it('la table couvre exactement les 101 départements', () => {
    const codes = getAllDepartements().map((dept) => dept.code).sort();
    assert.equal(codes.length, 101);
    assert.deepEqual(getDepartementLocativeCodes().sort(), codes);
  });

  const expectations: Array<[string, string]> = [
    ['01', "dans l'Ain"],
    ['69', 'dans le Rhône'],
    ['13', 'dans les Bouches-du-Rhône'],
    ['75', 'à Paris'],
    ['2A', 'en Corse-du-Sud'],
    ['92', 'dans les Hauts-de-Seine']
  ];
  for (const [code, locative] of expectations) {
    it(`le titre du département ${code} contient « ${locative} »`, () => {
      const dept = getDepartementByCode(code);
      assert.ok(dept);
      assert.equal(getDepartementLocative(code), locative);
      const title = seoDepartementTitle(dept);
      assert.ok(title.startsWith(`Contrôle technique ${locative}`), title);
    });
  }

  it("le titre de l'Ain reprend le modèle complet", () => {
    const dept = getDepartementByCode('01');
    assert.ok(dept);
    assert.equal(seoDepartementTitle(dept), `Contrôle technique dans l'Ain (01) : prix dès ${dept.prixMin} € | Ododex`);
  });

  it('les titres de département tiennent dans l’objectif de 60 caractères', () => {
    for (const dept of getAllDepartements()) {
      const title = seoDepartementTitle(dept);
      assert.ok(title.length <= SEO_TITLE_TARGET_LENGTH, `${title.length} : ${title}`);
    }
  });

  it('refuse un code absent de la table', () => {
    assert.throws(() => getDepartementLocative('99'), /lib\/departement-articles\.ts/);
  });
});

describe('SEO : image Open Graph', () => {
  const imageUrl = absoluteUrl(SEO_OG_IMAGE_PATH);

  it('le fichier existe dans public/brand', () => {
    const file = join(process.cwd(), 'public', 'brand', 'ododex-og.png');
    assert.ok(existsSync(file));
    assert.ok(statSync(file).size > 0);
  });

  it('chaque page déclare l’image Open Graph et Twitter avec une URL absolue', () => {
    assert.match(imageUrl, /^https:\/\/.+\/brand\/ododex-og\.png$/);
    for (const { label, metadata } of collectPages()) {
      const og = metadata.openGraph as { images?: Array<{ url: string; width: number; height: number }> };
      assert.equal(og.images?.[0]?.url, imageUrl, label);
      assert.equal(og.images?.[0]?.width, SEO_OG_IMAGE_WIDTH, label);
      assert.equal(og.images?.[0]?.height, SEO_OG_IMAGE_HEIGHT, label);
      const twitter = metadata.twitter as { card?: string; images?: string[] };
      assert.equal(twitter.card, 'summary_large_image', label);
      assert.deepEqual(twitter.images, [imageUrl], label);
    }
  });

  it('le layout racine utilise la configuration SEO centralisée', () => {
    const layout = readFileSync(join(process.cwd(), 'app', 'layout.tsx'), 'utf8');
    assert.match(layout, /seoRootMetadata\(\)/);
  });
});
