/* @vitest-environment jsdom */
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { GlossaryItem } from '../../data/glossary';
import { useGlossarySearch } from '../useGlossarySearch';

describe('useGlossarySearch', () => {
  const mockData: GlossaryItem[] = [
    {
      term: 'Acolhimento',
      definition: 'Primeira conversa para escuta ativa.',
      category: 'Protocolo',
      audienceLevel: 'leigo',
      regionalContext: 'ZL-SP',
      relatedTerms: ['Registro'],
    },
    {
      term: 'Bullying',
      definition: 'Agressão repetitiva entre estudantes.',
      category: 'Convivência',
      audienceLevel: 'leigo',
      regionalContext: 'ZL-SP',
    },
  ];

  it('retorna todas categorias', () => {
    const { result } = renderHook(() => useGlossarySearch(mockData, '', 'all'));

    expect(result.current.categories).toContain('all');
    expect(result.current.categories).toContain('Protocolo');
    expect(result.current.categories).toContain('Convivência');
  });

  it('filtra por busca', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(mockData, 'acolhimento', 'all')
    );

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].term).toBe('Acolhimento');
  });

  it('filtra por categoria', () => {
    const { result } = renderHook(() =>
      useGlossarySearch(mockData, '', 'Convivência')
    );

    expect(result.current.filteredItems).toHaveLength(1);
    expect(result.current.filteredItems[0].term).toBe('Bullying');
  });
});
