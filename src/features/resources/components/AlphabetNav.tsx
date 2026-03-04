import type { FC } from 'react';

interface AlphabetNavProps {
  availableLetters: string[];
  onLetterSelect: (letter: string) => void;
  activeLetters: string[];
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabetNav: FC<AlphabetNavProps> = ({
  availableLetters,
  onLetterSelect,
  activeLetters,
}) => {
  const availableSet = new Set(availableLetters);

  return (
    <nav
      aria-label="Índice alfabético do glossário"
      className="rounded-3xl border border-slate-200 bg-white p-4"
    >
      <div className="flex flex-wrap gap-2">
        {ALPHABET.map((letter) => {
          const isAvailable = availableSet.has(letter);
          const isActive = activeLetters.includes(letter);

          return (
            <button
              key={letter}
              type="button"
              onClick={() => onLetterSelect(letter)}
              disabled={!isAvailable}
              aria-pressed={isActive}
              aria-label={`Ir para termos com ${letter}`}
              className={[
                'h-9 min-w-9 rounded-lg border px-2 text-sm font-semibold transition',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2',
                isActive
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : isAvailable
                    ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-blue-500 hover:text-blue-700'
                    : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400',
              ].join(' ')}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export type { AlphabetNavProps };
