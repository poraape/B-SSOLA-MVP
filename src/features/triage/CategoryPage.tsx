import React, { useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCategories, getFlowsByCategory } from '../../domain/flows/selectors';
import { ArrowLeft, ChevronRight, Shield, Brain, Home, BookOpen, Heart, Scale, AlertTriangle, Puzzle, Info } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const getIcon = (iconStr: string) => {
  switch (iconStr) {
    case 'alert': return <AlertTriangle className="w-6 h-6" />;
    case 'shield': return <Shield className="w-6 h-6" />;
    case 'brain': return <Brain className="w-6 h-6" />;
    case 'home': return <Home className="w-6 h-6" />;
    case 'book': return <BookOpen className="w-6 h-6" />;
    case 'heart': return <Heart className="w-6 h-6" />;
    case 'balance': return <Scale className="w-6 h-6" />;
    case 'scales': return <Scale className="w-6 h-6" />;
    case 'warning': return <AlertTriangle className="w-6 h-6" />;
    case 'puzzle': return <Puzzle className="w-6 h-6" />;
    case 'accessibility': return <Puzzle className="w-6 h-6" />;
    case 'handshake': return <BookOpen className="w-6 h-6" />;
    default: return <Info className="w-6 h-6" />;
  }
};

const getColorClass = (color: string) => {
  switch (color) {
    case 'red': return 'text-rose-500 bg-rose-50 border-rose-100';
    case 'orange': return 'text-orange-500 bg-orange-50 border-orange-100';
    case 'purple': return 'text-purple-500 bg-purple-50 border-purple-100';
    case 'blue': return 'text-blue-500 bg-blue-50 border-blue-100';
    case 'teal': return 'text-teal-500 bg-teal-50 border-teal-100';
    case 'yellow': return 'text-yellow-500 bg-yellow-50 border-yellow-100';
    case 'indigo': return 'text-indigo-500 bg-indigo-50 border-indigo-100';
    default: return 'text-slate-500 bg-slate-50 border-slate-100';
  }
};

const severityWeight: Record<'CRITICAL' | 'HIGH' | 'MODERATE', number> = {
  CRITICAL: 3,
  HIGH: 2,
  MODERATE: 1,
};


const normalizeCategoryToken = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const categories = getCategories();
  const routeCategoryId = decodeURIComponent(categoryId || '').trim();

  const category = useMemo(() => {
    if (!routeCategoryId) {
      return undefined;
    }

    const directMatch = categories.find((cat) => cat.id === routeCategoryId);
    if (directMatch) {
      return directMatch;
    }

    const underscoreMatch = categories.find((cat) => cat.id === routeCategoryId.replace(/-/g, '_'));
    if (underscoreMatch) {
      return underscoreMatch;
    }

    const normalizedRouteId = normalizeCategoryToken(routeCategoryId);
    return categories.find((cat) => {
      const normalizedId = normalizeCategoryToken(cat.id);
      const normalizedLabel = normalizeCategoryToken(cat.label);
      return normalizedId === normalizedRouteId || normalizedLabel === normalizedRouteId;
    });
  }, [categories, routeCategoryId]);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    console.info('[CategoryPage] categoryId param:', routeCategoryId);
    console.info('[CategoryPage] model category ids:', categories.map((cat) => cat.id));
    console.info('[CategoryPage] resolved category id:', category?.id ?? null);
  }, [category?.id, categories, routeCategoryId]);

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
          <div className={`p-4 rounded-3xl shrink-0 ${getColorClass(category.color || 'blue')}`}>
            {getIcon(category.icon)}
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
