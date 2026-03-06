import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/app/context/ThemeContext';
import { CompassIcon } from '@/features/shared/assets/CompassIcon';
import { getEmergencyRoute } from '@/domain/flows/selectors';
import { getCategories } from '@/domain/model';
import { Card } from '@/components/ui/Card';

import { CategoryGridPreview } from './components/CategoryGridPreview';
import { TrustLayer } from './components/TrustLayer';
import { InstitutionalFooter } from './components/InstitutionalFooter';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const categories = [...getCategories()]
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .slice(0, 7); // CRÍTICO: Limitar a exatamente 7 categorias conforme spec
  const emergencyRoute = getEmergencyRoute();

  return (
    <div className="space-y-16">
      {/* Hero Section — Premium Edition */}
      <section className="relative min-h-[26rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 shadow-2xl md:min-h-[32rem] md:rounded-[3rem] md:p-12 lg:p-16">
        {/* Ambient gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-60" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Compass — Enhanced positioning */}
        <div className="pointer-events-none absolute right-[-15%] top-1/2 -translate-y-1/2 opacity-[0.18] md:right-[-8%] lg:right-[-5%]">
          <motion.div
            animate={{
              rotate: [0, 3, 0, -3, 0],
              scale: [1, 1.015, 1],
              y: [0, -4, 0, 4, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]"
          >
            <CompassIcon className="h-[24rem] w-[24rem] text-white md:h-[42rem] md:w-[42rem]" />
          </motion.div>
        </div>

        {/* Floating context labels — Glassmorphism */}
        <div className="absolute top-[18%] right-[8%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 shadow-lg backdrop-blur-xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold text-white/90">
              Decida<br />com orientação clara
            </p>
          </motion.div>
        </div>

        <div className="absolute top-[48%] right-[22%] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 shadow-lg backdrop-blur-xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold text-white/90">
              Encontre apoio<br />sem perder tempo
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-[22%] right-[12%] hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 shadow-lg backdrop-blur-xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold text-white/90">
              Aprenda<br />enquanto usa
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full max-w-4xl flex-col justify-center space-y-8 md:space-y-10">
          <div className="space-y-4 md:space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-slate-300/80 md:text-xs"
            >
              Decisão Escolar Assistida
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.75rem,7.5vw,6rem)] font-black leading-[0.92] tracking-[-0.02em] text-white"
            >
              O que fazer{' '}
              <span className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(251,191,36,0.35)]">
                agora?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-[clamp(1.125rem,2.8vw,1.625rem)] font-medium leading-[1.45] text-slate-200"
            >
              Identifique a situação, priorize o cuidado e siga com segurança. Uma entrada rápida para decisão, apoio e aprendizado situado.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:pt-4"
          >
            <button
              onClick={() => navigate('/atendimento')}
              className="group rounded-xl bg-gradient-to-b from-white to-slate-50 px-7 py-4 text-sm font-bold text-slate-900 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] md:rounded-2xl md:px-9 md:py-5 md:text-base"
            >
              <span className="transition-all group-hover:tracking-wide">Iniciar atendimento guiado</span>
            </button>

            <button
              onClick={() => navigate('/rede')}
              className="rounded-xl border border-slate-600/60 bg-slate-800/40 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-500 hover:bg-slate-800/60 md:rounded-2xl md:px-8 md:py-5 md:text-base"
            >
              Ver rede de apoio
            </button>

            <button
              onClick={() => navigate(emergencyRoute)}
              className="inline-flex items-center gap-2 rounded-full border border-red-300/50 bg-red-500/10 px-5 py-2.5 text-xs font-semibold text-red-100 backdrop-blur-sm transition-all hover:border-red-300/70 hover:bg-red-500/20 md:ml-auto"
              aria-label="Acionar emergência"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              Emergência
            </button>
          </motion.div>
        </div>
      </section>

      <CategoryGridPreview
        categories={categories}
        onOpenCategory={(categoryId) => navigate(`/categoria/${categoryId}`)}
        onOpenAllCategories={() => navigate('/categorias')}
      />

      {/* "Como você quer começar?" Section — Premium */}
      <section className="space-y-6">
        <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-black tracking-tight text-slate-900 dark:text-white">
          Como você quer começar?
        </h3>
        <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Entradas por intenção de uso, sem duplicar a navegação global do sistema.
        </p>

        <div className="grid grid-cols-1 gap-5 pt-2 md:grid-cols-3">
          {/* Card 1: Decidir agora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/atendimento')}
              className={`group border-2 p-6 transition-all hover:shadow-xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-blue-700'
                  : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-blue-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra D */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  D
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    Decidir agora
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Receba orientação passo a passo para a situação observada, com foco no próximo passo.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Encontrar apoio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/rede')}
              className={`group border-2 p-6 transition-all hover:shadow-xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-emerald-700'
                  : 'border-slate-200 bg-white hover:border-emerald-400 hover:shadow-emerald-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra A */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  A
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    Encontrar apoio
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Acesse serviços, contatos e encaminhamentos de forma contextual e rápida.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Aprender e consultar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/recursos')}
              className={`group border-2 p-6 transition-all hover:shadow-xl ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-violet-700'
                  : 'border-slate-200 bg-white hover:border-violet-400 hover:shadow-violet-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra L */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'bg-violet-100 text-violet-700'
                }`}>
                  L
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">
                    Aprender e consultar
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Consulte conteúdos, simulações e respostas rápidas enquanto usa o app.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <TrustLayer onStartGuidedCare={() => navigate('/atendimento')} />

      <InstitutionalFooter />
    </div>
  );
};
