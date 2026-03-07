import React from 'react';

interface FAQCategoryFilterProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  counts?: Record<string, number>;
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Todas',
  Geral: 'Geral',
  'Uso do App': 'Uso do App',
  Protocolos: 'Protocolos',
  Docentes: 'Docentes',
  'Rede de Apoio': 'Rede de Apoio',
  Troubleshooting: 'Suporte Técnico',
};

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  counts,
}) => {
  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto"
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat;
        const label = CATEGORY_LABELS[cat] || cat;
        const count = counts?.[cat];

        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            aria-pressed={isSelected}
            aria-label={`Filtrar por ${label}${count ? ` (${count} perguntas)` : ''}`}
            className={`min-h-[44px] whitespace-nowrap rounded-[18px] px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
              isSelected
                ? 'bg-blue-600 text-white shadow-[0_10px_24px_-18px_rgba(37,99,235,0.75)]'
                : 'border border-slate-300/80 bg-white/80 text-slate-600 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-300'
            }`}
          >
            {label}
            {count !== undefined && count > 0 && (
              <span className="ml-2 opacity-70">({count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
