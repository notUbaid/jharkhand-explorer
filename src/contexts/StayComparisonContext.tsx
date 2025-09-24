import React, { createContext, useContext, useState, ReactNode } from 'react';
import { stays } from '@/data/stays';

export interface StayComparisonContextType {
  compareItems: typeof stays;
  addToCompare: (stay: typeof stays[0]) => void;
  removeFromCompare: (stayId: number) => void;
  isInCompare: (stayId: number) => boolean;
  canAddMore: boolean;
  clearCompare: () => void;
  openCompareModal: boolean;
  setOpenCompareModal: (open: boolean) => void;
}

const StayComparisonContext = createContext<StayComparisonContextType | undefined>(undefined);

export const useStayComparison = () => {
  const context = useContext(StayComparisonContext);
  if (!context) {
    throw new Error('useStayComparison must be used within a StayComparisonProvider');
  }
  return context;
};

interface StayComparisonProviderProps {
  children: ReactNode;
}

export const StayComparisonProvider: React.FC<StayComparisonProviderProps> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<typeof stays>([]);
  const [openCompareModal, setOpenCompareModal] = useState(false);

  const addToCompare = (stay: typeof stays[0]) => {
    if (compareItems.length >= 2) {
      return; // Limit to 2 items
    }
    
    if (!compareItems.find(existing => existing.id === stay.id)) {
      setCompareItems(prev => [...prev, stay]);
    }
  };

  const removeFromCompare = (stayId: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== stayId));
  };

  const isInCompare = (stayId: number) => {
    return compareItems.some(item => item.id === stayId);
  };

  const canAddMore = compareItems.length < 2;

  const clearCompare = () => {
    setCompareItems([]);
  };

  const value: StayComparisonContextType = {
    compareItems,
    addToCompare,
    removeFromCompare,
    isInCompare,
    canAddMore,
    clearCompare,
    openCompareModal,
    setOpenCompareModal,
  };

  return (
    <StayComparisonContext.Provider value={value}>
      {children}
    </StayComparisonContext.Provider>
  );
};
