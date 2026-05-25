import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import CountryCard from '../components/CountryCard';

function Favourites() {
	const { favourites } = useFavourites();

	if (favourites.length === 0) {
		return (
			<div className="home" style={{ textAlign: 'center', marginTop: '3rem' }}>
				<h2>My Favourites</h2>
				<p className="home__status" style={{ marginBottom: '1.5rem' }}>
					You haven't saved any countries yet.
				</p>
				<Link to="/" className="retry-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
					← Go Back & Explore
				</Link>
			</div>
		);
	}

	return (
		<div className="home">
			<h2>My Favourites</h2>
			<div className="cards-grid">
				{favourites.map((country) => (
					<CountryCard key={country.cca3} country={country} />
				))}
			</div>
		</div>
	);
}

export default Favourites;