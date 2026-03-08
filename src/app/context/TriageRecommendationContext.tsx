import { createContext, useCallback, useContext, useState } from 'react';

interface TriageRecommendation {
  highlightId: string | null;
  queryType: string | null;
}

const KEY = 'bssola_triage_rec';

const normalizeQueryType = (value: string | null | undefined): 'interno' | 'externo' | null =>
  value === 'interno' || value === 'externo' ? value : null;

const normalizeRecommendation = (input: Partial<TriageRecommendation> | null | undefined): TriageRecommendation => {
  const highlight = typeof input?.highlightId === 'string' ? input.highlightId.trim() : '';
  return {
    highlightId: highlight || null,
    queryType: normalizeQueryType(input?.queryType),
  };
};

const areRecommendationsEqual = (a: TriageRecommendation, b: TriageRecommendation): boolean =>
  a.highlightId === b.highlightId && a.queryType === b.queryType;

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
      return saved ? normalizeRecommendation(JSON.parse(saved)) : { highlightId: null, queryType: null };
    } catch {
      return { highlightId: null, queryType: null };
    }
  });

  const setRecommendation = useCallback((next: TriageRecommendation) => {
    setRecommendationState((previous) => {
      const normalized = normalizeRecommendation(next);
      if (areRecommendationsEqual(previous, normalized)) {
        return previous;
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify(normalized));
      } catch {}
      return normalized;
    });
  }, []);

  return (
    <TriageRecommendationContext.Provider value={{ recommendation, setRecommendation }}>
      {children}
    </TriageRecommendationContext.Provider>
  );
}

export const useTriageRecommendation = () => useContext(TriageRecommendationContext);
