import React from 'react';

const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center text-xs text-gray-500">
    Sem registro de dados pessoais do estudante.
  </span>
);

interface TrustLayerProps {
  onStartGuidedCare: () => void;
}

export const TrustLayer: React.FC<TrustLayerProps> = ({ onStartGuidedCare }) => {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <PrivacyBadge />
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Baseado em protocolo e encaminhamento seguro.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
          Quando houver dúvida, comece pelo atendimento guiado.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onStartGuidedCare}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Iniciar atendimento guiado
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sem registro de dados pessoais do estudante.
          </p>
        </div>
      </div>
    </section>
  );
};
