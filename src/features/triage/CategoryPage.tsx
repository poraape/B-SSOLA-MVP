import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategories } from '@/domain/model';
import { getFlowsByCategory } from '../../domain/flows/selectors';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { getPremiumCategoryColorClass, getPremiumCategoryIcon } from '../shared/components/PremiumCategoryIcons';

const severityWeight: Record<'CRITICAL' | 'HIGH' | 'MODERATE', number> = {
  CRITICAL: 3,
  HIGH: 2,
  MODERATE: 1,
};

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const categories = getCategories();
  const routeCategoryId = decodeURIComponent(categoryId || '').trim();
  const category = categories.find((cat) => cat.id === routeCategoryId);

  if (!category) {
    return <div className="text-center py-20">Categoria não encontrada.</div>;
  }

  const flows = getFlowsByCategory(category.id);

  const groupedSubcategories = category.subcategories
    .map((subcategory) => {
      const subcategoryFlows = flows
        .filter((flow) => (flow.meta.subcategoryId || flow.meta.subcategory) === subcategory.id)
        .sort((a, b) => {
          const left = a.meta.severity || 'MODERATE';
          const right = b.meta.severity || 'MODERATE';
          const bySeverity = severityWeight[right] - severityWeight[left];
          if (bySeverity !== 0) {
            return bySeverity;
          }

          return a.meta.title.localeCompare(b.meta.title, 'pt-BR');
        });

      return {
        ...subcategory,
        flows: subcategoryFlows,
      };
    })
    .filter((subcategory) => subcategory.flows.length > 0);

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
          <div className={`p-4 rounded-3xl shrink-0 ${getPremiumCategoryColorClass(category.color || 'blue')}`}>
            {getPremiumCategoryIcon(category.icon)}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{category.label}</h2>
            <p className="text-slate-500 text-lg max-w-2xl">{category.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {groupedSubcategories.map((subcategory) => (
            <React.Fragment key={subcategory.id}>
              {subcategory.flows.map((flow) => (
                <Card
                  key={flow.meta.id}
                  hoverable
                  onClick={() => navigate(`/fluxo/${flow.meta.id}`)}
                  className="p-6 flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {flow.meta.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {subcategory.label}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                  </div>
                </Card>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
