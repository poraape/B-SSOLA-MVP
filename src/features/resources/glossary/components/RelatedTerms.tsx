import type { GlossaryItem } from '../../data/glossary';

export interface RelatedTermsProps {
  terms: GlossaryItem[];
  onSelectTerm: (term: GlossaryItem) => void;
}

const shorten = (text: string, max = 120): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

export const RelatedTerms = ({ terms, onSelectTerm }: RelatedTermsProps) => {
  if (terms.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
        Nenhum termo relacionado encontrado no momento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {terms.map((item) => (
        <button
          key={item.term}
          type="button"
          onClick={() => onSelectTerm(item)}
          className="rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:shadow-sm"
        >
          <h4 className="text-sm font-semibold text-slate-900">{item.term}</h4>
          <p className="mt-1 text-xs font-medium text-blue-700">{item.category}</p>
          <p className="mt-2 text-sm text-slate-600">{shorten(item.definition)}</p>
        </button>
      ))}
    </div>
  );
};
