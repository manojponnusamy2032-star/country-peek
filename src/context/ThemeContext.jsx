// Favourites and Theme Context
import { createContext, useState, useEffect, useContext } from 'react';

// 1. Favourites Context
export const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
	const [favourites, setFavourites] = useState(() => {
		const saved = localStorage.getItem('favourites');
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem('favourites', JSON.stringify(favourites));
	}, [favourites]);

	const toggleFavourite = (country) => {
		setFavourites((prev) => {
			const exists = prev.find((c) => c.cca3 === country.cca3);
			if (exists) {
				return prev.filter((c) => c.cca3 !== country.cca3);
			} else {
				return [...prev, country];
			}
		});
	};

	return (
		<FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
			{children}
		</FavouritesContext.Provider>
	);
}

// 2. Theme Context
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [theme, setTheme] = useState(() => {
		const saved = localStorage.getItem('theme');
		return saved || 'light';
	});

	useEffect(() => {
		if (theme === 'dark') {
			document.body.setAttribute('data-theme', 'dark');
		} else {
			document.body.removeAttribute('data-theme');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

// Custom hook to use theme context
export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}