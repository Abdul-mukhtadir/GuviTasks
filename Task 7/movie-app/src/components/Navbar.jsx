/**
 * Navbar.jsx
 * Top navigation bar with Movie-App branding and favorites count badge.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cinema-700/40 bg-cinema-950/90 backdrop-blur-md">
      {/* Film strip top accent */}
      <div className="h-1.5 film-strip w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded border border-cinema-500/60 flex items-center justify-center bg-cinema-800 group-hover:border-cinema-400 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="20" height="14" rx="1" stroke="#c9a84c" strokeWidth="1.5"/>
              <path d="M7 6V4M12 6V4M17 6V4" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 20V22M12 20V22M17 20V22" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12" cy="13" r="3" stroke="#c9a84c" strokeWidth="1.5"/>
              <circle cx="5" cy="10" r="1" fill="#c9a84c"/>
              <circle cx="5" cy="16" r="1" fill="#c9a84c"/>
              <circle cx="19" cy="10" r="1" fill="#c9a84c"/>
              <circle cx="19" cy="16" r="1" fill="#c9a84c"/>
            </svg>
          </div>
          <span className="font-display text-xl font-bold text-gold-gradient tracking-wide hidden sm:block">
            Movie-App
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded text-sm font-body font-medium transition-all duration-200 ${
              isActive('/')
                ? 'text-cinema-400 bg-cinema-800/60'
                : 'text-cinema-300/70 hover:text-cinema-300 hover:bg-cinema-800/40'
            }`}
          >
            Search
          </Link>
          <Link
            to="/favorites"
            className={`relative px-4 py-2 rounded text-sm font-body font-medium transition-all duration-200 ${
              isActive('/favorites')
                ? 'text-cinema-400 bg-cinema-800/60'
                : 'text-cinema-300/70 hover:text-cinema-300 hover:bg-cinema-800/40'
            }`}
          >
            Favorites
            {favorites.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-scarlet-500 text-white text-[10px] font-mono font-bold flex items-center justify-center px-1">
                {favorites.length > 99 ? '99+' : favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
