import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  TrendingDown,
  Clock,
  Car,
  MapPin,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Award,
  AlertCircle
} from 'lucide-react';
import { getAllDepartements, getNationalStats } from '@/lib/centres';
import { getAllGuides } from '@/lib/guides';
import { CtDateCalculator } from '@/components/CtDateCalculator';
import { DeptSearchList } from '@/components/DeptSearchList';
import { AdSlot } from '@/components/AdSlot';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function HomePage() {
  const departements = getAllDepartements();
  const stats = getNationalStats();
  const guides = getAllGuides();

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ododex Contrôle Technique',
    url: absoluteUrl('/'),
    description: 'Comparateur de prix du contrôle technique en France (données DGCCRF) et simulateur de date d’échéance.'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quand faut-il passer le premier contrôle technique d’une voiture neuve ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le premier contrôle technique doit être effectué au cours des 6 mois précédant le 4e anniversaire de la première mise en circulation du véhicule (date indiquée à la case B de la carte grise).'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la périodicité du contrôle technique après 4 ans ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pour les voitures particulières de plus de 4 ans, le contrôle technique doit être renouvelé tous les 2 ans. Pour les utilitaires légers (CTTE), une visite complémentaire pollution est exigée entre le 11e et le 12e mois suivant chaque contrôle.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quel est le prix moyen d’un contrôle technique en France ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `D’après les données officielles de la DGCCRF, le prix moyen national s’établit à ${stats.prixMoyen} €, avec des tarifs débutant dès ${stats.prixMin} € et pouvant atteindre ${stats.prixMax} € selon les centres et les départements.`
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est l’amende en cas de contrôle technique périmé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rouler avec un contrôle technique dépassé est puni d’une amende forfaitaire de 135 € (minorée à 90 €). Les forces de l’ordre peuvent également immobiliser le véhicule et retenir la carte grise pendant 7 jours.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Données DGCCRF · {stats.totalCentres.toLocaleString('fr-FR')} centres agréés
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight">
            Contrôle Technique : Prix des Centres & Calculateur de Date Limite
          </h1>

          <p className="text-base text-secondary leading-relaxed">
            Calculez la date limite exacte de votre prochain contrôle technique à partir de votre carte grise et comparez les tarifs en vigueur dans votre département pour économiser jusqu’à 40 %.
          </p>
        </div>

        {/* Calculateur de date d'échéance */}
        <section aria-label="Simulateur d'échéance">
          <CtDateCalculator />
        </section>

        {/* Publicité 1 */}
        <AdSlot />

        {/* Statistiques nationales */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="text-2xl font-bold text-fg flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-accent" />
              Observatoire national des tarifs 2026
            </h2>
            <p className="text-xs text-secondary mt-1">
              Baromètre des prix constatés auprès des centres agréés en France métropolitaine et d’outre-mer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card p-4 border-line bg-surface text-center">
              <span className="text-xs text-secondary block font-medium">Prix moyen France</span>
              <strong className="text-2xl sm:text-3xl font-extrabold text-accent block mt-1">
                {stats.prixMoyen} €
              </strong>
              <span className="text-[11px] text-muted mt-1 block">Voiture essence / diesel</span>
            </div>

            <div className="card p-4 border-line bg-surface text-center">
              <span className="text-xs text-secondary block font-medium">Prix le plus bas</span>
              <strong className="text-2xl sm:text-3xl font-extrabold text-positive block mt-1">
                {stats.prixMin} €
              </strong>
              <span className="text-[11px] text-muted mt-1 block">Tarif plancher observé</span>
            </div>

            <div className="card p-4 border-line bg-surface text-center">
              <span className="text-xs text-secondary block font-medium">Contre-visite moyenne</span>
              <strong className="text-2xl sm:text-3xl font-extrabold text-fg block mt-1">
                {stats.prixContreVisiteMoyen} €
              </strong>
              <span className="text-[11px] text-muted mt-1 block">Parfois gratuite selon centres</span>
            </div>

            <div className="card p-4 border-line bg-surface text-center">
              <span className="text-xs text-secondary block font-medium">Centres référencés</span>
              <strong className="text-2xl sm:text-3xl font-extrabold text-fg block mt-1">
                {stats.totalCentres.toLocaleString('fr-FR')}
              </strong>
              <span className="text-[11px] text-muted mt-1 block">101 départements</span>
            </div>
          </div>

          {/* Top moins chers vs Top plus chers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card p-4 border-line bg-surface space-y-3">
              <h3 className="text-sm font-bold text-fg flex items-center gap-1.5 text-positive">
                <Award className="w-4 h-4 text-positive" />
                Top 5 des départements les moins chers
              </h3>
              <ul className="divide-y divide-line text-xs">
                {stats.topMoinsChers.map((d, idx) => (
                  <li key={d.code} className="py-2 flex items-center justify-between">
                    <Link href={`/departement/${d.code}`} className="font-medium text-fg hover:text-accent">
                      <span className="text-muted mr-2">#{idx + 1}</span>
                      {d.name} ({d.code})
                    </Link>
                    <span className="font-bold text-positive">{d.prixMoyen} € en moyenne</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4 border-line bg-surface space-y-3">
              <h3 className="text-sm font-bold text-fg flex items-center gap-1.5 text-warning">
                <AlertCircle className="w-4 h-4 text-warning" />
                Top 5 des départements les plus chers
              </h3>
              <ul className="divide-y divide-line text-xs">
                {stats.topPlusChers.map((d, idx) => (
                  <li key={d.code} className="py-2 flex items-center justify-between">
                    <Link href={`/departement/${d.code}`} className="font-medium text-fg hover:text-accent">
                      <span className="text-muted mr-2">#{idx + 1}</span>
                      {d.name} ({d.code})
                    </Link>
                    <span className="font-bold text-warning">{d.prixMoyen} € en moyenne</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Annuaire des 101 départements */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="text-2xl font-bold text-fg flex items-center gap-2">
              <MapPin className="w-6 h-6 text-accent" />
              Trouver un centre de contrôle technique par département
            </h2>
            <p className="text-xs text-secondary mt-1">
              Consultez les prix, adresses, coordonnées GPS et numéros de téléphone des centres agréés près de chez vous.
            </p>
          </div>

          <DeptSearchList departements={departements} />
        </section>

        {/* Publicité 2 */}
        <AdSlot />

        {/* Guides pratiques */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="text-2xl font-bold text-fg flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-accent" />
              Guides pratiques du contrôle technique
            </h2>
            <p className="text-xs text-secondary mt-1">
              Tout comprendre sur les réglementations, les points de contrôle et les astuces pour réussir votre visite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map(guide => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}`}
                className="card p-5 border-line bg-surface hover:border-accent/60 transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-muted">
                    <span>Lecture {guide.readTime}</span>
                    <span>·</span>
                    <span>Mis à jour en 2026</span>
                  </div>
                  <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-secondary line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-accent font-semibold">
                  <span>Lire le dossier complet</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Foire Aux Questions (FAQ) */}
        <section className="space-y-6">
          <div className="border-b border-line pb-3">
            <h2 className="text-2xl font-bold text-fg flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" />
              Questions fréquentes sur le contrôle technique
            </h2>
            <p className="text-xs text-secondary mt-1">
              Les réponses précises aux questions les plus posées par les automobilistes.
            </p>
          </div>

          <div className="space-y-3">
            <details className="card p-4 border-line bg-surface rounded-xl group">
              <summary className="font-bold text-sm text-fg cursor-pointer flex items-center justify-between list-none">
                <span>Quand faut-il passer le premier contrôle technique d’un véhicule neuf ?</span>
                <ChevronRight className="w-4 h-4 text-secondary transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-line/60 mt-3 space-y-2">
                <p>
                  Pour un véhicule particulier neuf (VP) ou utilitaire léger (CTTE), le premier contrôle technique doit être effectué au cours des <strong>6 mois précédant le 4e anniversaire</strong> de sa première mise en circulation.
                </p>
                <p>
                  La date de référence figure à la <strong>ligne (B)</strong> de votre certificat d’immatriculation (carte grise). Aucun rappel ne vous est envoyé par l’administration : il vous incombe de prendre rendez-vous avant la date fatidique.
                </p>
              </div>
            </details>

            <details className="card p-4 border-line bg-surface rounded-xl group">
              <summary className="font-bold text-sm text-fg cursor-pointer flex items-center justify-between list-none">
                <span>Quelle est la périodicité du contrôle technique après 4 ans ?</span>
                <ChevronRight className="w-4 h-4 text-secondary transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-line/60 mt-3 space-y-2">
                <p>
                  Une fois le premier contrôle réalisé, le contrôle technique doit être renouvelé <strong>tous les 2 ans</strong> pour une voiture particulière.
                </p>
                <p>
                  Pour une camionnette (CTTE), un contrôle technique complet est également requis tous les 2 ans, mais il est complété par une <strong>visite antipollution obligatoire</strong> entre le 11e et le 12e mois suivant chaque contrôle.
                </p>
              </div>
            </details>

            <details className="card p-4 border-line bg-surface rounded-xl group">
              <summary className="font-bold text-sm text-fg cursor-pointer flex items-center justify-between list-none">
                <span>Quel est le tarif moyen et pourquoi de tels écarts de prix ?</span>
                <ChevronRight className="w-4 h-4 text-secondary transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-line/60 mt-3 space-y-2">
                <p>
                  En France, les tarifs sont fixés librement par les exploitants de centres de contrôle technique. Le prix moyen national est de <strong>{stats.prixMoyen} €</strong> pour une voiture particulière thermique, mais les prix s’échelonnent de <strong>{stats.prixMin} € à plus de {stats.prixMax} €</strong> selon les départements.
                </p>
                <p>
                  Les écarts s’expliquent par les coûts immobiliers (très élevés à Paris et en Haute-Savoie), le niveau de concurrence locale, et le type de motorisation (les véhicules électriques et hybrides coûtent généralement 5 € à 15 € plus cher en raison de vérifications spécifiques des batteries et câbles haute tension).
                </p>
              </div>
            </details>

            <details className="card p-4 border-line bg-surface rounded-xl group">
              <summary className="font-bold text-sm text-fg cursor-pointer flex items-center justify-between list-none">
                <span>Que risque-t-on à rouler avec un contrôle technique périmé ?</span>
                <ChevronRight className="w-4 h-4 text-secondary transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-line/60 mt-3 space-y-2">
                <p>
                  Circuler sans contrôle technique à jour constitue une infraction de 4e classe punie d’une <strong>amende forfaitaire de 135 €</strong> (minorée à 90 € en cas de règlement sous 15 jours).
                </p>
                <p>
                  Aucun point de permis n’est retiré. Cependant, les policiers ou gendarmes peuvent décider de l’<strong>immobilisation du véhicule</strong> et retenir votre carte grise en échange d’une fiche de circulation provisoire d’une validité de 7 jours pour vous rendre dans un centre agréé.
                </p>
              </div>
            </details>

            <details className="card p-4 border-line bg-surface rounded-xl group">
              <summary className="font-bold text-sm text-fg cursor-pointer flex items-center justify-between list-none">
                <span>Quelle est la règle en cas de vente d’un véhicule d’occasion ?</span>
                <ChevronRight className="w-4 h-4 text-secondary transition-transform group-open:rotate-90" />
              </summary>
              <div className="pt-3 text-xs text-secondary leading-relaxed border-t border-line/60 mt-3 space-y-2">
                <p>
                  Si vous vendez un véhicule de plus de 4 ans à un particulier, le procès-verbal de contrôle technique remis à l’acheteur doit obligatoirement dater de <strong>moins de 6 mois</strong> le jour de la cession.
                </p>
                <p>
                  Si le contrôle technique a donné lieu à une contre-visite, le délai maximal est réduit à <strong>moins de 2 mois</strong> à compter de la visite initiale. Sans ce document, l’acheteur ne pourra pas obtenir sa nouvelle carte grise sur le site de l’ANTS.
                </p>
              </div>
            </details>
          </div>
        </section>
      </div>
    </>
  );
}
