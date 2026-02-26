import React from 'react';
import { MapPin, Phone, ChevronRight } from 'lucide-react';
import { Service } from '../../../types';

interface ServiceListProps {
  services: Service[];
  onSelect: (service: Service) => void;
  selectedId?: string;
  highlightId?: string | null;
}

export const ServiceList: React.FC<ServiceListProps> = ({ 
  services, 
  onSelect,
  selectedId,
  highlightId
}) => {
  if (services.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        Nenhum serviço encontrado com os filtros atuais.
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={`w-full text-left p-4 transition-colors flex items-center justify-between group ${
            service.id === highlightId
              ? 'ring-2 ring-emerald-500 bg-emerald-50'
              : 'hover:bg-slate-50'
          } ${selectedId === service.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}`}
        >
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h4>
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" />
                <span className="leading-tight">{service.location.address}</span>
              </div>
              {service.contact.phone && (
                <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span>{service.contact.phone}</span>
                </div>
              )}
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 transition-all ${
            selectedId === service.id ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-500'
          }`} />
        </button>
      ))}
    </div>
  );
};
