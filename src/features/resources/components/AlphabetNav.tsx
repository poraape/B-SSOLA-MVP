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
      className="rounded-[20px] border border-slate-200/90 bg-white/85 p-4 shadow-[0_10px_22px_-20px_rgba(15,23,42,0.4)] dark:border-slate-700 dark:bg-slate-900/75"
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
                  ? 'border-blue-600 bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.7)]'
                  : isAvailable
                    ? 'border-slate-300 bg-slate-50 text-slate-700 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-500',
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
