import React from 'react';
import { X, MapPin, Phone, Globe, Mail, ExternalLink } from 'lucide-react';
import { Service } from '../../../types';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../app/context/ThemeContext';

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceDrawer: React.FC<ServiceDrawerProps> = ({ service, onClose }) => {
  const { theme } = useTheme();
  if (!service) return null;

  return (
    <div className={`absolute inset-x-2 bottom-2 top-2 z-[1000] flex w-auto flex-col overflow-hidden rounded-[20px] border shadow-[0_16px_36px_-24px_rgba(15,23,42,0.55)] backdrop-blur-xl animate-in slide-in-from-right duration-300 transition-colors md:inset-y-4 md:right-4 md:left-auto md:w-80 ${
      theme === 'dark' ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-slate-200/90'
    }`}>
      <div className={`p-4 border-b flex items-center justify-between ${
        theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50/75 border-slate-200'
      }`}>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detalhes do Serviço</span>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 sm:p-6 sm:space-y-6">
        <div className="space-y-2">
          <div className="inline-block rounded-md bg-blue-100 px-2 py-1 text-[10px] font-black uppercase tracking-tighter text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {service.category.replace('_', ' ')}
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{service.name}</h3>
        </div>

        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endereço</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{service.location.address}</p>
            </div>
          </div>

          {service.contact.phone && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">{service.contact.phone}</p>
                {service.contact.alternatePhone && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{service.contact.alternatePhone}</p>
                )}
              </div>
            </div>
          )}

          {service.contact.email && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-purple-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{service.contact.email}</p>
              </div>
            </div>
          )}

          {service.contact.website && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Website</p>
                <a 
                  href={service.contact.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold"
                >
                  Acessar site <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 border-t ${
        theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50/75 border-slate-200'
      }`}>
        <Link to={`/rede/servico/${service.id}`}>
          <Button fullWidth variant="primary" className="rounded-[16px] font-black uppercase text-[10px] tracking-widest">
            Ver Detalhes Completos
          </Button>
        </Link>
      </div>
    </div>
  );
};
