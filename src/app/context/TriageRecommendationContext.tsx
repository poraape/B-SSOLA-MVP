import { createContext, useContext, useState } from 'react';

interface TriageRecommendation {
  highlightId: string | null;
  queryType: string | null;
}

const KEY = 'bssola_triage_rec';

const TriageRecommendationContext = createContext<{
  recommendation: TriageRecommendation;
  setRecommendation: (r: TriageRecommendation) => void;
}>({
  recommendation: { highlightId: null, queryType: null },
  setRecommendation: () => {},
});

export function TriageRecommendationProvider({ children }: { children: React.ReactNode }) {
  const [recommendation, setRecommendationState] = useState<TriageRecommendation>(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      return saved ? JSON.parse(saved) : { highlightId: null, queryType: null };
    } catch { return { highlightId: null, queryType: null }; }
  });

  function setRecommendation(r: TriageRecommendation) {
    setRecommendationState(r);
    try { sessionStorage.setItem(KEY, JSON.stringify(r)); } catch {}
  }

  return (
    <TriageRecommendationContext.Provider value={{ recommendation, setRecommendation }}>
      {children}
    </TriageRecommendationContext.Provider>
  );
}

export const useTriageRecommendation = () => useContext(TriageRecommendationContext);
