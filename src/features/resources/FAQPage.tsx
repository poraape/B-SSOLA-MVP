import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search, Filter } from 'lucide-react';
import { faqData } from './data/faq';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredItems = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar no FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-400'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5' 
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500'
                  }`}>
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                      isOpen ? 'text-blue-500' : 'text-slate-400'
                    }`}>
                      {item.category}
                    </span>
                    <h3 className={`font-black tracking-tight leading-tight ${
                      isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'
                    }`}>
                      {item.question}
                    </h3>
                  </div>
                </div>
                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-50 dark:bg-slate-800'}`}>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-8 pl-14 md:pl-20">
                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" />
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 font-medium">Nenhuma pergunta encontrada para "{searchTerm}"</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
