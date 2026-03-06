import { MapPin, Info, ShieldAlert, Heart } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTriageRecommendation } from '../../../app/context/TriageRecommendationContext';
import { Collapsible } from '../../../components/ui/Collapsible';
import { useAppMode } from '../../../domain/appMode/AppModeContext';
import { buildNetworkServiceLink } from '../../../domain/flows/flowResultSelectors';
import { PremiumResult } from '../../../domain/flows/premiumEngine';
import { getServiceById } from '../../../domain/flows/selectors';
import { TriageResult, Flow, FlowResultMessage } from '../../../types';

import { getTopFactors, translateFactor } from './translateFactors';


const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
    🔒 Sem dados pessoais do estudante
  </span>
);

interface ResultPanelProps {
  flow: Flow;
  result: TriageResult | PremiumResult;
  flowResultMessage?: FlowResultMessage;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result, flowResultMessage }) => {
  const { mode } = useAppMode();
  const { setRecommendation } = useTriageRecommendation();
  const primaryService = result.primaryService ? getServiceById(result.primaryService.id) : null;
  const secondaryService = result.secondaryService ? getServiceById(result.secondaryService.id) : null;

  const explanationPoints = (result as PremiumResult).explanationPoints || [];
  const appliedRules = result.appliedRules || [];
  const whyThisOrientation = explanationPoints.length > 0
    ? explanationPoints.map(translateFactor)
    : getTopFactors(appliedRules);

  const recommendationHighlightId = primaryService?.id || secondaryService?.id || null;
  const recommendationQueryType = primaryService ? 'interno' : null;

  useEffect(() => {
    if (!recommendationHighlightId) return;
    setRecommendation({
      highlightId: recommendationHighlightId,
      queryType: recommendationQueryType,
    });
  }, [recommendationHighlightId, recommendationQueryType, setRecommendation]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        {flowResultMessage ? (
          <>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-700">Situação observada</p>
              <h3 className="mt-2 text-lg font-bold text-sky-950">{flowResultMessage.headline}</h3>
              <p className="mt-3 text-sm font-medium text-sky-900">{flowResultMessage.nextStep}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to={buildNetworkServiceLink(flowResultMessage.priorityService.queryType)}
                className="rounded-2xl border border-blue-100 bg-blue-50 p-5 transition-colors hover:border-blue-300"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-blue-700">Serviço Prioritário</p>
                <p className="mt-2 text-base font-bold text-blue-950">{flowResultMessage.priorityService.label}</p>
                <p className="mt-2 text-sm text-blue-900">{flowResultMessage.priorityService.description}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-blue-700">Ver serviços indicados</p>
              </Link>

              <Link
                to={buildNetworkServiceLink(flowResultMessage.complementaryService.queryType)}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-slate-700">Apoio Complementar</p>
                <p className="mt-2 text-base font-bold text-slate-950">{flowResultMessage.complementaryService.label}</p>
                <p className="mt-2 text-sm text-slate-700">{flowResultMessage.complementaryService.description}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-700">Ver serviços indicados</p>
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">No escopo do professor</p>
              <ul className="mt-3 space-y-2">
                {flowResultMessage.teacherScope.doThis.map((action, index) => (
                  <li key={`${action}-${index}`} className="text-sm text-slate-800">• {action}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-rose-700">{flowResultMessage.teacherScope.notYours}</p>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-800">Protocolo em atualização.</p>
            <p className="mt-2 text-sm text-slate-600">As orientações detalhadas deste protocolo ainda não estão disponíveis.</p>
            <Link to="/rede" className="mt-4 inline-flex text-xs font-bold uppercase tracking-widest text-blue-700 hover:underline">
              Ver todos os serviços
            </Link>
          </div>
        )}
      </section>

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
              <p className="text-xs font-bold uppercase tracking-widest">Atenção: Evitar Revitimização / Escuta Única</p>
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
              Ver serviços indicados →
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
              Ver serviços indicados →
            </Link>
          </div>
        )}
      </div>

      <PrivacyBadge />

      {whyThisOrientation.length > 0 && (
        <section className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">Por que esta orientação?</h3>
          <ul className="list-disc pl-5 space-y-1">
            {whyThisOrientation.map((point, index) => (
              <li key={index} className="text-sm text-slate-600">
                {point}
              </li>
            ))}
          </ul>
        </section>
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
