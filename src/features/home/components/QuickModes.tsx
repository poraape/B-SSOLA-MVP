import React from 'react';

import { useTheme } from '../../../app/context/ThemeContext';
import { Card } from '../../../components/ui/Card';

interface QuickModesProps {
  onStartGuidedCare: () => void;
  onOpenNetwork: () => void;
  onOpenResources: () => void;
}

export const QuickModes: React.FC<QuickModesProps> = ({
  onStartGuidedCare,
  onOpenNetwork,
  onOpenResources,
}) => {
  const { theme } = useTheme();

  const baseCardClass = theme === 'dark'
    ? 'border-slate-700/70 bg-slate-900/75 hover:border-slate-600'
    : 'border-slate-200/80 bg-white/75 hover:border-slate-300';

  return (
    <section className="space-y-5 rounded-[20px] border border-slate-200/70 bg-white/45 p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-6">
      <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
        Como você quer começar?
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card hoverable onClick={onStartGuidedCare} className={`group rounded-[20px] border p-5 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] backdrop-blur-md transition-all hover:scale-[1.03] ${baseCardClass}`}>
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">Decidir agora</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Comece pelo atendimento guiado.</p>
        </Card>

        <Card hoverable onClick={onOpenNetwork} className={`group rounded-[20px] border p-5 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] backdrop-blur-md transition-all hover:scale-[1.03] ${baseCardClass}`}>
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">Encontrar apoio</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Mapa da rede de apoio.</p>
        </Card>

        <Card hoverable onClick={onOpenResources} className={`group rounded-[20px] border p-5 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] backdrop-blur-md transition-all hover:scale-[1.03] ${baseCardClass}`}>
          <h3 className="text-base font-black tracking-tight text-slate-900 dark:text-white">Consultar recursos</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Glossário, FAQ e simulador.</p>
        </Card>
      </div>
    </section>
  );
};
