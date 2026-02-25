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
    <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10 space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Buscar serviço ou endereço..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Todos
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-blue-600 text-white' 
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
