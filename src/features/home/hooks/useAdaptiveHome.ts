import { useState, useEffect } from 'react';

interface AdaptiveHomeState {
  mode: 'default' | 'returning-user' | 'active-session';
  lastSessionFlow?: string;
  recentThemes?: string[];
}

/**
 * Hook que implementa comportamento adaptativo da Home baseado em:
 * - Sessão ativa (fluxo não finalizado)
 * - Usuário retornando (visita nas últimas 24h)
 * - Temas acessados recentemente
 */
export function useAdaptiveHome(): AdaptiveHomeState {
  const [state, setState] = useState<AdaptiveHomeState>({
    mode: 'default',
  });

  useEffect(() => {
    try {
      const lastFlow = localStorage.getItem('bssola_last_decision_flow');
      const lastVisit = localStorage.getItem('bssola_last_visit');
      const recentThemesRaw = localStorage.getItem('bssola_recent_themes');

      const now = Date.now();
      const lastVisitTime = lastVisit ? parseInt(lastVisit, 10) : 0;
      const isRecentVisit = now - lastVisitTime < 24 * 60 * 60 * 1000; // 24h

      let recentThemes: string[] = [];
      try {
        recentThemes = recentThemesRaw ? JSON.parse(recentThemesRaw) : [];
      } catch {
        recentThemes = [];
      }

      // Priority: active session > returning user > default
      if (lastFlow) {
        setState({
          mode: 'active-session',
          lastSessionFlow: lastFlow,
          recentThemes,
        });
      } else if (isRecentVisit && lastVisit) {
        setState({
          mode: 'returning-user',
          recentThemes,
        });
      } else {
        setState({
          mode: 'default',
          recentThemes: [],
        });
      }

      // Update last visit timestamp
      localStorage.setItem('bssola_last_visit', now.toString());
    } catch (error) {
      console.warn('[useAdaptiveHome] localStorage error:', error);
      setState({ mode: 'default' });
    }
  }, []);

  return state;
}
