import { Fragment, createElement, type ReactNode } from 'react';

const DIACRITICS_REGEX = /[\u0300-\u036f]/g;

/**
 * Remove acentos e converte para minúscula.
 * normalizeText("Âncora") -> "ancora"
 */
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(DIACRITICS_REGEX, '').toLowerCase().trim();
}

function editDistanceAtMostOne(source: string, target: string): boolean {
  const sourceLength = source.length;
  const targetLength = target.length;

  if (Math.abs(sourceLength - targetLength) > 1) {
    return false;
  }

  let indexSource = 0;
  let indexTarget = 0;
  let edits = 0;

  while (indexSource < sourceLength && indexTarget < targetLength) {
    if (source[indexSource] === target[indexTarget]) {
      indexSource += 1;
      indexTarget += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) {
      return false;
    }

    if (sourceLength > targetLength) {
      indexSource += 1;
    } else if (targetLength > sourceLength) {
      indexTarget += 1;
    } else {
      indexSource += 1;
      indexTarget += 1;
    }
  }

  if (indexSource < sourceLength || indexTarget < targetLength) {
    edits += 1;
  }

  return edits <= 1;
}

/**
 * Busca fuzzy: tolera 1 erro de digitação.
 * fuzzyMatch("ancora", "Âncora pedagógica") -> true
 */
export function fuzzyMatch(query: string, text: string): boolean {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  if (!normalizedQuery) {
    return true;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  const words = normalizedText.split(/[^a-z0-9]+/).filter(Boolean);
  return words.some((word) => editDistanceAtMostOne(normalizedQuery, word));
}

/**
 * Agrupa termos por letra inicial A-Z.
 * groupByAlphabet(items) -> { A: [...], B: [...], ... }
 */
export function groupByAlphabet<T extends { term: string }>(items: T[]): Record<string, T[]> {
  const groupedItems: Record<string, T[]> = {};

  for (const item of items) {
    const normalizedTerm = normalizeText(item.term);
    const firstChar = normalizedTerm.charAt(0).toUpperCase();
    const letter = /^[A-Z]$/.test(firstChar) ? firstChar : '#';

    if (!groupedItems[letter]) {
      groupedItems[letter] = [];
    }

    groupedItems[letter].push(item);
  }

  return Object.fromEntries(
    Object.entries(groupedItems)
      .sort(([letterA], [letterB]) => letterA.localeCompare(letterB))
      .map(([letter, letterItems]) => [
        letter,
        [...letterItems].sort((itemA, itemB) =>
          normalizeText(itemA.term).localeCompare(normalizeText(itemB.term), 'pt-BR')
        ),
      ])
  );
}

type NormalizedMap = {
  normalized: string;
  indexMap: number[];
};

function buildNormalizedMap(text: string): NormalizedMap {
  let normalized = '';
  const indexMap: number[] = [];

  for (let index = 0; index < text.length; index += 1) {
    const normalizedChunk = text[index].normalize('NFD').replace(DIACRITICS_REGEX, '').toLowerCase();

    for (const char of normalizedChunk) {
      normalized += char;
      indexMap.push(index);
    }
  }

  return { normalized, indexMap };
}

/**
 * Destaca query no texto (React Node com <mark>).
 * highlightTerm("Acolhimento Inicial", "colhimento") -> React.ReactNode
 */
export function highlightTerm(text: string, query: string): ReactNode {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return text;
  }

  const { normalized, indexMap } = buildNormalizedMap(text);
  const startIndex = normalized.indexOf(normalizedQuery);

  if (startIndex === -1) {
    return text;
  }

  const endIndex = startIndex + normalizedQuery.length - 1;
  const originalStart = indexMap[startIndex];
  const originalEnd = indexMap[endIndex] + 1;

  const before = text.slice(0, originalStart);
  const match = text.slice(originalStart, originalEnd);
  const after = text.slice(originalEnd);

  return createElement(
    Fragment,
    null,
    before,
    createElement('mark', { className: 'rounded bg-amber-200 px-0.5 text-slate-900' }, match),
    after
  );
}
