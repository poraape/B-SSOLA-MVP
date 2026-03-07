import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { getCategories } from '@/domain/model';
import { useTheme } from '@/app/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { getPremiumCategoryIconByName } from '@/features/shared/components/PremiumCategoryIcons';
import {
  getCategoryColor,
  getCategoryDisplayLabel,
  getCategoryIcon,
} from '@/features/shared/utils/categoryPresentation';

export const CategoriesIndexPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const categories = [...getCategories()].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  return (
    <section className="space-y-8 rounded-[20px] border border-slate-200/70 bg-white/45 p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
          Navegar por categorias
        </h1>
        <p className="max-w-3xl text-base text-slate-600 dark:text-slate-300 md:text-lg">
          Selecione a área da situação para iniciar o atendimento guiado.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            hoverable
            onClick={() => navigate(`/categoria/${category.id}`)}
            className={`relative group overflow-hidden rounded-[24px] border backdrop-blur-md transition-all hover:scale-[1.04] ${
              theme === 'dark'
                ? 'border-slate-700/70 bg-slate-900/75 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.8)]'
                : 'border-slate-200/80 bg-white/75 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.3)]'
            }`}
          >
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${getCategoryColor(category.id)} opacity-70`} />

            <div className="relative z-10 flex h-full min-h-[10.5rem] flex-col items-center justify-between px-3 pb-4 pt-5 text-center transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0.5">
              <div className="relative inline-flex transition-transform duration-200 group-hover:scale-[1.06] group-active:scale-95">
                {getPremiumCategoryIconByName(
                  getCategoryIcon(category.id),
                  'h-22 w-22 drop-shadow-[0_10px_18px_rgba(15,23,42,0.28)]',
                )}
                {category.isEmergencyCategory && (
                  <div className="absolute -right-1 -top-1 z-20 animate-pulse rounded-full border-2 border-white bg-rose-600 p-1.5 text-white shadow-lg dark:border-slate-900">
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                )}
              </div>

              <h2 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 dark:text-white">
                {getCategoryDisplayLabel(category.id, category.label)}
              </h2>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
