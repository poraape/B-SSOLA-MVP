import { Link } from 'react-router-dom';
import type { GlossaryItem } from '../../data/glossary';
import type { GlossaryEdge, GlossaryNode } from '../utils/types';

interface RelatedConceptsPanelProps {
  currentSlug: string;
  edges: GlossaryEdge[];
  nodes: Record<string, GlossaryNode>;
  itemBySlug: Record<string, GlossaryItem>;
}

const groupOrder: GlossaryEdge['type'][] = ['explicit', 'inferred', 'mention', 'category'];

const groupTitle: Record<GlossaryEdge['type'], string> = {
  explicit: 'Relações explícitas',
  inferred: 'Conceitos similares',
  mention: 'Conceitos mencionados',
  category: 'Conceitos da mesma categoria',
};

const shortText = (value: string, max = 120): string =>
  value.length <= max ? value : `${value.slice(0, max - 1)}…`;

export const RelatedConceptsPanel = ({
  currentSlug,
  edges,
  nodes,
  itemBySlug,
}: RelatedConceptsPanelProps) => {
  const grouped = edges.reduce<Record<GlossaryEdge['type'], GlossaryEdge[]>>(
    (acc, edge) => {
      const existing = acc[edge.type] ?? [];
      existing.push(edge);
      acc[edge.type] = existing;
      return acc;
    },
    { explicit: [], inferred: [], mention: [], category: [] }
  );

  return (
    <div className="space-y-4">
      {groupOrder.map((type) => {
        const typeEdges = grouped[type]
          .map((edge) => {
            const targetSlug = edge.from === currentSlug ? edge.to : edge.from;
            return {
              edge,
              node: nodes[targetSlug],
              item: itemBySlug[targetSlug],
            };
          })
          .filter((entry): entry is { edge: GlossaryEdge; node: GlossaryNode; item: GlossaryItem } =>
            Boolean(entry.node && entry.item)
          );

        if (typeEdges.length === 0) {
          return null;
        }

        return (
          <section key={type} className="space-y-2">
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300">{groupTitle[type]}</h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {typeEdges.map(({ edge, node, item }) => (
                <Link
                  key={`${edge.from}-${edge.to}-${edge.type}`}
                  to={`/recursos/glossario/${node.slug}`}
                  className="rounded-[14px] border border-slate-200/90 bg-white/80 p-3 transition hover:border-blue-400 hover:bg-blue-50/70 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-blue-500 dark:hover:bg-blue-900/15"
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{node.term}</p>
                  <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">{node.category}</p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{shortText(item.definition)}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
