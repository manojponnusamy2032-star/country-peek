import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { FavouritesContext } from '../context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

describe('CountryCard', () => {
  const country = {
    name: { common: 'Testland' },
    flags: { svg: 'https://flag.svg' },
    population: 123456,
    region: 'TestRegion',
    capital: ['Testville'],
    cca3: 'TST',
  };
  it('renders country info', () => {
    render(
      <BrowserRouter>
        <FavouritesContext.Provider value={{ favourites: [], toggleFavourite: () => {} }}>
          <CountryCard country={country} />
        </FavouritesContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText(/Population/)).toBeInTheDocument();
    expect(screen.getByText(/Region/)).toBeInTheDocument();
    expect(screen.getByText(/Testville/)).toBeInTheDocument();
  });
});
