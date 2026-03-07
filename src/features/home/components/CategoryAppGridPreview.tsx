import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '@/app/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import {
  getPremiumCategoryIconByName,
} from '@/features/shared/components/PremiumCategoryIcons';
import {
  getCategoryColor,
  getCategoryDisplayLabel,
  getCategoryIcon,
} from '@/features/shared/utils/categoryPresentation';

import type { Category } from '../../../types';

interface CategoryAppGridPreviewProps {
  categories: Category[];
  onOpenCategory: (categoryId: string) => void;
  onOpenAllCategories: () => void;
}

export const CategoryAppGridPreview: React.FC<CategoryAppGridPreviewProps> = ({
  categories,
  onOpenCategory,
  onOpenAllCategories,
}) => {
  const { theme } = useTheme();

  return (
    <section className="space-y-8 rounded-[20px] border border-slate-200/70 bg-white/45 p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Situações por tema</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Card
            key={category.id}
            hoverable
            onClick={() => onOpenCategory(category.id)}
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

              <h4 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 dark:text-white">
                {getCategoryDisplayLabel(category.id, category.label)}
              </h4>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onOpenAllCategories}
          className="rounded-[20px] border border-slate-300/80 bg-white/75 px-6 py-3 text-sm font-bold text-slate-700 shadow-[0_10px_22px_-18px_rgba(15,23,42,0.4)] backdrop-blur-md transition-all hover:scale-[1.03] hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300"
        >
          Ver todas as categorias
        </button>
      </div>
    </section>
  );
};
