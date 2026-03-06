import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Compass as CompassIcon, AlertTriangle } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { getCategories } from '@/domain/model';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [...getCategories()].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 7);
  const emergencyCategory = categories.find((cat) => cat.isEmergencyCategory);
  const emergencyRoute = emergencyCategory ? `/categoria/${emergencyCategory.id}` : '/atendimento';

  return (
    <div className="space-y-8">
      <section className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#0F172A] p-6 shadow-2xl md:min-h-[36rem] md:rounded-[3rem] md:p-12 lg:min-h-[42rem] lg:p-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-blue-500/8 via-transparent to-transparent opacity-70" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-[0.22] sm:right-[-5%] md:right-[2%] lg:right-[8%] xl:right-[12%]">
          <motion.div
            animate={{
              rotate: [0, 2, 0, -2, 0],
              scale: [1, 1.01, 1],
              y: [0, -4, 0, 4, 0],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="drop-shadow-[0_0_90px_rgba(255,255,255,0.18)]"
          >
            <CompassIcon className="h-[28rem] w-[28rem] text-white sm:h-[34rem] sm:w-[34rem] md:h-[40rem] md:w-[40rem] lg:h-[46rem] lg:w-[46rem] xl:h-[52rem] xl:w-[52rem]" />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute right-[16%] top-[20%] hidden xl:block">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="rounded-2xl border border-white/[0.2] bg-white/[0.14] px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
          >
            <p className="whitespace-nowrap text-[0.8125rem] font-semibold leading-relaxed text-white/95">
              Decida
              <br />
              com orientação clara
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute right-[10%] top-[50%] hidden xl:block">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="rounded-2xl border border-white/[0.2] bg-white/[0.14] px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
          >
            <p className="whitespace-nowrap text-[0.8125rem] font-semibold leading-relaxed text-white/95">
              Encontre apoio
              <br />
              sem perder tempo
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-[18%] right-[16%] hidden xl:block">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="rounded-2xl border border-white/[0.2] bg-white/[0.14] px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
          >
            <p className="whitespace-nowrap text-[0.8125rem] font-semibold leading-relaxed text-white/95">
              Aprenda
              <br />
              enquanto usa
            </p>
          </motion.div>
        </div>

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
              <span className="inline-block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_3px_16px_rgba(251,191,36,0.4)]">
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
              className="group rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 px-7 py-4 text-sm font-bold text-slate-900 shadow-[0_10px_28px_-8px_rgba(251,191,36,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_14px_36px_-10px_rgba(251,191,36,0.7)] md:rounded-2xl md:px-9 md:py-5 md:text-base"
            >
              <span className="transition-all group-hover:tracking-wide">Iniciar atendimento guiado</span>
            </button>

            <button
              onClick={() => navigate('/rede')}
              className="rounded-xl border border-slate-600/60 bg-slate-800/50 px-6 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-500 hover:bg-slate-800/70 md:rounded-2xl md:px-8 md:py-5 md:text-base"
            >
              Ver rede de apoio
            </button>

            <button
              onClick={() => navigate(emergencyRoute)}
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-900/30 px-5 py-2.5 text-xs font-semibold text-purple-100 backdrop-blur-sm transition-all hover:border-purple-400/60 hover:bg-purple-900/50 md:ml-auto"
              aria-label="Protocolo de emergência"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-500" />
              </span>
              Protocolo de emergência
            </button>
          </motion.div>
        </div>
      </section>

      <section className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 p-6 shadow-sm dark:border-blue-900/30 dark:from-blue-950/30 dark:to-sky-950/20">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Retomar atendimento em andamento</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Você iniciou um fluxo recentemente. Continue de onde parou em um clique.
            </p>
          </div>
          <button
            onClick={() => navigate('/atendimento/retomar')}
            className="shrink-0 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
          >
            Continuar de onde parei
          </button>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">Como você quer começar?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Entradas por intenção de uso, sem duplicar a navegação global do sistema.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card hoverable onClick={() => navigate('/atendimento')} className="group p-6 transition-all hover:shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] bg-blue-100 text-lg font-black text-blue-700 shadow-sm transition-all group-hover:scale-110 dark:bg-blue-500/20 dark:text-blue-300">
                D
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Decidir agora</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Receba orientação passo a passo para a situação observada, com foco no próximo passo.
                </p>
              </div>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/rede')} className="group p-6 transition-all hover:shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] bg-emerald-100 text-lg font-black text-emerald-700 shadow-sm transition-all group-hover:scale-110 dark:bg-emerald-500/20 dark:text-emerald-300">
                A
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Encontrar apoio</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Acesse serviços, contatos e encaminhamentos de forma contextual e rápida.
                </p>
              </div>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/recursos')} className="group p-6 transition-all hover:shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.125rem] bg-violet-100 text-lg font-black text-violet-700 shadow-sm transition-all group-hover:scale-110 dark:bg-violet-500/20 dark:text-violet-300">
                L
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aprender e consultar</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Consulte conteúdos, simulações e respostas rápidas enquanto usa o app.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">Navegar por categoria</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              As principais categorias aparecem primeiro. O restante pode ser acessado em uma página dedicada.
            </p>
          </div>
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="shrink-0 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showAllCategories ? 'Ver menos' : 'Ver todas as categorias'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {displayedCategories.map((cat) => (
            <Card
              key={cat.id}
              hoverable
              onClick={() => navigate(`/categoria/${cat.id}`)}
              className="group relative flex flex-col items-center justify-center gap-4 p-6 text-center transition-all hover:shadow-xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700 shadow-md transition-all group-hover:scale-110 dark:from-slate-800 dark:to-slate-900 dark:text-slate-200">
                {cat.icon === 'AlertTriangle' && <AlertTriangle className="h-8 w-8" />}
                {cat.icon === 'Heart' && <span className="text-2xl">❤️</span>}
                {cat.icon === 'Brain' && <span className="text-2xl">🧠</span>}
                {cat.icon === 'Users' && <span className="text-2xl">👥</span>}
                {cat.icon === 'Scale' && <span className="text-2xl">⚖️</span>}
                {cat.icon === 'Home' && <span className="text-2xl">🏠</span>}
                {cat.icon === 'Accessibility' && <span className="text-2xl">♿</span>}
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.label}</h3>
              </div>

              {cat.isEmergencyCategory && (
                <div className="absolute -right-1 -top-1 rounded-full border-2 border-white bg-rose-600 p-1.5 shadow-lg dark:border-slate-900">
                  <AlertTriangle className="h-3 w-3 text-white" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {!showAllCategories && (
          <div className="text-center">
            <button
              onClick={() => setShowAllCategories(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-slate-700"
            >
              Abrir mapa completo de categorias
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
            Recursos para apoiar a decisão
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Camada formativa discreta para aprofundar entendimento sem competir com a ação principal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Card hoverable onClick={() => navigate('/recursos/glossario')} className="group p-6 transition-all hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-slate-100 text-2xl font-black text-slate-700 shadow-sm transition-all group-hover:scale-110 dark:bg-slate-800 dark:text-slate-200">
                G
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Glossário</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Entenda termos e conceitos do contexto escolar com linguagem clara.
                </p>
              </div>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/recursos/faq')} className="group p-6 transition-all hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-blue-100 text-2xl font-black text-blue-700 shadow-sm transition-all group-hover:scale-110 dark:bg-blue-500/20 dark:text-blue-300">
                F
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">FAQ</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Respostas rápidas para dúvidas frequentes sobre condutas e encaminhamentos.
                </p>
              </div>
            </div>
          </Card>

          <Card hoverable onClick={() => navigate('/recursos/simulador')} className="group p-6 transition-all hover:shadow-xl">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-violet-100 text-2xl font-black text-violet-700 shadow-sm transition-all group-hover:scale-110 dark:bg-violet-500/20 dark:text-violet-300">
                S
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Simulador</h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Treine decisões em situações simuladas e refine o julgamento prático.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <div className="pb-4 pt-8 text-center">
        <p className="text-xs text-slate-500 dark:text-slate-600">Sem registro de dados pessoais do estudante.</p>
      </div>
    </div>
  );
};
