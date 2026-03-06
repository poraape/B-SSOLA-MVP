import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/app/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { getEmergencyRoute } from '@/domain/flows/selectors';
import { getCategories } from '@/domain/model';
import { CompassIcon } from '@/features/shared/assets/CompassIcon';
import {
  getPremiumCategoryIcon,
} from '@/features/shared/components/PremiumCategoryIcons';

import { InstitutionalFooter } from './components/InstitutionalFooter';
import { TrustLayer } from './components/TrustLayer';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const categories = [...getCategories()]
    .sort((a, b) => (b.weight || 0) - (a.weight || 0))
    .slice(0, 7); // CRÍTICO: Limitar a exatamente 7 categorias conforme spec
  const emergencyRoute = getEmergencyRoute();

  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section — Premium Edition */}
      <section className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6 shadow-2xl md:min-h-[34rem] md:rounded-[3rem] md:p-12 lg:min-h-[38rem] lg:p-16">
        {/* Ambient gradient overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent opacity-60" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Compass — REPOSICIONADO E VISÍVEL */}
        <div className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.24] md:right-[3%] lg:right-[8%]">
          <motion.div
            animate={{
              rotate: [0, 2, 0, -2, 0],
              scale: [1, 1.01, 1],
              y: [0, -3, 0, 3, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="drop-shadow-[0_0_70px_rgba(255,255,255,0.2)]"
          >
            <CompassIcon className="h-[28rem] w-[28rem] text-white md:h-[40rem] md:w-[40rem] lg:h-[46rem] lg:w-[46rem]" />
          </motion.div>
        </div>

        {/* Floating context labels — Glassmorphism */}
        {/* Label 1: TOP-RIGHT (Decida) */}
        <div className="pointer-events-none absolute right-[16%] top-[20%] hidden lg:block xl:right-[18%]">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="rounded-2xl border border-white/15 bg-white/[0.10] px-5 py-3 shadow-2xl backdrop-blur-2xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold leading-relaxed text-white/95">
              Decida<br />com orientação clara
            </p>
          </motion.div>
        </div>

        {/* Label 2: MIDDLE-RIGHT (Encontre) */}
        <div className="pointer-events-none absolute right-[10%] top-[48%] hidden lg:block xl:right-[12%]">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="rounded-2xl border border-white/15 bg-white/[0.10] px-5 py-3 shadow-2xl backdrop-blur-2xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold leading-relaxed text-white/95">
              Encontre apoio<br />sem perder tempo
            </p>
          </motion.div>
        </div>

        {/* Label 3: BOTTOM-RIGHT (Aprenda) */}
        <div className="pointer-events-none absolute bottom-[18%] right-[16%] hidden lg:block xl:right-[18%]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="rounded-2xl border border-white/15 bg-white/[0.10] px-5 py-3 shadow-2xl backdrop-blur-2xl"
          >
            <p className="whitespace-nowrap text-xs font-semibold leading-relaxed text-white/95">
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

      {/* "Como você quer começar?" Section — Premium */}
      <section className="space-y-6">
        <h3 className="text-[clamp(1.625rem,3.5vw,2.25rem)] font-black tracking-tight text-slate-900 dark:text-white">
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
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-blue-700'
                  : 'border-slate-200 bg-white hover:border-blue-400 hover:shadow-blue-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra D */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] text-lg font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
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
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-emerald-700'
                  : 'border-slate-200 bg-white hover:border-emerald-400 hover:shadow-emerald-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra A */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] text-lg font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
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
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-violet-700'
                  : 'border-slate-200 bg-white hover:border-violet-400 hover:shadow-violet-100'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar letra L */}
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] text-lg font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
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

      {/* Recursos para apoiar a decisão — Premium */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-[clamp(1.625rem,3.5vw,2.25rem)] font-black tracking-tight text-slate-900 dark:text-white">
            Recursos para apoiar a decisão
          </h3>
          <p className="max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Camada formativa discreta para aprofundar entendimento sem competir com a ação principal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Glossário */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/recursos/glossario')}
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-indigo-700'
                  : 'border-slate-200 bg-white hover:border-indigo-400 hover:shadow-indigo-100'
              }`}
            >
              <div className="space-y-4">
                {/* Avatar letra G */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] text-2xl font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'bg-indigo-100 text-indigo-700'
                }`}>
                  G
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Glossário
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Entenda termos e conceitos do contexto escolar com linguagem clara.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/recursos/faq')}
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-pink-700'
                  : 'border-slate-200 bg-white hover:border-pink-400 hover:shadow-pink-100'
              }`}
            >
              <div className="space-y-4">
                {/* Avatar letra F */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] text-2xl font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'bg-pink-100 text-pink-700'
                }`}>
                  F
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    FAQ
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Respostas rápidas para dúvidas frequentes sobre condutas e encaminhamentos.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Simulador */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card
              hoverable
              onClick={() => navigate('/recursos/simulador')}
              className={`group border-2 p-5 transition-all hover:shadow-xl md:p-6 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 hover:border-orange-700'
                  : 'border-slate-200 bg-white hover:border-orange-400 hover:shadow-orange-100'
              }`}
            >
              <div className="space-y-4">
                {/* Avatar letra S */}
                <div className={`flex h-14 w-14 items-center justify-center rounded-[1.25rem] text-2xl font-black shadow-[inset_0_1px_4px_rgba(255,255,255,0.4),inset_0_-1px_3px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.15)] transition-all group-hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  S
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Simulador
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    Treine decisões em situações simuladas e refine o julgamento prático.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Privacy note subtil */}
        <div className="flex items-center justify-center pt-4">
          <p className="text-center text-xs text-slate-500 dark:text-slate-500">
            Sem registro de dados pessoais do estudante.
          </p>
        </div>
      </section>

      {/* Categories Grid — Premium Edition */}
      <section className="space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[clamp(1.625rem,3.5vw,2.25rem)] font-black tracking-tight text-slate-900 dark:text-white"
            >
              Navegar por categoria
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400"
            >
              As principais categorias aparecem primeiro. O restante pode ser acessado em uma página dedicada.
            </motion.p>
          </div>
        </div>

        {/* Grid de 7 categorias */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5">
          {categories.map((cat, index) => {
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  hoverable
                  onClick={() => navigate(`/categoria/${cat.id}`)}
                  className={`group relative overflow-hidden border-2 p-5 transition-all hover:scale-[1.02] md:p-6 lg:p-8 ${
                    theme === 'dark'
                      ? 'border-slate-800 bg-slate-900/80 backdrop-blur-sm hover:border-slate-700 hover:shadow-2xl hover:shadow-slate-950/60'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/60'
                  }`}
                >
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="relative mb-5 inline-block">
                      {/* Ícone iOS Style */}
                      <div className="transition-all duration-300 group-hover:scale-[1.08] group-hover:drop-shadow-2xl">
                        {getPremiumCategoryIcon(cat.icon, 'h-20 w-20')}
                      </div>

                      {/* Emergency badge */}
                      {cat.isEmergencyCategory && (
                        <div className="absolute -right-1 -top-1 z-20 animate-pulse rounded-full border-2 border-white bg-rose-600 p-1.5 shadow-lg dark:border-slate-900">
                          <AlertTriangle className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-slate-700 dark:text-white dark:group-hover:text-slate-100">
                      {cat.label}
                    </h3>

                    {/* Description */}
                    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {cat.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 transition-transform group-hover:translate-x-2 dark:text-blue-400">
                      Abrir categoria
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Botão "Ver todas as categorias" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center pt-4"
        >
          <button
            onClick={() => navigate('/categorias')}
            className={`group flex items-center gap-3 rounded-2xl border-2 px-8 py-4 text-sm font-bold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl ${
              theme === 'dark'
                ? 'border-slate-700 bg-slate-800/70 text-white backdrop-blur-sm hover:border-slate-600 hover:bg-slate-800'
                : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400'
            }`}
          >
            Abrir mapa completo de categorias
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </section>

      <TrustLayer onStartGuidedCare={() => navigate('/atendimento')} />

      <InstitutionalFooter />
    </div>
  );
};
