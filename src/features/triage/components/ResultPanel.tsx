import { MapPin, Info, ShieldAlert, Heart } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Collapsible } from '../../../components/ui/Collapsible';
import { useAppMode } from '../../../domain/appMode/AppModeContext';
import { buildNetworkNavigationTarget, buildNetworkServiceLink } from '../../../domain/flows/flowResultSelectors';
import { PremiumResult } from '../../../domain/flows/premiumEngine';
import { getServiceById } from '../../../domain/flows/selectors';
import { TriageResult, Flow, FlowResultMessage } from '../../../types';

import { getTopFactors, translateFactor } from './translateFactors';


const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
    🔒 Sem dados pessoais do estudante
  </span>
);

const getHighlightIdFromQueryType = (queryType: string | undefined): string | null => {
  if (!queryType || !queryType.startsWith('highlight=')) return null;
  const id = queryType.slice('highlight='.length).trim();
  return id || null;
};

const getServiceTypeFromQueryType = (queryType: string | undefined): 'interno' | 'externo' | null => {
  if (!queryType || !queryType.startsWith('type=')) return null;
  const serviceType = queryType.slice('type='.length).trim();
  return serviceType === 'interno' || serviceType === 'externo' ? serviceType : null;
};

const toNetworkServiceType = (serviceType: string | undefined): 'interno' | 'externo' | null =>
  serviceType === 'interno' || serviceType === 'externo' ? serviceType : null;

