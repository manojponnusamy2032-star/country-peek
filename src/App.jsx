import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ThemeProvider, FavouritesProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <FavouritesProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country/:name" element={<CountryPage />} />
                <Route path="/favourites" element={<Favourites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
                  <Route path="/country/:code" element={<CountryPage />} />
          <footer className="footer">
            <p>
              Data from <a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">RestCountries API</a> | Built by Manoj Ponnusamy
            </p>
          </footer>
        </BrowserRouter>
      </FavouritesProvider>
    </ThemeProvider>
  );
}

            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"

