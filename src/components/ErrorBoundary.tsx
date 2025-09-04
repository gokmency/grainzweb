import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#C8102E] to-[#E53E3E] flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 max-w-lg mx-auto text-center">
            <h1 
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ 
                letterSpacing: '2px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              OOPS!
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Something went wrong. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-[#C8102E] hover:bg-white/90 font-bold px-8 py-3 text-lg rounded-lg transition-all duration-300"
              style={{ 
                letterSpacing: '1px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              REFRESH PAGE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
