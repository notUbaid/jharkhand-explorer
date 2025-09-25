import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ViewModeContextType {
  viewMode: 'grid' | 'list';
  toggleViewMode: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};

interface ViewModeProviderProps {
  children: ReactNode;
}

export const ViewModeProvider: React.FC<ViewModeProviderProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    // Check localStorage first, then default to grid
    const saved = localStorage.getItem('viewMode');
    if (saved !== null) {
      return saved as 'grid' | 'list';
    }
    // Default to grid view
    return 'grid';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
