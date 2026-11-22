import React from 'react';
import Link from 'next/link';
import { getAdSenseClient } from './AdSenseScript';

export function Footer() {
  const hasAdsense = !!getAdSenseClient();

  return (
    <footer className="border-t border-line bg-surface mt-16 py-10 text-xs text-secondary">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Conseil pratique auto-contrôle */}
        <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-accent uppercase tracking-wider block">
              Astuce économie contre-visite
            </span>
            <p className="text-xs text-fg font-medium mt-0.5">
              30 % des contre-visites sont dues à une simple ampoule grillée ou des balais d’essuie-glace usés. Vérifiez votre éclairage avant la visite pour économiser en moyenne 14 € !
            </p>
          </div>
          <Link
            href="/guide/defaillances-contre-visite-eviter"
            className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-bold hover:bg-accent/90 transition-all text-center shrink-0"
          >
            Voir la checklist complète →
          </Link>
        </div>

        {/* Liens transversaux des services Ododex France */}
        <div className="pt-2 border-t border-line/60">
          <p className="font-semibold text-fg mb-2">Autres services automobiles Ododex en France :</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <a href="/fr" className="hover:text-fg hover:underline">
              ⛽ Prix des carburants
            </a>
            <a href="/fr/zfe" className="hover:text-fg hover:underline">
              🌱 ZFE & Crit’Air
            </a>
            <a href="/fr/carte-grise" className="hover:text-fg hover:underline">
              📄 Carte grise (simulateur taxe)
            </a>
            <a href="/fr/radars" className="hover:text-fg hover:underline">
              📷 Radars & simulateur d’amendes
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-line/60">
          <div className="flex items-center gap-2">
            <span className="font-bold text-fg">Ododex</span>
            <span>·</span>
            <span>Comparateur des prix du contrôle technique et calcul d’échéance</span>
          </div>

          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="/fr" className="hover:text-fg hover:underline">
              Accueil Ododex
            </a>
            <Link href="/mentions-legales" className="hover:text-fg hover:underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-fg hover:underline">
              Confidentialité
            </Link>
            <Link href="/cookies" className="hover:text-fg hover:underline">
              Cookies
            </Link>
          </nav>
        </div>

        <p className="text-muted leading-relaxed">
          Données officielles issues de la base publique du Ministère de l’Économie, des Finances et de la Souveraineté industrielle et numérique (DGCCRF - data.economie.gouv.fr).
          Réglementation conforme au Code de la route en vigueur (articles L323-1 et R323-1 et suivants).
          Ododex est un portail d’information citoyen et indépendant, non affilié aux réseaux de contrôle agréés ni à l’État.
        </p>

        {hasAdsense && (
          <p className="text-muted">
            Des annonces personnalisées peuvent être affichées conformément à notre politique de cookies et au cadre de consentement TCF v2.2.
          </p>
        )}
      </div>
    </footer>
  );
}
