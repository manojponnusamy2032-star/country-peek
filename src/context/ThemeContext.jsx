// Theme Context
import { createContext, useState, useEffect, useContext } from 'react';

// Theme Context
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