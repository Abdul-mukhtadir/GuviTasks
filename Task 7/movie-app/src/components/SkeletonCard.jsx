/**
 * SkeletonCard.jsx
 * Animated placeholder cards displayed while search results are loading.
 */

import React from 'react';

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-cinema-700/20 bg-cinema-900/40">
      {/* Poster skeleton */}
      <div className="aspect-[2/3] skeleton" />
      {/* Info skeleton */}
      <div className="p-3.5 space-y-2">
        <div className="skeleton h-3.5 rounded w-4/5" />
        <div className="skeleton h-3 rounded w-2/5" />
      </div>
    </div>
  );
}

/**
 * Renders N skeleton cards.
 * @param {number} count - Number of placeholder cards (default 10).
 */
export default function SkeletonGrid({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
