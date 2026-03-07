// src/features/resources/components/CaseView.tsx

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Lightbulb, MapPin, Users, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { SimulatorCase, SimulatorChoice, CATEGORY_LABELS, DIFFICULTY_LABELS } from '../data/simulatorTypes';

interface CaseViewProps {
  case: SimulatorCase;
  timeSpent: number;
  onSelectChoice: (choice: SimulatorChoice) => void;
  onBack: () => void;
}

export const CaseView: React.FC<CaseViewProps> = ({
  case: simCase,
  timeSpent,
  onSelectChoice,
  onBack
}) => {
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [hintTimerActive, setHintTimerActive] = useState(false);

  const categoryInfo = CATEGORY_LABELS[simCase.category];
  const difficultyInfo = DIFFICULTY_LABELS[simCase.difficulty];
  const contextTitle =
    simCase.context?.school ??
    (simCase.context?.grade && simCase.context?.gradeSection
      ? `${simCase.context.grade} • Turma ${simCase.context.gradeSection}`
      : simCase.context?.location ?? 'Contexto do cenário');
  const contextDetails =
    simCase.context?.demographics ??
    simCase.context?.populationCharacteristic ??
    (simCase.context?.classSize ? `Turma: ${simCase.context.classSize} estudantes` : '');

  // Timer para mostrar sugestão de dica após 30s
  useEffect(() => {
    if (simCase.hints && simCase.hints.length > 0 && !showHint) {
      const timer = setTimeout(() => {
        setHintTimerActive(true);
      }, 30000); // 30 segundos

      return () => clearTimeout(timer);
    }
  }, [simCase.hints, showHint]);

  const handleShowHint = () => {
    setShowHint(true);
    setHintTimerActive(false);
  };

  const handleNextHint = () => {
    if (simCase.hints && currentHintIndex < simCase.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Painel
        </Button>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300">
              {formatTime(timeSpent)}
            </span>
          </div>

          {/* Hint Button */}
          {simCase.hints && simCase.hints.length > 0 && (
            <Button
              onClick={handleShowHint}
              variant="outline"
              size="sm"
              className={`relative ${hintTimerActive ? 'animate-pulse border-amber-500' : ''}`}
            >
              <Lightbulb className={`w-4 h-4 mr-2 ${showHint ? 'text-amber-500' : ''}`} />
              Dica
              {hintTimerActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Case Card */}
      <Card className="rounded-[20px] border border-slate-200/90 bg-white/85 p-6 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/80 md:p-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${categoryInfo.color}-100 dark:bg-${categoryInfo.color}-900/20 text-${categoryInfo.color}-700 dark:text-${categoryInfo.color}-400 flex items-center gap-1`}>
            <span>{categoryInfo.icon}</span>
            {categoryInfo.label}
          </span>
          <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-${difficultyInfo.color}-100 dark:bg-${difficultyInfo.color}-900/20 text-${difficultyInfo.color}-700 dark:text-${difficultyInfo.color}-400`}>
            {difficultyInfo.label}
          </span>
          <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            ~{simCase.estimatedTime} min
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
          {simCase.title}
        </h2>

        {/* Context (if available) */}
        {simCase.context && (
          <div className="mb-6 rounded-[16px] border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-800 dark:bg-blue-900/15">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="space-y-1 text-sm">
                <p className="font-bold text-blue-900 dark:text-blue-100">
                  {contextTitle}
                </p>
                <p className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {contextDetails || 'Informações contextuais disponíveis no cenário.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Situation */}
        <div className="mb-8 rounded-[16px] border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-700 dark:bg-slate-800/50 md:p-8">
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
            "{simCase.situation}"
          </p>
        </div>

        {/* Hint Display */}
        {showHint && simCase.hints && simCase.hints.length > 0 && (
          <div className="mb-6 rounded-[16px] border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-800 dark:bg-amber-900/15">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-1">
                  Dica {currentHintIndex + 1} de {simCase.hints.length}
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  {simCase.hints[currentHintIndex]}
                </p>
                {currentHintIndex < simCase.hints.length - 1 && (
                  <Button
                    onClick={handleNextHint}
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-xs text-amber-700 dark:text-amber-300"
                  >
                    Próxima dica →
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Choices */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center mb-4">
            Qual sua conduta?
          </h3>
          
          {simCase.choices.map((choice, index) => (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice)}
            className="group w-full rounded-[16px] border border-slate-200/90 bg-white/85 p-5 text-left shadow-[0_10px_20px_-18px_rgba(15,23,42,0.35)] transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50/60 dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-blue-500 dark:hover:bg-blue-900/15 md:p-6"
          >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-600 dark:text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <p className="flex-1 font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                  {choice.label}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Warning */}
        <div className="mt-6 flex items-start gap-3 rounded-[16px] border border-slate-200 bg-slate-50/85 p-4 dark:border-slate-700 dark:bg-slate-800/80">
          <AlertCircle className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>Importante:</strong> Sua escolha será registrada e não poderá ser alterada nesta sessão. 
            Pense cuidadosamente antes de decidir.
          </p>
        </div>
      </Card>
    </div>
  );
};