interface ResultPanelProps {
  flow: Flow;
  result: TriageResult | PremiumResult;
  flowResultMessage?: FlowResultMessage;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ result, flowResultMessage }) => {
  const { mode } = useAppMode();
  const navigate = useNavigate();
  const primaryService = result.primaryService ? getServiceById(result.primaryService.id) : null;
  const secondaryService = result.secondaryService ? getServiceById(result.secondaryService.id) : null;

  const explanationPoints = (result as PremiumResult).explanationPoints || [];
  const appliedRules = result.appliedRules || [];
  const whyThisOrientation = explanationPoints.length > 0
    ? explanationPoints.map(translateFactor)
    : getTopFactors(appliedRules);

  const priorityTarget = flowResultMessage
    ? (() => {
      const serviceId =
        primaryService?.id ??
        getHighlightIdFromQueryType(flowResultMessage.priorityService.queryType);
      const serviceType =
        toNetworkServiceType(primaryService?.type) ??
        getServiceTypeFromQueryType(flowResultMessage.priorityService.queryType);
      if (serviceId) {
        return buildNetworkNavigationTarget({
          serviceId,
          serviceType,
          source: 'result',
          slot: 'priority',
        });
      }
      return buildNetworkServiceLink(flowResultMessage.priorityService.queryType, {
        source: 'result',
        slot: 'priority',
      });
    })()
    : (primaryService
      ? buildNetworkNavigationTarget({
        serviceId: primaryService.id,
        serviceType: toNetworkServiceType(primaryService.type),
        source: 'result',
        slot: 'priority',
      })
      : '/rede');

  const complementaryTarget = flowResultMessage
    ? (() => {
      const serviceId =
        secondaryService?.id ??
        getHighlightIdFromQueryType(flowResultMessage.complementaryService.queryType);
      const serviceType =
        toNetworkServiceType(secondaryService?.type) ??
        getServiceTypeFromQueryType(flowResultMessage.complementaryService.queryType);
      if (serviceId) {
        return buildNetworkNavigationTarget({
          serviceId,
          serviceType,
          source: 'result',
          slot: 'complementary',
        });
      }
      return buildNetworkServiceLink(flowResultMessage.complementaryService.queryType, {
        source: 'result',
        slot: 'complementary',
      });
    })()
    : (secondaryService
      ? buildNetworkNavigationTarget({
        serviceId: secondaryService.id,
        serviceType: toNetworkServiceType(secondaryService.type),
        source: 'result',
        slot: 'complementary',
      })
      : '/rede');

  const goToRoute = (path: string) => {
    navigate(path);
    // Fallback defensivo para casos de travamento da navegação SPA nesta tela.
    window.setTimeout(() => {
      const targetPath = path.split('?')[0];
      if (window.location.pathname !== targetPath) {
        window.location.assign(path);
      }
    }, 120);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        {flowResultMessage ? (
          <>
            <div className="rounded-[30px] border border-slate-200/75 bg-gradient-to-br from-white via-slate-50/70 to-sky-50/50 p-6 shadow-[0_22px_45px_-34px_rgba(15,23,42,0.5)] md:p-7">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-sky-700">
                  Situação observada e ação imediata
                </div>
                <h3 className="text-xl font-black leading-tight tracking-tight text-slate-950">
                  {flowResultMessage.headline}
                </h3>
                <p className="text-sm font-semibold leading-relaxed text-slate-800">
                  {flowResultMessage.nextStep}
                </p>
                <ul className="grid gap-2.5 md:grid-cols-2">
                  {flowResultMessage.teacherScope.doThis.map((action, index) => (
                    <li
                      key={`${action}-${index}`}
                      className="rounded-2xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 text-sm text-slate-800"
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200/75 bg-white/80 p-4 md:p-5">
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-600">
                  Encaminhamento sugerido
                </p>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <article
                    className="cursor-pointer rounded-2xl border border-blue-200/80 bg-blue-50/70 p-4"
                    onClick={() => goToRoute(priorityTarget)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToRoute(priorityTarget);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="text-[11px] font-black uppercase tracking-widest text-blue-700">
                      Serviço Prioritário
                    </p>
                    <p className="mt-2 text-base font-black text-blue-950">{flowResultMessage.priorityService.label}</p>
                    <p className="mt-1.5 text-sm text-blue-900/90">{flowResultMessage.priorityService.description}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-blue-700/90">
                      Acionar primeiro
                    </p>
                    <Link
                      to={priorityTarget}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        goToRoute(priorityTarget);
                      }}
                      className="mt-3 inline-flex rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-blue-700"
                    >
                      Ver serviços indicados
                    </Link>
                  </article>

                  <article
                    className="cursor-pointer rounded-2xl border border-slate-200/80 bg-slate-50/85 p-4"
                    onClick={() => goToRoute(complementaryTarget)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        goToRoute(complementaryTarget);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-700">
                      Apoio Complementar
                    </p>
                    <p className="mt-2 text-base font-black text-slate-950">{flowResultMessage.complementaryService.label}</p>
                    <p className="mt-1.5 text-sm text-slate-700">{flowResultMessage.complementaryService.description}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-slate-600">
                      Pode entrar em seguida
                    </p>
                    <Link
                      to={complementaryTarget}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        goToRoute(complementaryTarget);
                      }}
                      className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                    >
                      Ver serviços indicados
                    </Link>
                  </article>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-rose-200/85 bg-rose-50/75 px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-widest text-rose-700">Limites da atuação escolar</p>
                <p className="mt-1.5 text-sm font-semibold text-rose-800">{flowResultMessage.teacherScope.notYours}</p>
              </div>
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
              <p className="text-xs font-bold uppercase tracking-widest">Sigilo Reforçado Ativado</p>
            </div>
          )}
          {result.uiFlags?.avoidRetraumatization && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-800">
              <Heart className="w-5 h-5 shrink-0" />
              <p className="text-xs font-bold uppercase tracking-widest">Atenção: Evitar Revitimização e Repetição de Relato</p>
            </div>
          )}
        </div>
      )}

      {!flowResultMessage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryService && (
            <div
              className="bg-blue-50 border border-blue-100 p-6 rounded-3xl relative group cursor-pointer"
              onClick={() => goToRoute(priorityTarget)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  goToRoute(priorityTarget);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <MapPin className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-wider">Serviço Prioritário</span>
              </div>
              <p className="text-lg font-bold text-blue-900 leading-snug">{primaryService.name}</p>
              <p className="text-sm text-blue-700 mt-2 font-medium">{primaryService.contact.phone}</p>
              <Link
                to={priorityTarget}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToRoute(priorityTarget);
                }}
                className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:underline"
              >
                Ver serviços indicados →
              </Link>
            </div>
          )}
          {secondaryService && (
            <div
              className="bg-slate-50 border border-slate-100 p-6 rounded-3xl relative group cursor-pointer"
              onClick={() => goToRoute(complementaryTarget)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  goToRoute(complementaryTarget);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center gap-2 mb-3 text-slate-600">
                <Info className="w-5 h-5" />
                <span className="font-bold uppercase text-xs tracking-wider">Apoio Complementar</span>
              </div>
              <p className="text-lg font-bold text-slate-900 leading-snug">{secondaryService.name}</p>
              <p className="text-sm text-slate-700 mt-2 font-medium">{secondaryService.contact.phone}</p>
              <Link
                to={complementaryTarget}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  goToRoute(complementaryTarget);
                }}
                className="mt-4 inline-flex items-center text-xs font-bold text-blue-600 hover:underline"
              >
                Ver serviços indicados →
              </Link>
            </div>
          )}
        </div>
      )}

      <PrivacyBadge />

      {whyThisOrientation.length > 0 && (
        <Collapsible title="Por que esta orientação?" defaultOpen={false}>
          <ul className="mt-4 list-disc pl-5 space-y-1">
            {whyThisOrientation.map((point, index) => (
              <li key={index} className="text-sm text-slate-600">
                {point}
              </li>
            ))}
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
          defaultOpen={false}
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
          : 'Ferramenta de apoio educacional-institucional. Não substitui avaliação clínica, socioassistencial, de proteção ou justiça.'}
      </p>
    </div>
  );
};
