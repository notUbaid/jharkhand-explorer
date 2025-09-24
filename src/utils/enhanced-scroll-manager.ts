// Enhanced Scroll Manager with performance optimizations
class EnhancedScrollManager {
  private static instance: EnhancedScrollManager;
  private isInitialized = false;
  private scrollListeners: Set<() => void> = new Set();
  private resizeListeners: Set<() => void> = new Set();
  private scrollPosition = 0;
  private isScrolling = false;
  private scrollTimeout: NodeJS.Timeout | null = null;
  private rafId: number | null = null;

  private constructor() {}

  static getInstance(): EnhancedScrollManager {
    if (!EnhancedScrollManager.instance) {
      EnhancedScrollManager.instance = new EnhancedScrollManager();
    }
    return EnhancedScrollManager.instance;
  }

  init(): void {
    if (this.isInitialized) return;

    // Throttled scroll handler for better performance
    const handleScroll = this.throttle(() => {
      this.scrollPosition = window.pageYOffset;
      this.isScrolling = true;

      // Notify all scroll listeners
      this.scrollListeners.forEach(listener => {
        try {
          listener();
        } catch (error) {
          console.error('Scroll listener error:', error);
        }
      });

      // Clear scrolling state after scroll ends
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 150);
    }, 16); // ~60fps

    // Throttled resize handler
    const handleResize = this.throttle(() => {
      this.resizeListeners.forEach(listener => {
        try {
          listener();
        } catch (error) {
          console.error('Resize listener error:', error);
        }
      });
    }, 100);

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Set initial scroll position
    this.scrollPosition = window.pageYOffset;
    this.isInitialized = true;

    console.log('Enhanced Scroll Manager initialized');
  }

  destroy(): void {
    if (!this.isInitialized) return;

    // Remove all event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    // Clear timeouts
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    // Clear listeners
    this.scrollListeners.clear();
    this.resizeListeners.clear();

    this.isInitialized = false;
    console.log('Enhanced Scroll Manager destroyed');
  }

  // Smooth scroll to top with easing
  scrollToTop(smooth: boolean = true): void {
    if (smooth) {
      this.smoothScrollTo(0);
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }

  // Smooth scroll to element
  scrollToElement(element: HTMLElement | string, offset: number = 0): void {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement
      : element;

    if (targetElement) {
      const elementPosition = targetElement.offsetTop - offset;
      this.smoothScrollTo(elementPosition);
    }
  }

  // Smooth scroll to position
  smoothScrollTo(targetPosition: number, duration: number = 800): void {
    const startPosition = this.scrollPosition;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        this.rafId = requestAnimationFrame(animateScroll);
      }
    };

    this.rafId = requestAnimationFrame(animateScroll);
  }

  // Add scroll listener
  addScrollListener(listener: () => void): () => void {
    this.scrollListeners.add(listener);
    return () => this.scrollListeners.delete(listener);
  }

  // Add resize listener
  addResizeListener(listener: () => void): () => void {
    this.resizeListeners.add(listener);
    return () => this.resizeListeners.delete(listener);
  }

  // Get current scroll position
  getScrollPosition(): number {
    return this.scrollPosition;
  }

  // Check if currently scrolling
  isCurrentlyScrolling(): boolean {
    return this.isScrolling;
  }

  // Get scroll direction
  getScrollDirection(): 'up' | 'down' | null {
    const currentPosition = window.pageYOffset;
    const direction = currentPosition > this.scrollPosition ? 'down' : 'up';
    this.scrollPosition = currentPosition;
    return direction;
  }

  // Check if element is in viewport
  isElementInViewport(element: HTMLElement, threshold: number = 0.1): boolean {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    return (
      rect.top >= -rect.height * threshold &&
      rect.left >= -rect.width * threshold &&
      rect.bottom <= windowHeight + rect.height * threshold &&
      rect.right <= windowWidth + rect.width * threshold
    );
  }

  // Throttle utility function
  private throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function (this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Handle scroll (placeholder for event listener)
  private handleScroll = () => {
    // This will be replaced by the throttled version in init()
  };

  // Handle resize (placeholder for event listener)
  private handleResize = () => {
    // This will be replaced by the throttled version in init()
  };
}

// Export singleton instance
export const enhancedScrollManager = EnhancedScrollManager.getInstance();
