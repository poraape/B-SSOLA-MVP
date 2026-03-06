import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  ChevronRight,
  X,
  HelpCircle,
  BookOpen,
  GitBranch,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SearchFilterType } from '../services/unifiedSearchEngine';
import type { UnifiedSearchResult } from '../types/searchTypes';
import { useSearch } from '../context/SearchContext';

type SearchByTypeFn = (
  query: string,
  type: SearchFilterType,
) => UnifiedSearchResult[];

let searchByTypeFn: SearchByTypeFn | null = null;

async function getSearchByType(): Promise<SearchByTypeFn> {
  if (searchByTypeFn) return searchByTypeFn;

  const module = await import('../services/unifiedSearchEngine');
  searchByTypeFn = module.searchByType;
  return searchByTypeFn;
}

const TYPE_ICONS = {
  faq: HelpCircle,
  glossary: BookOpen,
  flow: GitBranch,
};

const TYPE_LABELS = {
  faq: 'FAQ',
  glossary: 'Glossário',
  flow: 'Decisor',
};

const TYPE_COLORS = {
  faq: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
  glossary: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
  flow: 'text-violet-600 bg-violet-50 dark:bg-violet-900/20',
};

export const SearchBar: React.FC = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<UnifiedSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState<SearchFilterType>('all');
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { closeSearch, isSearchOpen } = useSearch();

  useEffect(() => {
    let isCancelled = false;

    const executeSearch = async () => {
      if (term.trim().length < 2) {
        if (!isCancelled) {
          setResults([]);
          setIsOpen(false);
        }
        return;
      }

      const searchByType = await getSearchByType();
      const nextResults = searchByType(term, filterType);

      if (!isCancelled) {
        setResults(nextResults);
        setIsOpen(true);
      }
    };

    void executeSearch();

    return () => {
      isCancelled = true;
    };
  }, [term, filterType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      if (isOpen) {
        setIsOpen(false);
      } else {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeSearch]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const groupedResults = useMemo(() => {
    return results.reduce<Record<'faq' | 'glossary' | 'flow', UnifiedSearchResult[]>>(
      (acc, result) => {
        acc[result.type].push(result);
        return acc;
      },
      { faq: [], glossary: [], flow: [] },
    );
  }, [results]);

  const handleSelect = (result: UnifiedSearchResult) => {
    setTerm('');
    setIsOpen(false);
    closeSearch();
    navigate(result.url);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center flex-wrap">
        {(['all', 'faq', 'glossary', 'flow'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all min-h-[44px] ${
              filterType === type
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            aria-pressed={filterType === type}
            aria-label={`Filtrar busca por ${
              type === 'all' ? 'todos os conteúdos' : TYPE_LABELS[type]
            }`}
          >
            {type === 'all' ? 'Todos' : TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="relative group w-full" ref={containerRef}>
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Buscar em FAQ, Glossário ou Decisor..."
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onFocus={() => term.trim().length >= 2 && setIsOpen(true)}
          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg text-slate-900 dark:text-white"
          aria-label="Buscar conteúdo"
        />
        {term && (
          <button
            onClick={() => setTerm('')}
            className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Limpar busca"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {isOpen && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[32rem] overflow-y-auto">
            {(['faq', 'glossary', 'flow'] as const).map((type) => {
              const typeResults = groupedResults[type];
              if (typeResults.length === 0) return null;

              const Icon = TYPE_ICONS[type];

              return (
                <div key={type}>
                  <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                      {TYPE_LABELS[type]} ({typeResults.length})
                    </span>
                  </div>

                  {typeResults.map((result) => {
                    const ResultIcon = TYPE_ICONS[result.type];
                    return (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleSelect(result)}
                        className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-start gap-3 group"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${TYPE_COLORS[result.type]}`}
                        >
                          <ResultIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">
                            {result.title}
                          </p>
                          {result.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                              {result.description}
                            </p>
                          )}
                          {result.category && (
                            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                              {result.category}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {isOpen && term.trim().length >= 2 && results.length === 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Nenhum resultado encontrado para "{term}"
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Tente termos diferentes ou remova os filtros
            </p>
          </div>
        )}
      </div>

      {term.trim().length >= 2 && results.length > 0 && (
        <div className="text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            {results.length}{' '}
            {results.length === 1
              ? 'resultado encontrado'
              : 'resultados encontrados'}
          </p>
        </div>
      )}
    </div>
  );
};
