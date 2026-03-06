import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookMarked, HelpCircle, FlaskConical } from 'lucide-react';

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, path }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="focus-ring card-lift press-scale group flex flex-col items-start gap-3 rounded-card border border-slate-200 bg-slate-50/70 p-5 text-left transition-all duration-normal hover:bg-slate-100/90 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800/80"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition-all duration-normal group-hover:scale-110 group-hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-slate-600">
        {icon}
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-primary">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-secondary">
          {description}
        </p>
      </div>
    </button>
  );
};

export const FormativeLayer: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight text-primary">
        Recursos para apoiar a decisão
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ResourceCard
          icon={<BookMarked className="h-5 w-5" />}
          title="Glossário"
          description="Entenda termos e conceitos do contexto escolar."
          path="/recursos?tab=glossary"
        />
        <ResourceCard
          icon={<HelpCircle className="h-5 w-5" />}
          title="FAQ"
          description="Encontre respostas rápidas para dúvidas frequentes."
          path="/recursos?tab=faq"
        />
        <ResourceCard
          icon={<FlaskConical className="h-5 w-5" />}
          title="Simulador"
          description="Treine decisões em situações simuladas."
          path="/recursos?tab=simulator"
        />
      </div>
    </section>
  );
};
