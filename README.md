# Contrôle Technique France 2026 — Ododex (`/fr/controle-technique`)

Annuaire de 6 168 centres agréés de contrôle technique en France, comparateur de tarifs constatés et calculateur de date d'échéance légale pour voitures particulières, utilitaires et deux-roues (CT2RM).

- **URL en production** : [https://ododex.com/fr/controle-technique](https://ododex.com/fr/controle-technique)
- **Worker Cloudflare** : `ododex-controle-technique`
- **Portail parent** : [Ododex](https://ododex.com/fr/)

---

## 🎯 Fonctionnalités Clés

1. **Calculateur de Date d'Échéance Légale** :
   - Premier contrôle avant le 4e anniversaire de mise en circulation.
   - Périodicité de 2 ans pour les véhicules particuliers et utilitaires (visite complémentaire pollution annuelle).
   - Intégration du contrôle technique des deux-roues et scooters (CT2RM).
2. **Annuaire de 6 168 Centres Agréés** :
   - Données issues du registre officiel de l'UTAC-OTC et du Ministère des Transports.
   - Répartition par département (101 départements) et communes avec prix moyens constatés (visite initiale de 65 € à 110 € et contre-visite).
3. **Monétisation** :
   - Affiliation de réservation de créneaux de contrôle technique en ligne (*Simplauto, CautoControl, Sécuritest*), avec commission par rendez-vous pris.
   - AdSense avec conteneurs stables `min-height: 280px / 250px`.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 16 (App Router) en export statique.
- **Performance** : JSON pré-indexés par département pour des temps de build optimaux et temps de réponse <50 ms sous Cloudflare.
- **SEO** : Schema.org `AutoRepair` et `BreadcrumbList`.

---

## 🚀 Développement Local & Tests

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Exécuter les tests
npm test

# Compiler l'export statique
npm run build
```
