import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Flow } from '../../../types';
import { searchFlows } from '../../../domain/search/searchEngine';
import { getFlows, getCategories } from '../../../domain/flows/selectors';
import { useSearch } from '../context/SearchContext';

export const SearchBar: React.FC = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Flow[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { closeSearch, isSearchOpen } = useSearch();

  useEffect(() => {
    if (term.length >= 2) {
      const flows = getFlows();
      const categories = getCategories();
      const searchResults = searchFlows(flows, categories, term);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [term]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isOpen) {
          setIsOpen(false);
        } else {
          closeSearch();
        }
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

  const handleSelect = (flowId: string) => {
    setTerm('');
    setIsOpen(false);
    closeSearch();
    navigate(`/fluxo/${flowId}`);
  };

  return (
    <div className="relative group w-full" ref={containerRef}>
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input 
        ref={inputRef}
        type="text"
        placeholder="Buscar por situação (ex.: bullying, autolesão...)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => term.length >= 2 && setIsOpen(true)}
        className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-12 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg text-slate-900 dark:text-white"
      />
      {term && (
        <button 
          onClick={() => setTerm('')}
          className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto">
          {results.map((flow) => (
            <button
              key={flow.meta.id}
              onClick={() => handleSelect(flow.meta.id)}
              className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700 border-b border-slate-100 dark:border-slate-700 last:border-0 flex items-center justify-between group"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{flow.meta.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {getCategories().find(c => c.id === flow.meta.categoryId)?.label}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all" />
            </button>
          ))}
        </div>
      )}
      
      {isOpen && term.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 p-8 text-center text-slate-500 dark:text-slate-400">
          Nenhuma situação encontrada para "{term}"
        </div>
      )}
    </div>
  );
};
