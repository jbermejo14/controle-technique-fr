import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllDepartements,
  getDepartementByCode,
  getCentresByDepartement
} from '@/lib/centres';
import { CentreMap } from '@/components/CentreMap';
import { CentreTable } from '@/components/CentreTable';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { absoluteUrl } from '@/lib/site';
import { getDepartementLocative } from '@/lib/departement-articles';
import { seoDepartementMetadata } from '@/lib/seo';
import {
  MapPin,
  TrendingDown,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: Promise<{ code: string }>;
}

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const departements = getAllDepartements();
  return departements.map((d) => ({
    code: d.code,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const dept = getDepartementByCode(code);
  if (!dept) return {};

  return seoDepartementMetadata(dept);
}

export default async function DepartementPage({ params }: Props) {
  const { code } = await params;
  const dept = getDepartementByCode(code);
  if (!dept) notFound();

  const where = getDepartementLocative(dept.code);
  const centres = getCentresByDepartement(code);
  const allDepts = getAllDepartements();
  const sameRegionDepts = allDepts
    .filter((d) => d.regionSlug === dept.regionSlug && d.code !== dept.code)
    .slice(0, 6);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Centres de contrôle technique ${where} (${dept.code})`,
    numberOfItems: centres.length,
    itemListElement: centres.slice(0, 20).map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'AutoRepair',
        name: c.nom,
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.adresse,
          postalCode: c.cp,
          addressLocality: c.ville,
          addressCountry: 'FR'
        },
        telephone: c.tel || undefined,
        url: c.url || undefined,
        priceRange: `${c.prixBase} €`
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="space-y-10">
        {/* Fil d'Ariane */}
        <Breadcrumbs
          items={[
            { name: 'Accueil', url: '/' },
            { name: 'Départements', url: '/#annuaire' },
            { name: `${dept.name} (${dept.code})`, url: `/departement/${dept.code}` },
          ]}
        />

        {/* En-tête Département */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <MapPin className="w-4 h-4" />
            Département {dept.code} · Région {dept.region}
          </div>

          <h1 className="text-3xl font-extrabold text-fg tracking-tight">
            Contrôle technique {where} ({dept.code}) : prix et centres agréés
          </h1>

          <p className="text-sm text-secondary leading-relaxed max-w-3xl">
            Retrouvez la liste complète et à jour des <strong>{dept.totalCentres} centres agréés</strong> par l’État {where}. Comparez les tarifs transmis à la DGCCRF pour votre voiture (essence, diesel, hybride, électrique) ou deux-roues et réservez au meilleur prix.
          </p>
        </div>

        {/* Chiffres clés du département */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card p-4 border-line bg-surface text-center">
            <span className="text-xs text-secondary block font-medium">Prix le plus bas</span>
            <strong className="text-2xl sm:text-3xl font-extrabold text-positive block mt-1">
              {dept.prixMin} €
            </strong>
            <span className="text-[11px] text-muted mt-1 block">Tarif le plus économique</span>
          </div>

          <div className="card p-4 border-line bg-surface text-center">
            <span className="text-xs text-secondary block font-medium">Prix moyen</span>
            <strong className="text-2xl sm:text-3xl font-extrabold text-accent block mt-1">
              {dept.prixMoyen} €
            </strong>
            <span className="text-[11px] text-muted mt-1 block">Moyenne départementale</span>
          </div>

          <div className="card p-4 border-line bg-surface text-center">
            <span className="text-xs text-secondary block font-medium">Contre-visite moy.</span>
            <strong className="text-2xl sm:text-3xl font-extrabold text-fg block mt-1">
              {dept.prixContreVisiteMoyen} €
            </strong>
            <span className="text-[11px] text-muted mt-1 block">En cas de défaillance majeure</span>
          </div>

          <div className="card p-4 border-line bg-surface text-center">
            <span className="text-xs text-secondary block font-medium">Nombre de centres</span>
            <strong className="text-2xl sm:text-3xl font-extrabold text-fg block mt-1">
              {dept.totalCentres}
            </strong>
            <span className="text-[11px] text-muted mt-1 block">Agréés {where}</span>
          </div>
        </div>

        {/* Villes principales avec le plus de centres */}
        {dept.topVilles && dept.topVilles.length > 0 && (
          <div className="card p-4 border-line bg-surface space-y-2">
            <span className="text-xs font-bold text-fg flex items-center gap-1.5 uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-accent" />
              Principales communes équipées {where} :
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {dept.topVilles.map(v => (
                <span
                  key={v.ville}
                  className="px-2.5 py-1 rounded-md bg-elevated border border-line text-secondary"
                >
                  {v.ville} <strong className="text-fg font-semibold">({v.count} centres)</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Carte interactive des centres */}
        {centres.length > 0 && (
          <section className="space-y-4">
            <div className="border-b border-line pb-2 flex items-center justify-between">
              <h2 className="text-xl font-bold text-fg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Carte interactive des centres de contrôle {where}
              </h2>
            </div>
            <CentreMap centres={centres} departementName={dept.name} />
          </section>
        )}

        {/* Publicité 1 */}
        <AdSlot />

        {/* Annuaire / Tableau des centres */}
        <section className="space-y-4">
          <div className="border-b border-line pb-2">
            <h2 className="text-xl font-bold text-fg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              Annuaire complet des centres agréés ({centres.length})
            </h2>
            <p className="text-xs text-secondary mt-1">
              Filtrez par motorisation ou recherchez directement le nom de votre commune pour trouver les créneaux et tarifs les plus avantageux.
            </p>
          </div>

          <CentreTable centres={centres} deptName={dept.name} />
        </section>

        {/* Conseils spécifiques */}
        <section className="card p-6 border-line bg-surface space-y-4">
          <h2 className="text-lg font-bold text-fg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Comment bien passer son contrôle technique {where} ?
          </h2>
          <div className="text-xs text-secondary space-y-3 leading-relaxed">
            <p>
              • <strong>Prenez rendez-vous en ligne</strong> : plusieurs enseignes {where} proposent des remises jusqu’à 15 € sur les créneaux matinaux du mardi au jeudi.
            </p>
            <p>
              • <strong>Vérifiez vos ampoules et votre pression</strong> : un tiers des contre-visites en France est provoqué par une simple ampoule défaillante ou un pneu sous-gonflé. Vous économiserez ainsi les {dept.prixContreVisiteMoyen} € moyens de contre-visite.
            </p>
            <p>
              • <strong>N’attendez pas le dernier jour</strong> : en cas de contre-visite imposée, vous disposez d’un délai légal de 2 mois pour effectuer les réparations. Si votre contrôle expire entre-temps, vous êtes passible de l’amende de 135 €.
            </p>
          </div>
        </section>

        {/* Publicité 2 */}
        <AdSlot />

        {/* Départements de la même région */}
        {sameRegionDepts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-fg">
              Centres de contrôle technique dans les départements voisins ({dept.region})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sameRegionDepts.map((d) => (
                <Link
                  key={d.code}
                  href={`/departement/${d.code}`}
                  className="card p-3 border-line bg-surface hover:border-accent/60 transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-fg block">{d.name} ({d.code})</span>
                    <span className="text-[11px] text-muted">Moy. {d.prixMoyen} €</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-secondary" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
