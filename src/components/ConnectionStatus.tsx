import { useState, useEffect } from 'react';
import { useConnectionQuality } from '@/hooks/useConnectionQuality';
import { Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  showDetails?: boolean;
  className?: string;
}

export const ConnectionStatus = ({ 
  showDetails = false, 
  className = '' 
}: ConnectionStatusProps) => {
  const { connectionInfo } = useConnectionQuality();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show status when connection quality changes or goes offline
    if (connectionInfo.quality === 'offline' || connectionInfo.quality === 'poor') {
      setIsVisible(true);
    } else if (connectionInfo.quality === 'excellent' || connectionInfo.quality === 'good') {
      // Hide after a delay when connection improves
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [connectionInfo.quality]);

  if (!isVisible && !showDetails) return null;

  const getStatusIcon = () => {
    switch (connectionInfo.quality) {
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'poor':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'fair':
        return <Wifi className="w-4 h-4 text-orange-500" />;
      case 'good':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Wifi className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (connectionInfo.quality) {
      case 'offline':
        return 'Offline';
      case 'poor':
        return 'Poor Connection';
      case 'fair':
        return 'Fair Connection';
      case 'good':
        return 'Good Connection';
      case 'excellent':
        return 'Excellent Connection';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (connectionInfo.quality) {
      case 'offline':
        return 'bg-red-500';
      case 'poor':
        return 'bg-yellow-500';
      case 'fair':
        return 'bg-orange-500';
      case 'good':
        return 'bg-green-500';
      case 'excellent':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <div className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg shadow-lg
        bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}>
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getStatusText()}
        </span>
        
        {/* Connection quality indicator */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`w-1 h-3 rounded-full transition-colors duration-300 ${
                bar <= getConnectionBars() ? getStatusColor() : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {showDetails && (
          <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            {connectionInfo.effectiveType} • {connectionInfo.downlink}Mbps
          </div>
        )}
      </div>
    </div>
  );
};

const getConnectionBars = (quality: string = 'good') => {
  switch (quality) {
    case 'offline':
      return 0;
    case 'poor':
      return 1;
    case 'fair':
      return 2;
    case 'good':
      return 3;
    case 'excellent':
      return 4;
    default:
      return 2;
  }
};

// Compact connection indicator for mobile
export const CompactConnectionStatus = ({ className = '' }: { className?: string }) => {
  const { connectionInfo } = useConnectionQuality();

  if (connectionInfo.quality === 'excellent' || connectionInfo.quality === 'good') {
    return null;
  }

  return (
    <div className={`fixed top-2 right-2 z-50 ${className}`}>
      <div className={`
        w-3 h-3 rounded-full border-2 border-white shadow-lg
        ${connectionInfo.quality === 'offline' ? 'bg-red-500' : 
          connectionInfo.quality === 'poor' ? 'bg-yellow-500' : 'bg-orange-500'}
      `} />
    </div>
  );
};

// Connection quality banner for important notifications
export const ConnectionBanner = ({ className = '' }: { className?: string }) => {
  const { connectionInfo } = useConnectionQuality();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    setIsDismissed(false);
  }, [connectionInfo.quality]);

  if (isDismissed || connectionInfo.quality === 'excellent' || connectionInfo.quality === 'good') {
    return null;
  }

  const getBannerMessage = () => {
    switch (connectionInfo.quality) {
      case 'offline':
        return {
          title: 'You\'re offline',
          message: 'Some features may not be available. Check your connection.',
          type: 'error'
        };
      case 'poor':
        return {
          title: 'Slow connection detected',
          message: 'Loading may take longer. Consider switching to a better network.',
          type: 'warning'
        };
      case 'fair':
        return {
          title: 'Connection quality is fair',
          message: 'Some features may load slowly.',
          type: 'info'
        };
      default:
        return null;
    }
  };

  const banner = getBannerMessage();
  if (!banner) return null;

  const getBannerStyles = () => {
    switch (banner.type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className={`
        border-b px-4 py-3 flex items-center justify-between
        ${getBannerStyles()}
      `}>
        <div className="flex items-center space-x-2">
          {connectionInfo.quality === 'offline' ? (
            <WifiOff className="w-4 h-4" />
          ) : (
            <AlertTriangle className="w-4 h-4" />
          )}
          <div>
            <div className="font-medium text-sm">{banner.title}</div>
            <div className="text-xs opacity-90">{banner.message}</div>
          </div>
        </div>
        
        <button
          onClick={() => setIsDismissed(true)}
          className="text-current opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
