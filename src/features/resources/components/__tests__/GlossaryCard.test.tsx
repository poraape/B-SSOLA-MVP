/* @vitest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { GlossaryItem } from '../../data/glossary';
import { GlossaryCard } from '../GlossaryCard';

describe('GlossaryCard', () => {
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

    fireEvent.click(screen.getByRole('button', { name: /Ver detalhes/i }));

    expect(screen.getByText(/Aluna chega chorando/)).toBeTruthy();
  });

  it('chama callback ao clicar em termo relacionado', () => {
    const onRelatedClick = vi.fn();

    render(
      <GlossaryCard
        item={mockItem}
        searchQuery=""
        onRelatedClick={onRelatedClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Ver detalhes/i }));
    fireEvent.click(screen.getByRole('button', { name: /Buscar termo relacionado Registro/i }));

    expect(onRelatedClick).toHaveBeenCalledWith('Registro');
  });

  it('destaca termo buscado', () => {
    render(<GlossaryCard item={mockItem} searchQuery="colhimento" />);

    const highlighted = screen.getByText('colhimento');
    expect(highlighted.tagName).toBe('MARK');
  });
});
