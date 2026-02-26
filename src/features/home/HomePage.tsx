import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../features/search/components/SearchBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getCategories } from '../../domain/flows/selectors';
import { useTheme } from '../../app/context/ThemeContext';
import { 
  Shield,
  Brain, 
  Home, 
  BookOpen, 
  Heart,
  Scale,
  AlertTriangle,
  Puzzle,
  ChevronRight,
  Info,
  Phone
} from 'lucide-react';
import { CompassIcon } from '../../features/shared/assets/CompassIcon';

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

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const categories = getCategories();
  const { theme } = useTheme();

  return (
    <div className="space-y-16">
      {/* Hero Section - Redesigned to match image */}
      <section className="relative bg-[#0F172A] rounded-[2rem] md:rounded-[3rem] overflow-hidden p-6 md:p-12 lg:p-16 min-h-[22rem] md:min-h-[28rem] flex flex-col justify-center shadow-2xl group">
        {/* Background Compass Graphic */}
        <div className="absolute right-[-18%] md:right-[-10%] top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
          <CompassIcon className="w-[22rem] h-[22rem] md:w-[38rem] md:h-[38rem] text-white" />
        </div>

        <div className="relative z-10 space-y-8 md:space-y-10 max-w-4xl">
          {/* Title & Subtitle */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-[clamp(2.25rem,8vw,6rem)] font-black text-white tracking-tighter leading-[0.95]">
              O que fazer <span className="text-yellow-400">agora?</span>
            </h2>
            <p className="text-[clamp(1.05rem,2.6vw,1.75rem)] text-slate-400 font-medium max-w-2xl leading-relaxed">
              Identifique a situação do estudante e saiba os próximos passos.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-4 pt-2 md:pt-4">
            <button 
              onClick={() => navigate('/fluxo/flow_gateway')}
              className="bg-white text-slate-900 px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.08em] hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-3 text-center leading-tight"
            >
              Iniciar Atendimento Guiado 🧭
            </button>
            <button 
              onClick={() => navigate('/rede')}
              className="bg-slate-800/50 border border-slate-700 text-white px-6 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.08em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 text-center leading-tight"
            >
              Consultar Rede de Apoio 📞
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Navegar por Categorias</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((cat) => {
            const colorClasses = getColorClass(cat.color || 'blue');
            return (
              <Card
                key={cat.id}
                hoverable
                onClick={() => navigate(`/categoria/${cat.id}`)}
                className={`p-6 md:p-8 relative group border-2 ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                }`}
              >
                <div className="relative z-10">
                  <div className="relative inline-block">
                    <div className={`mb-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${colorClasses}`}>
                      {getIcon(cat.icon)}
                    </div>
                    {cat.isEmergencyCategory && (
                      <div className="absolute -top-2 -right-2 bg-rose-600 text-white p-1.5 rounded-full shadow-lg animate-pulse border-2 border-white dark:border-slate-900 z-20">
                        <AlertTriangle className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-slate-900 dark:text-white tracking-tight">{cat.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center text-xs font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform">
                    Ver situações <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
