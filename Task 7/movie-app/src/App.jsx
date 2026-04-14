/**
 * App.jsx
 *
 * Root component. Sets up:
 *  - React Router (BrowserRouter) with routes for Search, Detail, Favorites, 404
 *  - FavoritesProvider for global favorites state
 *  - Navbar persistent across all routes
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';
import MovieDetailPage from './pages/MovieDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            {/* Search / Home */}
            <Route path="/" element={<SearchPage />} />

            {/* Movie detail — :id is the IMDb ID (e.g. tt0111161) */}
            <Route path="/movie/:id" element={<MovieDetailPage />} />

            {/* Saved favorites */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
