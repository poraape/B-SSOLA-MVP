import {
  Suspense,
  lazy,
  useMemo,
  useRef,
  useState,
  useEffect,
  type FC,
} from 'react';
import { BookOpen } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { glossaryData } from './data/glossary';
import { useGlossarySearch } from './hooks/useGlossarySearch';
import { groupByAlphabet } from './utils/searchUtils';
import { GlossarySearch } from '../../components/GlossarySearch';

const GlossaryFilters = lazy(() =>
  import('./components/GlossaryFilters').then((module) => ({
    default: module.GlossaryFilters,
  }))
);

const AlphabetNav = lazy(() =>
  import('./components/AlphabetNav').then((module) => ({
    default: module.AlphabetNav,
  }))
);

const GlossaryCard = lazy(() =>
  import('./components/GlossaryCard').then((module) => ({
    default: module.GlossaryCard,
  }))
);

export const GlossaryPage: FC = () => {
  const [searchParams] = useSearchParams();
  const termFromUrl = searchParams.get('term');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const resultSectionRef = useRef<HTMLElement | null>(null);
  const lastScrolledTermRef = useRef<string | null>(null);

  const { categories, filteredItems, totalResults } = useGlossarySearch(
    glossaryData,
    search,
    selectedCategory,
    { includeRelated: true }
  );

  const groupedItems = useMemo(() => groupByAlphabet(filteredItems), [filteredItems]);

  const availableLetters = useMemo(
    () => Object.keys(groupedItems).filter((letter) => /^[A-Z]$/.test(letter)),
    [groupedItems]
  );

  const visibleLetters = useMemo(() => {
    if (selectedLetters.length === 0) {
      return availableLetters;
    }

    return availableLetters.filter((letter) => selectedLetters.includes(letter));
  }, [availableLetters, selectedLetters]);

  const buildGlossaryTermId = (term: string) =>
    `glossary-term-${term
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')}`;

  useEffect(() => {
    if (!termFromUrl) return;
    setSearch(termFromUrl);
    setSelectedCategory('all');
    setSelectedLetters([]);
  }, [termFromUrl]);

  useEffect(() => {
    if (!termFromUrl || lastScrolledTermRef.current === termFromUrl) return;

    const targetId = buildGlossaryTermId(termFromUrl);
    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        lastScrolledTermRef.current = termFromUrl;
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [termFromUrl, filteredItems]);

  const handleLetterSelect = (letter: string) => {
    if (!availableLetters.includes(letter)) {
      return;
    }

    setSelectedLetters((current) =>
      current.includes(letter)
        ? current.filter((existingLetter) => existingLetter !== letter)
        : [...current, letter]
    );

    document
      .getElementById(`letter-${letter}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRelatedClick = (term: string) => {
    setSearch(term);
    setSelectedCategory('all');
    setSelectedLetters([]);
    resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedLetters([]);
  };

  const handleSearchResultClick = (result: { id: string; term: string }) => {
    setSearch(result.term);
    setSelectedCategory('all');
    setSelectedLetters([]);

    requestAnimationFrame(() => {
      const element = document.getElementById(result.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  return (
    <main className="space-y-5" aria-label="Glossário educacional">
      <section className="rounded-[20px] border border-slate-200/70 bg-white/45 p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BookOpen className="size-6 text-blue-700" aria-hidden="true" />
            <h1 className="text-2xl font-black text-slate-900 md:text-[1.75rem]">
              Glossário
            </h1>
          </div>
          <Link
            to="/recursos/glossario/grafo"
            className="rounded-xl border border-slate-300/80 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.4)] transition-all hover:scale-[1.02] hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
          >
            Explorar grafo
          </Link>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
          Entenda termos usados no acolhimento, encaminhamento e contexto escolar.
        </p>
      </section>

      <GlossarySearch onResultClick={handleSearchResultClick} className="mb-6" />

      <Suspense fallback={<div className="h-20 animate-pulse rounded-2xl bg-slate-100" />}>
        <GlossaryFilters
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onClear={handleClearFilters}
        />
      </Suspense>

      {totalResults > 0 && (
        <Suspense fallback={<div className="h-16 animate-pulse rounded-2xl bg-slate-100" />}>
          <AlphabetNav
            availableLetters={availableLetters}
            onLetterSelect={handleLetterSelect}
            activeLetters={selectedLetters}
          />
        </Suspense>
      )}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {totalResults} {totalResults === 1 ? 'resultado encontrado' : 'resultados encontrados'}.
      </p>

      <section ref={resultSectionRef} aria-live="polite" aria-atomic="true" className="space-y-6">
        {totalResults === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-base font-semibold text-slate-700">Nenhum termo encontrado.</p>
            <p className="mt-1 text-sm text-slate-600">
              Ajuste a busca ou limpe os filtros para visualizar todos os termos.
            </p>
          </div>
        )}

        {visibleLetters.map((letter) => {
          const items = groupedItems[letter] ?? [];

          return (
            <section key={letter} id={`letter-${letter}`} aria-label={`Termos da letra ${letter}`}>
              <h2 className="mb-4 text-xl font-bold text-slate-900">{letter}</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Suspense
                  fallback={<div className="h-32 rounded-2xl border border-slate-200 bg-slate-50" />}
                >
                  {items.map((item) => (
                    <GlossaryCard
                      key={item.term}
                      item={item}
                      searchQuery={search}
                      onRelatedClick={handleRelatedClick}
                    />
                  ))}
                </Suspense>
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
};
