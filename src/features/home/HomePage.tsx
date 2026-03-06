import { AlertTriangle, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../app/context/ThemeContext';
import { Card } from '../../components/ui/Card';
import { CompassIcon } from '../../features/shared/assets/CompassIcon';
import { getPremiumCategoryColorClass, getPremiumCategoryIcon } from '../shared/components/PremiumCategoryIcons';

import { getEmergencyRoute } from '@/domain/flows/selectors';
import { getCategories } from '@/domain/model';


const PrivacyBadge: React.FC = () => (
  <span className="inline-flex items-center text-xs text-gray-500">
    Sem registro de dados pessoais do estudante.
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


  return (
    <div className="space-y-16">
      {showFirstUseBanner && null}

      {/* Hero Section */}
      <section className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-[#0F172A] p-6 shadow-2xl md:min-h-[28rem] md:rounded-[3rem] md:p-12 lg:p-16">
        <div className="absolute right-[-18%] top-1/2 -translate-y-1/2 opacity-15 pointer-events-none md:right-[-10%]">
          <motion.div
            animate={{ rotate: [0, 4, 0, -4, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="drop-shadow-[0_0_28px_rgba(255,255,255,0.15)]"
          >
            <CompassIcon className="h-[22rem] w-[22rem] text-white md:h-[38rem] md:w-[38rem]" />
          </motion.div>
        </div>

        <div className="relative z-10 flex h-full max-w-4xl flex-col justify-center space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <p className="text-xs font-bold tracking-[0.2em] text-slate-300">DECISÃO ESCOLAR ASSISTIDA</p>
            <h1 className="text-[clamp(2.25rem,8vw,6rem)] font-black leading-[0.95] tracking-tighter text-white">
              O que fazer <span className="text-amber-300">agora?</span>
            </h1>
            <p className="max-w-2xl text-[clamp(1.05rem,2.6vw,1.75rem)] font-medium leading-relaxed text-slate-300">
              O Bússola ajuda a identificar a situação, priorizar o cuidado e seguir com mais segurança.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:pt-4">
            <button
              onClick={() => navigate('/atendimento')}
              className="rounded-xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-xl transition-all hover:scale-[1.02] md:rounded-2xl md:px-8 md:py-5 md:text-base"
            >
              Iniciar atendimento guiado
            </button>
            <button
              onClick={() => navigate('/rede')}
              className="rounded-xl border border-slate-600 bg-slate-800/50 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800 md:rounded-2xl md:px-8 md:py-5 md:text-base"
            >
              Ver rede de apoio
            </button>
            <button
              onClick={() => navigate(emergencyRoute)}
              className="inline-flex items-center rounded-full border border-red-300/60 px-4 py-2 text-xs font-medium text-red-100 transition-colors hover:bg-red-500/10 md:ml-auto"
              aria-label="Acionar emergência"
            >
              Acionar emergência
            </button>
          </div>
        </div>
      </section>

      <PrivacyBadge />

      <section className="space-y-5">
        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Escolha por onde começar</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card hoverable onClick={() => navigate('/atendimento')} className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Atendimento guiado</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Receba o próximo passo para a situação observada.</p>
          </Card>
          <Card hoverable onClick={() => navigate('/rede')} className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Rede de apoio</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Encontre contatos, serviços e encaminhamentos.</p>
          </Card>
          <Card hoverable onClick={() => navigate('/recursos')} className={`p-5 border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Recursos</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Consulte termos, perguntas frequentes e simulações.</p>
          </Card>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Situações por tema</h3>
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
                    Abrir categoria <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
        <p className="text-base font-semibold text-slate-800 dark:text-slate-100">Quando houver dúvida, comece pelo atendimento guiado.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate('/atendimento')}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Iniciar atendimento guiado
          </button>
          <p className="text-xs text-slate-500 dark:text-slate-400">Sem registro de dados pessoais do estudante.</p>
        </div>
      </section>
    </div>
  );
};
