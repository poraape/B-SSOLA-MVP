import { useEffect, useMemo, useState } from 'react';
import { glossaryData, type GlossaryItem } from '../../data/glossary';
import { normalizeText } from '../utils/textTokenizer';
import { CategoryExplorer } from './CategoryExplorer';
import { GlossarySearch } from './GlossarySearch';
import { GlossaryTermPage } from './GlossaryTermPage';

const RECENT_STORAGE_KEY = 'glossary_recent_terms_v1';

const FEATURED_TERMS = [
  'Acolhimento Inicial (Primeira Escuta)',
  'Fluxo de Encaminhamento',
  'Conselho Tutelar (CT)',
  'Bullying / Assédio Moral entre Pares',
  'LGPD na Escola (Lei Geral de Proteção de Dados)',
  'CAPS i (Centro de Atenção Psicossocial Infantojuvenil)',
];

const safeParse = (value: string | null): string[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is string => typeof entry === 'string');
  } catch {
    return [];
  }
};

export const GlossaryExplorer = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryItem['category'] | 'all'>('all');
  const [selectedAudience, setSelectedAudience] = useState<GlossaryItem['audienceLevel'] | 'all'>('all');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryItem | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const cached = safeParse(window.localStorage.getItem(RECENT_STORAGE_KEY));
    setRecentlyViewed(cached);
  }, []);

  const registerRecentTerm = (term: GlossaryItem) => {
    setRecentlyViewed((previous) => {
      const next = [term.term, ...previous.filter((item) => item !== term.term)].slice(0, 8);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      }

      return next;
    });
  };

  const handleTermSelect = (term: GlossaryItem) => {
    setSelectedTerm(term);
    registerRecentTerm(term);
  };

  const featuredTerms = useMemo(
    () =>
      FEATURED_TERMS.map((name) => glossaryData.find((item) => item.term === name)).filter(
        (item): item is GlossaryItem => Boolean(item)
      ),
    []
  );

  const recentlyViewedItems = useMemo(() => {
    const byNormalizedTerm = new Map(
      glossaryData.map((item) => [normalizeText(item.term), item])
    );

    return recentlyViewed
      .map((term) => byNormalizedTerm.get(normalizeText(term)))
      .filter((item): item is GlossaryItem => Boolean(item));
  }, [recentlyViewed]);

  if (selectedTerm) {
    return (
      <GlossaryTermPage
        term={selectedTerm}
        glossary={glossaryData}
        onSelectTerm={handleTermSelect}
        onBack={() => setSelectedTerm(null)}
      />
    );
  }

  return (
    <main className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-black text-slate-900">Glossário explorável</h1>
        <p className="mt-2 text-sm text-slate-600">
          Pesquise por conceito, navegue por categoria e siga conexões semânticas entre termos.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <GlossarySearch
              data={glossaryData}
              query={query}
              onQueryChange={setQuery}
              onSelectTerm={handleTermSelect}
              categoryFilter={selectedCategory}
              audienceLevelFilter={selectedAudience}
              maxResults={10}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="audience-filter" className="block text-sm font-semibold text-slate-700">
              Público
            </label>
            <select
              id="audience-filter"
              value={selectedAudience}
              onChange={(event) => setSelectedAudience(event.target.value as GlossaryItem['audienceLevel'] | 'all')}
              className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm text-slate-800"
            >
              <option value="all">Todos os níveis</option>
              <option value="leigo">Leigo</option>
              <option value="técnico">Técnico</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Termos em destaque</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {featuredTerms.map((item) => (
            <button
              key={item.term}
              type="button"
              onClick={() => handleTermSelect(item)}
              className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-slate-900">{item.term}</p>
              <p className="mt-1 text-xs text-blue-700">{item.category}</p>
            </button>
          ))}
        </div>
      </section>

      {recentlyViewedItems.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Vistos recentemente</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {recentlyViewedItems.map((item) => (
              <button
                key={item.term}
                type="button"
                onClick={() => handleTermSelect(item)}
                className="rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-blue-300"
              >
                <p className="text-sm font-semibold text-slate-900">{item.term}</p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-600">{item.definition}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900">Explorar por categoria</h2>
        <CategoryExplorer
          glossary={glossaryData}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSelectTerm={handleTermSelect}
        />
      </section>
    </main>
  );
};
