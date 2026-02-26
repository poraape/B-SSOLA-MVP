import React, { useEffect, useRef } from 'react';
import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import { getFlowById, getCategoryById } from '../../domain/flows/selectors';
import { ResultPanel } from './components/ResultPanel';
import { SummaryActions } from './components/SummaryActions';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { TriageResult } from '../../types';
import { runDecision } from '../../application/decisionOrchestrator';
import { logDecisionEvent } from '../../application/loggerService';

export const ResultPage: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const location = useLocation();
  const flow = getFlowById(flowId || '');
  const hasLoggedRef = useRef(false);
  const result = location.state?.result as TriageResult;

  if (!flow) {
    return <Navigate to="/" replace />;
  }

  if (!result) {
    // If no result in state, redirect back to flow to restart
    return <Navigate to={`/fluxo/${flowId}`} replace />;
  }

  const category = getCategoryById(flow.meta.categoryId);
  const premiumResult = runDecision({
    mode: 'result',
    result,
    flow,
    category
  }) as any;

  useEffect(() => {
    hasLoggedRef.current = false;
  }, [flow.meta.id]);

  useEffect(() => {
    if (!premiumResult || hasLoggedRef.current) return;

    logDecisionEvent({
      category: flow.meta.categoryId,
      level: (premiumResult as any).level,
      type: flow.meta.type,
      emergency: flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency',
      flowId: flow.meta.id,
      priority: (premiumResult as any).priority
    });
    hasLoggedRef.current = true;
  }, [flow.meta.id, premiumResult]);

  const safePriority = ['low', 'moderate', 'high', 'critical'].includes(premiumResult?.priority || '')
    ? premiumResult?.priority
    : 'low';

  return (
    <div className="max-w-3xl mx-auto space-y-8 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <Link to={`/fluxo/${flowId}`} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Revisar respostas
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
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest">
            Risco: {safePriority}
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-10">
          <ResultPanel flow={flow} result={premiumResult || result} />
          <SummaryActions flow={flow} result={premiumResult || result} />
        </div>
      </div>
      
      <div className="text-center print:hidden">
        <Link to="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
          Finalizar e voltar ao início
        </Link>
      </div>
    </div>
  );
};
