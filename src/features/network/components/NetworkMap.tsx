import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import mapTilesConfig from '../../../data/v2/map-tiles.json';
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
  const [hasTileError, setHasTileError] = useState(false);

  if (hasTileError) {
    throw new Error('map_tiles_unavailable');
  }

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
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
        
        {mapServices.map(service => {
          return (
            <Marker 
              key={service.id} 
              position={[service.location.lat!, service.location.lng!]}
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
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-slate-100/85 p-4 text-center text-sm text-slate-600">
          Nenhum serviço próximo encontrado. Consulte a coordenação pedagógica.
        </div>
      )}
    </div>
  );
};
