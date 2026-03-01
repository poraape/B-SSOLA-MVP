import React from 'react';

interface Props {
  featureName: string;
  recoveryPath: string;
  recoveryLabel: string;
  children: React.ReactNode;
}

interface State { hasError: boolean; }

export class FeatureErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) console.error('[FeatureErrorBoundary]', error);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="p-6 text-center">
          <p className="text-gray-700 mb-4">
            Houve um problema em {this.props.featureName}.
          </p>
          <a 
            href={this.props.recoveryPath}
            className="text-blue-600 underline text-sm"
          >
            {this.props.recoveryLabel}
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
