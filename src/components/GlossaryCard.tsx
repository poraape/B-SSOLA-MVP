// src/features/resources/components/GlossaryCard.tsx

import React, { useState } from 'react';
import { ChevronDown, BookOpen, Info, Link as LinkIcon } from 'lucide-react';
import { GlossaryItem } from '../data/glossary';
import { Card } from '../../components/ui/Card';
import { highlightTerm } from '../utils/searchUtils';

interface GlossaryCardProps {
  item: GlossaryItem;
  searchQuery: string;
  onRelatedClick?: (term: string) => void;
}

export const GlossaryCard: React.FC<GlossaryCardProps> = ({
  item,
  searchQuery,
  onRelatedClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColor =
    item.category === 'Gírias Estudantis'
      ? { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600', badge: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' }
      : { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600', badge: 'bg-slate-100 dark:bg-slate-800 text-slate-400' };

  return (
    <Card className="p-6 md:p-8 space-y-4 border-2 border-slate-100 dark:border-slate-800 flex flex-col h-full">
      {/* Header: Icon + Category Badge */}
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${categoryColor.bg}`}>
          <BookOpen className={`w-5 h-5 ${categoryColor.text}`} />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${categoryColor.badge}`}>
          {item.category}
        </span>
      </div>

      {/* Term + Definition */}
      <div className="flex-1 space-y-3">
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
          {highlightTerm(item.term, searchQuery)}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
          {highlightTerm(item.definition, searchQuery)}
        </p>
      </div>

      {/* Context (sempre visível) */}
      {item.context && (
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3 items-start">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[11px] italic text-slate-500 dark:text-slate-400 leading-snug">
            <span className="font-bold not-italic uppercase tracking-tighter mr-1">Contexto:</span>
            {item.context}
          </p>
        </div>
      )}

      {/* Expandível: Exemplo Prático + Variações + Links */}
      {(item.practicalExample || item.regionalVariations || item.relatedTerms) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline pt-2"
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? 'Ocultar' : 'Ver'} detalhes adicionais`}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          {isExpanded ? 'Ocultar detalhes' : 'Ver mais'}
        </button>
      )}

      {/* Conteúdo Expandível */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Exemplo Prático */}
          {item.practicalExample && (
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">
                📌 Exemplo Prático
              </p>
              <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug whitespace-pre-wrap">
                {item.practicalExample}
              </p>
            </div>
          )}

          {/* Variações Regionais */}
          {item.regionalVariations && item.regionalVariations.length > 0 && (
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">
                🌍 Variações Regionais
              </p>
              <ul className="text-[12px] text-slate-600 dark:text-slate-400 list-disc list-inside space-y-0.5">
                {item.regionalVariations.map((variation, idx) => (
                  <li key={idx}>{variation}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Termos Relacionados */}
          {item.relatedTerms && item.relatedTerms.length > 0 && (
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-tighter text-slate-700 dark:text-slate-300">
                🔗 Veja Também
              </p>
              <div className="flex flex-wrap gap-2">
                {item.relatedTerms.map((relatedTerm, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onRelatedClick?.(relatedTerm);
                      setIsExpanded(false);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label={`Ir para termo: ${relatedTerm}`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    {relatedTerm}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
