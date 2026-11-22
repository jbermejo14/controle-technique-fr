'use client';

import React, { useEffect, useRef } from 'react';
import type { CentreCt } from '@/lib/centres';

interface Props {
  centres: CentreCt[];
  departementName: string;
}

export function CentreMap({ centres, departementName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const validCentres = centres.filter(c => typeof c.lat === 'number' && typeof c.lng === 'number');
    if (!containerRef.current || validCentres.length === 0) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!isMounted || !containerRef.current) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const sumLat = validCentres.reduce((acc, c) => acc + (c.lat || 0), 0);
      const sumLng = validCentres.reduce((acc, c) => acc + (c.lng || 0), 0);
      const centerLat = sumLat / validCentres.length;
      const centerLng = sumLng / validCentres.length;

      const map = L.map(containerRef.current, {
        center: [centerLat, centerLng],
        zoom: 9,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      for (const centre of validCentres) {
        if (!centre.lat || !centre.lng) continue;

        // Couleur selon le prix
        const markerColor =
          centre.prixBase < 75
            ? '#16A34A' // vert (économique)
            : centre.prixBase <= 88
            ? '#EA580C' // orange (moyen)
            : '#DC2626'; // rouge (cher)

        const circle = L.circleMarker([centre.lat, centre.lng], {
          radius: 7,
          fillColor: markerColor,
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        });

        const popupContent = `
          <div style="font-family: inherit; font-size: 12px; line-height: 1.4; min-width: 200px;">
            <div style="font-weight: bold; color: #111827; margin-bottom: 4px; border-bottom: 1px solid #E5E7EB; padding-bottom: 3px;">
              ${centre.nom}
            </div>
            <div style="color: #4B5563; margin-bottom: 4px;">
              ${centre.adresse}, ${centre.cp} ${centre.ville}
            </div>
            <div style="display: flex; gap: 8px; align-items: center; margin: 6px 0;">
              <span style="font-size: 14px; font-weight: 800; color: #0284C7; background: #E0F2FE; padding: 2px 8px; border-radius: 4px;">
                dès ${centre.prixBase} €
              </span>
              ${
                centre.prices.contreVisite !== null
                  ? `<span style="font-size: 11px; color: #6B7280;">Contre-visite : <strong>${centre.prices.contreVisite} €</strong></span>`
                  : ''
              }
            </div>
            <div style="display: flex; gap: 8px; margin-top: 6px; font-size: 11px;">
              ${
                centre.tel
                  ? `<a href="tel:${centre.tel}" style="color: #0284C7; text-decoration: underline; font-weight: 600;">📞 ${centre.tel}</a>`
                  : ''
              }
              ${
                centre.url
                  ? `<a href="${centre.url}" target="_blank" rel="noopener noreferrer nofollow" style="color: #0284C7; text-decoration: underline;">Site web ↗</a>`
                  : ''
              }
            </div>
          </div>
        `;

        circle.bindPopup(popupContent);
        circle.addTo(map);
        bounds.extend([centre.lat, centre.lng]);
      }

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [25, 25] });
      }

      mapInstanceRef.current = map;
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [centres]);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="w-full h-80 sm:h-96 rounded-xl border border-line overflow-hidden bg-surface z-0"
        aria-label={`Carte des centres de contrôle technique du département ${departementName}`}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted px-1">
        <span>© Contributeurs OpenStreetMap · Données officielles DGCCRF (Ministère de l’Économie)</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block" /> Moins de 75 €
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block" /> 75 € - 88 €
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Plus de 88 €
          </span>
        </div>
      </div>
    </div>
  );
}
