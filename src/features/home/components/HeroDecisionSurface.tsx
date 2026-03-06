import React, { useEffect, useMemo, useState } from 'react';

interface HeroDecisionSurfaceProps {
  onStartGuidedCare: () => void;
  onOpenNetwork: () => void;
  onOpenEmergency: () => void;
}

interface PointerOffset {
  x: number;
  y: number;
}

const floatingCards = [
  { title: 'Situação', subtitle: 'Registro inicial', position: 'left-4 top-6 md:left-10 md:top-10' },
  { title: 'Risco', subtitle: 'Avaliação guiada', position: 'right-4 top-16 md:right-16 md:top-14' },
  { title: 'Encaminhamento', subtitle: 'Próxima ação', position: 'left-6 bottom-8 md:left-16 md:bottom-14' },
];

export const HeroDecisionSurface: React.FC<HeroDecisionSurfaceProps> = ({
  onStartGuidedCare,
  onOpenNetwork,
  onOpenEmergency,
}) => {
  const [pointerOffset, setPointerOffset] = useState<PointerOffset>({ x: 0, y: 0 });
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

  const compassTransform = useMemo(() => {
    if (reducedMotion) {
      return {
        wrapper: 'translate3d(0px, 0px, 0px)',
        needle: 'translate3d(-50%, -50%, 0) rotate(35deg)',
      };
    }

    return {
      wrapper: `translate3d(${pointerOffset.x * 0.45}px, ${pointerOffset.y * 0.45}px, 0)`,
      needle: `translate3d(-50%, -50%, 0) rotate(${35 + pointerOffset.x * 0.9}deg)`,
    };
  }, [pointerOffset, reducedMotion]);

  const handlePointerMove: React.MouseEventHandler<HTMLElement> = (event) => {
    if (reducedMotion) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;

    setPointerOffset({
      x: (relativeX - 0.5) * 18,
      y: (relativeY - 0.5) * 18,
    });
  };

  return (
    <section
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setPointerOffset({ x: 0, y: 0 })}
      className="relative overflow-hidden rounded-[2rem] border border-white/35 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.55)] ring-1 ring-white/20 backdrop-blur-sm md:min-h-[28rem] md:rounded-[3rem] md:p-12 lg:p-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,184,0.22),transparent_42%),radial-gradient(circle_at_80%_75%,rgba(59,130,246,0.22),transparent_36%)]" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <h1 className="text-[clamp(2.1rem,8vw,5.4rem)] font-black leading-[0.95] tracking-tight text-white">
            O que fazer agora?
          </h1>
          <p className="max-w-2xl text-[clamp(1rem,2.5vw,1.35rem)] font-medium leading-relaxed text-slate-200">
            Identifique a situação e receba orientação segura.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              onClick={onStartGuidedCare}
              className="rounded-xl bg-white px-6 py-4 text-sm font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl md:rounded-2xl md:px-8 md:text-base"
            >
              Iniciar atendimento guiado
            </button>
            <button
              onClick={onOpenNetwork}
              className="rounded-xl border border-slate-400/70 bg-slate-700/35 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-700/55 md:rounded-2xl md:px-8 md:text-base"
            >
              Ver rede de apoio
            </button>
            <button
              onClick={onOpenEmergency}
              className="rounded-xl border border-rose-300/60 bg-rose-950/20 px-6 py-4 text-sm font-semibold text-rose-100 transition-all hover:bg-rose-900/35 md:rounded-2xl md:px-8 md:text-base"
              aria-label="Acionar emergência"
            >
              Protocolo de emergência
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[27rem]">
          <div
            style={{ transform: compassTransform.wrapper, transition: reducedMotion ? 'none' : 'transform 180ms ease-out' }}
            className="relative mx-auto aspect-square w-full"
          >
            <div className="absolute inset-[5%] rounded-full border border-white/30 bg-white/10 shadow-[0_0_40px_rgba(56,189,248,0.28)] backdrop-blur-md" />
            <div className="absolute inset-[17%] rounded-full border border-blue-200/35" />
            <div className="absolute inset-[29%] rounded-full border border-slate-200/30" />
            <div className="absolute inset-[41%] rounded-full border border-white/35 bg-white/10" />

            <div className="absolute left-1/2 top-1/2 h-[2px] w-[38%] -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-200 to-blue-500 shadow-[0_0_18px_rgba(56,189,248,0.6)]" style={{ transform: compassTransform.needle }} />
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/90 shadow-md" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(15,23,42,0)_62%)]" />

            {floatingCards.map((card) => (
              <div
                key={card.title}
                className={`absolute ${card.position} rounded-2xl border border-white/25 bg-white/12 px-3 py-2 shadow-lg backdrop-blur-md`}
              >
                <p className="text-[0.62rem] font-black uppercase tracking-[0.14em] text-cyan-100">{card.title}</p>
                <p className="text-xs font-semibold text-slate-100">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
