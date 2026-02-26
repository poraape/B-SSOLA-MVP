import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { TriageQuestion as TriageQuestionType } from '../../../types';

interface TriageQuestionProps {
  question: TriageQuestionType;
  onAnswer: (label: string) => void;
  isEmergency?: boolean;
}

export const TriageQuestion: React.FC<TriageQuestionProps> = ({
  question,
  onAnswer,
  isEmergency = false
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold leading-tight text-slate-900">
          {question.text}
        </h2>
        {isEmergency && (
          <p className="text-sm text-rose-500 font-bold flex items-center gap-1 mt-2">
            <AlertTriangle className="w-4 h-4" /> Decisão Crítica: Responda com agilidade.
          </p>
        )}
      </div>

      <div className={`grid ${question.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option.label)}
            className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-slate-100 transition-all flex flex-col items-center gap-3 group ${
              isEmergency 
                ? 'hover:border-rose-500 hover:bg-rose-50' 
                : 'hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {option.label === 'Sim' ? (
              <CheckCircle2 className={`w-8 h-8 text-slate-300 ${isEmergency ? 'group-hover:text-rose-500' : 'group-hover:text-blue-500'}`} />
            ) : option.label === 'Não' ? (
              <XCircle className={`w-8 h-8 text-slate-300 ${isEmergency ? 'group-hover:text-rose-500' : 'group-hover:text-blue-500'}`} />
            ) : (
              <div className={`w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 ${
                isEmergency ? 'group-hover:border-rose-500 group-hover:text-rose-500' : 'group-hover:border-blue-500 group-hover:text-blue-500'
              }`}>
                {idx + 1}
              </div>
            )}
            <span className="font-bold text-lg text-slate-700">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
