/**
 * omdbService.js
 * API service module for the OMDB API (https://www.omdbapi.com/)
 *
 * Handles all HTTP requests to OMDB, including:
 *  - Searching movies/series/episodes by title with optional type filter and pagination
 *  - Fetching detailed information for a single movie by IMDb ID
 *
 * Replace API_KEY with your own key from https://www.omdbapi.com/apikey.aspx
 */

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy'; // fallback demo key
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Constructs a URL with query parameters.
 * @param {Object} params - Key/value pairs of query parameters.
 * @returns {string} Full request URL.
 */
function buildUrl(params) {
  const url = new URL(BASE_URL);
  url.searchParams.append('apikey', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
}

/**
 * Generic fetch wrapper with error handling.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<Object>} Parsed JSON response.
 * @throws {Error} On network failure or OMDB-level errors.
 */
async function apiFetch(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // OMDB returns { Response: "False", Error: "..." } on failures
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Unknown API error');
  }

  return data;
}

/**
 * Search movies by title/keyword.
 *
 * Uses the OMDB 's' parameter (search by title). The API supports optional
 * 'type' filtering (movie | series | episode) natively — no client-side
 * array.filter() is used anywhere in this project.
 *
 * @param {string} query - Search keyword / title.
 * @param {number} [page=1] - Page number (OMDB returns 10 results per page).
 * @param {string} [type=''] - Filter by type: 'movie', 'series', 'episode', or '' for all.
 * @param {string} [year=''] - Optional 4-digit year to filter by.
 * @returns {Promise<{ movies: Array, totalResults: number }>}
 */
export async function searchMovies({ query, page = 1, type = '', year = '' }) {
  const url = buildUrl({
    s: query,
    page,
    type: type || undefined,
    y: year || undefined,
  });

  const data = await apiFetch(url);

  return {
    movies: data.Search || [],
    totalResults: parseInt(data.totalResults, 10) || 0,
  };
}

/**
 * Fetch full details for a single movie/show by its IMDb ID.
 *
 * Uses the OMDB 'i' parameter. Returns the complete movie object
 * including Plot, Ratings, Actors, Director, Genre, Runtime, etc.
 *
 * @param {string} imdbId - The IMDb ID (e.g. "tt0111161").
 * @returns {Promise<Object>} Detailed movie object.
 */
export async function fetchMovieById(imdbId) {
  const url = buildUrl({ i: imdbId, plot: 'full' });
  return apiFetch(url);
}

/**
 * Fetch movies by title (exact or closest match).
 * Uses OMDB 't' parameter — returns a single best-match object.
 *
 * @param {string} title - Exact movie title.
 * @returns {Promise<Object>} Movie detail object.
 */
export async function fetchMovieByTitle(title) {
  const url = buildUrl({ t: title, plot: 'full' });
  return apiFetch(url);
}
