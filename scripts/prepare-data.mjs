import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const DATA_URL = 'https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-controle-technique/exports/json';
const TEMP_FILE = path.join(rootDir, 'temp-raw-ct.json');

// Departamentos base de Francia con nombre y región
const DEPARTEMENTS_BASE = [
  { code: '01', name: 'Ain', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '02', name: 'Aisne', region: 'Hauts-de-France', regionSlug: 'hauts-de-france' },
  { code: '03', name: 'Allier', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '04', name: 'Alpes-de-Haute-Provence', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '05', name: 'Hautes-Alpes', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '06', name: 'Alpes-Maritimes', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '07', name: 'Ardèche', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '08', name: 'Ardennes', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '09', name: 'Ariège', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '10', name: 'Aube', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '11', name: 'Aude', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '12', name: 'Aveyron', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '13', name: 'Bouches-du-Rhône', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '14', name: 'Calvados', region: 'Normandie', regionSlug: 'normandie' },
  { code: '15', name: 'Cantal', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '16', name: 'Charente', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '17', name: 'Charente-Maritime', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '18', name: 'Cher', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '19', name: 'Corrèze', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '2A', name: 'Corse-du-Sud', region: 'Corse', regionSlug: 'corse' },
  { code: '2B', name: 'Haute-Corse', region: 'Corse', regionSlug: 'corse' },
  { code: '21', name: "Côte-d'Or", region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '22', name: "Côtes-d'Armor", region: 'Bretagne', regionSlug: 'bretagne' },
  { code: '23', name: 'Creuse', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '24', name: 'Dordogne', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '25', name: 'Doubs', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '26', name: 'Drôme', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '27', name: 'Eure', region: 'Normandie', regionSlug: 'normandie' },
  { code: '28', name: 'Eure-et-Loir', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '29', name: 'Finistère', region: 'Bretagne', regionSlug: 'bretagne' },
  { code: '30', name: 'Gard', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '31', name: 'Haute-Garonne', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '32', name: 'Gers', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '33', name: 'Gironde', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '34', name: 'Hérault', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '35', name: 'Ille-et-Vilaine', region: 'Bretagne', regionSlug: 'bretagne' },
  { code: '36', name: 'Indre', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '37', name: 'Indre-et-Loire', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '38', name: 'Isère', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '39', name: 'Jura', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '40', name: 'Landes', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '41', name: 'Loir-et-Cher', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '42', name: 'Loire', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '43', name: 'Haute-Loire', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '44', name: 'Loire-Atlantique', region: 'Pays de la Loire', regionSlug: 'pays-de-la-loire' },
  { code: '45', name: 'Loiret', region: 'Centre-Val de Loire', regionSlug: 'centre-val-de-loire' },
  { code: '46', name: 'Lot', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '47', name: 'Lot-et-Garonne', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '48', name: 'Lozère', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '49', name: 'Maine-et-Loire', region: 'Pays de la Loire', regionSlug: 'pays-de-la-loire' },
  { code: '50', name: 'Manche', region: 'Normandie', regionSlug: 'normandie' },
  { code: '51', name: 'Marne', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '52', name: 'Haute-Marne', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '53', name: 'Mayenne', region: 'Pays de la Loire', regionSlug: 'pays-de-la-loire' },
  { code: '54', name: 'Meurthe-et-Moselle', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '55', name: 'Meuse', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '56', name: 'Morbihan', region: 'Bretagne', regionSlug: 'bretagne' },
  { code: '57', name: 'Moselle', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '58', name: 'Nièvre', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '59', name: 'Nord', region: 'Hauts-de-France', regionSlug: 'hauts-de-france' },
  { code: '60', name: 'Oise', region: 'Hauts-de-France', regionSlug: 'hauts-de-france' },
  { code: '61', name: 'Orne', region: 'Normandie', regionSlug: 'normandie' },
  { code: '62', name: 'Pas-de-Calais', region: 'Hauts-de-France', regionSlug: 'hauts-de-france' },
  { code: '63', name: 'Puy-de-Dôme', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '64', name: 'Pyrénées-Atlantiques', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '65', name: 'Hautes-Pyrénées', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '66', name: 'Pyrénées-Orientales', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '67', name: 'Bas-Rhin', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '68', name: 'Haut-Rhin', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '69', name: 'Rhône', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '70', name: 'Haute-Saône', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '71', name: 'Saône-et-Loire', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '72', name: 'Sarthe', region: 'Pays de la Loire', regionSlug: 'pays-de-la-loire' },
  { code: '73', name: 'Savoie', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '74', name: 'Haute-Savoie', region: 'Auvergne-Rhône-Alpes', regionSlug: 'auvergne-rhone-alpes' },
  { code: '75', name: 'Paris', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '76', name: 'Seine-Maritime', region: 'Normandie', regionSlug: 'normandie' },
  { code: '77', name: 'Seine-et-Marne', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '78', name: 'Yvelines', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '79', name: 'Deux-Sèvres', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '80', name: 'Somme', region: 'Hauts-de-France', regionSlug: 'hauts-de-france' },
  { code: '81', name: 'Tarn', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '82', name: 'Tarn-et-Garonne', region: 'Occitanie', regionSlug: 'occitanie' },
  { code: '83', name: 'Var', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '84', name: 'Vaucluse', region: "Provence-Alpes-Côte d'Azur", regionSlug: 'provence-alpes-cote-d-azur' },
  { code: '85', name: 'Vendée', region: 'Pays de la Loire', regionSlug: 'pays-de-la-loire' },
  { code: '86', name: 'Vienne', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '87', name: 'Haute-Vienne', region: 'Nouvelle-Aquitaine', regionSlug: 'nouvelle-aquitaine' },
  { code: '88', name: 'Vosges', region: 'Grand Est', regionSlug: 'grand-est' },
  { code: '89', name: 'Yonne', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '90', name: 'Territoire de Belfort', region: 'Bourgogne-Franche-Comté', regionSlug: 'bourgogne-franche-comte' },
  { code: '91', name: 'Essonne', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '92', name: 'Hauts-de-Seine', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '93', name: 'Seine-Saint-Denis', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '94', name: 'Val-de-Marne', region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '95', name: "Val-d'Oise", region: 'Île-de-France', regionSlug: 'ile-de-france' },
  { code: '971', name: 'Guadeloupe', region: 'Guadeloupe', regionSlug: 'guadeloupe' },
  { code: '972', name: 'Martinique', region: 'Martinique', regionSlug: 'martinique' },
  { code: '973', name: 'Guyane', region: 'Guyane', regionSlug: 'guyane' },
  { code: '974', name: 'La Réunion', region: 'La Réunion', regionSlug: 'la-reunion' },
  { code: '976', name: 'Mayotte', region: 'Mayotte', regionSlug: 'mayotte' }
];

