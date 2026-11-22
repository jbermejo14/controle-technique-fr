'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, ArrowRight } from 'lucide-react';
import type { DepartementInfo } from '@/lib/centres';

interface Props {
  departements: DepartementInfo[];
}

export function DeptSearchList({ departements }: Props) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = useMemo(() => {
    const list = Array.from(new Set(departements.map(d => d.region))).sort();
    return list;
  }, [departements]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return departements.filter(d => {
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q);
      const matchRegion = selectedRegion === 'all' || d.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [departements, search, selectedRegion]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un département (ex: 75, Rhône, Gironde...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-elevated border border-line rounded-lg pl-9 pr-3 py-2 text-sm text-fg placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="bg-elevated border border-line rounded-lg px-3 py-2 text-sm text-fg focus:outline-none focus:border-accent"
        >
          <option value="all">Toutes les régions</option>
          {regions.map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map(dept => (
          <Link
            key={dept.code}
            href={`/departement/${dept.code}`}
            className="card p-3 border-line bg-surface hover:border-accent/60 transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-elevated border border-line text-fg">
                  {dept.code}
                </span>
                <span className="text-[11px] font-bold text-accent">
                  dès {dept.prixMin} €
                </span>
              </div>
              <h3 className="text-sm font-bold text-fg group-hover:text-accent transition-colors flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                {dept.name}
              </h3>
            </div>

            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between text-[11px] text-secondary">
              <span>{dept.totalCentres} centres</span>
              <span className="flex items-center gap-1 group-hover:text-fg font-medium">
                Moy. {dept.prixMoyen} € <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-8 text-sm text-secondary">
          Aucun département trouvé pour votre recherche.
        </p>
      )}
    </div>
  );
}
