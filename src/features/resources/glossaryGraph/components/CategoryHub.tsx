import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { glossaryData } from '../../data/glossary';
import { getNeighbors, getNodeBySlug, getNodeByTerm, getSubgraph } from '../data';
import { suggestPaths } from '../utils/suggestedPaths';

interface CategoryHubProps {
  category: string;
}

export const CategoryHub = ({ category }: CategoryHubProps) => {
  const [query, setQuery] = useState('');

  const nodes = useMemo(
    () => glossaryData
      .map((item) => getNodeByTerm(item.term))
      .filter((node): node is NonNullable<ReturnType<typeof getNodeByTerm>> => Boolean(node))
      .filter((node) => node.category.toLowerCase() === category.toLowerCase()),
    [category]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return nodes;
    }

    const normalized = query.toLowerCase();
    return nodes.filter((node) => node.term.toLowerCase().includes(normalized));
  }, [nodes, query]);

  const topConnected = useMemo(
    () =>
      [...nodes]
        .map((node) => ({
          node,
          degree: getNeighbors(node.slug).length,
        }))
        .sort((left, right) => right.degree - left.degree)
        .slice(0, 6),
    [nodes]
  );

  const sampleNode = topConnected[0]?.node;
  const samplePaths = sampleNode ? suggestPaths(getSubgraph(sampleNode.slug, 2), sampleNode.slug) : [];

  return (
    <main className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-black text-slate-900">Hub da categoria: {category}</h1>
        <p className="mt-2 text-sm text-slate-600">
          Explore termos da mesma categoria e caminhos de navegação semântica.
        </p>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar termo na categoria"
          className="mt-4 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
        />
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Termos da categoria</h2>
        <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
          {filtered.map((node) => (
            <Link
              key={node.slug}
              to={`/recursos/glossario/${node.slug}`}
              className="rounded-xl border border-slate-200 p-3 text-sm font-semibold text-blue-700 hover:border-blue-300"
            >
              {node.term}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-bold text-slate-900">Termos mais conectados</h2>
        <ul className="mt-3 space-y-2">
          {topConnected.map(({ node, degree }) => (
            <li key={node.slug} className="rounded-lg border border-slate-200 p-3">
              <Link to={`/recursos/glossario/${node.slug}`} className="text-sm font-semibold text-blue-700 hover:underline">
                {node.term}
              </Link>
              <p className="mt-1 text-xs text-slate-600">Conexões: {degree}</p>
            </li>
          ))}
        </ul>
      </section>

      {samplePaths.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold text-slate-900">Caminhos sugeridos</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            {samplePaths.map((path) => (
              <article key={path.id} className="rounded-xl border border-slate-200 p-3">
                <h3 className="text-sm font-semibold text-slate-900">{path.label}</h3>
                <ol className="mt-2 space-y-1 text-sm">
                  {path.slugs.map((slug) => (
                    <li key={slug}>
                      <Link to={`/recursos/glossario/${slug}`} className="text-blue-700 hover:underline">
                        {getNodeBySlug(slug)?.term ?? slug}
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
