import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { evaluateMacroRisk, type GatewaySignal } from '@/domain/gateway/gatewayHeuristics';

const SIGNAL_OPTIONS: Array<{ id: GatewaySignal; label: string }> = [
  { id: 'loss_of_consciousness', label: 'Perda de consciência' },
  { id: 'immediate_physical_threat', label: 'Ameaça física imediata' },
  { id: 'severe_bleeding', label: 'Sangramento grave' },
  { id: 'imminent_integrity_risk', label: 'Risco iminente à integridade' },
];

export const AtendimentoGatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isUnsureExpanded, setIsUnsureExpanded] = useState(false);
  const [selectedSignals, setSelectedSignals] = useState<GatewaySignal[]>([]);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const routeFromDecision = (route: 'emergency' | 'categories') => {
    if (route === 'emergency') {
      navigate('/fluxo/flow_emergencia_medica');
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
    <section className="max-w-3xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Há risco de vida ou integridade neste momento?
        </h1>
        <p className="text-slate-600 dark:text-slate-300">Selecione a melhor opção para iniciar o encaminhamento.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button onClick={() => handleImmediateAnswer('yes')} variant="danger" className="uppercase tracking-wide">
          SIM
        </Button>
        <Button onClick={() => handleImmediateAnswer('no')} variant="outline" className="uppercase tracking-wide">
          NÃO
        </Button>
        <Button onClick={() => setIsUnsureExpanded(true)} variant="secondary" className="uppercase tracking-wide">
          NÃO SEI
        </Button>
      </div>

      {isUnsureExpanded && (
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-slate-800 p-5 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">Sinais críticos</h2>
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
          <p className={`text-xs font-medium ${riskLabel.className}`}>Risco imediato: {riskLabel.label}</p>

          <Button onClick={handleUnsureContinue} disabled={isNavigating}>
            Continuar
          </Button>

          {explanation && (
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900 p-3 space-y-1">
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
