/**
 * FavoritesPage.jsx
 *
 * Displays the user's saved favorite movies.
 * Favorites are persisted in localStorage via FavoritesContext.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="w-24 h-24 rounded-full border border-cinema-700/30 bg-cinema-800/30 flex items-center justify-center mb-6">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h2 className="font-display text-cinema-400 text-xl font-bold mb-3">No favorites yet</h2>
      <p className="text-cinema-600 text-sm font-body max-w-xs leading-relaxed mb-7">
        Start searching for movies and tap the heart icon to save them here.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-cinema-500 hover:bg-cinema-400 text-cinema-950 font-body font-semibold text-sm transition-colors"
      >
        Browse Movies
      </Link>
    </div>
  );
}

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-cinema-700 font-mono text-xs uppercase tracking-widest mb-1">Your Collection</p>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-gold-gradient">
              Favorites
            </h1>
          </div>
          {favorites.length > 0 && (
            <span className="text-cinema-600 font-mono text-sm">
              {favorites.length} {favorites.length === 1 ? 'title' : 'titles'}
            </span>
          )}
        </div>

        {favorites.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
