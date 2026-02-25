import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

type SimStep = 'start' | 'situation' | 'action' | 'result';

export const SimulatorPage: React.FC = () => {
  const [step, setStep] = useState<SimStep>('start');
  const [situation, setSituation] = useState<string | null>(null);
  const [action, setAction] = useState<string | null>(null);

  const reset = () => {
    setStep('start');
    setSituation(null);
    setAction(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-10 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-[3rem] overflow-hidden relative">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
        
        <div className="relative z-10 space-y-8">
          {step === 'start' && (
            <div className="text-center space-y-8 py-10">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center mx-auto">
                <Play className="w-10 h-10 text-blue-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Simulador de Protocolos</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">
                  Treine sua tomada de decisão em cenários hipotéticos baseados no protocolo institucional.
                </p>
              </div>
              <Button onClick={() => setStep('situation')} variant="primary" className="px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs">
                Começar Simulação
              </Button>
            </div>
          )}

          {step === 'situation' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Passo 01</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Selecione um cenário:</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'bullying', label: 'Estudante relata bullying persistente', icon: '🗣️' },
                  { id: 'injury', label: 'Estudante sofre queda com sangramento', icon: '🩹' },
                  { id: 'anxiety', label: 'Estudante apresenta crise de choro intensa', icon: '🧠' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSituation(s.id); setStep('action'); }}
                    className="flex items-center gap-4 p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left group"
                  >
                    <span className="text-3xl">{s.icon}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'action' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Passo 02</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Qual sua primeira ação?</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'direct', label: 'Resolver a situação sozinho imediatamente' },
                  { id: 'protocol', label: 'Acolher e acionar a coordenação pedagógica' },
                  { id: 'ignore', label: 'Aguardar o final da aula para avaliar' }
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setAction(a.id); setStep('result'); }}
                    className="p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left font-bold text-slate-700 dark:text-slate-200"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-10 py-4">
              <div className="flex items-center gap-4">
                {action === 'protocol' ? (
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-8 h-8 text-rose-600" />
                  </div>
                )}
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${action === 'protocol' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {action === 'protocol' ? 'Ação Correta!' : 'Ação Incorreta'}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">
                    {action === 'protocol' 
                      ? 'Você seguiu o protocolo de acolhimento e rede de apoio.' 
                      : 'O protocolo exige acolhimento imediato e notificação da gestão.'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> Justificativa Técnica
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {situation === 'bullying' && action === 'protocol' && 'O bullying requer intervenção institucional mediada pela coordenação para garantir a proteção de todos os envolvidos e o registro adequado.'}
                  {situation === 'bullying' && action !== 'protocol' && 'Tentar resolver sozinho pode expor os envolvidos ou omitir a necessidade de acompanhamento pedagógico e psicológico de longo prazo.'}
                  {situation === 'injury' && 'Em casos de saúde física, o primeiro socorro deve ser acompanhado de notificação imediata para que a família seja avisada e o seguro escolar acionado.'}
                  {situation === 'anxiety' && 'Crises emocionais exigem escuta qualificada e ambiente privativo, o que deve ser providenciado pela equipe de apoio ou gestão.'}
                </p>
              </div>

              <Button onClick={reset} variant="outline" className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px]">
                <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar Simulação
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
