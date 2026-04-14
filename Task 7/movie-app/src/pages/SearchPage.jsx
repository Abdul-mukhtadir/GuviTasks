/**
 * SearchPage.jsx
 *
 * Main landing page. Contains the SearchBar, type-filter dropdown,
 * results grid, and pagination. Uses the useMovieSearch hook for all
 * data-fetching and state management.
 */

import React from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import { useMovieSearch } from '../hooks/useMovieSearch';

/** Decorative hero shown before the user has searched */
function Hero() {
  return (
    <div className="text-center py-16 sm:py-24 animate-fade-in">
      {/* Large film reel SVG */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-cinema-500/30 bg-cinema-800/40 mb-8 animate-pulse-glow">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#c9a84c" strokeWidth="1"/>
          <circle cx="12" cy="12" r="3" stroke="#c9a84c" strokeWidth="1.5"/>
          <circle cx="12" cy="5" r="1.5" fill="#c9a84c" fillOpacity="0.7"/>
          <circle cx="12" cy="19" r="1.5" fill="#c9a84c" fillOpacity="0.7"/>
          <circle cx="5" cy="12" r="1.5" fill="#c9a84c" fillOpacity="0.7"/>
          <circle cx="19" cy="12" r="1.5" fill="#c9a84c" fillOpacity="0.7"/>
          <circle cx="7.05" cy="7.05" r="1.5" fill="#c9a84c" fillOpacity="0.4"/>
          <circle cx="16.95" cy="16.95" r="1.5" fill="#c9a84c" fillOpacity="0.4"/>
          <circle cx="16.95" cy="7.05" r="1.5" fill="#c9a84c" fillOpacity="0.4"/>
          <circle cx="7.05" cy="16.95" r="1.5" fill="#c9a84c" fillOpacity="0.4"/>
        </svg>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-black text-gold-gradient mb-4 leading-tight">
        Discover Cinema
      </h1>
      <p className="text-cinema-500 font-body text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-3">
        Search millions of movies, TV series, and episodes powered by the OMDB database.
      </p>
      <p className="text-cinema-700 font-mono text-xs">
        Try searching for{' '}
        {['Inception', 'Breaking Bad', 'The Godfather'].map((t, i) => (
          <span key={t}>
            <span className="text-cinema-500 italic">"{t}"</span>
            {i < 2 && <span className="text-cinema-800"> · </span>}
          </span>
        ))}
      </p>
    </div>
  );
}

/** Empty state when search returns no results */
function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-full border border-cinema-700/40 bg-cinema-800/30 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
      <h3 className="font-display text-cinema-400 text-lg font-bold mb-2">No results found</h3>
      <p className="text-cinema-600 text-sm font-body max-w-xs leading-relaxed">
        We couldn't find anything for <span className="text-cinema-400 italic">"{query}"</span>.
        Try different keywords or remove the type filter.
      </p>
    </div>
  );
}

export default function SearchPage() {
  const {
    query,
    type,
    page,
    movies,
    totalResults,
    totalPages,
    loading,
    error,
    searched,
    handleSearch,
    handleTypeChange,
    handlePageChange,
  } = useMovieSearch();

  const showHero = !searched && !loading;
  const showEmpty = searched && !loading && !error && movies.length === 0;
  const showResults = !loading && !error && movies.length > 0;

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* ── Search Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page title (compact after search) */}
        {!searched && !loading && (
          <p className="text-center text-cinema-700 font-mono text-xs uppercase tracking-widest mb-6">
            — Movie Discovery Engine —
          </p>
        )}

        <SearchBar
          onSearch={handleSearch}
          onTypeChange={handleTypeChange}
          currentType={type}
          loading={loading}
        />

        {/* Result summary */}
        {searched && !loading && !error && movies.length > 0 && (
          <div className="mt-5 flex items-center justify-between">
            <p className="text-cinema-600 text-xs font-mono">
              <span className="text-cinema-400 font-semibold">{totalResults.toLocaleString()}</span>{' '}
              results for{' '}
              <span className="text-cinema-400 italic">"{query}"</span>
              {type && (
                <span className="text-cinema-600">
                  {' '}· {type}s only
                </span>
              )}
            </p>
            <p className="text-cinema-700 text-xs font-mono">
              Page {page} of {totalPages}
            </p>
          </div>
        )}
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Hero */}
        {showHero && <Hero />}

        {/* Loading skeletons */}
        {loading && <SkeletonGrid count={10} />}

        {/* Error */}
        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => handleSearch(query, type)}
          />
        )}

        {/* Empty state */}
        {showEmpty && <EmptyState query={query} />}

        {/* Results grid */}
        {showResults && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
