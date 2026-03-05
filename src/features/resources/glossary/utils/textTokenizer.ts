export interface TokenizeOptions {
  removeStopwords?: boolean;
  minTokenLength?: number;
}

const STOPWORDS_PT = new Set([
  'a', 'as', 'o', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas',
  'um', 'uma', 'uns', 'umas', 'para', 'por', 'com', 'sem', 'ao', 'aos', 'à', 'às', 'que',
  'se', 'ser', 'sua', 'seu', 'suas', 'seus', 'como', 'mais', 'menos', 'muito', 'muita',
  'muitos', 'muitas', 'já', 'nao', 'não', 'sim', 'tambem', 'também', 'sobre', 'entre',
  'quando', 'onde', 'porque', 'porquê', 'qual', 'quais', 'cada', 'outro', 'outra', 'outros',
  'outras', 'este', 'esta', 'esses', 'essas', 'isso', 'isto', 'aquele', 'aquela', 'aqueles',
  'aquelas', 'ele', 'ela', 'eles', 'elas', 'eu', 'tu', 'voces', 'vocês', 'nosso', 'nossa',
  'nossos', 'nossas', 'seja', 'sao', 'são', 'foi', 'eram', 'era', 'tem', 'têm', 'ha', 'há',
  'ter', 'ate', 'até', 'durante', 'apos', 'após', 'antes', 'depois', 'mês', 'mes', 'ano',
]);

const NON_WORD_REGEX = /[^\p{L}\p{N}]+/gu;

export const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const splitWords = (value: string): string[] =>
  normalizeText(value)
    .split(NON_WORD_REGEX)
    .filter(Boolean);

export const tokenize = (value: string, options: TokenizeOptions = {}): string[] => {
  const { removeStopwords = true, minTokenLength = 2 } = options;

  return splitWords(value).filter((token) => {
    if (token.length < minTokenLength) {
      return false;
    }

    if (!removeStopwords) {
      return true;
    }

    return !STOPWORDS_PT.has(token);
  });
};

export const tokenizeFields = (fields: Array<string | undefined | null>): string[] =>
  fields.flatMap((field) => tokenize(field ?? ''));

export const buildTokenFrequency = (tokens: string[]): Map<string, number> => {
  const frequency = new Map<string, number>();

  for (const token of tokens) {
    frequency.set(token, (frequency.get(token) ?? 0) + 1);
  }

  return frequency;
};

export const levenshteinDistance = (a: string, b: string): number => {
  if (a === b) {
    return 0;
  }

  if (a.length === 0) {
    return b.length;
  }

  if (b.length === 0) {
    return a.length;
  }

  const previous = new Array(b.length + 1).fill(0);
  const current = new Array(b.length + 1).fill(0);

  for (let j = 0; j <= b.length; j += 1) {
    previous[j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }

    for (let j = 0; j <= b.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[b.length];
};
