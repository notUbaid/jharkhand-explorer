import { useEffect, useRef, useCallback, useState } from 'react';

// Performance optimization hook
export const usePerformance = () => {
  const performanceRef = useRef({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
  });

  // Track render performance
  const trackRender = useCallback(() => {
    const now = performance.now();
    const renderTime = now - performanceRef.current.lastRenderTime;
    
    performanceRef.current.renderCount += 1;
    performanceRef.current.averageRenderTime = 
      (performanceRef.current.averageRenderTime * (performanceRef.current.renderCount - 1) + renderTime) / 
      performanceRef.current.renderCount;
    performanceRef.current.lastRenderTime = now;

    // Log performance warnings
    if (renderTime > 16) { // More than 16ms (60fps threshold)
      console.warn(`Slow render detected: ${renderTime.toFixed(2)}ms`);
    }
  }, []);

  // Debounce function for performance
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Throttle function for performance
  const throttle = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }, []);

  // Memory usage monitoring
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  }, []);

  // Log performance metrics
  useEffect(() => {
    const logPerformance = () => {
      const memory = getMemoryUsage();
      console.log('Performance Metrics:', {
        renderCount: performanceRef.current.renderCount,
        averageRenderTime: `${performanceRef.current.averageRenderTime.toFixed(2)}ms`,
        memory,
      });
    };

    // Log every 30 seconds
    const interval = setInterval(logPerformance, 30000);
    return () => clearInterval(interval);
  }, [getMemoryUsage]);

  return {
    trackRender,
    debounce,
    throttle,
    getMemoryUsage,
    performance: performanceRef.current,
  };
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [callback, options]);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  return { observe, unobserve };
};

// Virtual scrolling hook for large lists
export const useVirtualScroll = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );

  const visibleItems = Array.from(
    { length: visibleEnd - visibleStart },
    (_, index) => visibleStart + index
  );

  const totalHeight = itemCount * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
};
