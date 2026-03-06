import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Users, BookOpen } from 'lucide-react';

interface EntryModeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
}

const EntryModeCard: React.FC<EntryModeCardProps> = ({ icon, title, description, path }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="focus-ring card-lift press-scale group flex flex-col items-start gap-4 rounded-card border border-slate-200 bg-white p-6 text-left shadow-soft transition-all duration-normal dark:border-slate-700 dark:bg-slate-900 md:p-8"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 transition-all duration-normal group-hover:from-blue-100 group-hover:to-blue-200 group-hover:scale-110 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-400">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-secondary">
          {description}
        </p>
      </div>
      <span className="mt-auto text-xs font-bold uppercase tracking-widest text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400" aria-hidden="true">
        Acessar →
      </span>
    </button>
  );
};

export const EntryModes: React.FC = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-black tracking-tight text-primary">
        Como você quer começar?
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <EntryModeCard
          icon={<Compass className="h-7 w-7" />}
          title="Decidir agora"
          description="Receba orientação passo a passo para a situação observada."
          path="/atendimento"
        />
        <EntryModeCard
          icon={<Users className="h-7 w-7" />}
          title="Encontrar apoio"
          description="Acesse serviços, contatos e encaminhamentos."
          path="/rede"
        />
        <EntryModeCard
          icon={<BookOpen className="h-7 w-7" />}
          title="Aprender e consultar"
          description="Consulte definições, respostas rápidas e simulações."
          path="/recursos"
        />
      </div>
    </section>
  );
};
