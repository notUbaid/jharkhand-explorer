import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FavoriteItem {
  id: string;
  type: 'destination' | 'package' | 'stay' | 'product' | 'experience' | 'tourguide' | 'event' | 'transport' | 'restaurant';
  name: string;
  description?: string;
  image?: string;
  price?: string;
  location?: string;
  rating?: number;
  category?: string;
  addedAt: Date;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string, type: string) => void;
  isFavorite: (id: string, type: string) => boolean;
  clearFavorites: () => void;
  getFavoritesByType: (type: string) => FavoriteItem[];
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('jharkhand-explorer-favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        // Convert addedAt strings back to Date objects
        const favoritesWithDates = parsedFavorites.map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        }));
        setFavorites(favoritesWithDates);
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('jharkhand-explorer-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const favoriteItem: FavoriteItem = {
      ...item,
      addedAt: new Date()
    };

    setFavorites(prev => {
      // Check if item already exists
      const exists = prev.some(fav => fav.id === item.id && fav.type === item.type);
      if (exists) {
        return prev; // Don't add duplicate
      }
      return [...prev, favoriteItem];
    });
  };

  const removeFromFavorites = (id: string, type: string) => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
  };

  const isFavorite = (id: string, type: string) => {
    return favorites.some(fav => fav.id === id && fav.type === type);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const getFavoritesByType = (type: string) => {
    return favorites.filter(fav => fav.type === type);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    getFavoritesByType
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

