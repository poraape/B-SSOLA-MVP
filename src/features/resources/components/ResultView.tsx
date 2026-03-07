// src/features/resources/components/ResultView.tsx

import { CheckCircle2, AlertTriangle, XCircle, RotateCcw, BarChart3, BookOpen, ExternalLink, Clock, Target } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { SimulatorCase, SimulatorChoice } from '../data/simulatorTypes';

interface ResultViewProps {
  case: SimulatorCase;
  choice: SimulatorChoice;
  timeSpent: number;
  onBackToDashboard: () => void;
  onReset: () => void;
}

type TabType = 'decision' | 'analysis' | 'resources';

export const ResultView: React.FC<ResultViewProps> = ({
  choice,
  timeSpent,
  onBackToDashboard,
  onReset
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('decision');

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'emerald';
    if (score >= 60) return 'amber';
    return 'rose';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="w-10 h-10" />;
    if (score >= 60) return <AlertTriangle className="w-10 h-10" />;
    return <XCircle className="w-10 h-10" />;
  };

  const getScoreLabel = (score: number): string => {
    if (score >= 90) return 'Conduta Exemplar!';
    if (score >= 80) return 'Conduta Adequada!';
    if (score >= 60) return 'Conduta Parcialmente Adequada';
    if (score >= 40) return 'Conduta Inadequada';
    return 'Conduta Gravemente Inadequada';
  };

  const scoreColor = getScoreColor(choice.score);
  const scoreLabel = getScoreLabel(choice.score);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}min ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Card className="flex gap-2 rounded-[20px] border border-slate-200/90 bg-white/85 p-2 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/80">
        <button
          onClick={() => setActiveTab('decision')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
            activeTab === 'decision'
              ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.8)]'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Sua Decisão
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
            activeTab === 'analysis'
              ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.8)]'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Análise
        </button>
        {choice.feedback.resources && choice.feedback.resources.length > 0 && (
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-3 px-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
              activeTab === 'resources'
                ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.8)]'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            Recursos
          </button>
        )}
      </Card>

      {/* Content */}
      <Card className="rounded-[20px] border border-slate-200/90 bg-white/85 p-6 shadow-[0_12px_24px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/80 md:p-8">
        {/* Tab: Decision */}
        {activeTab === 'decision' && (
          <div className="space-y-8">
            {/* Score Header */}
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg bg-${scoreColor}-100 dark:bg-${scoreColor}-900/30 text-${scoreColor}-600`}>
                {getScoreIcon(choice.score)}
              </div>
              <div className="flex-1">
                <h2 className={`text-3xl md:text-4xl font-black tracking-tight text-${scoreColor}-600 mb-2`}>
                  {scoreLabel}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase text-xs tracking-widest">
                  Avaliação baseada em protocolos e legislação
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Pontuação</span>
                </div>
                <div className={`text-3xl font-black text-${scoreColor}-600`}>
                  {choice.score}/100
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Tempo</span>
                </div>
                <div className="text-3xl font-black text-slate-700 dark:text-slate-300">
                  {formatTime(timeSpent)}
                </div>
              </div>
            </div>

            {/* Your Choice */}
            <div>
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">
                Você escolheu:
              </h3>
              <div className="rounded-[16px] border border-slate-200 bg-slate-50/85 p-5 dark:border-slate-700 dark:bg-slate-800/75">
                <p className="text-slate-700 dark:text-slate-200 font-bold">
                  {choice.label}
                </p>
              </div>
            </div>

            {/* Immediate Feedback */}
            <div className={`p-6 rounded-2xl border-2 bg-${scoreColor}-50 dark:bg-${scoreColor}-900/10 border-${scoreColor}-200 dark:border-${scoreColor}-800`}>
              <p className={`text-base md:text-lg text-${scoreColor}-900 dark:text-${scoreColor}-100 leading-relaxed font-medium`}>
                {choice.feedback.immediate}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                Entenda os detalhes da sua decisão e aprenda com o protocolo correto →
              </p>
              <Button
                onClick={() => setActiveTab('analysis')}
                variant="primary"
                className="w-full rounded-[18px] py-5 text-xs font-black uppercase tracking-widest"
              >
                Ver Análise Completa
              </Button>
            </div>
          </div>
        )}

        {/* Tab: Analysis */}
        {activeTab === 'analysis' && (
          <div className="space-y-8">
            {/* Section: Analysis */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Análise Pedagógica
                </h3>
              </div>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {choice.feedback.analysis}
                </p>
              </div>
            </div>

            {/* Section: Protocol */}
            {choice.feedback.protocol && (
              <div className="rounded-[16px] border border-blue-200 bg-blue-50/80 p-6 dark:border-blue-800 dark:bg-blue-900/15">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-blue-900 dark:text-blue-100">
                    Protocolo Institucional
                  </h3>
                </div>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-blue-900 dark:text-blue-100 leading-relaxed whitespace-pre-line">
                    {choice.feedback.protocol}
                  </p>
                </div>
              </div>
            )}

            {/* Section: Consequences */}
            {choice.feedback.consequences && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Consequências e Impactos
                  </h3>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {choice.feedback.consequences}
                  </p>
                </div>
              </div>
            )}

            {/* CTA to Resources */}
            {choice.feedback.resources && choice.feedback.resources.length > 0 && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={() => setActiveTab('resources')}
                  variant="outline"
                  className="w-full rounded-[18px] py-5 text-xs font-black uppercase tracking-widest"
                >
                  Ver Recursos de Aprofundamento →
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Resources */}
        {activeTab === 'resources' && choice.feedback.resources && (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                Recursos de Aprofundamento
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Materiais complementares para estudo e referência
              </p>
            </div>

            <div className="space-y-3">
              {choice.feedback.resources.map((resource, index) => {
                const typeColors = {
                  lei: 'purple',
                  protocolo: 'blue',
                  artigo: 'emerald',
                  video: 'rose'
                };
                const typeLabels = {
                  lei: 'Legislação',
                  protocolo: 'Protocolo',
                  artigo: 'Artigo',
                  video: 'Vídeo'
                };
                const color = typeColors[resource.type];
                const typeLabel = typeLabels[resource.type];

                return (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[16px] border border-slate-200/90 bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50/70 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-blue-500 dark:hover:bg-blue-900/15"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-${color}-100 dark:bg-${color}-900/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <ExternalLink className={`w-6 h-6 text-${color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold uppercase tracking-wider text-${color}-600 mb-1`}>
                          {typeLabel}
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {resource.url}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onBackToDashboard}
          variant="primary"
          className="flex-1 rounded-[18px] py-5 text-xs font-black uppercase tracking-widest"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Tentar Outro Cenário
        </Button>
        <Button
          onClick={onReset}
          variant="ghost"
          className="flex-1 rounded-[18px] py-5 text-xs font-black uppercase tracking-widest text-slate-400"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reiniciar Tudo
        </Button>
      </div>
    </div>
  );
};
