import React from 'react';
import { MapPin, Info, ShieldAlert, Heart } from 'lucide-react';
import { TriageResult, Flow } from '../../../types';
import { getServiceById } from '../../../domain/flows/selectors';
import { Link } from 'react-router-dom';
import { PremiumResult } from '../../../domain/flows/premiumEngine';
import { Collapsible } from '../../../components/ui/Collapsible';
import { useAppMode } from '../../../domain/appMode/AppModeContext';

interface ResultPanelProps {
  flow: Flow;
  result: TriageResult | PremiumResult;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ flow, result }) => {
  const { mode } = useAppMode();
  const primaryService = result.primaryService ? getServiceById(result.primaryService.id) : null;
  const secondaryService = result.secondaryService ? getServiceById(result.secondaryService.id) : null;

  const internalRelevant = (result as PremiumResult).internalServicesRelevant || [];
  const externalRelevant = (result as PremiumResult).externalServicesRelevant || [];
  const explanationPoints = (result as PremiumResult).explanationPoints || [];

  return (
    <div className="space-y-10">
      {/* UI Flags / Alerts */}
      {(result.uiFlags?.confidential || result.uiFlags?.avoidRetraumatization) && (
        <div className="space-y-3">
          {result.uiFlags?.confidential && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-800">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold uppercase tracking-widest">Protocolo de Sigilo Reforçado Ativado</p>
            </div>
          )}
          {result.uiFlags?.avoidRetraumatization && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-800">
              <Heart className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold uppercase tracking-widest">Atenção: Evitar Revitalização / Escuta Única</p>
            </div>
          )}
        </div>
      )}

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {primaryService && (
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl relative group">
            <div className="flex items-center gap-2 mb-3 text-blue-600">
              <MapPin className="w-5 h-5" />
              <span className="font-bold uppercase text-xs tracking-wider">Serviço Prioritário</span>
            </div>
            <p className="text-lg font-bold text-blue-900 leading-snug">{primaryService.name}</p>
            <p className="text-sm text-blue-700 mt-2 font-medium">{primaryService.contact.phone}</p>
            <Link 
              to={`/rede?type=interno&highlight=${primaryService.id}`}
              className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:underline"
            >
              Ver no mapa →
            </Link>
          </div>
        )}
        {secondaryService && (
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative group">
            <div className="flex items-center gap-2 mb-3 text-slate-600">
              <Info className="w-5 h-5" />
              <span className="font-bold uppercase text-xs tracking-wider">Apoio Complementar</span>
            </div>
            <p className="text-lg font-bold text-slate-900 leading-snug">{secondaryService.name}</p>
            <p className="text-sm text-slate-700 mt-2 font-medium">{secondaryService.contact.phone}</p>
            <Link 
              to={`/rede?highlight=${secondaryService.id}`}
              className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:underline"
            >
              Ver no mapa →
            </Link>
          </div>
        )}
      </div>

      {mode === 'formacao' && (
        <Collapsible title="Como essa classificação foi definida?" defaultOpen={false}>
          <ul className="space-y-3 mt-4">
            {explanationPoints.length > 0 ? (
              explanationPoints.map((point, index) => (
                <li key={index} className="text-sm text-slate-700 leading-relaxed">
                  • {point}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-700 leading-relaxed">
                • Classificação definida conforme protocolo institucional vigente.
              </li>
            )}
          </ul>
        </Collapsible>
      )}

      {/* School Actions */}
      {result.schoolActions.length > 0 && (
        <Collapsible
          title={
            mode === 'formacao'
              ? 'Recomendações Institucionais e Boas Práticas'
              : 'Recomendações Institucionais'
          }
          defaultOpen={mode === 'operacional'}
        >
          <ul className="space-y-3 mt-4">
            {result.schoolActions.map((item, i) => (
              <li key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-800 font-medium">{item}</p>
              </li>
            ))}
          </ul>
        </Collapsible>
      )}

      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-relaxed">
        {mode === 'formacao'
          ? 'Modo Formação ativo — Conteúdo ampliado para fins pedagógicos.'
          : 'Ferramenta de apoio institucional. Não substitui avaliação técnica especializada.'}
      </p>
    </div>
  );
};
