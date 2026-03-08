// src/features/resources/components/AlphabetNav.tsx

import React from 'react';

interface AlphabetNavProps {
  availableLetters: string[];
  onLetterSelect: (letter: string) => void;
  activeLetters: string[];
}

export const AlphabetNav: React.FC<AlphabetNavProps> = ({
  availableLetters,
  onLetterSelect,
  activeLetters,
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <nav
      className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
      aria-label="Navegação alfabética"
    >
      {alphabet.map((letter) => {
        const hasTerms = availableLetters.includes(letter);
        return (
          <button
            key={letter}
            onClick={() => onLetterSelect(letter)}
            disabled={!hasTerms}
            className={`
              px-3 py-1 rounded font-bold text-sm transition-all
              ${
                activeLetters.includes(letter)
                  ? 'bg-blue-600 text-white shadow-md'
                  : hasTerms
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 hover:border-blue-400'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }
            `}
            aria-label={`Filtrar por letra ${letter}`}
            aria-pressed={activeLetters.includes(letter)}
          >
            {letter}
          </button>
        );
      })}
    </nav>
  );
};
