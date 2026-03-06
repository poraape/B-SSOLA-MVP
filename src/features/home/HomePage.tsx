import React, { useState } from 'react';
import { HeroDecision } from './components/HeroDecision';
import { EntryModes } from './components/EntryModes';
import { PriorityThemes } from './components/PriorityThemes';
import { FormativeLayer } from './components/FormativeLayer';
import { TrustFooter } from './components/TrustFooter';
import { ResumeSessionCard } from './components/ResumeSessionCard';
import { useAdaptiveHome } from './hooks/useAdaptiveHome';

export const HomePage: React.FC = () => {
  const adaptiveState = useAdaptiveHome();
  const [showResumeCard, setShowResumeCard] = useState(
    adaptiveState.mode === 'active-session' && !!adaptiveState.lastSessionFlow,
  );

  const handleDismissResume = () => {
    setShowResumeCard(false);
    try {
      localStorage.removeItem('bssola_last_decision_flow');
    } catch (error) {
      console.warn('[HomePage] Failed to clear session:', error);
    }
  };

  return (
    <main className="space-y-16" role="main">
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Pular para conteúdo principal
      </a>

      {/* Hero — Zona 1 */}
      <HeroDecision />

      {/* Resume Session (Adaptive) */}
      {showResumeCard && adaptiveState.lastSessionFlow && (
        <section aria-label="Sessão ativa">
          <ResumeSessionCard
            flowId={adaptiveState.lastSessionFlow}
            onDismiss={handleDismissResume}
          />
        </section>
      )}

      {/* Main Content */}
      <div id="main-content" className="space-y-16">
        {/* Entry Modes — Zona 2 */}
        <EntryModes />

        {/* Priority Themes — Zona 3 */}
        <PriorityThemes />

        {/* Formative Layer — Zona 4 */}
        <FormativeLayer />
      </div>

      {/* Trust Footer — Zona 5 */}
      <TrustFooter />
    </main>
  );
};
