import { useMemo, useState } from 'react';
import type { GlossaryItem } from '../../data/glossary';

export interface CategoryExplorerProps {
  glossary: GlossaryItem[];
  selectedCategory?: GlossaryItem['category'] | 'all';
  onCategoryChange?: (category: GlossaryItem['category'] | 'all') => void;
  onSelectTerm: (item: GlossaryItem) => void;
}

export const CategoryExplorer = ({
  glossary,
  selectedCategory = 'all',
  onCategoryChange,
  onSelectTerm,
}: CategoryExplorerProps) => {
  const [internalCategory, setInternalCategory] = useState<GlossaryItem['category'] | 'all'>('all');

  const category = onCategoryChange ? selectedCategory : internalCategory;

  const categories = useMemo(
    () => Array.from(new Set(glossary.map((item) => item.category))),
    [glossary]
  );

  const grouped = useMemo(() => {
    const source = category === 'all'
      ? glossary
      : glossary.filter((item) => item.category === category);

    return source.reduce<Record<string, GlossaryItem[]>>((acc, item) => {
      const current = acc[item.category] ?? [];
      current.push(item);
      acc[item.category] = current;
      return acc;
    }, {});
  }, [glossary, category]);

  const changeCategory = (value: GlossaryItem['category'] | 'all') => {
    if (onCategoryChange) {
      onCategoryChange(value);
      return;
    }

    setInternalCategory(value);
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => changeCategory('all')}
          className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
            category === 'all'
              ? 'bg-blue-600 text-white'
              : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-400'
          }`}
        >
          Todas
        </button>

        {categories.map((itemCategory) => (
          <button
            key={itemCategory}
            type="button"
            onClick={() => changeCategory(itemCategory)}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              itemCategory === category
                ? 'bg-blue-600 text-white'
                : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-400'
            }`}
          >
            {itemCategory}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([groupName, terms]) => (
          <section key={groupName} className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">{groupName}</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {terms.map((item) => (
                <button
                  key={item.term}
                  type="button"
                  onClick={() => onSelectTerm(item)}
                  className="rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.term}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-600">{item.definition}</p>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};
