/**
 * ErrorMessage.jsx
 * User-friendly error display with optional retry callback.
 */

import React from 'react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      {/* Broken film icon */}
      <div className="w-20 h-20 rounded-full border border-scarlet-600/40 bg-scarlet-600/10 flex items-center justify-center mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(231,76,60,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>

      <h3 className="font-display text-cinema-300 text-lg font-bold mb-2">
        Something went wrong
      </h3>
      <p className="text-cinema-500 text-sm font-body max-w-sm mb-6 leading-relaxed">
        {message || 'An unexpected error occurred. Please check your connection and try again.'}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 rounded-lg border border-cinema-600/50 bg-cinema-800/60 text-cinema-400 text-sm font-body font-medium hover:border-cinema-500 hover:text-cinema-300 transition-all duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
