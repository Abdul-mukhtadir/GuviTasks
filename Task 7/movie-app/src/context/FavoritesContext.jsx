/**
 * FavoritesContext.jsx
 *
 * React Context + localStorage persistence for the user's favorites list.
 * Provides add/remove/toggle/check helpers to all descendant components.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext(null);

const STORAGE_KEY = 'cinevault_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  /** Add a movie to favorites */
  const addFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.imdbID === movie.imdbID);
      if (exists) return prev;
      return [movie, ...prev];
    });
  }, []);

  /** Remove a movie from favorites by IMDb ID */
  const removeFavorite = useCallback((imdbID) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  }, []);

  /** Toggle favorite status */
  const toggleFavorite = useCallback((movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.imdbID === movie.imdbID);
      if (exists) return prev.filter((m) => m.imdbID !== movie.imdbID);
      return [movie, ...prev];
    });
  }, []);

  /** Check if a movie is favorited */
  const isFavorite = useCallback(
    (imdbID) => favorites.some((m) => m.imdbID === imdbID),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/** Hook for consuming favorites context */
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
