/**
 * MovieCard.jsx
 *
 * Displays a single movie in the search results grid.
 * Shows poster, title, year, type, and quick-favorite button.
 * Clicking the card navigates to the movie detail page.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const TYPE_BADGE_COLORS = {
  movie: 'bg-cinema-500/20 text-cinema-400 border-cinema-500/30',
  series: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  episode: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [imgError, setImgError] = useState(false);

  const favorited = isFavorite(movie.imdbID);
  const hasPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;
  const badgeClass = TYPE_BADGE_COLORS[movie.Type] || TYPE_BADGE_COLORS.movie;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // prevent card navigation
    toggleFavorite(movie);
  };

  return (
    <article
      className="movie-card group relative rounded-xl overflow-hidden border border-cinema-700/30 bg-cinema-900/60 cursor-pointer card-glow transition-all duration-300 hover:border-cinema-500/40 hover:-translate-y-1"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.imdbID}`)}
      aria-label={`View details for ${movie.Title}`}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-cinema-800">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-cinema-800">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1">
              <rect x="2" y="6" width="20" height="14" rx="1"/>
              <circle cx="12" cy="13" r="3"/>
              <path d="M7 6V4M12 6V4M17 6V4"/>
            </svg>
            <span className="text-cinema-600/50 text-xs font-mono text-center px-3">{movie.Title}</span>
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-950 via-cinema-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border ${
            favorited
              ? 'bg-scarlet-500/90 border-scarlet-400 text-white shadow-lg shadow-scarlet-500/30'
              : 'bg-cinema-950/60 border-cinema-700/50 text-cinema-500 hover:border-cinema-500 hover:text-cinema-400 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Type badge on poster */}
        <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-widest ${badgeClass} backdrop-blur-sm`}>
          {movie.Type}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="font-display text-cinema-200 font-bold text-sm leading-snug line-clamp-2 group-hover:text-cinema-300 transition-colors mb-1">
          {movie.Title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-cinema-600 text-xs font-mono">{movie.Year}</span>
          <span className="text-cinema-700/60 text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 8 12 12 14 14"/>
            </svg>
            {movie.imdbID}
          </span>
        </div>
      </div>
    </article>
  );
}
