/* @vitest-environment jsdom */
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AppModeProvider, useAppMode } from '../AppModeContext';

function Probe() {
  const { mode, setMode } = useAppMode();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button type="button" onClick={() => setMode('formacao')}>
        set-formacao
      </button>
    </div>
  );
}

describe('AppModeContext', () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('loads saved mode from storage and updates mode when setMode is called', () => {
    window.localStorage.setItem('bussola_app_mode', 'formacao');

    render(
      <AppModeProvider>
        <Probe />
      </AppModeProvider>
    );

    expect(screen.getByTestId('mode').textContent).toBe('formacao');

    fireEvent.click(screen.getByRole('button', { name: 'set-formacao' }));
    expect(window.localStorage.getItem('bussola_app_mode')).toBe('formacao');
  });

  it('throws when hook is used outside provider', () => {
    expect(() => render(<Probe />)).toThrow('useAppMode deve ser usado dentro de AppModeProvider');
  });
});
