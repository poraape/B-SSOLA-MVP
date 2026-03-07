import React, { Component, ReactNode } from 'react';

import { systemLogger } from '../../domain/metrics/systemLogger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary da triagem para isolar falhas de renderização do fluxo.
 */
export class TriageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    systemLogger.error('triage_error_boundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div role="alert" className="text-center py-20 space-y-4">
            <p>Este protocolo não está disponível no momento.</p>
            <button
              onClick={() => window.location.assign('/categorias')}
              className="text-sm font-semibold text-blue-600 underline"
            >
              Voltar às categorias
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
