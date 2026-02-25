import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Service } from '../../../types';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
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

  return (
    <div className="h-full w-full rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <MapContainer 
        center={center} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {services.map(service => {
          if (service.location.lat === null || service.location.lng === null) return null;
          
          return (
            <Marker 
              key={service.id} 
              position={[service.location.lat, service.location.lng]}
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
    </div>
  );
};
