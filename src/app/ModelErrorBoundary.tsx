import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ModelErrorBoundaryProps {
  children: React.ReactNode;
  scope?: 'model' | 'app';
}

interface ModelErrorBoundaryState {
  error: Error | null;
  retryKey: number;
}

export class ModelErrorBoundary extends React.Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  public state: ModelErrorBoundaryState = {
    error: null,
    retryKey: 0
  };

  public static getDerivedStateFromError(error: Error): Partial<ModelErrorBoundaryState> {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error boundary caught an application error', { error, errorInfo });
  }

  private handleRetry = (): void => {
    this.setState(prev => ({
      error: null,
      retryKey: prev.retryKey + 1
    }));
  };

  public render(): React.ReactNode {
    if (this.state.error) {
      const isModelScope = this.props.scope !== 'app';

      return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
          <div className="bg-white border border-rose-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertCircle className="w-8 h-8" />
              <h1 className="text-xl font-black uppercase tracking-tight">
                {isModelScope ? 'Erro Crítico de Inicialização' : 'Erro Crítico do Aplicativo'}
              </h1>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isModelScope
                ? 'Falha ao carregar o modelo da aplicação. Revise os dados e tente novamente.'
                : 'O aplicativo encontrou uma falha inesperada. Tente reiniciar a interface.'}
            </p>
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 max-h-40 overflow-y-auto">
              <p className="text-xs text-rose-800 break-words">
                {this.state.error.message || 'Erro desconhecido durante a inicialização.'}
              </p>
            </div>
            <button
              type="button"
              onClick={this.handleRetry}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-rose-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
          </div>
        </div>
      );
    }

    return <React.Fragment key={this.state.retryKey}>{this.props.children}</React.Fragment>;
  }
}
