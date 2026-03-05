import React from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FAQItem } from '../types/faq.types';

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => {
  const questionId = `faq-question-${item.id}`;
  const answerId = `faq-answer-${item.id}`;

  return (
    <div
      className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <h3>
        <button
          id={questionId}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={answerId}
          className="w-full text-left p-6 flex items-center justify-between gap-4 group focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-3xl"
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                isOpen
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500'
              }`}
              aria-hidden="true"
            >
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span
                className={`text-[9px] font-black uppercase tracking-[0.2em] ${
                  isOpen ? 'text-blue-500' : 'text-slate-400'
                }`}
                aria-label={`Categoria: ${item.category}`}
              >
                {item.category}
              </span>
              <span
                className={`font-black tracking-tight leading-tight block ${
                  isOpen
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {item.question}
              </span>
            </div>
          </div>
          <div
            className={`p-2 rounded-full transition-colors ${
              isOpen ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-slate-50 dark:bg-slate-800'
            }`}
            aria-hidden="true"
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-blue-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-8 pl-14 md:pl-20">
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" aria-hidden="true" />

          <div className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-base">
              {item.answer}
            </p>

            {item.relatedLinks && item.relatedLinks.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Links relacionados
                </p>
                <ul className="space-y-2">
                  {item.relatedLinks.map((link, idx) => (
                    <li key={idx}>
                      {link.type === 'internal' ? (
                        <Link
                          to={link.href}
                          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          {link.text}
                          <span className="sr-only">(link interno)</span>
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          {link.text}
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          <span className="sr-only">(abre em nova aba)</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
