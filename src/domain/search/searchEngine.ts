import { Flow, Category } from '../../types';

export const searchFlows = (
  flows: Flow[], 
  categories: Category[], 
  term: string
): Flow[] => {
  if (!term || term.length < 2) return [];
  
  const normalizedTerm = term.toLowerCase();

  return flows.filter(flow => {
    const matchesTitle = flow.meta.title.toLowerCase().includes(normalizedTerm);
    const matchesKeywords = flow.meta.keywords?.some(k => k.toLowerCase().includes(normalizedTerm));
    const category = categories.find(c => c.id === flow.meta.categoryId);
    const matchesCategory = category?.label.toLowerCase().includes(normalizedTerm);
    const matchesSubcategory = flow.meta.subcategory.toLowerCase().includes(normalizedTerm);

    return matchesTitle || matchesKeywords || matchesCategory || matchesSubcategory;
  });
};
