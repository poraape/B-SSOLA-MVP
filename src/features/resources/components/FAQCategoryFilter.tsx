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
            className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all min-h-[44px] ${
              isSelected
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700'
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
