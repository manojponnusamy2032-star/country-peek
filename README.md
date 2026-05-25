# CountryPeek 🌍

A modern, responsive React app to search, explore, and favourite countries around the world — powered by the [RestCountries API](https://restcountries.com/).

## Features

- 🔍 **Live Search** — debounced search with instant results
- 🌐 **Region Filter** — filter countries by continent
- 🔤 **Sort** — sort by name (A–Z) or population (high–low)
- ⭐ **Favourites** — save countries to a personal list (persisted in localStorage)
- 🌗 **Dark / Light Theme** — toggle with persistent preference
- 📱 **Responsive Design** — works on mobile, tablet, and desktop
- ♿ **Accessible** — ARIA labels, keyboard navigation, focus management
- ⚡ **Skeleton Loaders** — smooth loading experience
- 🔗 **Border Countries** — clickable links to neighbouring countries

## Tech Stack

| Layer       | Technology                  |
| ----------- | --------------------------- |
| Framework   | React 19 + Vite 8           |
| Routing     | React Router v7             |
| State       | useReducer + Context API    |
| Styling     | Vanilla CSS + CSS Variables |
| API         | RestCountries v3.1          |
| Deployment  | GitHub Pages                |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Header, CountryCard, FilterBar, SearchBar, Loader
├── context/        # ThemeContext, FavouritesContext
├── hooks/          # useCountry (custom hook)
├── pages/          # Home, CountryPage, Favourites, NotFound
└── styles/         # App.css (design system + responsive)
```

## Deployment (GitHub Pages)

The app is configured with `base: '/country-peek/'` in `vite.config.js` for GitHub Pages.

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## Built By

**Manoj Ponnusamy** — Data from [RestCountries API](https://restcountries.com/)
