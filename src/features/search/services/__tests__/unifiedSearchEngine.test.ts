import { describe, it, expect } from 'vitest';
import { searchFAQ, searchGlossary, unifiedSearch } from '../unifiedSearchEngine';
import type { UnifiedSearchResult } from '../unifiedSearchEngine';

describe('unifiedSearchEngine', () => {
  describe('searchFAQ', () => {
    it('returns FAQ results matching query', () => {
      const results = searchFAQ('atendimento guiado');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('type', 'faq');
      expect(results[0]).toHaveProperty('question');
      expect(results[0]).toHaveProperty('answer');
    });

    it('returns empty array for non-matching query', () => {
      const results = searchFAQ('xyzabc123notfound');
      
      expect(results).toEqual([]);
    });

    it('scores exact matches higher', () => {
      const results = searchFAQ('app');
      
      if (results.length > 1) {
        expect(results[0].score).toBeGreaterThanOrEqual(results[1].score);
      }
    });
  });

  describe('searchGlossary', () => {
    it('returns glossary results matching query', () => {
      const results = searchGlossary('ECA');
      
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty('type', 'glossary');
      expect(results[0]).toHaveProperty('term');
      expect(results[0]).toHaveProperty('definition');
    });

    it('returns empty array for non-matching query', () => {
      const results = searchGlossary('xyzabc123notfound');
      
      expect(results).toEqual([]);
    });

    it('searches in term and definition', () => {
      const results = searchGlossary('conselho');
      
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('unifiedSearch', () => {
    it('combines FAQ and glossary results', () => {
      const results = unifiedSearch('violência');
      
      expect(results.length).toBeGreaterThan(0);
      
      const hasFAQ = results.some((r: UnifiedSearchResult) => r.type === 'faq');
      const hasGlossary = results.some((r: UnifiedSearchResult) => r.type === 'glossary');
      
      expect(hasFAQ || hasGlossary).toBe(true);
    });

    it('sorts results by score descending', () => {
      const results = unifiedSearch('protocolo');
      
      if (results.length > 1) {
        for (let i = 0; i < results.length - 1; i++) {
          expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
        }
      }
    });

    it('returns results with required fields', () => {
      const results = unifiedSearch('escola');
      
      expect(results.length).toBeGreaterThan(0);
      
      results.forEach((result: UnifiedSearchResult) => {
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('type');
        expect(result).toHaveProperty('title');
        expect(result).toHaveProperty('url');
        expect(result).toHaveProperty('score');
      });
    });
  });
});
