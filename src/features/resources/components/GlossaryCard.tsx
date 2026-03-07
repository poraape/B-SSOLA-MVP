import { useState, type FC } from 'react';
import { BookOpen, ChevronDown, Link2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import type { GlossaryItem } from '../data/glossary';
import { highlightTerm } from '../utils/searchUtils';

interface GlossaryCardProps {
  item: GlossaryItem;
  searchQuery: string;
  onRelatedClick?: (term: string) => void;
}

const categoryClassMap: Record<GlossaryItem['category'], string> = {
  Protocolo: 'bg-blue-100 text-blue-800',
  Legal: 'bg-slate-200 text-slate-800',
  'Rede de Proteção': 'bg-emerald-100 text-emerald-800',
  'Gírias Estudantis': 'bg-amber-100 text-amber-900',
  Saúde: 'bg-rose-100 text-rose-800',
  Inclusão: 'bg-violet-100 text-violet-800',
  'Segurança Escolar': 'bg-red-100 text-red-800',
  Convivência: 'bg-cyan-100 text-cyan-800',
  Direitos: 'bg-lime-100 text-lime-800',
};

export const GlossaryCard: FC<GlossaryCardProps> = ({ item, searchQuery, onRelatedClick }) => {
  const [expanded, setExpanded] = useState(false);
  const hasExtraDetails =
    Boolean(item.practicalExample) ||
    Boolean(item.regionalVariations?.length) ||
    Boolean(item.relatedTerms?.length);
  const glossaryTermId = `glossary-term-${item.term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

  return (
    <div id={glossaryTermId}>
      <Card className="flex h-full flex-col gap-4 rounded-[20px] border border-slate-200/90 bg-white/85 p-5 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.4)] transition-all hover:-translate-y-0.5 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900/75">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-blue-700">
            <BookOpen className="size-5" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-900">{highlightTerm(item.term, searchQuery)}</h3>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${categoryClassMap[item.category]}`}>
            {item.category}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-slate-700">{highlightTerm(item.definition, searchQuery)}</p>

        <section aria-label="Contexto do termo" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
          <p>
            <strong>Contexto:</strong>{' '}
            {highlightTerm(item.context ?? 'Sem contexto adicional informado.', searchQuery)}
          </p>
        </section>

        {hasExtraDetails && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={expanded ? `Ocultar detalhes de ${item.term}` : `Ver detalhes de ${item.term}`}
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-blue-700 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/20"
          >
            Ver mais
            <ChevronDown
              className={`size-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
        )}

        {expanded && (
          <div className="space-y-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            {item.practicalExample && (
              <section aria-label="Exemplo prático" className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Exemplo prático</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">{highlightTerm(item.practicalExample, searchQuery)}</p>
              </section>
            )}

            {item.regionalVariations && item.regionalVariations.length > 0 && (
              <section aria-label="Variações regionais" className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Variações regionais</h4>
                <ul className="list-inside list-disc text-sm text-slate-700 dark:text-slate-300">
                  {item.regionalVariations.map((variation) => (
                    <li key={variation}>{highlightTerm(variation, searchQuery)}</li>
                  ))}
                </ul>
              </section>
            )}

            {item.relatedTerms && item.relatedTerms.length > 0 && (
              <section aria-label="Termos relacionados" className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Termos relacionados</h4>
                <div className="flex flex-wrap gap-2">
                  {item.relatedTerms.map((relatedTerm) => (
                    <button
                      key={relatedTerm}
                      type="button"
                      onClick={() => onRelatedClick?.(relatedTerm)}
                      aria-label={`Buscar termo relacionado ${relatedTerm}`}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
                    >
                      <Link2 className="size-3.5" aria-hidden="true" />
                      {relatedTerm}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export type { GlossaryCardProps };
