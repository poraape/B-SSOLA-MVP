import React, { useState } from 'react';
import { Search, BookOpen, Info } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { glossaryData } from './data/glossary';

export const GlossaryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(glossaryData.map(item => item.category)))];

  const filteredItems = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
                         item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar termo ou gíria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <Card key={index} className="p-6 md:p-8 space-y-4 border-2 border-slate-100 dark:border-slate-800 flex flex-col h-full">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${
                item.category === 'Gírias Estudantis' 
                  ? 'bg-purple-50 dark:bg-purple-900/20' 
                  : 'bg-blue-50 dark:bg-blue-900/20'
              }`}>
                <BookOpen className={`w-5 h-5 ${
                  item.category === 'Gírias Estudantis' ? 'text-purple-600' : 'text-blue-600'
                }`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                item.category === 'Gírias Estudantis'
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {item.category}
              </span>
            </div>
            
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.term}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {item.definition}
              </p>
            </div>

            {item.context && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] italic text-slate-500 dark:text-slate-400 leading-snug">
                  <span className="font-bold not-italic uppercase tracking-tighter mr-1">Contexto:</span>
                  {item.context}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-medium">Nenhum termo encontrado para "{search}"</p>
          <button 
            onClick={() => { setSearch(''); setSelectedCategory('all'); }}
            className="mt-4 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
