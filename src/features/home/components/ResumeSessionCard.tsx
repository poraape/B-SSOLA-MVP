import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, X } from 'lucide-react';

interface ResumeSessionCardProps {
  flowId: string;
  onDismiss: () => void;
}

export const ResumeSessionCard: React.FC<ResumeSessionCardProps> = ({ flowId, onDismiss }) => {
  const navigate = useNavigate();

  return (
    <div className="surface-elevated card-lift rounded-card border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-elevated dark:border-blue-800 dark:from-blue-900/30 dark:to-blue-800/30">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-soft">
            <RotateCcw className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
              Retomar atendimento em andamento
            </h3>
            <p className="text-sm leading-relaxed text-blue-700 dark:text-blue-300">
              Você tem um atendimento guiado não finalizado. Continue de onde parou.
            </p>
            <button
              onClick={() => navigate(`/fluxo/${flowId}`)}
              className="focus-ring press-scale touch-target mt-2 inline-flex items-center gap-2 rounded-button bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-normal hover:bg-blue-700 hover:shadow-elevated"
            >
              Continuar atendimento
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="focus-ring press-scale touch-target shrink-0 rounded-lg p-2 text-blue-600 transition-colors duration-fast hover:bg-blue-200/50 dark:text-blue-400 dark:hover:bg-blue-900/40"
          aria-label="Dispensar notificação"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
