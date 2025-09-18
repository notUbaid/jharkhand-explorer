import React, { createContext, useContext, useState, useEffect } from 'react';
import { packages, getPackageById } from '@/data/packages';
import { Package } from '@/types/Package';

interface PackageComparisonContextType {
  leftPackage: Package | null;
  rightPackage: Package | null;
  setLeftPackage: (pkg: Package) => void;
  setRightPackage: (pkg: Package) => void;
  clearComparison: () => void;
  isComparing: boolean;
  openComparisonModal: boolean;
  setOpenComparisonModal: (open: boolean) => void;
}

const PackageComparisonContext = createContext<PackageComparisonContextType | undefined>(undefined);

export const usePackageComparison = () => {
  const context = useContext(PackageComparisonContext);
  if (context === undefined) {
    throw new Error('usePackageComparison must be used within a PackageComparisonProvider');
  }
  return context;
};

interface PackageComparisonProviderProps {
  children: React.ReactNode;
}

export const PackageComparisonProvider: React.FC<PackageComparisonProviderProps> = ({ children }) => {
  const [leftPackage, setLeftPackage] = useState<Package | null>(null);
  const [rightPackage, setRightPackage] = useState<Package | null>(null);
  const [openComparisonModal, setOpenComparisonModal] = useState(false);

  const isComparing = leftPackage !== null && rightPackage !== null;

  const clearComparison = () => {
    setLeftPackage(null);
    setRightPackage(null);
    setOpenComparisonModal(false);
  };

  // Save comparison state to localStorage
  useEffect(() => {
    if (leftPackage) {
      localStorage.setItem('comparisonLeftPackage', JSON.stringify(leftPackage.id));
    }
    if (rightPackage) {
      localStorage.setItem('comparisonRightPackage', JSON.stringify(rightPackage.id));
    }
  }, [leftPackage, rightPackage]);

  // Clear comparison state on mount to prevent auto-opening
  useEffect(() => {
    // Clear any saved comparison state to prevent auto-opening
    localStorage.removeItem('comparisonLeftPackage');
    localStorage.removeItem('comparisonRightPackage');
  }, []);

  return (
    <PackageComparisonContext.Provider value={{
      leftPackage,
      rightPackage,
      setLeftPackage,
      setRightPackage,
      clearComparison,
      isComparing,
      openComparisonModal,
      setOpenComparisonModal
    }}>
      {children}
    </PackageComparisonContext.Provider>
  );
};
