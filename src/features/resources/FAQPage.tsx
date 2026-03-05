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
    <div className="max-w-4xl mx-auto space-y-8">
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
              {filteredItems.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}
            </span>
          )}
        </div>
      )}

      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isOpen = openIndex === item.id;
          return (
            <div key={item.id} className="space-y-4">
              <FAQAccordionItem
                item={item}
                isOpen={isOpen}
                onToggle={() => setOpenIndex(isOpen ? null : item.id)}
              />
              {isOpen && (
                <div className="pl-14 md:pl-20">
                  <FAQFeedback questionId={item.id} onFeedback={handleFeedback} />
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 font-medium mb-2">
              Nenhuma pergunta encontrada {searchTerm && `para "${searchTerm}"`}
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Tente usar termos diferentes ou navegue pelas categorias
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-blue-600 text-white font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-500/20 min-h-[44px]"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
