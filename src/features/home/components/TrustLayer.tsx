import React from 'react';

const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center text-[0.78rem] text-slate-600 dark:text-slate-300 sm:text-xs">
    Sem registro de dados pessoais do estudante.
  </span>
);

interface TrustLayerProps {
  onStartGuidedCare: () => void;
}

export const TrustLayer: React.FC<TrustLayerProps> = ({ onStartGuidedCare }) => {
  return (
    <section className="space-y-3.5 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <PrivacyBadge />
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300 sm:text-xs sm:tracking-wider">
          Baseado em protocolo e encaminhamento seguro.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
          Quando houver dúvida, comece pelo atendimento guiado.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onStartGuidedCare}
            className="min-h-[44px] rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Iniciar atendimento guiado
          </button>
          <p className="text-[0.78rem] text-slate-600 dark:text-slate-300 sm:text-xs">
            Sem registro de dados pessoais do estudante.
          </p>
        </div>
      </div>
    </section>
  );
};
