import { Link } from 'react-router-dom';
import type { GlossaryEdge, GlossaryNode } from '../utils/types';

interface BacklinksPanelProps {
  currentSlug: string;
  backlinks: GlossaryEdge[];
  nodes: Record<string, GlossaryNode>;
}

const badgeClassByType: Record<GlossaryEdge['type'], string> = {
  explicit: 'bg-blue-100 text-blue-800',
  inferred: 'bg-emerald-100 text-emerald-800',
  mention: 'bg-amber-100 text-amber-800',
  category: 'bg-purple-100 text-purple-800',
};

const labelByType: Record<GlossaryEdge['type'], string> = {
  explicit: 'Relacionamento explícito',
  inferred: 'Similaridade inferida',
  mention: 'Menção no texto',
  category: 'Mesma categoria',
};

export const BacklinksPanel = ({
  currentSlug,
  backlinks,
  nodes,
}: BacklinksPanelProps) => {
  if (backlinks.length === 0) {
    return (
      <p className="rounded-[14px] border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
        Nenhum termo referencia este conceito no momento.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {backlinks.map((edge) => {
        const source = nodes[edge.from];
        if (!source || source.slug === currentSlug) {
          return null;
        }

        return (
          <li key={`${edge.from}-${edge.to}-${edge.type}`} className="rounded-[14px] border border-slate-200/90 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/70">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                to={`/recursos/glossario/${source.slug}`}
                className="text-sm font-semibold text-blue-700 hover:underline dark:text-blue-300"
              >
                {source.term}
              </Link>

              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeClassByType[edge.type]}`}>
                {labelByType[edge.type]}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
