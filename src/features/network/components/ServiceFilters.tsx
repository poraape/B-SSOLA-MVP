import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ServiceFiltersProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  categories: string[];
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="sticky top-0 z-10 space-y-3 border-b border-slate-200/90 bg-white/90 p-4 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/85">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar serviço, endereço ou referência..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-[16px] border border-slate-200/90 bg-white/85 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200 dark:focus:border-blue-500"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        <button
          onClick={() => onCategoryChange('all')}
          className={`whitespace-nowrap rounded-[18px] border px-3 py-1 text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'border-blue-600 bg-blue-600 text-white shadow-[0_8px_16px_-14px_rgba(37,99,235,0.9)]'
              : 'border-slate-300/90 bg-white/80 text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-300'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap rounded-[18px] border px-3 py-1 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'border-blue-600 bg-blue-600 text-white shadow-[0_8px_16px_-14px_rgba(37,99,235,0.9)]'
                : 'border-slate-300/90 bg-white/80 text-slate-600 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};
