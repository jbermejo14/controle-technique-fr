'use client';

import React, { useState, useMemo } from 'react';
import { Search, Phone, ExternalLink, MapPin, Fuel } from 'lucide-react';
import type { CentreCt } from '@/lib/centres';

interface Props {
  centres: CentreCt[];
  deptName: string;
}

export function CentreTable({ centres, deptName }: Props) {
  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState<'base' | 'essence' | 'diesel' | 'electrique' | 'hybride' | 'moto'>('base');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = centres.filter(c => {
      if (!q) return true;
      return (
        c.nom.toLowerCase().includes(q) ||
        c.ville.toLowerCase().includes(q) ||
        c.cp.includes(q) ||
        c.adresse.toLowerCase().includes(q)
      );
    });

    if (fuelFilter !== 'base') {
      list = list.filter(c => {
        if (fuelFilter === 'essence') return c.prices.essence !== null;
        if (fuelFilter === 'diesel') return c.prices.diesel !== null;
        if (fuelFilter === 'electrique') return c.prices.electrique !== null;
        if (fuelFilter === 'hybride') return c.prices.hybride !== null;
        if (fuelFilter === 'moto') return c.prices.moto !== null;
        return true;
      });
    }

    return list;
  }, [centres, search, fuelFilter]);

  return (
    <div className="space-y-4">
      {/* Barre de recherche et filtre carburant */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Rechercher une ville ou un centre en ${deptName}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-elevated border border-line rounded-lg pl-9 pr-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <select
          value={fuelFilter}
          onChange={(e) => setFuelFilter(e.target.value as any)}
          aria-label="Filtrer par motorisation"
          className="bg-elevated border border-line rounded-lg px-3 py-2 text-sm text-fg focus:outline-none focus:border-accent"
        >
          <option value="base">Tous carburants (meilleur tarif)</option>
          <option value="essence">Essence</option>
          <option value="diesel">Diesel</option>
          <option value="electrique">Électrique</option>
          <option value="hybride">Hybride</option>
          <option value="moto">Moto / 2-roues</option>
        </select>
      </div>

      <div className="text-xs text-secondary">
        Affichage de <strong>{filtered.length}</strong> centre(s) sur {centres.length}
      </div>

      {/* Grille / Liste des centres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(centre => {
          let displayedPrice = centre.prixBase;
          if (fuelFilter === 'essence' && centre.prices.essence) displayedPrice = centre.prices.essence;
          else if (fuelFilter === 'diesel' && centre.prices.diesel) displayedPrice = centre.prices.diesel;
          else if (fuelFilter === 'electrique' && centre.prices.electrique) displayedPrice = centre.prices.electrique;
          else if (fuelFilter === 'hybride' && centre.prices.hybride) displayedPrice = centre.prices.hybride;
          else if (fuelFilter === 'moto' && centre.prices.moto) displayedPrice = centre.prices.moto;

          return (
            <div
              key={centre.id}
              className="card p-4 border-line bg-surface flex flex-col justify-between space-y-3 hover:border-line-hover transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-sm text-fg leading-snug">
                    {centre.nom}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-base text-accent block">
                      {displayedPrice} €
                    </span>
                    {centre.prices.contreVisite !== null && (
                      <span className="text-[10px] text-muted block">
                        CV: {centre.prices.contreVisite} €
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-secondary mt-1 flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />
                  <span>
                    {centre.adresse}, <strong>{centre.cp} {centre.ville}</strong>
                  </span>
                </p>
              </div>

              {/* Détail par carburant */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-line/50 text-[10px] text-secondary">
                {centre.prices.essence && (
                  <span className="px-1.5 py-0.5 rounded bg-elevated border border-line">
                    Ess: {centre.prices.essence}€
                  </span>
                )}
                {centre.prices.diesel && (
                  <span className="px-1.5 py-0.5 rounded bg-elevated border border-line">
                    Dsl: {centre.prices.diesel}€
                  </span>
                )}
                {centre.prices.electrique && (
                  <span className="px-1.5 py-0.5 rounded bg-elevated border border-line">
                    Élec: {centre.prices.electrique}€
                  </span>
                )}
                {centre.prices.hybride && (
                  <span className="px-1.5 py-0.5 rounded bg-elevated border border-line">
                    Hyb: {centre.prices.hybride}€
                  </span>
                )}
                {centre.prices.moto && (
                  <span className="px-1.5 py-0.5 rounded bg-elevated border border-line text-accent">
                    Moto: {centre.prices.moto}€
                  </span>
                )}
              </div>

              {/* Actions : téléphone & site web */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-line/60 text-xs">
                {centre.tel ? (
                  <a
                    href={`tel:${centre.tel}`}
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {centre.tel}
                  </a>
                ) : (
                  <span className="text-muted text-[11px]">Tél. non renseigné</span>
                )}

                {centre.url ? (
                  <a
                    href={centre.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 text-secondary hover:text-fg text-xs"
                  >
                    <span>Prendre RDV</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card p-8 border-line bg-surface text-center space-y-2">
          <p className="text-sm font-semibold text-fg">Aucun centre trouvé pour ces critères.</p>
          <p className="text-xs text-secondary">Essayez de modifier votre recherche ou de réinitialiser le filtre carburant.</p>
        </div>
      )}
    </div>
  );
}
