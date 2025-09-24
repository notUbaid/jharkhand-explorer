// Global scroll management utility
// This helps prevent scrolling issues on deployed websites

export class ScrollManager {
  private static instance: ScrollManager;
  private scrollRestorationEnabled = true;
  private eventListeners: Array<{ element: Element; event: string; handler: EventListener }> = [];

  static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  constructor() {
    this.initializeScrollRestoration();
    this.preventScrollIssues();
  }

  private initializeScrollRestoration() {
    // Enable scroll restoration for better UX
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Restore scroll position on page load
    window.addEventListener('load', () => {
      this.restoreScrollPosition();
    });

    // Save scroll position before page unload
    window.addEventListener('beforeunload', () => {
      this.saveScrollPosition();
    });
  }

  private preventScrollIssues() {
    // Prevent scroll lock issues
    document.addEventListener('touchmove', (e) => {
      // Allow scrolling on main content
      const target = e.target as Element;
      if (target.closest('.overflow-auto') || target.closest('.overflow-y-auto')) {
        return;
      }
      
      // Prevent scroll on fixed elements
      if (target.closest('.fixed') || target.closest('.sticky')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Prevent scroll issues with modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.enableScrolling();
      }
    });
  }

  public saveScrollPosition() {
    const scrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
      timestamp: Date.now()
    };
    
    try {
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
    } catch (error) {
      console.warn('Could not save scroll position:', error);
    }
  }

  public restoreScrollPosition() {
    try {
      const saved = sessionStorage.getItem('scrollPosition');
      if (saved) {
        const scrollPosition = JSON.parse(saved);
        // Only restore if it's recent (within 5 minutes)
        if (Date.now() - scrollPosition.timestamp < 300000) {
          window.scrollTo(scrollPosition.x, scrollPosition.y);
        }
      }
    } catch (error) {
      console.warn('Could not restore scroll position:', error);
    }
  }

  public disableScrolling() {
    if (this.scrollRestorationEnabled) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      this.scrollRestorationEnabled = false;
    }
  }

  public enableScrolling() {
    if (!this.scrollRestorationEnabled) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      this.scrollRestorationEnabled = true;
    }
  }

  public addScrollListener(element: Element, event: string, handler: EventListener) {
    element.addEventListener(event, handler);
    this.eventListeners.push({ element, event, handler });
  }

  public removeScrollListener(element: Element, event: string, handler: EventListener) {
    element.removeEventListener(event, handler);
    this.eventListeners = this.eventListeners.filter(
      listener => !(listener.element === element && listener.event === event && listener.handler === handler)
    );
  }

  public cleanup() {
    // Remove all event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
    
    // Enable scrolling
    this.enableScrolling();
  }

  public scrollToTop(smooth = true) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  public scrollToElement(element: Element, smooth = true) {
    element.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'start',
      inline: 'nearest'
    });
  }
}

// Initialize scroll manager
export const scrollManager = ScrollManager.getInstance();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  scrollManager.cleanup();
});

// Export for use in components
export default scrollManager;
