// src/features/resources/components/GlossaryFilters.tsx

import React from 'react';
import { Search, X } from 'lucide-react';

interface GlossaryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClear: () => void;
}

export const GlossaryFilters: React.FC<GlossaryFiltersProps> = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onClear,
}) => {
  return (
    <section
      className="space-y-4"
      aria-label="Ferramentas de busca e filtros"
    >
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar termo, definição ou gíria..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          aria-label="Pesquisar glossário"
          role="searchbox"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar flex-wrap"
        role="group"
        aria-label="Filtrar por categoria"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
            }`}
            aria-pressed={selectedCategory === cat}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Clear Button */}
      {(search || selectedCategory !== 'all') && (
        <button
          onClick={onClear}
          className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          aria-label="Limpar filtros"
        >
          ✕ Limpar filtros
        </button>
      )}
    </section>
  );
};
