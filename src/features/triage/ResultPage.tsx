import React, { useEffect, useRef } from 'react';
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

export const ResultPage: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const location = useLocation();
  const flow = getFlowById(flowId || '');
  const hasLoggedRef = useRef(false);
  const result = (location.state as ResultLocationState | null)?.result;
  const category = flow ? getCategoryById(flow.meta.categoryId) : undefined;
  const decisionResult = flow && result
    ? runDecision({
      mode: 'result',
      result,
      flow,
      category
    })
    : null;
  const premiumResult = decisionResult && isPremiumResult(decisionResult) ? decisionResult : null;
  const institutionalPriority = toInstitutionalPriority(premiumResult?.priority);
  const flowResultMessage = flow ? getFlowResultMessage(flow.meta.id, institutionalPriority) : undefined;

  useEffect(() => {
    if (!flow) return;
    hasLoggedRef.current = false;
  }, [flow?.meta.id]);

  useEffect(() => {
    if (!flow || !premiumResult || hasLoggedRef.current) return;

    logDecisionEvent({
      category: flow.meta.categoryId,
      level: premiumResult.level,
      type: flow.meta.type,
      emergency: flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency',
      flowId: flow.meta.id,
      priority: isInstitutionalPriority(premiumResult.priority) ? premiumResult.priority : undefined
    });
    hasLoggedRef.current = true;
  }, [flow, premiumResult]);

  if (!flow) {
    return <Navigate to="/" replace />;
  }

  if (!result) {
    // If no result in state, redirect back to flow to restart
    return <Navigate to={`/fluxo/${flowId}`} replace />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <Link to={`/fluxo/${flowId}`} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Refazer triagem
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
        {/* Result Header */}
        <div className="p-6 md:p-10 text-white bg-blue-600">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Resultado da Orientação</span>
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-tight">{flow.meta.title}</h2>
          {institutionalPriority && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest">
              Risco: {PRIORITY_LABELS[institutionalPriority]}
            </div>
          )}
        </div>

        <div className="p-6 md:p-10 space-y-10">
          <ResultPanel
            flow={flow}
            result={premiumResult || result}
            flowResultMessage={flowResultMessage}
          />
          <SummaryActions flow={flow} result={premiumResult || result} />
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
