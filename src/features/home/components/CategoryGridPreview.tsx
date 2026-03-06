import { AlertTriangle } from 'lucide-react';
import React from 'react';

import { useTheme } from '../../../app/context/ThemeContext';
import { Card } from '../../../components/ui/Card';
import type { Category } from '../../../types';
import {
  getPremiumCategoryColorClass,
  getPremiumCategoryIcon,
} from '../../shared/components/PremiumCategoryIcons';

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
          const colorClasses = getPremiumCategoryColorClass(cat.color || 'blue');

          return (
            <Card
              key={cat.id}
              hoverable
              onClick={() => onOpenCategory(cat.id)}
              className={`relative group border ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-200/80'
              }`}
            >
              <div className="relative z-10 flex h-full min-h-[9.25rem] flex-col items-start justify-between p-4 transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0.5">
                <div className="relative inline-flex">
                  <div className={`mb-4 h-16 w-16 rounded-2xl border flex items-center justify-center transition-all group-hover:scale-105 group-active:scale-95 ${colorClasses}`}>
                    {getPremiumCategoryIcon(cat.icon)}
                  </div>
                  {cat.isEmergencyCategory && (
                    <div className="absolute -top-2 -right-2 bg-rose-600 text-white p-1.5 rounded-full shadow-lg animate-pulse border-2 border-white dark:border-slate-900 z-20">
                      <AlertTriangle className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-black uppercase leading-tight tracking-wide text-slate-900 dark:text-white line-clamp-2">
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
