// src/features/resources/SimulatorPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Clock, BarChart3 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { simulatorCases } from './data/simulatorCases';
import { SimulatorCase, SimulatorChoice, CaseCategory } from './data/simulatorTypes';
import { useSimulatorProgress } from './hooks/useSimulatorProgress';
import { SimulatorDashboard } from './components/SimulatorDashboard';
import { CaseView } from './components/CaseView';
import { ResultView } from './components/ResultView';

type SimState = 'intro' | 'dashboard' | 'case' | 'result';

export const SimulatorPage: React.FC = () => {
  const [state, setState] = useState<SimState>('intro');
  const [currentCase, setCurrentCase] = useState<SimulatorCase | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<SimulatorChoice | null>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<CaseCategory | 'all'>('all');

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const {
    progress,
    addCompletedCase,
    isCaseCompleted,
    getCaseScore,
    resetProgress,
  } = useSimulatorProgress();

  useEffect(() => {
    if (state === 'case') {
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state]);

  const handleStart = () => setState('dashboard');

  const handleSelectCase = (simCase: SimulatorCase) => {
    setCurrentCase(simCase);
    setSelectedChoice(null);
    setTimeSpent(0);
    setState('case');
  };

  const handleSelectChoice = (choice: SimulatorChoice) => {
    if (!currentCase) return;

    setSelectedChoice(choice);
    addCompletedCase(currentCase.id, choice.id, choice.score, timeSpent);
    setState('result');
  };

  const handleBackToDashboard = () => {
    setCurrentCase(null);
    setSelectedChoice(null);
    setTimeSpent(0);
    setState('dashboard');
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      resetProgress();
      setState('intro');
      setCurrentCase(null);
      setSelectedChoice(null);
      setTimeSpent(0);
    }
  };

  const filteredCases =
    filterCategory === 'all'
      ? simulatorCases
      : simulatorCases.filter((c) => c.category === filterCategory);

  return (
    <div className="max-w-4xl mx-auto">
      {state === 'intro' && (
        <Card className="p-8 md:p-12 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl rounded-[3rem] relative min-h-[500px] flex flex-col">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 pointer-events-none" />

          <div className="relative z-10 text-center space-y-8 py-10 my-auto">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <Play className="w-12 h-12 text-blue-600" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Simulador de Protocolos Escolares
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Treine suas habilidades de resposta a situações desafiadoras do cotidiano escolar.
                Cada decisão é baseada em protocolos reais e legislação vigente.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400 pt-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Progresso Salvo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>~5-8 min/cenário</span>
                </div>
              </div>
            </div>
            <Button
              onClick={handleStart}
              variant="primary"
              className="px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 dark:shadow-none"
            >
              {progress.completedCases.length > 0 ? 'Continuar Treinamento' : 'Iniciar Treinamento'}
            </Button>
          </div>
        </Card>
      )}

      {state === 'dashboard' && (
        <SimulatorDashboard
          cases={filteredCases}
          progress={progress}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          onSelectCase={handleSelectCase}
          onReset={handleReset}
          isCaseCompleted={isCaseCompleted}
          getCaseScore={getCaseScore}
        />
      )}

      {state === 'case' && currentCase && (
        <CaseView
          case={currentCase}
          timeSpent={timeSpent}
          onSelectChoice={handleSelectChoice}
          onBack={handleBackToDashboard}
        />
      )}

      {state === 'result' && currentCase && selectedChoice && (
        <ResultView
          case={currentCase}
          choice={selectedChoice}
          timeSpent={timeSpent}
          onBackToDashboard={handleBackToDashboard}
          onReset={handleReset}
        />
      )}
    </div>
  );
};
