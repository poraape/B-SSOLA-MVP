// src/features/resources/SimulatorPage.tsx

import { Play, Clock, BarChart3 } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

import { CaseView } from './components/CaseView';
import { ResultView } from './components/ResultView';
import { SimulatorDashboard } from './components/SimulatorDashboard';
import { simulatorCases } from './data/simulatorCases';
import { SimulatorCase, SimulatorChoice, CaseCategory } from './data/simulatorTypes';
import { useSimulatorProgress } from './hooks/useSimulatorProgress';

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
        <Card className="relative flex min-h-[460px] flex-col rounded-[2.5rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/90 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/5" />

          <div className="relative z-10 my-auto space-y-6 py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">
              <Play className="h-10 w-10 text-blue-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Simulador
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                Treine decisões e encaminhamentos em situações simuladas do cotidiano escolar.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400 pt-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Progresso salvo</span>
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
              className="rounded-2xl px-10 py-5 text-sm font-bold shadow-xl shadow-blue-200 dark:shadow-none"
            >
              {progress.completedCases.length > 0 ? 'Continuar simulação' : 'Iniciar simulação'}
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
