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
          className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-11 text-slate-800 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
                'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-700',
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
          className="rounded-lg px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Limpar filtros
        </button>
      )}
    </section>
  );
};

export type { GlossaryFiltersProps };
