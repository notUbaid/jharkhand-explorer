import { useState, useRef, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from '@/hooks/usePerformance';
import { useConnectionQuality } from '@/hooks/useConnectionQuality';

interface AdaptiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
  quality?: 'high' | 'medium' | 'low' | 'very-low';
  fallbackSrc?: string;
}

export const AdaptiveImage = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
  onLoad,
  onError,
  priority = false,
  sizes = '100vw',
  quality,
  fallbackSrc
}: AdaptiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const { connectionInfo, shouldUseLowQualityImages, getOptimalImageQuality } = useConnectionQuality();

  const maxRetries = 3;

  // Generate optimized image URL based on connection quality
  const getOptimizedImageUrl = useCallback((originalSrc: string, imageQuality?: string) => {
    const qualityToUse = imageQuality || getOptimalImageQuality();
    
    // If it's a local image, return as-is
    if (originalSrc.startsWith('/') || originalSrc.startsWith('data:')) {
      return originalSrc;
    }

    // For external images, you could implement image optimization service
    // For now, we'll use the original src
    return originalSrc;
  }, [getOptimalImageQuality]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    });
  }, []);

  const { observe, unobserve } = useIntersectionObserver(handleIntersection, {
    rootMargin: '50px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (!priority && imgRef.current) {
      observe(imgRef.current);
      return () => {
        if (imgRef.current) {
          unobserve(imgRef.current);
        }
      };
    }
  }, [observe, unobserve, priority]);

  // Update image source when connection quality changes
  useEffect(() => {
    if (isInView && !isLoaded) {
      const optimizedSrc = getOptimizedImageUrl(src, quality);
      setCurrentSrc(optimizedSrc);
    }
  }, [isInView, src, quality, getOptimizedImageUrl, isLoaded]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    console.warn(`Image failed to load: ${currentSrc}`);
    
    if (retryCount < maxRetries) {
      // Retry with exponential backoff
      const delay = Math.pow(2, retryCount) * 1000;
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setCurrentSrc(prev => `${prev}?retry=${retryCount + 1}&t=${Date.now()}`);
      }, delay);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setRetryCount(0);
    } else {
      // Give up
      setHasError(true);
      onError?.();
    }
  }, [currentSrc, retryCount, maxRetries, fallbackSrc, onError]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
        />
      )}
      
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
          decoding="async"
        />
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm mb-2">Failed to load image</div>
            <button
              onClick={handleRetry}
              className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Connection quality indicator */}
      {connectionInfo.quality === 'poor' && isLoaded && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
          Low Quality
        </div>
      )}
    </div>
  );
};

// Progressive image loading component
export const ProgressiveImage = ({ 
  src, 
  alt, 
  className = '',
  ...props 
}: AdaptiveImageProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { connectionInfo } = useConnectionQuality();

  // Generate different quality versions of the image
  const imageVersions = [
    { src: `${src}?q=10&w=50`, quality: 'very-low' },
    { src: `${src}?q=30&w=200`, quality: 'low' },
    { src: `${src}?q=60&w=400`, quality: 'medium' },
    { src: `${src}?q=90&w=800`, quality: 'high' }
  ];

  const shouldLoadNextVersion = useCallback(() => {
    if (currentImage < imageVersions.length - 1) {
      const nextVersion = imageVersions[currentImage + 1];
      
      // Only load higher quality if connection is good enough
      if (connectionInfo.quality === 'excellent' || 
          connectionInfo.quality === 'good' ||
          (connectionInfo.quality === 'fair' && nextVersion.quality !== 'high')) {
        setCurrentImage(prev => prev + 1);
      }
    }
  }, [currentImage, imageVersions.length, connectionInfo.quality]);

  return (
    <AdaptiveImage
      src={imageVersions[currentImage].src}
      alt={alt}
      className={className}
      onLoad={shouldLoadNextVersion}
      {...props}
    />
  );
};

// Image preloader with connection awareness
export const preloadImage = (src: string, quality?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    
    // Add quality parameters if provided
    const optimizedSrc = quality ? `${src}?q=${quality}` : src;
    img.src = optimizedSrc;
  });
};

// Batch image preloader with retry logic
export const preloadImages = async (
  srcs: string[], 
  quality?: string,
  maxConcurrent = 3
): Promise<void[]> => {
  const results: Promise<void>[] = [];
  
  for (let i = 0; i < srcs.length; i += maxConcurrent) {
    const batch = srcs.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(src => preloadImage(src, quality));
    results.push(...batchPromises);
  }
  
  return Promise.allSettled(results).then(results => 
    results.map(result => 
      result.status === 'fulfilled' ? Promise.resolve() : Promise.reject(result.reason)
    )
  );
};
