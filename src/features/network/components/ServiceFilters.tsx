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
    <div className="sticky top-0 z-10 space-y-3 border-b border-slate-200/90 bg-white/95 p-4 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.45)] backdrop-blur-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar serviço, endereço ou referência..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        <button
          onClick={() => onCategoryChange('all')}
          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white shadow-[0_8px_16px_-14px_rgba(15,23,42,0.9)]'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-[0_8px_16px_-14px_rgba(15,23,42,0.9)]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};
