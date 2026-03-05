import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { glossaryData, type GlossaryItem } from '../../data/glossary';
import { getBacklinks, getNeighbors, getNodeBySlug, getNodeByTerm, getSubgraph, glossaryGraph } from '../data';
import { suggestPaths } from '../utils/suggestedPaths';
import type { GlossaryEdge } from '../utils/types';
import { BacklinksPanel } from './BacklinksPanel';
import { MiniGraph } from './MiniGraph';
import { RelatedConceptsPanel } from './RelatedConceptsPanel';

interface GlossaryTermPageProps {
  slug?: string;
  term?: string;
}

const itemBySlug = Object.fromEntries(
  glossaryData
    .map((item) => {
      const node = getNodeByTerm(item.term);
      return node ? [node.slug, item] : null;
    })
    .filter((entry): entry is [string, GlossaryItem] => Boolean(entry))
);

const linksByType = (edges: GlossaryEdge[]): Record<GlossaryEdge['type'], GlossaryEdge[]> =>
  edges.reduce(
    (acc, edge) => {
      const existing = acc[edge.type] ?? [];
      existing.push(edge);
      acc[edge.type] = existing;
      return acc;
    },
    { explicit: [], inferred: [], mention: [], category: [] } as Record<GlossaryEdge['type'], GlossaryEdge[]>
  );

export const GlossaryTermPage = ({ slug, term }: GlossaryTermPageProps) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const node = useMemo(() => {
    if (slug) {
      return getNodeBySlug(slug);
    }

    if (term) {
      return getNodeByTerm(term);
    }

    return undefined;
  }, [slug, term]);

  if (!node) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Termo não localizado</h2>
        <p className="mt-2 text-sm text-slate-600">
          Este conceito não está disponível no momento.
        </p>
        <Link to="/recursos" className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline">
          Voltar às categorias
        </Link>
      </section>
    );
  }

  const item = itemBySlug[node.slug];
  const edges = getNeighbors(node.slug);
  const backlinks = getBacklinks(node.slug);
  const grouped = linksByType(edges);
  const miniGraphEdges = edges.slice(0, 10);
  const oneHopSubgraph = getSubgraph(node.slug, 1);
  const paths = suggestPaths(oneHopSubgraph, node.slug);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1500);
    } catch {
      setCopyStatus('error');
      window.setTimeout(() => setCopyStatus('idle'), 1500);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <main className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900">{item.term}</h1>
            <p className="mt-2 inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              {item.category}
            </p>
          </div>

          <button
            type="button"
            onClick={copyLink}
            className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copyStatus === 'copied' ? 'Link copiado' : copyStatus === 'error' ? 'Falha ao copiar' : 'Copiar link'}
          </button>
        </div>

        <p className="mt-4 text-base leading-relaxed text-slate-800">{item.definition}</p>
        {item.context && <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.context}</p>}
        {item.practicalExample && <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.practicalExample}</p>}

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link to={`/recursos/glossario/categoria/${encodeURIComponent(item.category)}`} className="text-blue-700 hover:underline">
            Abrir hub da categoria
          </Link>
          <Link to="/recursos/glossario/grafo" className="text-blue-700 hover:underline">
            Explorar grafo completo
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Conceitos relacionados</h2>
        <div className="mt-3">
          <RelatedConceptsPanel currentSlug={node.slug} edges={edges} nodes={glossaryGraph.nodes} itemBySlug={itemBySlug} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Mencionado em</h2>
        <div className="mt-3">
          <BacklinksPanel currentSlug={node.slug} backlinks={backlinks} nodes={glossaryGraph.nodes} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Grafo ao redor deste termo</h2>
        <div className="mt-3">
          <MiniGraph centerSlug={node.slug} nodes={glossaryGraph.nodes} edges={miniGraphEdges} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Explorar por caminhos sugeridos</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {paths.map((path) => (
            <article key={path.id} className="rounded-xl border border-slate-200 p-3">
              <h3 className="text-sm font-semibold text-slate-900">{path.label}</h3>
              <ol className="mt-2 space-y-1 text-sm text-slate-700">
                {path.slugs.map((pathSlug) => (
                  <li key={pathSlug}>
                    <Link to={`/recursos/glossario/${pathSlug}`} className="text-blue-700 hover:underline">
                      {getNodeBySlug(pathSlug)?.term ?? pathSlug}
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Resumo das conexões</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700 md:grid-cols-4">
          <li>Explícitas: {grouped.explicit.length}</li>
          <li>Inferidas: {grouped.inferred.length}</li>
          <li>Menções: {grouped.mention.length}</li>
          <li>Categoria: {grouped.category.length}</li>
        </ul>
      </section>
    </main>
  );
};
