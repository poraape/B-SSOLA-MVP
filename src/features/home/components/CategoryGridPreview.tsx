import { AlertTriangle } from 'lucide-react';
import React from 'react';

import { useTheme } from '../../../app/context/ThemeContext';
import { Card } from '../../../components/ui/Card';
import type { Category } from '../../../types';
import { getPremiumCategoryIcon } from '../../shared/components/PremiumCategoryIcons';

interface CategoryGridPreviewProps {
  categories: Category[];
  onOpenCategory: (categoryId: string) => void;
  onOpenAllCategories: () => void;
}

export const CategoryGridPreview: React.FC<CategoryGridPreviewProps> = ({
  categories,
  onOpenCategory,
  onOpenAllCategories,
}) => {
  const { theme } = useTheme();

  const shortLabel = (label: string) => {
    const [firstChunk] = label.split(' e ');
    return firstChunk.trim();
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Situações por tema</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          return (
            <Card
              key={cat.id}
              hoverable
              onClick={() => onOpenCategory(cat.id)}
              className={`relative group overflow-hidden rounded-[1.65rem] border ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900/90 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.9)]'
                  : 'border-slate-200/90 bg-white/95 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.35)]'
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,255,255,0.35),transparent_38%)]" />

              <div className="relative z-10 flex h-full min-h-[10.5rem] flex-col items-center justify-between px-3 pb-4 pt-5 text-center transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0.5">
                <div className="relative inline-flex transition-transform duration-200 group-hover:scale-[1.06] group-active:scale-95">
                  {getPremiumCategoryIcon(cat.icon, 'h-20 w-20 drop-shadow-[0_10px_18px_rgba(15,23,42,0.28)]')}
                  {cat.isEmergencyCategory && (
                    <div className="absolute -right-1 -top-1 z-20 animate-pulse rounded-full border-2 border-white bg-rose-600 p-1.5 text-white shadow-lg dark:border-slate-900">
                      <AlertTriangle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <h3 className="line-clamp-2 text-[0.72rem] font-black uppercase leading-tight tracking-[0.08em] text-slate-900 dark:text-white">
                  {shortLabel(cat.label)}
                </h3>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onOpenAllCategories}
          className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
        >
          Ver todas as categorias
        </button>
      </div>
    </section>
  );
};
