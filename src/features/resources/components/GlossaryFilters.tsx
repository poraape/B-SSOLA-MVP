import type { FC } from 'react';
import { Search, X } from 'lucide-react';

interface GlossaryFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClear: () => void;
}

export const GlossaryFilters: FC<GlossaryFiltersProps> = ({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  onClear,
}) => {
  const hasActiveFilters = search.trim() !== '' || selectedCategory !== 'all';

  return (
    <section className="space-y-4" aria-label="Filtros do glossário">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          role="searchbox"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por termo, definição ou contexto"
          aria-label="Buscar no glossário"
          className="w-full rounded-[16px] border border-slate-200/90 bg-white/85 py-3 pl-12 pr-11 text-slate-800 placeholder:text-slate-500 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div
        role="group"
        aria-label="Categorias do glossário"
        className="flex gap-2 overflow-x-auto pb-1"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isSelected}
              className={[
                'whitespace-nowrap rounded-[18px] border px-4 py-2 text-sm font-medium transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.7)]'
                  : 'border-slate-300/90 bg-white/80 text-slate-700 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200',
              ].join(' ')}
            >
              {category === 'all' ? 'Todas' : category}
            </button>
          );
        })}
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/20"
        >
          Limpar filtros
        </button>
      )}
    </section>
  );
};

export type { GlossaryFiltersProps };
