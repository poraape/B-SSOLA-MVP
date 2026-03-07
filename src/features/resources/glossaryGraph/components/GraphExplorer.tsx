import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { glossaryData } from '../../data/glossary';
import { getNeighbors, getNodeBySlug, getNodeByTerm, glossaryGraph } from '../data';
import type { EdgeType } from '../utils/types';

const EDGE_TYPES: EdgeType[] = ['explicit', 'inferred', 'mention', 'category'];

export const GraphExplorer = () => {
  const [search, setSearch] = useState('');
  const [selectedSlug, setSelectedSlug] = useState<string>(Object.keys(glossaryGraph.nodes)[0] ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<'all' | 'leigo' | 'técnico'>('all');
  const [edgeTypeFilter, setEdgeTypeFilter] = useState<Record<EdgeType, boolean>>({
    explicit: true,
    inferred: true,
    mention: true,
    category: true,
  });
  const [viewMode, setViewMode] = useState<'svg' | 'list'>('svg');

  const activeTypes = EDGE_TYPES.filter((type) => edgeTypeFilter[type]);

  const selectedNode = getNodeBySlug(selectedSlug);

  const neighbors = useMemo(
    () =>
      getNeighbors(selectedSlug, activeTypes)
        .map((edge) => {
          const targetSlug = edge.from === selectedSlug ? edge.to : edge.from;
          const target = glossaryGraph.nodes[targetSlug];
          return { edge, target };
        })
        .filter((entry) => Boolean(entry.target))
        .filter(({ target }) => {
          if (!target) {
            return false;
          }

          const categoryPass = selectedCategory === 'all' || target.category === selectedCategory;
          const audiencePass = selectedAudience === 'all' || target.audienceLevel === selectedAudience;
          return categoryPass && audiencePass;
        })
        .slice(0, 24),
    [selectedSlug, activeTypes, selectedCategory, selectedAudience]
  );

  const categories = useMemo(() => Array.from(new Set(glossaryData.map((item) => item.category))), []);

  const searchResults = useMemo(() => {
    if (!search.trim()) {
      return [];
    }

    const byTerm = getNodeByTerm(search);
    if (byTerm) {
      return [byTerm];
    }

    const normalized = search.toLowerCase();
    return Object.values(glossaryGraph.nodes)
      .filter((node) => node.term.toLowerCase().includes(normalized))
      .slice(0, 10);
  }, [search]);

  return (
    <main className="space-y-6">
      <header className="rounded-[20px] border border-slate-200/90 bg-white/85 p-6 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/75">
        <h1 className="text-2xl font-black text-slate-900">Explorador de grafo do glossário</h1>
        <p className="mt-2 text-sm text-slate-600">Explore conceitos conectados por relações explícitas, menções e similaridade semântica.</p>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar termo para centralizar"
            className="rounded-[16px] border border-slate-300/90 bg-white/85 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/75"
          />

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="rounded-[16px] border border-slate-300/90 bg-white/85 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/75"
          >
            <option value="all">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedAudience}
            onChange={(event) => setSelectedAudience(event.target.value as 'all' | 'leigo' | 'técnico')}
            className="rounded-[16px] border border-slate-300/90 bg-white/85 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900/75"
          >
            <option value="all">Todos os públicos</option>
            <option value="leigo">Leigo</option>
            <option value="técnico">Técnico</option>
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode('svg')}
              className={`rounded-[14px] px-3 py-2 text-sm ${viewMode === 'svg' ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.8)]' : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300'}`}
            >
              Grafo SVG
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`rounded-[14px] px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.8)]' : 'border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300'}`}
            >
              Lista
            </button>
          </div>
        </div>

        {searchResults.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {searchResults.map((node) => (
              <li key={node.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(node.slug)}
                  className="rounded-[18px] border border-slate-300/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
                >
                  {node.term}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {EDGE_TYPES.map((type) => (
            <label key={type} className="inline-flex items-center gap-2 rounded-[18px] border border-slate-300/80 bg-white/70 px-3 py-1 text-xs dark:border-slate-700 dark:bg-slate-900/70">
              <input
                type="checkbox"
                checked={edgeTypeFilter[type]}
                onChange={() =>
                  setEdgeTypeFilter((current) => ({ ...current, [type]: !current[type] }))
                }
              />
              {type}
            </label>
          ))}
        </div>
      </header>

      <section className="rounded-[20px] border border-slate-200/90 bg-white/85 p-6 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/75">
        <h2 className="text-lg font-bold text-slate-900">
          Nó central: {selectedNode?.term ?? 'Selecione um termo'}
        </h2>

        {viewMode === 'svg' ? (
          <div className="mt-4 space-y-3">
          <svg
            viewBox="0 0 760 360"
            role="img"
            aria-label={`Visualização de vizinhança para ${selectedNode?.term ?? 'termo selecionado'}`}
            className="h-96 w-full rounded-[16px] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60"
          >
            <circle cx="380" cy="180" r="24" fill="#1d4ed8" />
            <text x="380" y="215" textAnchor="middle" className="fill-slate-700 text-xs font-semibold">
              {selectedNode?.term.slice(0, 26)}
            </text>

            {neighbors.slice(0, 14).map(({ edge, target }, index) => {
              if (!target) {
                return null;
              }

              const angle = (Math.PI * 2 * index) / Math.max(14, neighbors.length);
              const x = 380 + Math.cos(angle) * 150;
              const y = 180 + Math.sin(angle) * 130;

              return (
                <g key={`${edge.from}-${edge.to}-${edge.type}`}>
                  <line x1="380" y1="180" x2={x} y2={y} stroke="#94a3b8" strokeWidth={Math.max(1, edge.weight * 3)} />
                  <circle cx={x} cy={y} r="14" fill="#2563eb" />
                  <text x={x} y={y + 24} textAnchor="middle" className="fill-slate-700 text-[10px]">
                    {target.term.slice(0, 18)}
                  </text>
                </g>
              );
            })}
          </svg>

            <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {neighbors.slice(0, 10).map(({ target }) => {
                if (!target) {
                  return null;
                }

                return (
                  <li key={target.slug}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(target.slug)}
                      aria-label={`Centralizar no termo ${target.term}`}
                      className="w-full rounded-[14px] border border-slate-300/90 bg-white/80 px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
                    >
                      {target.term}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {neighbors.map(({ edge, target }) => {
              if (!target) {
                return null;
              }

              return (
                <li key={`${edge.from}-${edge.to}-${edge.type}`} className="rounded-[14px] border border-slate-200/90 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70">
                  <Link to={`/recursos/glossario/${target.slug}`} className="text-sm font-semibold text-blue-700 hover:underline">
                    {target.term}
                  </Link>
                  <p className="mt-1 text-xs text-slate-600">{target.category} • {edge.type} • peso {edge.weight.toFixed(2)}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};
