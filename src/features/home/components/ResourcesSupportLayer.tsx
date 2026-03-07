import React from 'react';

import { useTheme } from '../../../app/context/ThemeContext';
import { Card } from '../../../components/ui/Card';

interface ResourcesSupportLayerProps {
  onOpenGlossary: () => void;
  onOpenFaq: () => void;
  onOpenSimulator: () => void;
}

export const ResourcesSupportLayer: React.FC<ResourcesSupportLayerProps> = ({
  onOpenGlossary,
  onOpenFaq,
  onOpenSimulator,
}) => {
  const { theme } = useTheme();

  return (
    <section className="space-y-5">
      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Recursos para apoiar a decisão</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card
          hoverable
          onClick={onOpenGlossary}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Glossário</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Entenda termos e conceitos com linguagem clara.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenFaq}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">FAQ</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Respostas rápidas para dúvidas frequentes.
          </p>
        </Card>
        <Card
          hoverable
          onClick={onOpenSimulator}
          className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
        >
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Simulador</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Treine decisões em situações simuladas.
          </p>
        </Card>
      </div>
    </section>
  );
};
