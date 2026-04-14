/**
 * MovieDetailPage.jsx
 *
 * Full detail view for a single movie/show fetched by IMDb ID.
 * Displays: large poster, title, metadata, plot, ratings, cast, and more.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchMovieById } from '../services/omdbService';
import { useFavorites } from '../context/FavoritesContext';
import ErrorMessage from '../components/ErrorMessage';

/** Converts a rating source name to a short label */
function ratingLabel(source) {
  if (source.includes('Internet Movie')) return 'IMDb';
  if (source.includes('Rotten')) return 'RT';
  if (source.includes('Metacritic')) return 'Meta';
  return source;
}

/** Single rating badge */
function RatingBadge({ source, value }) {
  const label = ratingLabel(source);
  const colorMap = {
    IMDb: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
    RT: 'border-red-500/40 text-red-400 bg-red-500/10',
    Meta: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
  };
  const cls = colorMap[label] || 'border-cinema-600/40 text-cinema-400 bg-cinema-800/50';

  return (
    <div className={`flex flex-col items-center px-4 py-3 rounded-xl border ${cls}`}>
      <span className="text-lg font-display font-bold leading-none">{value}</span>
      <span className="text-[10px] font-mono uppercase tracking-widest mt-1 opacity-70">{label}</span>
    </div>
  );
}

/** Metadata row (label + value) */
function MetaRow({ label, value }) {
  if (!value || value === 'N/A') return null;
  return (
    <div className="flex gap-3 py-2.5 border-b border-cinema-800/60 last:border-0">
      <span className="text-cinema-600 text-xs font-mono uppercase tracking-widest min-w-[90px] pt-0.5">{label}</span>
      <span className="text-cinema-300 text-sm font-body leading-relaxed">{value}</span>
    </div>
  );
}

/** Skeleton for detail page */
function DetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-20 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="skeleton h-4 w-32 rounded mb-10" />
        <div className="flex flex-col md:flex-row gap-10">
          <div className="skeleton rounded-2xl aspect-[2/3] w-full md:w-64 flex-shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-8 rounded w-3/4" />
            <div className="skeleton h-4 rounded w-1/3" />
            <div className="skeleton h-4 rounded w-1/2" />
            <div className="space-y-2 mt-6">
              {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-3 rounded" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  const favorited = movie ? isFavorite(movie.imdbID) : false;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMovie(null);
    setImgError(false);

    fetchMovieById(id)
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load movie details.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <DetailSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  if (!movie) return null;

  const hasPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;
  const ratings = movie.Ratings && movie.Ratings.length > 0 ? movie.Ratings : [];

  return (
    <div className="min-h-screen pt-24 pb-20 animate-fade-in">
      {/* Background blur from poster */}
      {hasPoster && (
        <div
          className="fixed inset-0 opacity-5 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${movie.Poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
          }}
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-cinema-600 hover:text-cinema-400 text-sm font-body transition-colors mb-8 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to results
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* ── Poster ── */}
          <div className="flex-shrink-0 w-full md:w-64">
            <div className="rounded-2xl overflow-hidden border border-cinema-700/40 shadow-2xl shadow-cinema-950/80 aspect-[2/3] bg-cinema-800">
              {hasPoster ? (
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1">
                    <rect x="2" y="6" width="20" height="14" rx="1"/>
                    <circle cx="12" cy="13" r="3"/>
                  </svg>
                  <span className="text-cinema-700 text-xs font-mono text-center px-4">No Poster Available</span>
                </div>
              )}
            </div>

            {/* Favorite button below poster */}
            <button
              onClick={() => toggleFavorite(movie)}
              className={`mt-4 w-full py-2.5 rounded-xl border font-body text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                favorited
                  ? 'bg-scarlet-500/20 border-scarlet-500/50 text-scarlet-400 hover:bg-scarlet-500/30'
                  : 'bg-cinema-800/60 border-cinema-600/40 text-cinema-400 hover:border-cinema-500 hover:text-cinema-300'
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {favorited ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>

            {/* IMDb link */}
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-2.5 rounded-xl border border-cinema-700/30 text-cinema-600 hover:text-cinema-400 hover:border-cinema-600/50 font-body text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View on IMDb
            </a>
          </div>

          {/* ── Details ── */}
          <div className="flex-1 min-w-0">
            {/* Type badge + Year */}
            <div className="flex items-center gap-3 mb-3">
              {movie.Type && movie.Type !== 'N/A' && (
                <span className="px-2.5 py-1 rounded border border-cinema-500/30 bg-cinema-500/10 text-cinema-400 text-xs font-mono uppercase tracking-widest">
                  {movie.Type}
                </span>
              )}
              {movie.Year && movie.Year !== 'N/A' && (
                <span className="text-cinema-600 text-sm font-mono">{movie.Year}</span>
              )}
              {movie.Rated && movie.Rated !== 'N/A' && (
                <span className="px-2 py-0.5 rounded border border-cinema-700/50 text-cinema-600 text-xs font-mono">{movie.Rated}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-black text-cinema-100 leading-tight mb-2">
              {movie.Title}
            </h1>

            {/* Genre pills */}
            {movie.Genre && movie.Genre !== 'N/A' && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {movie.Genre.split(', ').map((g) => (
                  <span key={g} className="px-3 py-1 rounded-full bg-cinema-800/60 border border-cinema-700/40 text-cinema-500 text-xs font-body">
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Ratings */}
            {ratings.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {ratings.map((r) => (
                  <RatingBadge key={r.Source} source={r.Source} value={r.Value} />
                ))}
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <div className="mb-6">
                <h2 className="text-cinema-600 text-xs font-mono uppercase tracking-widest mb-2">Plot</h2>
                <p className="text-cinema-300 font-body text-sm leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Metadata table */}
            <div className="rounded-xl border border-cinema-800/60 bg-cinema-900/40 divide-y divide-cinema-800/40 overflow-hidden">
              <MetaRow label="Director" value={movie.Director} />
              <MetaRow label="Writer" value={movie.Writer} />
              <MetaRow label="Actors" value={movie.Actors} />
              <MetaRow label="Language" value={movie.Language} />
              <MetaRow label="Country" value={movie.Country} />
              <MetaRow label="Runtime" value={movie.Runtime} />
              <MetaRow label="Released" value={movie.Released} />
              <MetaRow label="Awards" value={movie.Awards} />
              <MetaRow label="Box Office" value={movie.BoxOffice} />
              <MetaRow label="Production" value={movie.Production} />
              {movie.totalSeasons && movie.totalSeasons !== 'N/A' && (
                <MetaRow label="Seasons" value={movie.totalSeasons} />
              )}
              <MetaRow label="IMDb ID" value={movie.imdbID} />
              {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                <MetaRow label="IMDb Votes" value={Number(movie.imdbVotes.replace(/,/g, '')).toLocaleString()} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
