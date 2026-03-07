import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { faqData, FAQ_CATEGORIES, type FAQCategory } from './data/faq';
import { FAQSearchBar } from './components/FAQSearchBar';
import { FAQCategoryFilter } from './components/FAQCategoryFilter';
import { FAQAccordionItem } from './components/FAQAccordionItem';
import { FAQFeedback } from './components/FAQFeedback';

export const FAQPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>(
    (searchParams.get('category') as FAQCategory) || 'all',
  );
  const [openIndex, setOpenIndex] = useState<string | null>(searchParams.get('open') || null);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (searchTerm) {
      nextParams.set('q', searchTerm);
    } else {
      nextParams.delete('q');
    }

    if (selectedCategory !== 'all') {
      nextParams.set('category', selectedCategory);
    } else {
      nextParams.delete('category');
    }

    if (openIndex) {
      nextParams.set('open', openIndex);
    } else {
      nextParams.delete('open');
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchTerm, selectedCategory, openIndex, searchParams, setSearchParams]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();
    return faqData.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(normalizedSearch) ||
        item.answer.toLowerCase().includes(normalizedSearch) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqData.length };
    faqData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setOpenIndex(null);
  };

  const handleFeedback = (questionId: string, isHelpful: boolean) => {
    console.log(`Feedback: ${questionId} - ${isHelpful ? 'Helpful' : 'Not Helpful'}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 rounded-[20px] border border-slate-200/70 bg-white/45 p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <FAQSearchBar value={searchTerm} onChange={setSearchTerm} resultsCount={filteredItems.length} />
        <FAQCategoryFilter
          categories={FAQ_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category as FAQCategory)}
          counts={categoryCounts}
        />
      </div>

      {(searchTerm || selectedCategory !== 'all') && (
        <div className="text-sm text-slate-500 dark:text-slate-400" role="status" aria-live="polite">
          {filteredItems.length === 0 ? (
            <span>Nenhum resultado encontrado</span>
          ) : (
            <span>
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </span>
          )}
        </div>
      )}

      <div className="space-y-5">
        {filteredItems.map((item) => {
          const isOpen = openIndex === item.id;
          return (
            <div key={item.id} className="space-y-4 rounded-[20px] border border-slate-200/85 bg-white/85 p-3 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900/70 md:p-4">
              <FAQAccordionItem
                item={item}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : item.id)}
              />
              {isOpen && (
                <div className="pl-12 md:pl-16">
                  <FAQFeedback questionId={item.id} onFeedback={handleFeedback} />
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-16 text-center rounded-[20px] border border-dashed border-slate-300 bg-white/75 dark:border-slate-700 dark:bg-slate-900/50">
            <p className="text-slate-500 font-medium mb-2">
              Nenhum resultado encontrado {searchTerm && `para "${searchTerm}"`}
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Tente outro termo ou explore as categorias disponíveis.
            </p>
            <button
              onClick={handleClearFilters}
              className="min-h-[44px] rounded-[18px] border border-slate-300/80 bg-white/80 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-700 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.4)] transition-all hover:scale-[1.02] hover:border-blue-400 hover:text-blue-600 focus:ring-4 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
