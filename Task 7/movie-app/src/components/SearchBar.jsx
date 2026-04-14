/**
 * SearchBar.jsx
 *
 * Search input with an integrated type-filter dropdown.
 * The type filter ('movie', 'series', 'episode') is passed to the OMDB API
 * endpoint — no client-side array.filter() is used.
 */

import React, { useState } from 'react';

/** Available content-type options for the dropdown filter */
const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'movie', label: 'Movies' },
  { value: 'series', label: 'TV Series' },
  { value: 'episode', label: 'Episodes' },
];

export default function SearchBar({ onSearch, onTypeChange, currentType, loading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim(), currentType);
    }
  };

  const handleTypeSelect = (value) => {
    onTypeChange(value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cinema-500/70 pointer-events-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search movies, shows, episodes…"
            className="input-cinema w-full pl-11 pr-4 py-3.5 rounded-lg border border-cinema-700/60 bg-cinema-900/80 text-cinema-200 placeholder-cinema-600/60 font-body text-sm transition-all duration-200 focus:border-cinema-500/70"
            aria-label="Search movies"
          />
        </div>

        {/* Type Filter Dropdown */}
        <div className="relative">
          <select
            value={currentType}
            onChange={(e) => handleTypeSelect(e.target.value)}
            className="input-cinema appearance-none pl-4 pr-10 py-3.5 rounded-lg border border-cinema-700/60 bg-cinema-900/80 text-cinema-300 font-body text-sm cursor-pointer transition-all duration-200 focus:border-cinema-500/70 min-w-[140px]"
            aria-label="Filter by type"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-cinema-900 text-cinema-200">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Dropdown chevron */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cinema-500/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="px-6 py-3.5 rounded-lg bg-cinema-500 hover:bg-cinema-400 disabled:opacity-40 disabled:cursor-not-allowed text-cinema-950 font-body font-semibold text-sm transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
          aria-label="Search"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              Searching
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </>
          )}
        </button>
      </form>

      {/* Active filter badge */}
      {currentType && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-cinema-600/70 text-xs font-body">Filtering by:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cinema-500/30 bg-cinema-800/50 text-cinema-400 text-xs font-mono">
            {TYPE_OPTIONS.find((o) => o.value === currentType)?.label}
            <button
              onClick={() => handleTypeSelect('')}
              className="text-cinema-500/70 hover:text-cinema-400 transition-colors"
              aria-label="Clear type filter"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
