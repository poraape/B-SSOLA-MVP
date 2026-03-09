import React, { useEffect, useMemo, useRef } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { getFlowById, getCategoryById } from '../../domain/flows/selectors';
import { ResultPanel } from './components/ResultPanel';
import { SummaryActions } from './components/SummaryActions';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { TriageResult, FlowPriority, PRIORITY_LABELS } from '../../types';
import { runDecision } from '../../application/decisionOrchestrator';
import { logDecisionEvent } from '../../application/loggerService';
import { PremiumResult } from '../../domain/flows/premiumEngine';
import { InstitutionalPriority } from '../../domain/metrics/types';
import { getFlowResultMessage } from '../../domain/flows/flowResultSelectors';
import { runTriageWithFacade } from './clients/triageClient';

interface ResultLocationState {
  result?: TriageResult;
}

const isInstitutionalPriority = (value: FlowPriority | undefined): value is InstitutionalPriority =>
  value === 'low' || value === 'moderate' || value === 'high' || value === 'critical';

const isPremiumResult = (input: ReturnType<typeof runDecision>): input is PremiumResult =>
  Boolean(input && 'schoolActions' in input);

const toInstitutionalPriority = (
  value: FlowPriority | undefined
): InstitutionalPriority | undefined => {
  if (value === 'low' || value === 'moderate' || value === 'high' || value === 'critical') {
    return value;
  }

  if (value === 'P0') return 'critical';
  if (value === 'P1') return 'high';
  if (value === 'P2') return 'moderate';
  if (value === 'P3') return 'low';

  if (value) {
    console.warn(`Prioridade inválida recebida no ResultPage: "${value}"`);
  }
  return undefined;
};

const areStringArraysEqual = (left: string[] | undefined, right: string[] | undefined): boolean => {
  const a = left ?? [];
  const b = right ?? [];
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
};

const areServiceRefsEqual = (
  left: { id: string; name: string } | null | undefined,
  right: { id: string; name: string } | null | undefined
): boolean =>
  (left?.id ?? null) === (right?.id ?? null) &&
  (left?.name ?? null) === (right?.name ?? null);

const areUiFlagsEqual = (left: PremiumResult['uiFlags'], right: PremiumResult['uiFlags']): boolean =>
  Boolean(left?.confidential) === Boolean(right?.confidential) &&
  Boolean(left?.avoidRetraumatization) === Boolean(right?.avoidRetraumatization) &&
  Boolean(left?.showGuardrail) === Boolean(right?.showGuardrail);

const arePremiumResultsEquivalent = (
  flowId: string,
  left: PremiumResult,
  right: PremiumResult
): boolean => {
  const leftPriority = toInstitutionalPriority(left.priority);
  const rightPriority = toInstitutionalPriority(right.priority);
  const leftMessage = leftPriority ? getFlowResultMessage(flowId, leftPriority) : undefined;
  const rightMessage = rightPriority ? getFlowResultMessage(flowId, rightPriority) : undefined;

  return (
    left.level === right.level &&
    left.severity === right.severity &&
    leftPriority === rightPriority &&
    areServiceRefsEqual(left.primaryService, right.primaryService) &&
    areServiceRefsEqual(left.secondaryService, right.secondaryService) &&
    areStringArraysEqual(left.schoolActions, right.schoolActions) &&
    areStringArraysEqual(left.explanationPoints, right.explanationPoints) &&
    areStringArraysEqual(left.appliedRules, right.appliedRules) &&
    areStringArraysEqual(left.institutionalScript, right.institutionalScript) &&
    areUiFlagsEqual(left.uiFlags, right.uiFlags) &&
    leftMessage?.flowId === rightMessage?.flowId &&
    leftMessage?.level === rightMessage?.level
  );
};

