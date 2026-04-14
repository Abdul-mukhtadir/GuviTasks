/**
 * NotFoundPage.jsx
 * Displayed when the user navigates to an unknown route.
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-fade-in">
      <div className="font-display text-[120px] sm:text-[180px] font-black leading-none text-cinema-800/60 select-none mb-2">
        404
      </div>
      <h1 className="font-display text-cinema-400 text-2xl font-bold mb-3">Scene Not Found</h1>
      <p className="text-cinema-600 font-body text-sm max-w-xs mb-8 leading-relaxed">
        The page you're looking for seems to have been cut from the final edit.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-xl bg-cinema-500 hover:bg-cinema-400 text-cinema-950 font-body font-semibold text-sm transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
