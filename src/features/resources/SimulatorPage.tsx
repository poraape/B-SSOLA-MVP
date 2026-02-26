import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { simulatorCases, SimulatorCase } from './data/simulatorCases';

type SimState = 'intro' | 'selection' | 'case' | 'result';

export const SimulatorPage: React.FC = () => {
  const [state, setState] = useState<SimState>('intro');
  const [currentCase, setCurrentCase] = useState<SimulatorCase | null>(null);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const handleStart = () => setState('selection');
  
  const handleSelectCase = (simCase: SimulatorCase) => {
    setCurrentCase(simCase);
    setState('case');
  };

  const handleSelectChoice = (choiceId: string) => {
    setSelectedChoiceId(choiceId);
    setState('result');
  };

  const handleReset = () => {
    setState('intro');
    setCurrentCase(null);
    setSelectedChoiceId(null);
  };

  const selectedChoice = currentCase?.choices.find(c => c.id === selectedChoiceId);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-5 md:p-12 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-[2rem] md:rounded-[3rem] overflow-hidden relative min-h-[500px] flex flex-col">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 pointer-events-none" />
        
        <div className="relative z-10 flex-1 flex flex-col">
          {state === 'intro' && (
            <div className="text-center space-y-8 py-10 my-auto">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                <Play className="w-12 h-12 text-blue-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Simulador de Protocolos</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto leading-relaxed">
                  Coloque seus conhecimentos em prática com cenários reais do cotidiano escolar. Escolha a melhor conduta baseada no protocolo.
                </p>
              </div>
              <Button onClick={handleStart} variant="primary" className="px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 dark:shadow-none">
                Iniciar Treinamento
              </Button>
            </div>
          )}

          {state === 'selection' && (
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Fase de Seleção</span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Escolha um cenário:</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {simulatorCases.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectCase(s)}
                    className="flex items-center gap-6 p-6 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left group bg-white dark:bg-slate-900 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <span className="block font-black text-slate-900 dark:text-white text-lg group-hover:text-blue-600 transition-colors">{s.title}</span>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">{s.situation}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {state === 'case' && currentCase && (
            <div className="space-y-10 flex-1 flex flex-col">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl">
                    {currentCase.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Situação Atual</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{currentCase.title}</h3>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl md:rounded-[2rem] border-2 border-slate-100 dark:border-slate-700 relative">
                  <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
                    "{currentCase.situation}"
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center">Qual sua conduta?</h4>
                <div className="grid grid-cols-1 gap-3">
                  {currentCase.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleSelectChoice(choice.id)}
                      className="p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all text-left font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-sm"
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {state === 'result' && currentCase && selectedChoice && (
            <div className="space-y-10 py-4 my-auto">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-lg ${
                  selectedChoice.isCorrect 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' 
                    : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600'
                }`}>
                  {selectedChoice.isCorrect ? <CheckCircle2 className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                </div>
                <div>
                  <h3 className={`text-3xl font-black tracking-tight ${selectedChoice.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {selectedChoice.isCorrect ? 'Conduta Adequada!' : 'Conduta Inadequada'}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                    Avaliação Baseada no Protocolo Institucional
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> Justificativa e Feedback
                </div>
                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedChoice.feedback}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => setState('selection')} variant="outline" className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Tentar Outro Cenário
                </Button>
                <Button onClick={handleReset} variant="ghost" className="flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] text-slate-400">
                  <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar Tudo
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
