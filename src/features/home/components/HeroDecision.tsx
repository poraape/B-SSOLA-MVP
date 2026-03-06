import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { CompassIcon } from '../../shared/assets/CompassIcon';
import { getEmergencyRoute } from '@/domain/flows/selectors';

export const HeroDecision: React.FC = () => {
  const navigate = useNavigate();
  const emergencyRoute = getEmergencyRoute();

  return (
    <section className="relative min-h-[28rem] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0F172A] to-[#1E293B] shadow-overlay md:min-h-[34rem] md:rounded-[3rem]">
      {/* Background Compass — Motion Signature */}
      <div className="absolute right-[-15%] top-1/2 pointer-events-none select-none -translate-y-1/2 opacity-[0.08] md:right-[-8%]">
        <div className="motion-signature-compass">
          <CompassIcon
            className="h-[22rem] w-[22rem] text-white md:h-[38rem] md:w-[38rem]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center space-y-10 p-8 md:p-16 lg:max-w-4xl">
        {/* Eyebrow */}
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-400 md:text-xs">
          Decisão Escolar Assistida
        </p>

        {/* Heading */}
        <div className="space-y-5">
          <h1 className="text-[clamp(2.75rem,7.5vw,6rem)] font-black leading-[0.92] tracking-[-0.02em] text-white">
            O que fazer{' '}
            <span className="inline-block bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              agora?
            </span>
          </h1>
          <p className="max-w-2xl text-[clamp(1.125rem,2.8vw,1.625rem)] font-medium leading-[1.45] text-slate-200">
            Identifique a situação, priorize o cuidado e siga com segurança.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Primary CTA — Amber Signature */}
          <button
            onClick={() => navigate('/atendimento')}
            className="focus-ring press-scale group inline-flex items-center justify-center rounded-button bg-gradient-to-r from-amber-300 to-amber-400 px-8 py-4 text-base font-bold text-slate-900 shadow-elevated transition-all duration-normal hover:from-amber-200 hover:to-amber-300 hover:shadow-overlay md:px-10 md:py-5 md:text-lg"
          >
            Iniciar atendimento guiado
            <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </button>

          {/* Secondary Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={() => navigate('/rede')}
              className="focus-ring press-scale touch-target inline-flex items-center justify-center rounded-button border-2 border-slate-500/80 bg-slate-800/40 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm transition-all duration-normal hover:border-slate-400 hover:bg-slate-700/60 md:text-base"
            >
              Ver rede de apoio
            </button>

            {/* Emergency CTA — Refined */}
            <button
              onClick={() => navigate(emergencyRoute)}
              className="focus-ring press-scale touch-target inline-flex items-center justify-center gap-2 rounded-button border-2 border-red-400/60 bg-red-950/30 px-6 py-3 text-sm font-semibold text-red-200 backdrop-blur-sm transition-all duration-normal hover:border-red-300 hover:bg-red-900/40 md:text-base"
              aria-label="Acessar protocolo de emergência"
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Protocolo de emergência
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
