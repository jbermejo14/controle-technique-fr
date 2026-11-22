import React from 'react';
import { LegalPage } from '@/components/LegalPage';
import { getTitular, type Titular } from '@/lib/legal';
import { legalHolderValue, legalMetadata } from '@/lib/legal-text';
import { SITE_NAME } from '@/lib/site';

const PATH = '/mentions-legales';
const URL_CLOUDFLARE = 'https://www.cloudflare.com';
const URL_DATA_ECONOMIE = 'https://data.economie.gouv.fr/explore/dataset/prix-controle-technique/';

export const metadata = legalMetadata(
  PATH,
  'Mentions légales',
  `Mentions légales de ${SITE_NAME} : éditeur, hébergeur, sources des données du contrôle technique et limites de responsabilité.`
);

export default function MentionsLegalesPage() {
  const holder = getTitular();
  const field = (name: keyof Titular) => legalHolderValue(holder, name);

  return (
    <LegalPage title="Mentions légales" path={PATH}>
      <h2 className="text-base font-bold text-fg">Éditeur du site</h2>
      <p>
        Conformément à l&apos;article 6 III de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), ce site est édité par :
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nom : {field('nombre')}</li>
        <li>Numéro d&apos;identification fiscale (NIF, Espagne) : {field('nif')}</li>
        <li>Adresse : {field('domicilio')}</li>
        <li>Adresse e-mail de contact : {field('email')}</li>
        {holder.tipo === 'empresa' && <li>Immatriculation au registre du commerce : {field('registroMercantil')}</li>}
      </ul>

      <h2 className="text-base font-bold text-fg">Directeur de la publication</h2>
      <p>Le directeur de la publication est l&apos;éditeur du site : {field('nombre')}.</p>

      <h2 className="text-base font-bold text-fg">Hébergeur</h2>
      <p>
        Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis (<a href={URL_CLOUDFLARE} target="_blank" rel="noopener noreferrer" className="text-accent underline">cloudflare.com</a>).
      </p>

      <h2 className="text-base font-bold text-fg">Objet du site et indépendance</h2>
      <p>
        Ce site propose à titre informatif et gratuit un simulateur de date d’échéance du contrôle technique et un annuaire comparatif des prix pratiqués par les centres agréés en France.
      </p>
      <p>
        Le site est un service indépendant et n&apos;est rattaché ni au Ministère de l&apos;Économie, ni à l&apos;Organisme Technique Central (OTC), ni à aucun réseau d’inspection automobile agréé (Dekra, Securitest, Autosur, Autovision, etc.).
      </p>

      <h2 className="text-base font-bold text-fg">Origine des données</h2>
      <p>
        Les tarifs, coordonnées et localisations des centres sont issus du jeu de données officiel ouvert mis à disposition par la Direction générale de la concurrence, de la consommation et de la répression des fraudes (DGCCRF) sur le portail public des données ouvertes du Ministère de l&apos;Économie (<a href={URL_DATA_ECONOMIE} target="_blank" rel="noopener noreferrer" className="text-accent underline">data.economie.gouv.fr</a>).
      </p>

      <h2 className="text-base font-bold text-fg">Propriété intellectuelle</h2>
      <p>
        Les marques, logos, graphismes, logiciels, interfaces et contenus éditoriaux figurant sur le site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, distribution ou diffusion sans autorisation préalable est prohibée, à l&apos;exception des données publiques réutilisées conformément aux licences ouvertes applicables.
      </p>
    </LegalPage>
  );
}
