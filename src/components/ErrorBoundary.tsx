import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Bug, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Generate unique error ID for tracking
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    this.setState({
      error,
      errorInfo,
      errorId
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Report error to external service (in production)
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo, errorId);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo, errorId: string) => {
    // In a real app, you would send this to an error reporting service
    // like Sentry, LogRocket, Bugsnag, etc.
    
    const errorReport = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: 'anonymous', // You would get this from your auth context
    };

    // Example: Send to error reporting service
    // errorReportingService.captureException(error, { extra: errorReport });
    
    console.log('Error report:', errorReport);
  };

  handleReset = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        errorId: undefined 
      });
    } else {
      // Max retries reached, reload the page
      window.location.reload();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isRetryAvailable = this.retryCount < this.maxRetries;

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <AlertTriangle size={64} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-6">
              We're sorry, but something unexpected happened. 
              {isRetryAvailable ? ' Please try again.' : ' Please refresh the page.'}
            </p>
            
            {this.state.errorId && (
              <p className="text-xs text-muted-foreground mb-4">
                Error ID: {this.state.errorId}
              </p>
            )}
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-foreground mb-2 flex items-center">
                  <Bug className="mr-2" size={16} />
                  Error Details:
                </h3>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap mt-2">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              {isRetryAvailable && (
                <Button onClick={this.handleReset} className="w-full">
                  <RefreshCw className="mr-2" size={16} />
                  Try Again ({this.maxRetries - this.retryCount} attempts left)
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                <RefreshCw className="mr-2" size={16} />
                Refresh Page
              </Button>
              <Button 
                variant="outline" 
                onClick={this.handleGoHome} 
                className="w-full"
              >
                <Home className="mr-2" size={16} />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced hook for error handling in functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // Generate error ID for tracking
    const errorId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // In a real app, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      const errorReport = {
        errorId,
        message: error.message,
        stack: error.stack,
        context: errorInfo,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };
      
      // Send to error reporting service
      console.log('Error report:', errorReport);
    }
    
    // For development, log detailed error info
    if (process.env.NODE_ENV === 'development') {
      console.error('Error details:', error.stack);
    }
  };

  const handleAsyncError = (error: unknown) => {
    if (error instanceof Error) {
      handleError(error, 'Async operation');
    } else {
      handleError(new Error(String(error)), 'Async operation');
    }
  };

  return { handleError, handleAsyncError };
};
