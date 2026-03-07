import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import mapTilesConfig from '../../../data/v2/map-tiles.json';
import networkConfigData from '../../../data/v2/network-config.json';
import { Service } from '../../../types';

type LeafletDefaultIconPrototype = {
  _getIconUrl?: () => string;
};

type LeafletDefaultIconStatic = {
  prototype: LeafletDefaultIconPrototype;
  mergeOptions: (options: {
    iconRetinaUrl: string;
    iconUrl: string;
    shadowUrl: string;
  }) => void;
};

const defaultIcon = L.Icon.Default as unknown as LeafletDefaultIconStatic;
delete defaultIcon.prototype._getIconUrl;
defaultIcon.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface NetworkMapProps {
  services: Service[];
  selectedService: Service | null;
  onMarkerClick: (service: Service) => void;
}

const categoryColorMap: Record<string, string> = Object.values(networkConfigData.layers).reduce(
  (acc: Record<string, string>, layer) => {
    acc[layer.id] = layer.color;
    return acc;
  },
  {},
);

const schoolMarkerColor = '#FACC15';
const defaultMarkerColor = '#2563EB';
const schoolServiceIds = new Set([
  'gestao-direcao',
  'gestao-vice-direcao',
  'gestao-coordenacao',
]);

const createPinIcon = (color: string): L.DivIcon =>
  L.divIcon({
    className: '',
    html: `
      <span style="
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 999px;
        border: 2px solid #ffffff;
        background: ${color};
        box-shadow: 0 1px 4px rgba(15,23,42,0.55);
      "></span>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });

const getMarkerIcon = (service: Service): L.DivIcon => {
  return createPinIcon(categoryColorMap[service.category] || defaultMarkerColor);
};

const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const NetworkMap: React.FC<NetworkMapProps> = ({ 
  services, 
  selectedService,
  onMarkerClick 
}) => {
  // Default center (Ermelino Matarazzo area)
  const defaultCenter: [number, number] = [-23.50043, -46.48740];
  const center: [number, number] = selectedService?.location.lat && selectedService?.location.lng 
    ? [selectedService.location.lat, selectedService.location.lng] 
    : defaultCenter;

  const mapServices = services.filter(
    (service) => service.location.lat !== null && service.location.lng !== null,
  );
  const schoolServices = mapServices.filter(service => schoolServiceIds.has(service.id));
  const regularServices = mapServices.filter(service => !schoolServiceIds.has(service.id));
  const schoolPosition: [number, number] = schoolServices[0]
    ? [schoolServices[0].location.lat!, schoolServices[0].location.lng!]
    : [networkConfigData.schoolReference.lat, networkConfigData.schoolReference.lng];
  const schoolAddress =
    schoolServices[0]?.location.address || networkConfigData.schoolReference.address;
  const duplicateCounts = new Map<string, number>();
  const [hasTileError, setHasTileError] = useState(false);

  if (hasTileError) {
    throw new Error('map_tiles_unavailable');
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-slate-200/90 bg-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-20px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-800">
      <MapContainer 
        center={center} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution={mapTilesConfig.attributionHtml}
          url={mapTilesConfig.tileUrl}
          eventHandlers={{
            tileerror: () => setHasTileError(true),
          }}
        />
        
        <Marker
          position={schoolPosition}
          icon={createPinIcon(schoolMarkerColor)}
        >
          <Popup>
            <div className="p-1">
              <p className="font-bold text-slate-900 m-0">{networkConfigData.schoolReference.name}</p>
              <p className="text-xs text-slate-500 m-0 mt-1">{schoolAddress}</p>
              {schoolServices.length > 0 && (
                <ul className="mt-2 pl-4 text-xs text-slate-700">
                  {schoolServices.map(service => (
                    <li key={service.id}>{service.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </Popup>
        </Marker>

        {regularServices.map(service => {
          const lat = service.location.lat!;
          const lng = service.location.lng!;
          const key = `${lat}:${lng}`;
          const indexAtLocation = duplicateCounts.get(key) || 0;
          duplicateCounts.set(key, indexAtLocation + 1);
          const spreadStep = 0.00007;
          const position: [number, number] =
            indexAtLocation === 0
              ? [lat, lng]
              : [
                  lat + Math.cos(indexAtLocation * 1.57) * spreadStep,
                  lng + Math.sin(indexAtLocation * 1.57) * spreadStep,
                ];

          return (
            <Marker 
              key={service.id} 
              position={position}
              icon={getMarkerIcon(service)}
              eventHandlers={{
                click: () => onMarkerClick(service),
              }}
            >
              <Popup>
                <div className="p-1">
                  <p className="font-bold text-slate-900 m-0">{service.name}</p>
                  <p className="text-xs text-slate-500 m-0 mt-1">{service.location.address}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}

        <ChangeView center={center} zoom={selectedService ? 16 : 14} />
      </MapContainer>
      {mapServices.length === 0 && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-100/85 p-4 text-center text-sm text-slate-600 dark:bg-slate-900/80 dark:text-slate-300">
          Nenhum serviço próximo encontrado. Consulte a coordenação pedagógica.
        </div>
      )}
    </div>
  );
};
