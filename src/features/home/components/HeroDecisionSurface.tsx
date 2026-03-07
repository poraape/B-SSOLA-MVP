import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';

interface HeroDecisionSurfaceProps {
  onStartGuidedCare: () => void;
  onOpenNetwork: () => void;
  onOpenEmergency: () => void;
}

interface PointerOffset {
  x: number;
  y: number;
}

interface PointerState {
  offset: PointerOffset;
  angle: number;
}

const floatingCards = [
  {
    title: 'Decida',
    subtitle: 'com orientação clara',
    position: 'right-[8%] top-[8%]',
  },
  {
    title: 'Encontre apoio',
    subtitle: 'sem perder tempo',
    position: 'bottom-[10%] left-[8%]',
  },
  {
    title: 'Aprenda',
    subtitle: 'enquanto usa',
    position: 'right-0 top-[48%] md:right-[-2%]',
  },
];

export const HeroDecisionSurface: React.FC<HeroDecisionSurfaceProps> = ({
  onStartGuidedCare,
  onOpenNetwork,
  onOpenEmergency,
}) => {
  const [pointerState, setPointerState] = useState<PointerState>({
    offset: { x: 0, y: 0 },
    angle: 35,
  });
  const [isHoveringCompass, setIsHoveringCompass] = useState(false);
  const [idleTick, setIdleTick] = useState(Date.now());
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setReducedMotion(mediaQuery.matches);
    syncPreference();

    mediaQuery.addEventListener('change', syncPreference);
    return () => {
      mediaQuery.removeEventListener('change', syncPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || isHoveringCompass) {
      return;
    }

    const timer = window.setInterval(() => {
      setIdleTick(Date.now());
    }, 90);

    return () => {
      window.clearInterval(timer);
    };
  }, [reducedMotion, isHoveringCompass]);

  const idleNeedleAngle = useMemo(() => {
    if (reducedMotion || isHoveringCompass) {
      return 35;
    }

    return 35 + Math.sin(idleTick / 900) * 7;
  }, [idleTick, isHoveringCompass, reducedMotion]);

  const compassTransform = useMemo(() => {
    if (reducedMotion) {
      return {
        wrapper: 'perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)',
        needle: 'translate3d(-50%, -50%, 0) rotate(35deg)',
      };
    }

    return {
      wrapper: `perspective(900px) rotateX(${-pointerState.offset.y * 0.9}deg) rotateY(${pointerState.offset.x * 0.9}deg) translate3d(${pointerState.offset.x * 0.45}px, ${pointerState.offset.y * 0.45}px, 0)`,
      needle: `translate3d(-50%, -50%, 0) rotate(${isHoveringCompass ? pointerState.angle : idleNeedleAngle}deg)`,
    };
  }, [idleNeedleAngle, isHoveringCompass, pointerState, reducedMotion]);

  const handlePointerMove: React.MouseEventHandler<HTMLElement> = (event) => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;

    setPointerState({
      offset: {
        x: (relativeX - 0.5) * 18,
        y: (relativeY - 0.5) * 18,
      },
      angle,
    });
  };

  return (
    <section
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setIsHoveringCompass(true)}
      onMouseLeave={() => {
        setIsHoveringCompass(false);
        setPointerState({ offset: { x: 0, y: 0 }, angle: 35 });
      }}
      className="relative mb-0 min-h-[480px] overflow-hidden rounded-[20px] border border-white/30 bg-gradient-to-br from-[#07122b] via-[#12214d] to-[#1b2d63] p-4 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.55)] ring-1 ring-white/20 backdrop-blur-xl sm:min-h-[520px] sm:p-6 md:p-12 lg:p-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.2),rgba(30,64,175,0.24)),radial-gradient(circle_at_78%_48%,rgba(246,201,76,0.16),transparent_38%),radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.16),transparent_42%)]" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 sm:space-y-7">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-300 md:text-xs">DECISÃO ESCOLAR ASSISTIDA</p>
          <h1 className="text-[clamp(2.1rem,10vw,6rem)] font-black leading-[1.04] tracking-[-0.02em] text-white sm:text-[clamp(2.75rem,7.5vw,6rem)]">
            <span className="block">O que fazer</span>
            <span className="block pb-[0.06em] bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">agora?</span>
          </h1>
          <p className="max-w-2xl text-[clamp(1.125rem,2.8vw,1.625rem)] font-medium leading-[1.45] text-slate-200">
            Identifique a situação, priorize o cuidado e siga com segurança.
          </p>

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:pt-2">
            <button
              onClick={onStartGuidedCare}
              className="min-h-[44px] rounded-[18px] bg-amber-300 px-5 py-3.5 text-sm font-bold text-black shadow-[0_12px_28px_-16px_rgba(251,191,36,0.65)] transition-all hover:-translate-y-[1px] hover:brightness-105 sm:px-[26px] sm:py-4 md:text-base"
            >
              Iniciar atendimento guiado
            </button>
            <button
              onClick={onOpenNetwork}
              className="min-h-[44px] rounded-[18px] border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-18px_rgba(15,23,42,0.65)] backdrop-blur-[20px] transition-all hover:-translate-y-[1px] hover:bg-white/14 sm:px-6 sm:py-4 md:px-8 md:text-base"
            >
              Ver rede de apoio
            </button>
            <button
              onClick={onOpenEmergency}
              className="min-h-[44px] rounded-[18px] border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-rose-100 shadow-[0_10px_24px_-18px_rgba(190,24,93,0.45)] backdrop-blur-[20px] transition-all hover:-translate-y-[1px] hover:bg-white/14 sm:px-6 sm:py-4 md:px-8 md:text-base"
              aria-label="Acionar emergência"
            >
              Protocolo de emergência
            </button>
          </div>
          <p className="max-w-2xl text-sm font-medium text-slate-200/75">
            Sem registro de dados pessoais do estudante · Baseado em protocolo e encaminhamento seguro
          </p>
        </div>

        <div className="relative mx-auto mt-1.5 w-full max-w-[14.25rem] min-[390px]:max-w-[15.25rem] sm:mt-4 sm:max-w-[17rem] md:max-w-[20rem] lg:mt-0 lg:max-w-[27rem]">
          <div
            style={{ transform: compassTransform.wrapper, transition: reducedMotion ? 'none' : 'transform 180ms ease-out' }}
            className="relative mx-auto aspect-square w-full"
          >
            <div className="absolute inset-[4%] rounded-full border border-[#8aa4d5]/24 bg-[radial-gradient(circle,rgba(92,126,191,0.12)_0%,rgba(52,85,150,0.1)_36%,rgba(26,52,106,0.06)_100%)]" />
            <div className="absolute inset-[17%] rounded-full border border-[#8aa4d5]/24" />
            <div className="absolute inset-[31%] rounded-full border border-[#8aa4d5]/24" />
            <div className="absolute inset-[45%] rounded-full border border-[#8aa4d5]/24" />
            <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-[#8aa4d5]/22" />
            <div className="absolute left-[12%] top-1/2 h-px w-[76%] -translate-y-1/2 bg-[#8aa4d5]/22" />

            <div
              className="absolute left-1/2 top-1/2 h-[4px] w-[52%] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#F6C94C] via-[#f4ca59] to-[#f4ca59]/0 shadow-[0_0_8px_rgba(246,201,76,0.35)]"
              style={{ transform: compassTransform.needle }}
            />
            <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-slate-900/45" />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-slate-100/90" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6C94C]" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(242,248,255,0.1) 0%, rgba(15,23,42,0) 62%)',
                transform: reducedMotion
                  ? 'translate3d(0px, 0px, 0px)'
                  : `translate3d(${pointerState.offset.x * 0.2}px, ${pointerState.offset.y * 0.2}px, 0)`,
                transition: reducedMotion ? 'none' : 'transform 180ms ease-out',
              }}
            />

            {floatingCards.map((card, index) => (
              <motion.div
                key={card.title}
                className={`absolute ${card.position} ${index === 2 ? 'hidden sm:block' : ''} rounded-[18px] border border-white/20 bg-white/8 px-3 py-2.5 shadow-[0_10px_16px_-14px_rgba(15,23,42,0.65)] backdrop-blur-md sm:px-4 sm:py-3`}
                animate={reducedMotion ? undefined : { y: [0, -4, 0, 4, 0] }}
                transition={reducedMotion ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
              >
                <p className="text-[0.72rem] font-semibold text-cyan-100 sm:text-xs">{card.title}</p>
                <p className="mt-0.5 text-[0.74rem] font-normal text-slate-200 sm:text-[0.8rem]">{card.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
