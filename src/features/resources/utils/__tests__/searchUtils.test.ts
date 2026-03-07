import { describe, expect, it } from 'vitest';
import { fuzzyMatch, groupByAlphabet, normalizeText } from '../searchUtils';

describe('searchUtils', () => {
  describe('normalizeText', () => {
    it('remove acentos', () => {
      expect(normalizeText('Âncora')).toBe('ancora');
    });

    it('converte para minúscula', () => {
      expect(normalizeText('TESTE')).toBe('teste');
    });
  });

  describe('fuzzyMatch', () => {
    it('encontra match exato', () => {
      expect(fuzzyMatch('acolhimento', 'Acolhimento Inicial')).toBe(true);
    });

    it('tolera 1 erro', () => {
      expect(fuzzyMatch('acolhimentoo', 'Acolhimento')).toBe(true);
    });

    it('não encontra match distante', () => {
      expect(fuzzyMatch('xyz', 'Acolhimento')).toBe(false);
    });
  });

  describe('groupByAlphabet', () => {
    it('agrupa corretamente', () => {
      const items = [
        { term: 'Acolhimento' },
        { term: 'Bullying' },
        { term: 'Ansiedade' },
      ];

      const grouped = groupByAlphabet(items);

      expect(grouped.A).toHaveLength(2);
      expect(grouped.B).toHaveLength(1);
    });
  });
});
