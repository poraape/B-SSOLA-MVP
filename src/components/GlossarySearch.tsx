import { Search } from 'lucide-react';
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { glossaryData } from '../features/resources/data/glossary';
import { useGlossarySearch } from '../features/resources/hooks/useGlossarySearch';

interface GlossarySearchResult {
  id: string;
  term: string;
  definition: string;
}

interface GlossarySearchProps {
  onResultClick?: (term: GlossarySearchResult) => void;
  placeholder?: string;
  className?: string;
}

const buildGlossaryTermId = (term: string): string =>
  `glossary-term-${term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

export const GlossarySearch: FC<GlossarySearchProps> = ({
  onResultClick,
  placeholder = 'Buscar termo...',
  className = '',
}) => {
  const [query, setQuery] = useState('');

  const { filteredItems } = useGlossarySearch(glossaryData, query, 'all', {
    includeRelated: true,
  });

  const results = useMemo(
    () =>
      filteredItems.slice(0, 10).map((item) => ({
        id: buildGlossaryTermId(item.term),
        term: item.term,
        definition: item.definition,
      })),
    [filteredItems]
  );

  const hasQuery = query.trim().length > 0;

  return (
    <div className={`relative ${className}`.trim()}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Buscar no glossário"
        />
      </div>

      {hasQuery && (
        <div className="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {results.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onResultClick?.(item)}
                    className="w-full cursor-pointer px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <div className="font-semibold text-slate-900">{item.term}</div>
                    <div className="line-clamp-2 text-sm text-slate-600">{item.definition}</div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-slate-500">Nenhum resultado para &quot;{query}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
};

export type { GlossarySearchProps, GlossarySearchResult };
