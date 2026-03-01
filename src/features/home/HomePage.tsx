import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../../features/search/components/SearchBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getCategories } from '@/domain/model';
import { getEmergencyRoute } from '@/domain/flows/selectors';
import { useTheme } from '../../app/context/ThemeContext';
import { AlertTriangle, ChevronRight, Phone } from 'lucide-react';
import { CompassIcon } from '../../features/shared/assets/CompassIcon';
import { getPremiumCategoryColorClass, getPremiumCategoryIcon } from '../shared/components/PremiumCategoryIcons';


const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
    🔒 Sem dados pessoais do estudante
  </span>
);

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const categories = [...getCategories()].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  const emergencyRoute = getEmergencyRoute();
  const { theme } = useTheme();

  const [showFirstUseBanner, setShowFirstUseBanner] = useState(false);

  useEffect(() => {
    try {
      setShowFirstUseBanner(localStorage.getItem('bssola_first_use') !== 'done');
    } catch {
      setShowFirstUseBanner(true);
    }
  }, []);

  const handleCloseFirstUseBanner = () => {
    try {
      localStorage.setItem('bssola_first_use', 'done');
    } catch {
      // fallback seguro quando localStorage indisponível
    }
    setShowFirstUseBanner(false);
  };

  return (
    <div className="space-y-16">
      {showFirstUseBanner && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-start justify-between text-sm">
          <p className="text-blue-800">
            <strong>B-SSOLA</strong> · Ferramenta institucional de apoio ao professor. Não substitui atendimento profissional.
          </p>
          <button
            onClick={handleCloseFirstUseBanner}
            className="ml-3 text-blue-500 hover:text-blue-700 font-bold"
            aria-label="Fechar aviso"
          >✕</button>
        </div>
      )}

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
          <div className="flex justify-end">
            <button
              onClick={() => navigate(emergencyRoute)}
              className="flex items-center gap-1 text-xs font-medium text-red-600 border border-red-200 rounded-full px-3 py-1 hover:bg-red-50 transition-colors"
              aria-label="Acionar emergência"
            >
              🚨 Acionar emergência
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 pt-2 md:pt-4">
            <button 
              onClick={() => navigate('/atendimento')}
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

      <PrivacyBadge />

      {/* Categories Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Navegar por Categorias</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((cat) => {
            const colorClasses = getPremiumCategoryColorClass(cat.color || 'blue');
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
                      {getPremiumCategoryIcon(cat.icon)}
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
