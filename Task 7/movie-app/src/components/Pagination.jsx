/**
 * Pagination.jsx
 *
 * Paginator for large search result sets.
 * Renders previous/next arrows and page number buttons with ellipsis.
 */

import React from 'react';

/**
 * Generates a smart page range array with ellipsis markers.
 * @param {number} current  - Current active page (1-indexed).
 * @param {number} total    - Total number of pages.
 * @returns {Array<number|string>} Array of page numbers and '...' strings.
 */
function buildPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  const DELTA = 2;

  const start = Math.max(2, current - DELTA);
  const end = Math.min(total - 1, current + DELTA);

  pages.push(1);
  if (start > 2) pages.push('...');

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < total - 1) pages.push('...');
  pages.push(total);

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10"
      aria-label="Search results pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="w-9 h-9 flex items-center justify-center text-cinema-600 text-sm font-mono"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-btn ${page === currentPage ? 'active' : ''}`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
        aria-label="Next page"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </nav>
  );
}
