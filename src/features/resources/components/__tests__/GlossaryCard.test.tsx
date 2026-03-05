/* @vitest-environment jsdom */
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { GlossaryItem } from '../../../data/glossary';
import { GlossaryCard } from '../GlossaryCard';

describe('GlossaryCard', () => {
  afterEach(cleanup);

  const mockItem: GlossaryItem = {
    term: 'Acolhimento Inicial',
    definition: 'Primeira conversa reservada com estudante.',
    category: 'Protocolo',
    context: 'Aplicar em local reservado.',
    practicalExample: 'Aluna chega chorando e precisa de acolhimento imediato.',
    relatedTerms: ['Registro', 'CT'],
    audienceLevel: 'leigo',
  };

  it('renderiza termo e definição', () => {
    render(<GlossaryCard item={mockItem} searchQuery="" />);

    expect(screen.getByText('Acolhimento Inicial')).toBeTruthy();
    expect(screen.getByText(/Primeira conversa reservada/)).toBeTruthy();
  });

  it('expande detalhes ao clicar', () => {
    render(<GlossaryCard item={mockItem} searchQuery="" />);

    const expandButtons = screen.getAllByRole('button', { name: /Ver detalhes/i });
    fireEvent.click(expandButtons[0]);

    expect(screen.getByText(/Aluna chega chorando/)).toBeTruthy();
  });

  it('chama callback ao clicar em termo relacionado', async () => {
    const onRelatedClick = vi.fn();

    render(
      <GlossaryCard
        item={mockItem}
        searchQuery=""
        onRelatedClick={onRelatedClick}
      />
    );

    // 1. Expandir card
    const expandButtons = screen.getAllByRole('button', { name: /Ver detalhes/i });
    fireEvent.click(expandButtons[0]);

    // 2. Aguardar renderização dos termos relacionados
    await waitFor(() => {
      expect(screen.getByText(/Registro/)).toBeTruthy();
    });

    // 3. Clicar no termo relacionado
    const relatedButtons = screen.getAllByRole('button', { name: /Buscar termo relacionado Registro/i });
    fireEvent.click(relatedButtons[0]);

    // 4. Verificar callback
    await waitFor(() => {
      expect(onRelatedClick).toHaveBeenCalledWith('Registro');
    });
  });

  it('destaca termo buscado', () => {
    render(<GlossaryCard item={mockItem} searchQuery="colhimento" />);

    const highlighted = screen.getByText('colhimento');
    expect(highlighted.tagName).toBe('MARK');
  });
});
