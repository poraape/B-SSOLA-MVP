import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Theme {
  id: string;
  label: string;
}

const defaultThemes: Theme[] = [
  { id: 'comportamento', label: 'Comportamento' },
  { id: 'saude-mental', label: 'Saúde mental' },
  { id: 'violencia', label: 'Violência' },
  { id: 'vulnerabilidade', label: 'Vulnerabilidade e proteção' },
  { id: 'convivencia', label: 'Convivência escolar' },
];

export const PriorityThemes: React.FC = () => {
  const navigate = useNavigate();
  const [recentThemes, setRecentThemes] = React.useState<string[]>([]);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('bssola_recent_themes') || '[]');
      if (Array.isArray(stored)) {
        setRecentThemes(stored.filter((id: unknown): id is string => typeof id === 'string'));
      }
    } catch {
      setRecentThemes([]);
    }
  }, []);

  // Adaptive: mostrar temas recentes primeiro, se existirem
  const displayThemes = React.useMemo(() => {
    if (recentThemes.length > 0) {
      const recentSet = new Set(recentThemes);
      const recent = defaultThemes.filter((t) => recentSet.has(t.id));
      const others = defaultThemes.filter((t) => !recentSet.has(t.id));
      return [...recent, ...others].slice(0, 5);
    }
    return defaultThemes;
  }, [recentThemes]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight text-primary">
          Temas mais acessados
        </h2>
        <p className="text-sm text-tertiary">
          Acesse rapidamente os temas mais frequentes ou veja todos.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {displayThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => {
              navigate(`/categoria/${theme.id}`);
              // Track theme usage
              try {
                const recent = JSON.parse(localStorage.getItem('bssola_recent_themes') || '[]');
                const validRecent = Array.isArray(recent) ? recent.filter((id: unknown): id is string => typeof id === 'string') : [];
                const updated = [theme.id, ...validRecent.filter((id) => id !== theme.id)].slice(0, 5);
                localStorage.setItem('bssola_recent_themes', JSON.stringify(updated));
                setRecentThemes(updated);
              } catch {
                // Silently fail
              }
            }}
            className="focus-ring press-scale touch-target rounded-chip border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-soft transition-all duration-fast hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-elevated dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
          >
            {theme.label}
          </button>
        ))}

        <button
          onClick={() => navigate('/categorias')}
          className="focus-ring press-scale touch-target inline-flex items-center gap-1.5 rounded-chip border border-slate-400 bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-soft transition-all duration-fast hover:bg-slate-200 hover:shadow-elevated dark:border-slate-500 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          Ver todos
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