function normalizeDeptCode(dept, cp) {
  if (!dept && cp) {
    if (cp.startsWith('200') || cp.startsWith('201')) return '2A';
    if (cp.startsWith('202') || cp.startsWith('206')) return '2B';
    if (cp.startsWith('97')) return cp.slice(0, 3);
    return cp.slice(0, 2);
  }
  const clean = String(dept).trim().toUpperCase();
  if (clean === '2A' || clean === '2B') return clean;
  if (clean.length === 1) return `0${clean}`;
  return clean;
}

async function run() {
  console.log('1. Téléchargement des données officielles du contrôle technique...');
  
  let records;
  if (fs.existsSync(TEMP_FILE)) {
    console.log('Utilisation du fichier cache local temp-raw-ct.json');
    records = JSON.parse(fs.readFileSync(TEMP_FILE, 'utf-8'));
  } else {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    records = await res.json();
    fs.writeFileSync(TEMP_FILE, JSON.stringify(records));
    console.log(`Données téléchargées: ${records.length} entrées brutes`);
  }

  console.log(`2. Traitement et regroupement par centre (SIRET)... Total brut: ${records.length}`);

  // Regrouper par cct_siret
  const centresMap = new Map();

  for (const row of records) {
    const siret = (row.cct_siret || '').trim();
    if (!siret) continue;

    const depCode = normalizeDeptCode(row.code_departement, row.cct_code_postal);
    if (!depCode) continue;

    let centre = centresMap.get(siret);
    if (!centre) {
      centre = {
        id: siret,
        nom: (row.cct_denomination || '').trim(),
        adresse: (row.cct_adresse || '').trim(),
        cp: (row.cct_code_postal || '').trim(),
        ville: (row.cct_commune || '').trim(),
        dep: depCode,
        tel: (row.cct_tel || '').trim() || null,
        url: (row.cct_url || '').trim() || null,
        lat: typeof row.latitude === 'number' ? Number(row.latitude.toFixed(6)) : null,
        lng: typeof row.longitude === 'number' ? Number(row.longitude.toFixed(6)) : null,
        updated: row.cct_update_date_time || null,
        prices: {
          essence: null,
          diesel: null,
          electrique: null,
          hybride: null,
          gaz: null,
          moto: null,
          contreVisite: null
        }
      };
      centresMap.set(siret, centre);
    }

    const catVehicule = (row.cat_vehicule_libelle || '').toLowerCase();
    const catEnergie = (row.cat_energie_libelle || '').toLowerCase();
    const prix = typeof row.prix_visite === 'number' && row.prix_visite > 20 && row.prix_visite < 250 ? row.prix_visite : null;
    const contreVisite = typeof row.prix_contre_visite_mini === 'number' && row.prix_contre_visite_mini >= 0 && row.prix_contre_visite_mini < 100 
      ? row.prix_contre_visite_mini 
      : (typeof row.prix_contre_visite_maxi === 'number' ? row.prix_contre_visite_maxi : null);

    if (contreVisite !== null) {
      if (centre.prices.contreVisite === null || contreVisite < centre.prices.contreVisite) {
        centre.prices.contreVisite = contreVisite;
      }
    }

    if (prix !== null) {
      if (catVehicule.includes('voiture') || catVehicule.includes('4 x 4') || catVehicule.includes('camionnette')) {
        if (catEnergie.includes('essence')) centre.prices.essence = prix;
        else if (catEnergie.includes('diesel')) centre.prices.diesel = prix;
        else if (catEnergie.includes('electrique') || catEnergie.includes('électrique')) centre.prices.electrique = prix;
        else if (catEnergie.includes('hybride')) centre.prices.hybride = prix;
        else if (catEnergie.includes('gaz') || catEnergie.includes('gpl')) centre.prices.gaz = prix;
        else {
          if (!centre.prices.essence) centre.prices.essence = prix;
        }
      } else if (catVehicule.includes('moto') || catVehicule.includes('cyclomoteur') || catVehicule.includes('quad')) {
        centre.prices.moto = prix;
      }
    }
  }

  console.log(`Nombre total de centres uniques trouvés: ${centresMap.size}`);

  // Compléter le prix de base pour chaque centre
  const centresList = [];
  for (const c of centresMap.values()) {
    const validPrices = [
      c.prices.essence,
      c.prices.diesel,
      c.prices.electrique,
      c.prices.hybride,
      c.prices.gaz
    ].filter(p => typeof p === 'number' && p > 25);

    c.prixBase = validPrices.length > 0 ? Math.min(...validPrices) : (c.prices.moto || 75);
    // Format du nom s'il est vide
    if (!c.nom) {
      c.nom = `Centre Contrôle Technique ${c.ville}`;
    }
    centresList.push(c);
  }

  // Créer répertoire de données
  const dataDir = path.join(rootDir, 'data');
  const centresDir = path.join(dataDir, 'centres');
  fs.mkdirSync(centresDir, { recursive: true });

  // Regrouper par département
  const deptCentresMap = new Map();
  for (const d of DEPARTEMENTS_BASE) {
    deptCentresMap.set(d.code, []);
  }

  for (const c of centresList) {
    if (!deptCentresMap.has(c.dep)) {
      deptCentresMap.set(c.dep, []);
    }
    deptCentresMap.get(c.dep).push(c);
  }

  // Écrire les fichiers par département
  const deptSummaryList = [];
  let totalNationalCentres = 0;
  let allNationalPrices = [];
  let allNationalCv = [];

  for (const d of DEPARTEMENTS_BASE) {
    const list = deptCentresMap.get(d.code) || [];
    // Trier par prix croissant
    list.sort((a, b) => (a.prixBase || 999) - (b.prixBase || 999));

    // Sauvegarder data/centres/[code].json
    fs.writeFileSync(path.join(centresDir, `${d.code}.json`), JSON.stringify(list, null, 2));

    const prices = list.map(c => c.prixBase).filter(p => typeof p === 'number' && p > 0);
    const cvPrices = list.map(c => c.prices.contreVisite).filter(p => typeof p === 'number' && p >= 0);

    const prixMoyen = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 78;
    const prixMin = prices.length > 0 ? Math.min(...prices) : 60;
    const prixMax = prices.length > 0 ? Math.max(...prices) : 105;
    const prixContreVisiteMoyen = cvPrices.length > 0 ? Math.round(cvPrices.reduce((a, b) => a + b, 0) / cvPrices.length) : 15;

    // Villes avec le plus de centres
    const villeCounts = new Map();
    for (const c of list) {
      if (c.ville) {
        villeCounts.set(c.ville, (villeCounts.get(c.ville) || 0) + 1);
      }
    }
    const topVilles = Array.from(villeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([v, count]) => ({ ville: v, count }));

    deptSummaryList.push({
      code: d.code,
      name: d.name,
      region: d.region,
      regionSlug: d.regionSlug,
      totalCentres: list.length,
      prixMoyen,
      prixMin,
      prixMax,
      prixContreVisiteMoyen,
      topVilles
    });

    totalNationalCentres += list.length;
    allNationalPrices.push(...prices);
    allNationalCv.push(...cvPrices);
  }

  // Écrire departements.json
  fs.writeFileSync(path.join(dataDir, 'departements.json'), JSON.stringify(deptSummaryList, null, 2));

  // Statistiques nationales
  const nationalMoyen = Math.round(allNationalPrices.reduce((a, b) => a + b, 0) / allNationalPrices.length);
  const nationalMin = Math.min(...allNationalPrices);
  const nationalMax = Math.max(...allNationalPrices);
  const nationalCvMoyen = Math.round(allNationalCv.reduce((a, b) => a + b, 0) / allNationalCv.length);

  const topMoinsChers = [...deptSummaryList]
    .filter(d => d.totalCentres > 5)
    .sort((a, b) => a.prixMoyen - b.prixMoyen)
    .slice(0, 5)
    .map(d => ({ code: d.code, name: d.name, prixMoyen: d.prixMoyen }));

  const topPlusChers = [...deptSummaryList]
    .filter(d => d.totalCentres > 5)
    .sort((a, b) => b.prixMoyen - a.prixMoyen)
    .slice(0, 5)
    .map(d => ({ code: d.code, name: d.name, prixMoyen: d.prixMoyen }));

  const nationalStats = {
    totalCentres: totalNationalCentres,
    prixMoyen: nationalMoyen,
    prixMin: nationalMin,
    prixMax: nationalMax,
    prixContreVisiteMoyen: nationalCvMoyen,
    topMoinsChers,
    topPlusChers,
    derniereMiseAJour: new Date().toISOString().split('T')[0]
  };

  fs.writeFileSync(path.join(dataDir, 'stats-nationales.json'), JSON.stringify(nationalStats, null, 2));

  console.log('✅ Données prêtes et enregistrées:');
  console.log(`- ${totalNationalCentres} centres répartis sur 101 départements`);
  console.log(`- Prix moyen national: ${nationalMoyen} € (Min: ${nationalMin} €, Max: ${nationalMax} €)`);
  console.log(`- Contre-visite moyenne: ${nationalCvMoyen} €`);
  console.log(`- Fichiers écrits dans data/departements.json, data/stats-nationales.json et data/centres/*.json`);
}

run().catch(err => {
  console.error('Erreur préparation des données:', err);
  process.exit(1);
});
