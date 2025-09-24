import { useState, useEffect, useCallback } from 'react';

interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
  isOnline: boolean;
  quality: 'excellent' | 'good' | 'fair' | 'poor' | 'offline';
}

export const useConnectionQuality = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    effectiveType: '4g',
    downlink: 10,
    rtt: 100,
    saveData: false,
    isOnline: navigator.onLine,
    quality: 'good'
  });

  const getConnectionQuality = useCallback((info: Partial<ConnectionInfo>): ConnectionInfo['quality'] => {
    if (!info.isOnline) return 'offline';
    
    const { effectiveType, downlink, rtt } = info;
    
    // Determine quality based on connection metrics
    if (effectiveType === '4g' && downlink >= 10 && rtt <= 100) {
      return 'excellent';
    } else if (effectiveType === '4g' && downlink >= 5 && rtt <= 200) {
      return 'good';
    } else if (effectiveType === '3g' || (downlink >= 1 && rtt <= 500)) {
      return 'fair';
    } else {
      return 'poor';
    }
  }, []);

  const updateConnectionInfo = useCallback(() => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const info: Partial<ConnectionInfo> = {
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0,
        rtt: connection.rtt || 0,
        saveData: connection.saveData || false,
        isOnline: navigator.onLine
      };
      
      const quality = getConnectionQuality(info);
      
      setConnectionInfo({
        ...info,
        quality
      } as ConnectionInfo);
    } else {
      // Fallback for browsers without connection API
      setConnectionInfo(prev => ({
        ...prev,
        isOnline: navigator.onLine,
        quality: navigator.onLine ? 'good' : 'offline'
      }));
    }
  }, [getConnectionQuality]);

  useEffect(() => {
    // Initial check
    updateConnectionInfo();

    // Listen for connection changes
    window.addEventListener('online', updateConnectionInfo);
    window.addEventListener('offline', updateConnectionInfo);

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo);
    }

    // Periodic check for connection quality
    const interval = setInterval(updateConnectionInfo, 10000);

    return () => {
      window.removeEventListener('online', updateConnectionInfo);
      window.removeEventListener('offline', updateConnectionInfo);
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo);
      }
      
      clearInterval(interval);
    };
  }, [updateConnectionInfo]);

  const shouldUseLowQualityImages = useCallback(() => {
    return connectionInfo.quality === 'poor' || connectionInfo.saveData;
  }, [connectionInfo.quality, connectionInfo.saveData]);

  const shouldPreloadResources = useCallback(() => {
    return connectionInfo.quality === 'excellent' || connectionInfo.quality === 'good';
  }, [connectionInfo.quality]);

  const getOptimalImageQuality = useCallback(() => {
    switch (connectionInfo.quality) {
      case 'excellent':
        return 'high';
      case 'good':
        return 'medium';
      case 'fair':
        return 'low';
      case 'poor':
        return 'very-low';
      default:
        return 'medium';
    }
  }, [connectionInfo.quality]);

  const getRetryDelay = useCallback(() => {
    switch (connectionInfo.quality) {
      case 'excellent':
        return 1000;
      case 'good':
        return 2000;
      case 'fair':
        return 5000;
      case 'poor':
        return 10000;
      default:
        return 3000;
    }
  }, [connectionInfo.quality]);

  return {
    connectionInfo,
    shouldUseLowQualityImages,
    shouldPreloadResources,
    getOptimalImageQuality,
    getRetryDelay,
    updateConnectionInfo
  };
};
