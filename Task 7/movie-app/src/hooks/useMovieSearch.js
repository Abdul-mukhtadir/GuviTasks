/**
 * useMovieSearch.js
 *
 * Custom hook encapsulating search state, pagination, and type filtering.
 * Calls the OMDB search API endpoint — filtering is done server-side via
 * the 'type' parameter, not via array.filter() on the client.
 */

import { useState, useCallback, useRef } from 'react';
import { searchMovies } from '../services/omdbService';

const RESULTS_PER_PAGE = 10; // OMDB always returns 10 per page

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');        // '', 'movie', 'series', 'episode'
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); // has the user searched at all?

  // Track active request to avoid race conditions
  const requestIdRef = useRef(0);

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  /**
   * Executes a search request.
   * @param {string} searchQuery
   * @param {number} pageNum
   * @param {string} typeFilter
   */
  const executeSearch = useCallback(async (searchQuery, pageNum, typeFilter) => {
    if (!searchQuery.trim()) return;

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);

    try {
      const result = await searchMovies({
        query: searchQuery.trim(),
        page: pageNum,
        type: typeFilter,
      });

      // Discard stale responses
      if (requestId !== requestIdRef.current) return;

      setMovies(result.movies);
      setTotalResults(result.totalResults);
      setSearched(true);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err.message || 'Something went wrong. Please try again.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  /** Called when the user submits a new search query */
  const handleSearch = useCallback(
    (newQuery, newType = type) => {
      setQuery(newQuery);
      setType(newType);
      setPage(1);
      executeSearch(newQuery, 1, newType);
    },
    [type, executeSearch]
  );

  /** Called when the user changes the type filter dropdown */
  const handleTypeChange = useCallback(
    (newType) => {
      setType(newType);
      setPage(1);
      if (query.trim()) {
        executeSearch(query, 1, newType);
      }
    },
    [query, executeSearch]
  );

  /** Called when the user navigates to a different page */
  const handlePageChange = useCallback(
    (newPage) => {
      setPage(newPage);
      executeSearch(query, newPage, type);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [query, type, executeSearch]
  );

  return {
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
  };
}
