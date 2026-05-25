import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import '../styles/App.css';

function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="header">
			<Link to="/" className="header__brand">CountryPeek</Link>
			<nav className="header__nav">
				<Link to="/">Home</Link>
				<Link to="/favourites">Favourites</Link>
				<button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
					{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
				</button>
			</nav>
		</header>
	);
}

export default Header;
