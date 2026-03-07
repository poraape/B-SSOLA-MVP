import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { GlossaryEdge, GlossaryNode } from '../utils/types';

interface MiniGraphProps {
  centerSlug: string;
  nodes: Record<string, GlossaryNode>;
  edges: GlossaryEdge[];
}

interface PositionedNode {
  slug: string;
  x: number;
  y: number;
  isCenter: boolean;
}

const WIDTH = 420;
const HEIGHT = 280;

export const MiniGraph = ({ centerSlug, nodes, edges }: MiniGraphProps) => {
  const center = nodes[centerSlug];

  const layout = useMemo(() => {
    if (!center) {
      return [] as PositionedNode[];
    }

    const neighbors = edges
      .map((edge) => (edge.from === centerSlug ? edge.to : edge.from))
      .filter((slug, index, arr) => arr.indexOf(slug) === index)
      .slice(0, 8);

    const positioned: PositionedNode[] = [
      {
        slug: centerSlug,
        x: WIDTH / 2,
        y: HEIGHT / 2,
        isCenter: true,
      },
    ];

    neighbors.forEach((slug, index) => {
      const angle = (Math.PI * 2 * index) / Math.max(neighbors.length, 1);
      positioned.push({
        slug,
        x: WIDTH / 2 + Math.cos(angle) * 95,
        y: HEIGHT / 2 + Math.sin(angle) * 95,
        isCenter: false,
      });
    });

    return positioned;
  }, [center, centerSlug, edges]);

  if (!center) {
    return null;
  }

  const positionBySlug = new Map(layout.map((entry) => [entry.slug, entry]));

  return (
    <div className="space-y-3">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Grafo de relações para ${center.term}`}
        className="h-72 w-full rounded-[16px] border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60"
      >
        {edges.map((edge) => {
          const fromPosition = positionBySlug.get(edge.from);
          const toPosition = positionBySlug.get(edge.to);

          if (!fromPosition || !toPosition) {
            return null;
          }

          return (
            <line
              key={`${edge.from}-${edge.to}-${edge.type}`}
              x1={fromPosition.x}
              y1={fromPosition.y}
              x2={toPosition.x}
              y2={toPosition.y}
              stroke="#94a3b8"
              strokeWidth={Math.max(1, edge.weight * 3)}
              strokeOpacity={0.7}
            />
          );
        })}

        {layout.map((node) => (
          <g key={node.slug}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.isCenter ? 18 : 13}
              fill={node.isCenter ? '#1d4ed8' : '#2563eb'}
            />
            <text
              x={node.x}
              y={node.y + (node.isCenter ? 32 : 26)}
              textAnchor="middle"
              className="fill-slate-700 text-[10px] font-semibold"
            >
              {nodes[node.slug]?.term.slice(0, 22)}
            </text>
          </g>
        ))}
      </svg>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Navegação por teclado</p>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {layout
            .filter((entry) => !entry.isCenter)
            .map((entry) => (
              <li key={entry.slug}>
                <Link
                  to={`/recursos/glossario/${entry.slug}`}
                  aria-label={`Abrir conceito ${nodes[entry.slug]?.term}`}
                  className="block rounded-[14px] border border-slate-200/90 bg-white/80 px-3 py-2 text-sm text-blue-700 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-blue-300 dark:hover:border-blue-500"
                >
                  {nodes[entry.slug]?.term}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
