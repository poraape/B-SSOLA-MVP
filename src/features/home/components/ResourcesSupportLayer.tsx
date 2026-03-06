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
      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Escolha por onde começar</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          hoverable
          onClick={onStartGuidedCare}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Atendimento guiado</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Receba o próximo passo para a situação observada.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenNetwork}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Rede de apoio</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Encontre contatos, serviços e encaminhamentos.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenResources}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Recursos</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Consulte termos, perguntas frequentes e simulações.
          </p>
        </Card>
      </div>
    </section>
  );
};
