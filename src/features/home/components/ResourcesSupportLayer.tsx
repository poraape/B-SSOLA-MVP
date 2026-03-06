import React from 'react';

import { useTheme } from '../../../app/context/ThemeContext';
import { Card } from '../../../components/ui/Card';

interface ResourcesSupportLayerProps {
  onStartGuidedCare: () => void;
  onOpenNetwork: () => void;
  onOpenResources: () => void;
}

export const ResourcesSupportLayer: React.FC<ResourcesSupportLayerProps> = ({
  onStartGuidedCare,
  onOpenNetwork,
  onOpenResources,
}) => {
  const { theme } = useTheme();

  return (
    <section className="space-y-5">
      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Como você quer começar?</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          hoverable
          onClick={onStartGuidedCare}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Decidir agora</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Receba orientação passo a passo para a situação observada, com foco no próximo passo.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenNetwork}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Encontrar apoio</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Acesse serviços, contatos e encaminhamentos de forma contextual e rápida.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenResources}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Aprender e consultar</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Consulte conteúdos, simulações e respostas rápidas enquanto usa o app.
          </p>
        </Card>
      </div>
    </section>
  );
};
