import { Fragment, createElement, type ReactNode } from 'react';

// src/features/resources/utils/searchUtils.ts

/**
 * Normaliza texto removendo acentos e convertendo para minúscula
 * Exemplo: "Âncora" → "ancora"
 */
export const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .toLowerCase();
};

/**
 * Busca fuzzy simples: verifica se query está contida em texto normalizado
 * ou tolera 1 erro de digitação
 */
export const fuzzyMatch = (query: string, text: string): boolean => {
  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  if (normalizedText.includes(normalizedQuery)) return true;

  // Tolera 1 caractere faltando ou trocado (Levenshtein simplificado)
  if (normalizedQuery.length > 3) {
    let matches = 0;
    for (let i = 0; i < normalizedQuery.length; i++) {
      if (normalizedText.includes(normalizedQuery[i])) matches++;
    }
    return matches >= normalizedQuery.length - 1;
  }

  return false;
};

/**
 * Agrupa termos por letra inicial
 */
export const groupByAlphabet = <T extends { term: string }>(
  items: T[]
): Record<string, T[]> => {
  const grouped: Record<string, T[]> = {};

  items.forEach((item) => {
    const firstLetter = item.term.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) grouped[firstLetter] = [];
    grouped[firstLetter].push(item);
  });

  return Object.fromEntries(
    Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
  );
};

/**
 * Destaca termo buscado no texto
 */
export const highlightTerm = (text: string, query: string): ReactNode => {
  if (!query) return text;

  const normalizedQuery = normalizeText(query);
  const normalizedText = normalizeText(text);

  const startIdx = normalizedText.indexOf(normalizedQuery);
  if (startIdx === -1) return text;

  const endIdx = startIdx + query.length;

  return createElement(
    Fragment,
    null,
    text.substring(0, startIdx),
    createElement(
      'mark',
      { className: 'bg-yellow-200 dark:bg-yellow-900 font-semibold' },
      text.substring(startIdx, endIdx)
    ),
    text.substring(endIdx)
  );
};
