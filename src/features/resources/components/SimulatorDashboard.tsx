// src/features/resources/components/SimulatorDashboard.tsx

import React, { useState } from 'react';
import { BarChart3, Filter, Search, RotateCcw, FileDown, CheckCircle2, Clock, Target } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { SimulatorCase, CaseCategory, CATEGORY_LABELS, DIFFICULTY_LABELS, UserProgress } from '../data/simulatorTypes';

interface SimulatorDashboardProps {
  cases: SimulatorCase[];
  progress: UserProgress;
  filterCategory: CaseCategory | 'all';
  onFilterChange: (category: CaseCategory | 'all') => void;
  onSelectCase: (simCase: SimulatorCase) => void;
  onReset: () => void;
  isCaseCompleted: (caseId: string) => boolean;
  getCaseScore: (caseId: string) => number | null;
}

export const SimulatorDashboard: React.FC<SimulatorDashboardProps> = ({
  cases,
  progress,
  filterCategory,
  onFilterChange,
  onSelectCase,
  onReset,
  isCaseCompleted,
  getCaseScore
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const totalCases = cases.length;
  const completedCount = progress.completedCases.length;
  const completionRate = totalCases > 0 ? Math.round((completedCount / totalCases) * 100) : 0;

  // Filtrar por busca
  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.situation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Agrupar por categoria para exibição
  const categoriesWithCases = Object.keys(CATEGORY_LABELS).map(cat => {
    const category = cat as CaseCategory;
    const categoryCases = filteredCases.filter(c => c.category === category);
    return {
      category,
      cases: categoryCases,
      count: categoryCases.length
    };
  }).filter(g => g.count > 0);

  const handleExportReport = () => {
    const report = {
      exportedAt: new Date().toISOString(),
      progress,
      summary: {
        totalCases,
        completedCount,
        completionRate,
        averageScore: progress.totalScore
      }
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bussola-simulador-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Painel de Treinamento
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Selecione um cenário para iniciar
          </p>
        </div>
        <Button
          onClick={onReset}
          variant="ghost"
          className="text-xs uppercase tracking-widest"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar Progresso
        </Button>
      </div>

      {/* Progress Card */}
      <Card className="p-6 border-2 border-slate-100 dark:border-slate-800 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Seu Desempenho
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Última sessão: {new Date(progress.lastSession).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <Button
            onClick={handleExportReport}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <FileDown className="w-3 h-3 mr-1" />
            Exportar
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-black text-blue-600 mb-1">
              {completedCount}/{totalCases}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Cenários
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-600 mb-1">
              {completionRate}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Conclusão
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-purple-600 mb-1">
              {progress.totalScore}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pontuação Média
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar cenário..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterCategory}
            onChange={(e) => onFilterChange(e.target.value as CaseCategory | 'all')}
            className="px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
          >
            <option value="all">Todas Categorias</option>
            {Object.entries(CATEGORY_LABELS).map(([key, { label, icon }]) => (
              <option key={key} value={key}>
                {icon} {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      {filteredCases.length === 0 ? (
        <Card className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-700">
          <div className="text-slate-400 dark:text-slate-500 mb-2">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Nenhum cenário encontrado
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Tente ajustar os filtros ou termo de busca
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {categoriesWithCases.map(({ category, cases: categoryCases }) => (
            <div key={category}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${CATEGORY_LABELS[category].color}-100 dark:bg-${CATEGORY_LABELS[category].color}-900/20 flex items-center justify-center text-xl`}>
                  {CATEGORY_LABELS[category].icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {CATEGORY_LABELS[category].label}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {CATEGORY_LABELS[category].description}
                  </p>
                </div>
              </div>

              {/* Cases in Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryCases.map((simCase) => {
                  const isCompleted = isCaseCompleted(simCase.id);
                  const score = getCaseScore(simCase.id);
                  const difficultyInfo = DIFFICULTY_LABELS[simCase.difficulty];

                  return (
                    <Card
                      key={simCase.id}
                      className={`p-5 border-2 transition-all cursor-pointer group hover:shadow-lg ${
                        isCompleted
                          ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10'
                          : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500'
                      }`}
                      onClick={() => onSelectCase(simCase)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-900/30'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          {simCase.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-black text-slate-900 dark:text-white text-base group-hover:text-blue-600 transition-colors">
                              {simCase.title}
                            </h4>
                            {isCompleted && (
                              <div className="shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
                            {simCase.situation}
                          </p>

                          {/* Metadata */}
                          <div className="flex items-center gap-3 text-xs">
                            <span className={`px-2 py-1 rounded-md font-bold bg-${difficultyInfo.color}-100 dark:bg-${difficultyInfo.color}-900/20 text-${difficultyInfo.color}-700 dark:text-${difficultyInfo.color}-400`}>
                              {difficultyInfo.label}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                              <Clock className="w-3 h-3" />
                              ~{simCase.estimatedTime} min
                            </span>
                            {isCompleted && score !== null && (
                              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                <Target className="w-3 h-3" />
                                {score} pts
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
