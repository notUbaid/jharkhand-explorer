import { useState, useCallback, useRef } from 'react';
import { useConnectionQuality } from './useConnectionQuality';

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryCondition?: (error: any) => boolean;
}

interface RetryState {
  isRetrying: boolean;
  retryCount: number;
  lastError: any;
  nextRetryDelay: number;
}

export const useRetry = (options: RetryOptions = {}) => {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2,
    retryCondition = () => true
  } = options;

  const [retryState, setRetryState] = useState<RetryState>({
    isRetrying: false,
    retryCount: 0,
    lastError: null,
    nextRetryDelay: baseDelay
  });

  const { getRetryDelay } = useConnectionQuality();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculateDelay = useCallback((attempt: number) => {
    const connectionDelay = getRetryDelay();
    const exponentialDelay = baseDelay * Math.pow(backoffMultiplier, attempt);
    const jitter = Math.random() * 1000; // Add jitter to prevent thundering herd
    
    return Math.min(exponentialDelay + jitter, maxDelay) + connectionDelay;
  }, [baseDelay, backoffMultiplier, maxDelay, getRetryDelay]);

  const executeWithRetry = useCallback(async <T>(
    operation: () => Promise<T>,
    customOptions?: Partial<RetryOptions>
  ): Promise<T> => {
    const finalOptions = { ...options, ...customOptions };
    const finalMaxRetries = finalOptions.maxRetries || maxRetries;
    
    let lastError: any;
    
    for (let attempt = 0; attempt <= finalMaxRetries; attempt++) {
      try {
        setRetryState(prev => ({
          ...prev,
          isRetrying: attempt > 0,
          retryCount: attempt,
          lastError: null
        }));

        const result = await operation();
        
        // Success - reset retry state
        setRetryState({
          isRetrying: false,
          retryCount: 0,
          lastError: null,
          nextRetryDelay: baseDelay
        });
        
        return result;
      } catch (error) {
        lastError = error;
        
        setRetryState(prev => ({
          ...prev,
          lastError: error,
          nextRetryDelay: calculateDelay(attempt)
        }));

        // Check if we should retry
        if (attempt < finalMaxRetries && finalOptions.retryCondition?.(error)) {
          const delay = calculateDelay(attempt);
          
          await new Promise(resolve => {
            timeoutRef.current = setTimeout(resolve, delay);
          });
        } else {
          // Max retries reached or retry condition failed
          setRetryState(prev => ({
            ...prev,
            isRetrying: false
          }));
          throw lastError;
        }
      }
    }
    
    throw lastError;
  }, [options, maxRetries, calculateDelay]);

  const cancelRetry = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    
    setRetryState(prev => ({
      ...prev,
      isRetrying: false
    }));
  }, []);

  const resetRetry = useCallback(() => {
    cancelRetry();
    setRetryState({
      isRetrying: false,
      retryCount: 0,
      lastError: null,
      nextRetryDelay: baseDelay
    });
  }, [cancelRetry, baseDelay]);

  return {
    executeWithRetry,
    cancelRetry,
    resetRetry,
    retryState
  };
};

// Hook for API calls with retry
export const useApiWithRetry = (baseUrl: string = '') => {
  const { executeWithRetry, retryState } = useRetry({
    maxRetries: 3,
    baseDelay: 1000,
    retryCondition: (error) => {
      // Retry on network errors, 5xx errors, and rate limiting
      return (
        !error.response || 
        error.response.status >= 500 || 
        error.response.status === 429
      );
    }
  });

  const apiCall = useCallback(async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = baseUrl + endpoint;
    
    return executeWithRetry(async () => {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        (error as any).response = response;
        throw error;
      }

      return response.json();
    });
  }, [baseUrl, executeWithRetry]);

  return {
    apiCall,
    retryState
  };
};

// Hook for image loading with retry
export const useImageWithRetry = (src: string, options: RetryOptions = {}) => {
  const { executeWithRetry, retryState } = useRetry({
    maxRetries: 3,
    baseDelay: 2000,
    retryCondition: (error) => {
      // Retry on network errors or failed image loads
      return error.name === 'NetworkError' || error.name === 'TypeError';
    },
    ...options
  });

  const loadImage = useCallback(async (): Promise<HTMLImageElement> => {
    return executeWithRetry(async () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        img.src = src;
      });
    });
  }, [src, executeWithRetry]);

  return {
    loadImage,
    retryState
  };
};

// Hook for data fetching with retry
export const useDataWithRetry = <T>(
  fetcher: () => Promise<T>,
  options: RetryOptions = {}
) => {
  const { executeWithRetry, retryState } = useRetry({
    maxRetries: 3,
    baseDelay: 1000,
    retryCondition: (error) => {
      // Retry on network errors and server errors
      return (
        error.name === 'NetworkError' ||
        error.name === 'TypeError' ||
        (error.response && error.response.status >= 500)
      );
    },
    ...options
  });

  const fetchData = useCallback(async (): Promise<T> => {
    return executeWithRetry(fetcher);
  }, [fetcher, executeWithRetry]);

  return {
    fetchData,
    retryState
  };
};
