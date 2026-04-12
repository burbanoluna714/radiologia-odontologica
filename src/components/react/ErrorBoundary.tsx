import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-4 bg-red-50 text-red-900 border border-red-500 rounded-lg">
          <h1 className="text-xl font-bold mb-4">¡Oops! Algo salió mal en la interfaz.</h1>
          <p className="font-mono text-sm bg-black/10 p-4 rounded whitespace-pre-wrap">
            {this.state.error && this.state.error.toString()}
          </p>
          <details className="mt-4 p-4 bg-black/5 rounded outline-none cursor-pointer">
            <summary className="font-semibold text-sm">Ver Stack Trace</summary>
            <pre className="mt-2 text-xs overflow-x-auto whitespace-pre-wrap">
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
          <button 
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded font-bold"
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