export const ResultPage: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const location = useLocation();
  const flow = getFlowById(flowId || '');
  const hasLoggedRef = useRef(false);
  const result = (location.state as ResultLocationState | null)?.result;
  const category = flow ? getCategoryById(flow.meta.categoryId) : undefined;
  const localDecisionResult = useMemo(
    () => (flow && result
      ? runDecision({
        mode: 'result',
        result,
        flow,
        category
      })
      : null),
    [flow, result, category],
  );
  const localPremiumResult = useMemo(
    () => (localDecisionResult && isPremiumResult(localDecisionResult) ? localDecisionResult : null),
    [localDecisionResult],
  );
  const [remotePremiumResult, setRemotePremiumResult] = React.useState<PremiumResult | null>(null);
  const displayedPremiumResult = remotePremiumResult ?? localPremiumResult;
  const displayedResult = displayedPremiumResult ?? result;
  const institutionalPriority = toInstitutionalPriority(displayedResult?.priority);
  const flowResultMessage = flow ? getFlowResultMessage(flow.meta.id, institutionalPriority) : undefined;

  useEffect(() => {
    setRemotePremiumResult(null);
  }, [flow?.meta.id, result]);

  useEffect(() => {
    if (!flow || !result) {
      return;
    }

    let active = true;
    void (async () => {
      const remoteResult = await runTriageWithFacade({
        mode: 'result',
        result,
        flow,
        category,
      });

      if (!active || !remoteResult) {
        return;
      }

      if (localPremiumResult && arePremiumResultsEquivalent(flow.meta.id, localPremiumResult, remoteResult)) {
        return;
      }

      setRemotePremiumResult((previous) => {
        if (previous && arePremiumResultsEquivalent(flow.meta.id, previous, remoteResult)) {
          return previous;
        }
        return remoteResult;
      });
    })();

    return () => {
      active = false;
    };
  }, [flow, result, category, localPremiumResult]);

  useEffect(() => {
    if (!flow) return;
    hasLoggedRef.current = false;
  }, [flow?.meta.id]);

  useEffect(() => {
    if (!flow || !displayedPremiumResult || hasLoggedRef.current) return;

    logDecisionEvent({
      category: flow.meta.categoryId,
      level: displayedPremiumResult.level,
      type: flow.meta.type,
      emergency: flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency',
      flowId: flow.meta.id,
      priority: isInstitutionalPriority(displayedPremiumResult.priority) ? displayedPremiumResult.priority : undefined
    });
    hasLoggedRef.current = true;
  }, [flow, displayedPremiumResult]);

  if (!flow) {
    return <Navigate to="/" replace />;
  }

  if (!result) {
    // If no result in state, redirect back to flow to restart
    return <Navigate to={`/fluxo/${flowId}`} replace />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 print:p-0 md:space-y-8">
      <div className="flex items-center justify-between print:hidden">
        <Link to={`/fluxo/${flowId}`} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" /> Refazer triagem
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.65)] md:rounded-[2.5rem]">
        {/* Result Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-800 p-6 text-white md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Resultado da Orientação Institucional</span>
          </div>
          <h2 className="text-2xl font-black leading-tight tracking-tight md:text-3xl">{flow.meta.title}</h2>
          <p className="mt-3 text-sm font-medium text-blue-100/90">
            Situação observada, ação imediata e encaminhamento institucional em sequência clara.
          </p>
          {institutionalPriority && (
            <div className="mt-4 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
              Risco: {PRIORITY_LABELS[institutionalPriority]}
            </div>
          )}
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-blue-100/85">
            Apoio educacional-institucional. Não substitui avaliação especializada.
          </p>
        </div>

        <div className="space-y-7 p-6 md:space-y-8 md:p-8">
          <ResultPanel
            result={displayedResult ?? result}
            flowResultMessage={flowResultMessage}
          />
          <section className="rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-3 md:px-5 md:py-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-600">Utilitários e ações finais</p>
            <SummaryActions flow={flow} result={displayedResult ?? result} />
          </section>
        </div>
      </div>
      
      <div className="text-center print:hidden">
        <Link to="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};
