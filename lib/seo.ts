import type { Metadata } from 'next';
import { getDepartementLocative } from './departement-articles';
import { absoluteUrl, BASE_PATH, SITE_NAME, SITE_ORIGIN } from './site';
import type { DepartementInfo } from './centres';
import type { GuideArticle } from './guides';

/** Longueur máxima admitida del título completo (con marca). */
export const SEO_TITLE_MAX_LENGTH = 65;
/** Longueur objetivo del título completo: se prefiere la plantilla más rica que quepa aquí. */
export const SEO_TITLE_TARGET_LENGTH = 60;
export const SEO_DESCRIPTION_MIN_LENGTH = 120;
export const SEO_DESCRIPTION_MAX_LENGTH = 160;

export const SEO_TITLE_SEPARATOR = ' | ';
export const SEO_OG_IMAGE_PATH = '/brand/ododex-og.png';
export const SEO_OG_IMAGE_WIDTH = 1200;
export const SEO_OG_IMAGE_HEIGHT = 630;
export const SEO_OG_LOCALE = 'fr_FR';

const SEO_HOME_TITLE_CORE = 'Contrôle technique : prix et date limite 2026';
const SEO_HOME_DESCRIPTION =
  'Calculez la date limite de votre contrôle technique et comparez les prix de plus de 6 100 centres agréés dans les 101 départements de France.';

/** Añade la marca al final del título. Es el único punto donde se concatena « | Ododex ». */
export function seoBrandedTitle(core: string): string {
  return `${core}${SEO_TITLE_SEPARATOR}${SITE_NAME}`;
}

/**
 * Elige entre plantillas ordenadas de más a menos rica: la primera cuyo título completo cabe
 * en el objetivo; si ninguna, la primera que cabe en el máximo. Nunca trunca.
 */
export function seoPickTitle(candidates: readonly string[]): string {
  const branded = candidates.map(seoBrandedTitle);
  const chosen =
    branded.find((title) => title.length <= SEO_TITLE_TARGET_LENGTH) ??
    branded.find((title) => title.length <= SEO_TITLE_MAX_LENGTH);
  if (chosen === undefined) {
    throw new Error(`Aucun titre ne tient en ${SEO_TITLE_MAX_LENGTH} caractères : ${candidates.join(' / ')}`);
  }
  return chosen;
}

/** Elige la primera descripción cuya longitud está en el rango 120-160. */
export function seoPickDescription(candidates: readonly string[]): string {
  const chosen = candidates.find(
    (text) => text.length >= SEO_DESCRIPTION_MIN_LENGTH && text.length <= SEO_DESCRIPTION_MAX_LENGTH
  );
  if (chosen === undefined) {
    throw new Error(
      `Aucune description entre ${SEO_DESCRIPTION_MIN_LENGTH} et ${SEO_DESCRIPTION_MAX_LENGTH} caractères : ${candidates[0]}`
    );
  }
  return chosen;
}

export function seoDepartementTitle(dept: DepartementInfo): string {
  const where = getDepartementLocative(dept.code);
  return seoPickTitle([
    `Contrôle technique ${where} (${dept.code}) : prix dès ${dept.prixMin} €`,
    `Contrôle technique ${where} : prix dès ${dept.prixMin} €`,
    `Contrôle technique ${where} : prix`,
    `Contrôle technique ${where}`
  ]);
}

export function seoDepartementDescription(dept: DepartementInfo): string {
  const where = getDepartementLocative(dept.code);
  const stats = `prix moyen ${dept.prixMoyen} €, contre-visite ${dept.prixContreVisiteMoyen} €`;
  return seoPickDescription([
    `Comparez ${dept.totalCentres} centres de contrôle technique ${where} (${dept.code}) : ${stats}, adresses, téléphones et carte.`,
    `Comparez ${dept.totalCentres} centres de contrôle technique ${where} : ${stats}, adresses et carte interactive.`,
    `Contrôle technique ${where} : ${dept.totalCentres} centres comparés, ${stats}, adresses et carte interactive.`,
    `Comparez les prix du contrôle technique ${where} : ${dept.totalCentres} centres agréés, ${stats}, adresses et carte.`
  ]);
}

export function seoGuideTitle(guide: Pick<GuideArticle, 'metaTitle'>): string {
  return seoPickTitle([guide.metaTitle]);
}

export function seoGuideDescription(guide: Pick<GuideArticle, 'metaDescription'>): string {
  return seoPickDescription([guide.metaDescription]);
}

/** Open Graph y Twitter con la imagen compartida; cada página debe incluirlos al redefinir `openGraph`. */
export function seoSocialMetadata(title: string, description: string, path: string): Pick<Metadata, 'openGraph' | 'twitter'> {
  const images = [
    {
      url: absoluteUrl(SEO_OG_IMAGE_PATH),
      width: SEO_OG_IMAGE_WIDTH,
      height: SEO_OG_IMAGE_HEIGHT,
      alt: SITE_NAME
    }
  ];
  return {
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: SEO_OG_LOCALE,
      type: 'website',
      images
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => image.url)
    }
  };
}

function seoPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    ...seoSocialMetadata(title, description, path)
  };
}

export function seoRootMetadata(): Metadata {
  const title = seoPickTitle([SEO_HOME_TITLE_CORE]);
  const description = seoPickDescription([SEO_HOME_DESCRIPTION]);
  return {
    ...seoPageMetadata(title, description, '/'),
    metadataBase: new URL(SITE_ORIGIN),
    icons: { icon: `${BASE_PATH}/icon.svg` }
  };
}

export function seoDepartementMetadata(dept: DepartementInfo): Metadata {
  return seoPageMetadata(seoDepartementTitle(dept), seoDepartementDescription(dept), `/departement/${dept.code}`);
}

export function seoGuideMetadata(guide: GuideArticle): Metadata {
  return seoPageMetadata(seoGuideTitle(guide), seoGuideDescription(guide), `/guide/${guide.slug}`);
}
