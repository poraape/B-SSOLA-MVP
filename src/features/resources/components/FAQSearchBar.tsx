import React from 'react';
import { Search, X } from 'lucide-react';

interface FAQSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount: number;
}

export const FAQSearchBar: React.FC<FAQSearchBarProps> = ({
  value,
  onChange,
  resultsCount,
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full md:max-w-md">
      <label htmlFor="faq-search" className="sr-only">
        Pesquisar no FAQ
      </label>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
        aria-hidden="true"
      />
      <input
        id="faq-search"
        type="search"
        placeholder="Pesquisar no FAQ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Pesquisar perguntas frequentes"
        aria-describedby={value ? 'search-results-count' : undefined}
        className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
      />
      {value && (
        <>
          <button
            onClick={handleClear}
            aria-label="Limpar busca"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
          <span id="search-results-count" className="sr-only">
            {resultsCount}{' '}
            {resultsCount === 1
              ? 'resultado encontrado'
              : 'resultados encontrados'}
          </span>
        </>
      )}
    </div>
  );
};
