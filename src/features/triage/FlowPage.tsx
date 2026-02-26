import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFlowById } from '../../domain/flows/selectors';
import { initFlow, processAnswer, FlowState } from '../../domain/flows/flowEngine';
import { TriageQuestion } from './components/TriageQuestion';
import { ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react';

export const FlowPage: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const navigate = useNavigate();
  const flow = getFlowById(flowId || '');
  
  const [state, setState] = useState<FlowState | null>(null);

  useEffect(() => {
    if (flow) {
      setState(initFlow(flow));
    }
  }, [flow]);

  if (!flow || !state) {
    return <div className="text-center py-20">Fluxo não encontrado.</div>;
  }

  if (!flow.triage || !flow.triage.questions || flow.triage.questions.length === 0) {
    return <div className="text-center py-20">Fluxo sem perguntas configuradas.</div>;
  }

  const handleAnswer = (optionLabel: string) => {
    if (!state.currentQuestionId) return;
    
    const newState = processAnswer(flow, state, state.currentQuestionId, optionLabel);
    
    if (newState.redirectToCategories) {
      navigate('/'); // Redirect to home/categories
      return;
    }

    if (newState.flowId && newState.flowId !== flow.meta.id) {
      navigate(`/fluxo/${newState.flowId}`);
      return;
    }

    setState(newState);

    if (newState.isComplete && newState.result) {
      navigate(`/resultado/${flow.meta.id}`, { state: { result: newState.result } });
    }
  };

  const currentQuestion = flow.triage.questions.find(q => q.id === state.currentQuestionId);
  const isEmergency = flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Voltar
        </button>
        <div className="flex items-center gap-2">
          <div className={`h-1.5 w-24 rounded-full ${isEmergency ? 'bg-rose-600 animate-pulse' : 'bg-blue-600'}`} />
        </div>
      </div>

      <div className={`bg-white border ${isEmergency ? 'border-rose-200 shadow-rose-100' : 'border-slate-200 shadow-slate-200/50'} rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-xl relative overflow-hidden`}>
        {/* Progress indicator or context */}
        <div className="flex items-center gap-2 mb-8">
          {isEmergency ? (
            <div className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter animate-pulse flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Emergência Crítica
            </div>
          ) : (
            <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Protocolo Padrão
            </div>
          )}
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{flow.meta.title}</span>
        </div>

        {currentQuestion ? (
          <TriageQuestion 
            question={currentQuestion} 
            onAnswer={handleAnswer}
            isEmergency={isEmergency}
          />
        ) : (
          <div className="text-center py-10 text-slate-500">Processando...</div>
        )}
      </div>
    </div>
  );
};
