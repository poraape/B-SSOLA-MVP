import type { GlossaryItem } from '../../data/glossary';
import { useRelatedTerms } from '../hooks/useRelatedTerms';
import { RelatedTerms } from './RelatedTerms';

export interface GlossaryTermPageProps {
  term: GlossaryItem;
  glossary?: GlossaryItem[];
  onSelectTerm: (term: GlossaryItem) => void;
  onBack?: () => void;
}

interface FieldDescriptor {
  label: string;
  value?: string;
}

export const GlossaryTermPage = ({
  term,
  glossary,
  onSelectTerm,
  onBack,
}: GlossaryTermPageProps) => {
  const related = useRelatedTerms(term, { glossary, limit: 5 });

  const additionalFields: FieldDescriptor[] = [
    { label: 'Referência legal', value: term.legalReference },
    { label: 'Quem elabora', value: term.whoMakes },
    { label: 'Apoio visual', value: term.visualAid },
    { label: 'Sinais de atenção', value: term.signsToWatch },
    { label: 'Local', value: term.location },
    { label: 'Frequência', value: term.frequency },
    { label: 'Contexto regional', value: term.regionalContext },
  ];

  return (
    <article className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
          >
            Voltar ao glossário
          </button>
        )}

        <h2 className="text-2xl font-black text-slate-900">{term.term}</h2>
        <p className="mt-2 inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
          {term.category}
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate-800">{term.definition}</p>
      </header>

      {term.context && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-slate-900">Contexto escolar</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{term.context}</p>
        </section>
      )}

      {term.practicalExample && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-slate-900">Exemplo prático</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{term.practicalExample}</p>
        </section>
      )}

      {term.regionalVariations && term.regionalVariations.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-slate-900">Variações regionais</h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-700">
            {term.regionalVariations.map((variation) => (
              <li key={variation}>{variation}</li>
            ))}
          </ul>
        </section>
      )}

      {additionalFields.some((field) => field.value) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold text-slate-900">Informações adicionais</h3>
          <dl className="mt-3 space-y-3">
            {additionalFields
              .filter((field) => field.value)
              .map((field) => (
                <div key={field.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {field.label}
                  </dt>
                  <dd className="text-sm text-slate-700">{field.value}</dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-900">Termos relacionados</h3>
        <RelatedTerms terms={related} onSelectTerm={onSelectTerm} />
      </section>
    </article>
  );
};
