import fs from 'node:fs';
import path from 'node:path';
import departementsData from '../data/departements.json';
import statsNationalesData from '../data/stats-nationales.json';

export interface CentreCt {
  id: string;
  nom: string;
  adresse: string;
  cp: string;
  ville: string;
  dep: string;
  tel: string | null;
  url: string | null;
  lat: number | null;
  lng: number | null;
  updated: string | null;
  prixBase: number;
  prices: {
    essence: number | null;
    diesel: number | null;
    electrique: number | null;
    hybride: number | null;
    gaz: number | null;
    moto: number | null;
    contreVisite: number | null;
  };
}

export interface DepartementInfo {
  code: string;
  name: string;
  region: string;
  regionSlug: string;
  totalCentres: number;
  prixMoyen: number;
  prixMin: number;
  prixMax: number;
  prixContreVisiteMoyen: number;
  topVilles: Array<{
    ville: string;
    count: number;
  }>;
}

export interface NationalStats {
  totalCentres: number;
  prixMoyen: number;
  prixMin: number;
  prixMax: number;
  prixContreVisiteMoyen: number;
  topMoinsChers: Array<{
    code: string;
    name: string;
    prixMoyen: number;
  }>;
  topPlusChers: Array<{
    code: string;
    name: string;
    prixMoyen: number;
  }>;
  derniereMiseAJour: string;
}

export function getAllDepartements(): DepartementInfo[] {
  return departementsData as DepartementInfo[];
}

export function getDepartementByCode(code: string): DepartementInfo | undefined {
  const cleanCode = code.toUpperCase();
  return (departementsData as DepartementInfo[]).find(d => d.code === cleanCode);
}

export function getCentresByDepartement(code: string): CentreCt[] {
  const cleanCode = code.toUpperCase();
  try {
    const filePath = path.join(process.cwd(), 'data', 'centres', `${cleanCode}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as CentreCt[];
    }
  } catch (err) {
    console.error(`Erreur lecture centres pour le département ${code}:`, err);
  }
  return [];
}

export function getNationalStats(): NationalStats {
  return statsNationalesData as NationalStats;
}
