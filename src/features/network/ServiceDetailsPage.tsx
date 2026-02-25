import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getServiceById } from '../../domain/flows/selectors';
import { ArrowLeft, MapPin, Phone, Globe, Mail, ExternalLink, Clock, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';

import { useTheme } from '../../app/context/ThemeContext';

export const ServiceDetailsPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = getServiceById(serviceId || '');
  const { theme } = useTheme();

  if (!service) {
    return <Navigate to="/rede" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/rede" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm uppercase tracking-widest transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar para a Rede
      </Link>

      <div className={`border rounded-[2.5rem] overflow-hidden shadow-sm transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className={`p-8 sm:p-12 border-b transition-colors ${
          theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/50 border-slate-100'
        }`}>
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest">
              {service.category.replace('_', ' ')}
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {service.name}
            </h2>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-medium">{service.location.address}</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white tracking-tight">
                <Phone className="w-5 h-5 text-emerald-500" />
                Contatos
              </h3>
              <div className={`space-y-3 p-6 rounded-3xl border transition-colors ${
                theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'
              }`}>
                {service.contact.phone && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Telefone Principal</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">{service.contact.phone}</p>
                  </div>
                )}
                {service.contact.alternatePhone && (
                  <div className={`pt-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Telefone Alternativo</p>
                    <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{service.contact.alternatePhone}</p>
                  </div>
                )}
                {service.contact.email && (
                  <div className={`pt-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">E-mail</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{service.contact.email}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white tracking-tight">
                <Clock className="w-5 h-5 text-blue-500" />
                Funcionamento
              </h3>
              <div className={`p-6 rounded-3xl border transition-colors ${
                theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'
              }`}>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {service.type === 'externo' ? 'Atendimento público conforme horário da rede municipal/estadual.' : 'Atendimento interno da unidade escolar.'}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 italic">
                  * Recomenda-se contato telefônico prévio para confirmação de disponibilidade.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-black flex items-center gap-2 text-slate-900 dark:text-white tracking-tight">
                <Shield className="w-5 h-5 text-indigo-500" />
                Orientações de Acesso
              </h3>
              <div className={`p-6 rounded-3xl border transition-colors ${
                theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'
              } space-y-4`}>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Este serviço faz parte da rede de proteção e atendimento de Ermelino Matarazzo. 
                  Ao realizar o encaminhamento, certifique-se de levar o resumo estruturado gerado pelo Protocolo Bússola.
                </p>
                {service.contact.website && (
                  <a 
                    href={service.contact.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" fullWidth className="rounded-xl font-black uppercase text-[10px] tracking-widest">
                      Acessar Website Oficial <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-blue-600 text-white space-y-6 shadow-2xl shadow-blue-200 dark:shadow-none">
              <h4 className="font-black text-xl tracking-tight">Precisa de ajuda agora?</h4>
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                Se você está em uma situação de emergência com risco imediato, acione os serviços móveis.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 p-3 rounded-2xl text-center border border-white/10">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">SAMU</p>
                  <p className="text-2xl font-black tracking-tighter">192</p>
                </div>
                <div className="bg-white/10 p-3 rounded-2xl text-center border border-white/10">
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">PM</p>
                  <p className="text-2xl font-black tracking-tighter">190</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
