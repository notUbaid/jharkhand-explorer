import { useState, useEffect, useCallback, useRef } from 'react';

interface UseOptimizedDataOptions<T> {
  initialData?: T;
  staleTime?: number; // Time in ms before data is considered stale
  cacheTime?: number; // Time in ms to keep data in cache
  retryCount?: number;
  retryDelay?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  staleTime: number;
}

// Simple in-memory cache
const cache = new Map<string, CacheEntry<any>>();

export const useOptimizedData = <T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseOptimizedDataOptions<T> = {}
) => {
  const {
    initialData,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 30 * 60 * 1000, // 30 minutes
    retryCount = 3,
    retryDelay = 1000,
  } = options;

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    // Check cache first
    const cachedEntry = cache.get(key);
    const now = Date.now();

    if (!forceRefresh && cachedEntry) {
      const isStale = now - cachedEntry.timestamp > cachedEntry.staleTime;
      const isExpired = now - cachedEntry.timestamp > cacheTime;

      if (!isStale) {
        setData(cachedEntry.data);
        return cachedEntry.data;
      }

      if (isExpired) {
        cache.delete(key);
      }
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      
      // Cache the result
      cache.set(key, {
        data: result,
        timestamp: now,
        staleTime,
      });

      setData(result);
      retryCountRef.current = 0;
      return result;
    } catch (err) {
      const error = err as Error;
      
      if (error.name === 'AbortError') {
        return; // Request was cancelled
      }

      setError(error);
      
      // Retry logic
      if (retryCountRef.current < retryCount) {
        retryCountRef.current++;
        setTimeout(() => {
          fetchData(forceRefresh);
        }, retryDelay * Math.pow(2, retryCountRef.current - 1)); // Exponential backoff
      }
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher, staleTime, cacheTime, retryCount, retryDelay]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(() => {
    cache.delete(key);
    setData(initialData);
  }, [key, initialData]);

  useEffect(() => {
    fetchData();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refresh,
    invalidate,
  };
};

// Hook for paginated data
export const usePaginatedData = <T>(
  key: string,
  fetcher: (page: number, limit: number) => Promise<{ data: T[]; total: number; hasMore: boolean }>,
  options: UseOptimizedDataOptions<T[]> & { pageSize?: number } = {}
) => {
  const { pageSize = 20, ...restOptions } = options;
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error, refresh } = useOptimizedData(
    `${key}-page-${page}`,
    () => fetcher(page, pageSize),
    restOptions
  );

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setAllData(data.data);
      } else {
        setAllData(prev => [...prev, ...data.data]);
      }
      setHasMore(data.hasMore);
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasMore, isLoading]);

  const reset = useCallback(() => {
    setPage(1);
    setAllData([]);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    isLoading,
    error,
    hasMore,
    loadMore,
    reset,
    refresh,
  };
};

// Cache management utilities
export const cacheUtils = {
  clear: () => cache.clear(),
  delete: (key: string) => cache.delete(key),
  has: (key: string) => cache.has(key),
  size: () => cache.size,
  keys: () => Array.from(cache.keys()),
};
