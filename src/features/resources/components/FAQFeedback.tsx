import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react';

interface FAQFeedbackProps {
  questionId: string;
  onFeedback?: (questionId: string, isHelpful: boolean) => void;
}

export const FAQFeedback: React.FC<FAQFeedbackProps> = ({
  questionId,
  onFeedback,
}) => {
  const [feedback, setFeedback] = useState<'helpful' | 'not-helpful' | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  const handleFeedback = (isHelpful: boolean) => {
    const feedbackType = isHelpful ? 'helpful' : 'not-helpful';
    setFeedback(feedbackType);
    setShowThanks(true);

    if (onFeedback) {
      onFeedback(questionId, isHelpful);
    }

    console.log(`FAQ Feedback: ${questionId} - ${isHelpful ? 'Helpful' : 'Not Helpful'}`);

    setTimeout(() => {
      setShowThanks(false);
    }, 3000);
  };

  if (showThanks) {
    return (
      <div
        className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium"
        role="status"
        aria-live="polite"
      >
        <Check className="w-4 h-4" aria-hidden="true" />
        <span>Obrigado pelo feedback.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        Esta resposta foi útil?
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => handleFeedback(true)}
          disabled={feedback !== null}
          aria-label="Sim, esta resposta foi útil"
          aria-pressed={feedback === 'helpful'}
          className={`p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            feedback === 'helpful'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20'
          } disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-green-500/20`}
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleFeedback(false)}
          disabled={feedback !== null}
          aria-label="Não, esta resposta não foi útil"
          aria-pressed={feedback === 'not-helpful'}
          className={`p-2 rounded-lg transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            feedback === 'not-helpful'
              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20'
          } disabled:opacity-50 disabled:cursor-not-allowed focus:ring-4 focus:ring-red-500/20`}
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
