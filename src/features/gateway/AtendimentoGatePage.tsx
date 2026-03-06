import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { evaluateMacroRisk, type GatewaySignal } from '@/domain/gateway/gatewayHeuristics';
import { getEmergencyRoute } from '@/domain/flows/selectors';

const SIGNAL_OPTIONS: Array<{ id: GatewaySignal; label: string }> = [
  { id: 'loss_of_consciousness', label: 'Perda de consciência' },
  { id: 'immediate_physical_threat', label: 'Ameaça física imediata' },
  { id: 'severe_bleeding', label: 'Sangramento grave' },
  { id: 'imminent_integrity_risk', label: 'Risco iminente à integridade' },
];

export const AtendimentoGatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isUnsureExpanded, setIsUnsureExpanded] = useState(false);
  const emergencyRoute = getEmergencyRoute();
  const [selectedSignals, setSelectedSignals] = useState<GatewaySignal[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const routeFromDecision = (route: 'emergency' | 'categories') => {
    if (route === 'emergency') {
      navigate(emergencyRoute);
      return;
    }

    navigate('/categorias');
  };

  const resetUnsureState = () => {
    setIsUnsureExpanded(false);
    setSelectedSignals([]);
    setExplanation(null);
    setIsNavigating(false);
  };

  const handleImmediateAnswer = (answer: 'yes' | 'no') => {
    resetUnsureState();
    const decision = evaluateMacroRisk(answer, []);
    if (import.meta.env.DEV) {
      console.debug('[GatewayDecision]', decision);
    }
    routeFromDecision(decision.route);
  };

  const handleUnsureContinue = () => {
    const decision = evaluateMacroRisk('unsure', selectedSignals);
    if (import.meta.env.DEV) {
      console.debug('[GatewayDecision]', decision);
    }
    setExplanation(decision.explanation);
    setIsNavigating(true);

    window.setTimeout(() => {
      routeFromDecision(decision.route);
    }, 600);
  };

  const selectedCountText = useMemo(() => {
    if (selectedSignals.length === 0) {
      return 'Nenhum sinal crítico selecionado.';
    }

    return `${selectedSignals.length} sinal(is) crítico(s) selecionado(s).`;
  }, [selectedSignals.length]);

  const currentScore = useMemo(
    () => evaluateMacroRisk('unsure', selectedSignals).score,
    [selectedSignals],
  );

  const riskLabel = useMemo(() => {
    if (currentScore >= 2) {
      return { label: 'Elevado', className: 'text-red-600' };
    }

    if (currentScore === 1) {
      return { label: 'Atenção', className: 'text-amber-600' };
    }

    return { label: 'Baixo', className: 'text-emerald-600' };
  }, [currentScore]);

  return (
    <section className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.5)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95 md:p-10">
      <header className="space-y-2">
        <div className="flex justify-end">
          <button
            onClick={() => navigate(emergencyRoute)}
            className="rounded-full border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-500/60 dark:text-red-300 dark:hover:bg-red-500/10"
            aria-label="Acionar emergência"
          >
            Acionar emergência
          </button>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Há risco imediato neste momento?
        </h1>
        <p className="text-slate-600 dark:text-slate-300">Escolha a opção que melhor descreve a situação agora.</p>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Button onClick={() => handleImmediateAnswer('yes')} variant="danger" className="h-12 rounded-2xl text-sm font-semibold shadow-[0_10px_24px_-16px_rgba(220,38,38,0.8)]">
          SIM
        </Button>
        <Button onClick={() => handleImmediateAnswer('no')} variant="outline" className="h-12 rounded-2xl border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
          NÃO
        </Button>
        <Button onClick={() => setIsUnsureExpanded(true)} variant="secondary" className="h-12 rounded-2xl text-sm font-semibold shadow-[0_10px_24px_-18px_rgba(59,130,246,0.65)]">
          NÃO SEI
        </Button>
      </div>

      {isUnsureExpanded && (
        <div className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-[0_12px_28px_-22px_rgba(37,99,235,0.7)] dark:border-blue-900 dark:bg-slate-800/90">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">Sinais críticos observados</h2>
          <div className="space-y-3">
            {SIGNAL_OPTIONS.map((signal) => {
              const isChecked = selectedSignals.includes(signal.id);
              return (
                <label key={signal.id} className="flex items-center gap-3 text-sm text-slate-800 dark:text-slate-100">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setSelectedSignals((prev) => [...prev, signal.id]);
                        return;
                      }

                      setSelectedSignals((prev) => prev.filter((item) => item !== signal.id));
                    }}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  {signal.label}
                </label>
              );
            })}
          </div>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-300">{selectedCountText}</p>
          <p className={`text-xs font-medium ${riskLabel.className}`}>Nível de atenção: {riskLabel.label}</p>

          <Button onClick={handleUnsureContinue} disabled={isNavigating} className="rounded-xl px-4 py-2 text-sm font-semibold">
            Ver recomendação inicial
          </Button>

          {explanation && (
            <div className="space-y-2 rounded-xl border border-slate-300 bg-white/85 p-4 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.7)] dark:border-slate-600 dark:bg-slate-900/90">
              <p className="text-xs font-black uppercase tracking-wide text-slate-700 dark:text-slate-300">
                Recomendação baseada em sinais críticos de risco imediato.
              </p>
              <p className="text-sm text-slate-800 dark:text-slate-100">{explanation}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
