import { useEffect, useState } from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animated?: boolean;
}

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true
}: SkeletonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay skeleton appearance to avoid flash
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const baseClasses = `
    bg-gray-200 dark:bg-gray-700
    ${animated ? 'animate-pulse' : ''}
    ${className}
  `;

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4';
      case 'card':
        return 'rounded-lg';
      default:
        return 'rounded';
    }
  };

  const getDimensions = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...getDimensions(),
              width: index === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()}`}
      style={getDimensions()}
    />
  );
};

// Card skeleton for content cards
export const CardSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
    <Skeleton variant="rectangular" height={200} className="mb-4" />
    <div className="space-y-2">
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
    <div className="flex justify-between items-center mt-4">
      <Skeleton variant="rectangular" width={80} height={24} />
      <Skeleton variant="circular" width={32} height={32} />
    </div>
  </div>
);

// List skeleton for lists
export const ListSkeleton = ({ 
  items = 5, 
  className = '' 
}: { 
  items?: number; 
  className?: string; 
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <div key={index} className="flex items-center space-x-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
      </div>
    ))}
  </div>
);

// Grid skeleton for grid layouts
export const GridSkeleton = ({ 
  columns = 3, 
  rows = 2, 
  className = '' 
}: { 
  columns?: number; 
  rows?: number; 
  className?: string; 
}) => (
  <div className={`grid gap-4 ${className}`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
    {Array.from({ length: columns * rows }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

// Table skeleton
export const TableSkeleton = ({ 
  rows = 5, 
  columns = 4, 
  className = '' 
}: { 
  rows?: number; 
  columns?: number; 
  className?: string; 
}) => (
  <div className={`overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex space-x-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} variant="text" width="20%" />
        ))}
      </div>
    </div>
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-4 py-3">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} variant="text" width="20%" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Page skeleton for full page loading
export const PageSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
    {/* Header skeleton */}
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Skeleton variant="rectangular" width={120} height={32} />
          <div className="flex space-x-4">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        </div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Hero section */}
        <div className="text-center">
          <Skeleton variant="rectangular" width={400} height={200} className="mx-auto mb-4" />
          <Skeleton variant="text" width="60%" className="mx-auto mb-2" />
          <Skeleton variant="text" width="40%" className="mx-auto" />
        </div>

        {/* Grid content */}
        <GridSkeleton columns={3} rows={2} />
      </div>
    </div>
  </div>
);

// Loading state wrapper
interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const LoadingWrapper = ({ 
  isLoading, 
  skeleton, 
  children, 
  className = '' 
}: LoadingWrapperProps) => {
  if (isLoading) {
    return <div className={className}>{skeleton}</div>;
  }
  
  return <>{children}</>;
};
