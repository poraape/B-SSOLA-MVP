import { normalizeText } from './normalizeText';

const STOPWORDS_PT_BR = new Set([
  'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'uns', 'umas', 'para', 'por', 'com', 'sem', 'ao', 'aos', 'aquela', 'aquele',
  'que', 'se', 'como', 'quando', 'onde', 'sobre', 'entre', 'nao', 'não', 'mais', 'menos',
  'muito', 'muita', 'muitos', 'muitas', 'foi', 'sao', 'são', 'ser', 'tem', 'tambem', 'também',
  'isso', 'isto', 'essa', 'esse', 'essas', 'esses', 'ele', 'ela', 'eles', 'elas', 'seu', 'sua',
]);

export const tokenizePtBr = (value: string): string[] =>
  normalizeText(value)
    .split(/\s+/)
    .filter((token) => token.length >= 3)
    .filter((token) => !STOPWORDS_PT_BR.has(token));

export const tokenFrequency = (tokens: string[]): Map<string, number> => {
  const frequency = new Map<string, number>();

  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }

  return frequency;
};
