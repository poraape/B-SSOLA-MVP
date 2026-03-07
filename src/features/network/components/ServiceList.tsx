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
      <div className="p-8 text-center text-slate-500 dark:text-slate-400">
        Nenhum serviço próximo encontrado. Consulte a coordenação pedagógica.
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service)}
          className={`group flex w-full items-center justify-between p-4 text-left transition-all ${
            service.id === highlightId
              ? 'bg-emerald-50/90 ring-2 ring-emerald-500/75 dark:bg-emerald-900/25'
              : 'hover:bg-slate-50/85 dark:hover:bg-slate-800/70'
          } ${selectedId === service.id ? 'border-l-4 border-l-blue-600 bg-blue-50/85 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.16)] dark:bg-blue-900/20 dark:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.32)]' : ''}`}
        >
          <div className="space-y-1.5">
            <h4 className="text-sm font-black tracking-tight text-slate-900 transition-colors group-hover:text-blue-700 dark:text-slate-100 dark:group-hover:text-blue-300">
              {service.name}
            </h4>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                <span className="leading-tight">{service.location.address}</span>
              </div>
              {service.contact.phone && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span>{service.contact.phone}</span>
                </div>
              )}
            </div>
          </div>
          <ChevronRight className={`h-5 w-5 transition-all ${
            selectedId === service.id ? 'translate-x-0.5 text-blue-600' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-blue-500'
          }`} />
        </button>
      ))}
    </div>
  );
};
