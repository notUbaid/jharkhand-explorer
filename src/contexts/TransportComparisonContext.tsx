import React, { createContext, useContext, useState, useEffect } from 'react';
import { TransportOption } from '@/types/Transport';

interface TransportComparisonContextType {
  compareItems: TransportOption[];
  addToCompare: (item: TransportOption) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isInCompare: (id: number) => boolean;
  canAddMore: boolean;
  openCompareModal: boolean;
  setOpenCompareModal: (open: boolean) => void;
}

const TransportComparisonContext = createContext<TransportComparisonContextType | undefined>(undefined);

export const useTransportComparison = () => {
  const context = useContext(TransportComparisonContext);
  if (context === undefined) {
    throw new Error('useTransportComparison must be used within a TransportComparisonProvider');
  }
  return context;
};

interface TransportComparisonProviderProps {
  children: React.ReactNode;
}

export const TransportComparisonProvider: React.FC<TransportComparisonProviderProps> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<TransportOption[]>([]);
  const [openCompareModal, setOpenCompareModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('transportCompareItems');
    if (saved) {
      try {
        setCompareItems(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading compare items from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever compareItems changes
  useEffect(() => {
    localStorage.setItem('transportCompareItems', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (item: TransportOption) => {
    if (compareItems.length >= 3) {
      return; // Limit to 3 items
    }
    
    if (!compareItems.find(existing => existing.id === item.id)) {
      setCompareItems(prev => [...prev, item]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCompare = () => {
    setCompareItems([]);
    setOpenCompareModal(false);
  };

  const isInCompare = (id: number) => {
    return compareItems.some(item => item.id === id);
  };

  const canAddMore = compareItems.length < 3;

  return (
    <TransportComparisonContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        canAddMore,
        openCompareModal,
        setOpenCompareModal,
      }}
    >
      {children}
    </TransportComparisonContext.Provider>
  );
};

