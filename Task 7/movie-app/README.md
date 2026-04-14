# 🎬 CineVault — Movie Discovery App

A full-featured movie search application built with **React**, **React Router**, and **Tailwind CSS**, powered by the [OMDB API](https://www.omdbapi.com/).

---

## ✨ Features

| Feature | Details |
|---|---|
| **Search** | Search millions of movies, series, and episodes by title/keyword |
| **Type Filter** | Filter results by `movie`, `series`, or `episode` via the OMDB API endpoint (no `array.filter()`) |
| **Pagination** | Smart paginator with ellipsis for navigating large result sets |
| **Movie Detail** | Full detail view: poster, plot, ratings (IMDb/RT/Metacritic), cast, metadata |
| **Favorites** | Add/remove favorites saved persistently in `localStorage` |
| **Error Handling** | User-friendly messages for API errors, empty results, and 404 routes |
| **Skeleton Loaders** | Animated placeholder cards while data is loading |

---

## 🏗 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top nav with favorites badge
│   ├── SearchBar.jsx       # Search input + type-filter dropdown
│   ├── MovieCard.jsx       # Grid card for a single result
│   ├── Pagination.jsx      # Page navigation component
│   ├── SkeletonCard.jsx    # Loading placeholder grid
│   └── ErrorMessage.jsx    # Error display with retry
│
├── context/
│   └── FavoritesContext.jsx  # Global favorites state + localStorage
│
├── hooks/
│   └── useMovieSearch.js    # Search state, pagination, type filtering
│
├── pages/
│   ├── SearchPage.jsx       # Home / search results page
│   ├── MovieDetailPage.jsx  # Full movie detail view
│   ├── FavoritesPage.jsx    # Saved favorites list
│   └── NotFoundPage.jsx     # 404 catch-all
│
├── services/
│   └── omdbService.js       # OMDB API fetch functions
│
├── App.jsx                  # Router + provider setup
├── main.jsx                 # React entry point
└── index.css                # Tailwind + custom cinema theme
```

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd movie-app
npm install
```

### 2. Get an OMDB API key

Register for a free key at [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx).

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your key:

```
VITE_OMDB_API_KEY=your_actual_key_here
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔗 Routes

| Route | Page |
|---|---|
| `/` | Search page (home) |
| `/movie/:imdbID` | Movie detail (e.g. `/movie/tt0111161`) |
| `/favorites` | Saved favorites |
| `*` | 404 Not Found |

---

## 🛠 Tech Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Tailwind CSS v3** — Utility-first styling
- **Vite** — Build tool & dev server
- **OMDB API** — Movie data source

---

## 📝 API Notes

- OMDB returns **10 results per page** from the `s` (search) endpoint.
- Type filtering (`movie` / `series` / `episode`) is handled by the API's `type` parameter — **no `array.filter()` is used anywhere** in this project.
- Full movie details are fetched via the `i` (by IMDb ID) endpoint with `plot=full`.
- All API calls are wrapped in `try/catch` with user-friendly error messages.

---

## 🎨 Design

CineVault uses a **dark cinema aesthetic** — deep charcoal backgrounds, gold accent palette, Playfair Display for headings, DM Sans for body text — inspired by classic film titles and prestige theatrical posters.
