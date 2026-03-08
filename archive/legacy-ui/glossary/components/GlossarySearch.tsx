import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { GlossaryItem } from '../../data/glossary';
import { useGlossarySearch } from '../hooks/useGlossarySearch';
import { normalizeText } from '../utils/textTokenizer';

export interface GlossarySearchProps {
  data?: GlossaryItem[];
  query: string;
  onQueryChange: (value: string) => void;
  onSelectTerm: (item: GlossaryItem) => void;
  categoryFilter?: GlossaryItem['category'] | 'all';
  audienceLevelFilter?: GlossaryItem['audienceLevel'] | 'all';
  maxResults?: number;
  placeholder?: string;
}

const highlightMatch = (text: string, query: string): ReactNode => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return text;
  }

  const normalizedText = normalizeText(text);
  const start = normalizedText.indexOf(normalizedQuery);

  if (start === -1) {
    return text;
  }

  const end = start + normalizedQuery.length;

  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded bg-amber-100 px-1 text-amber-900">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
};

export const GlossarySearch = ({
  data,
  query,
  onQueryChange,
  onSelectTerm,
  categoryFilter = 'all',
  audienceLevelFilter = 'all',
  maxResults = 8,
  placeholder = 'Buscar termo, contexto ou exemplo prático',
}: GlossarySearchProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { results } = useGlossarySearch({
    data,
    query,
    category: categoryFilter,
    audienceLevel: audienceLevelFilter,
    limit: maxResults,
  });

  const hasQuery = query.trim().length > 0;
  const visibleResults = useMemo(() => (hasQuery ? results : []), [hasQuery, results]);

  useEffect(() => {
    setActiveIndex(visibleResults.length > 0 ? 0 : -1);
  }, [query, visibleResults.length]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (item: GlossaryItem) => {
    onSelectTerm(item);
    onQueryChange(item.term);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor="glossary-search-input" className="mb-2 block text-sm font-semibold text-slate-700">
        Busca semântica
      </label>

      <input
        id="glossary-search-input"
        type="search"
        value={query}
        onChange={(event) => {
          onQueryChange(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (!visibleResults.length) {
            return;
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((prev) => Math.min(prev + 1, visibleResults.length - 1));
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }

          if (event.key === 'Enter' && activeIndex >= 0) {
            event.preventDefault();
            handleSelect(visibleResults[activeIndex].item);
          }

          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      {isOpen && hasQuery && (
        <div className="absolute z-30 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {visibleResults.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-600">Nenhum termo encontrado.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {visibleResults.map((result, index) => (
                <li key={result.item.term}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(result.item)}
                    className={[
                      'flex w-full flex-col gap-1 px-4 py-3 text-left transition',
                      index === activeIndex ? 'bg-blue-50' : 'hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      {highlightMatch(result.item.term, query)}
                    </span>
                    <span className="text-xs text-slate-600">
                      {result.item.category} • {result.item.audienceLevel}
                    </span>
                    <span className="line-clamp-2 text-xs text-slate-700">
                      {highlightMatch(result.item.definition, query)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
