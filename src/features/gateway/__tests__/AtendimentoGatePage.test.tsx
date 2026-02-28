/* @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AtendimentoGatePage } from '../AtendimentoGatePage';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('AtendimentoGatePage', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('SIM deve ir para emergência', () => {
    render(<AtendimentoGatePage />);

    fireEvent.click(screen.getByRole('button', { name: 'SIM' }));

    expect(navigateMock).toHaveBeenCalledWith('/fluxo/flow_emergencia_medica');
  });

  it('NÃO deve ir para categorias', () => {
    render(<AtendimentoGatePage />);

    fireEvent.click(screen.getByRole('button', { name: 'NÃO' }));

    expect(navigateMock).toHaveBeenCalledWith('/categorias');
  });

  it('NÃO SEI com sinal marcado deve ir para emergência', () => {
    render(<AtendimentoGatePage />);

    fireEvent.click(screen.getByRole('button', { name: 'NÃO SEI' }));
    expect(screen.getByText('Risco imediato: Baixo')).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Sangramento grave'));
    expect(screen.getByText('Risco imediato: Elevado')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(screen.getByText('Sinal crítico identificado.')).toBeTruthy();

    vi.advanceTimersByTime(600);
    expect(navigateMock).toHaveBeenCalledWith('/fluxo/flow_emergencia_medica');
  });

  it('NÃO SEI sem sinal marcado deve ir para categorias', () => {
    render(<AtendimentoGatePage />);

    fireEvent.click(screen.getByRole('button', { name: 'NÃO SEI' }));
    expect(screen.getByText('Risco imediato: Baixo')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(screen.getByText('Nenhum sinal crítico detectado.')).toBeTruthy();

    vi.advanceTimersByTime(600);
    expect(navigateMock).toHaveBeenCalledWith('/categorias');
  });
});
