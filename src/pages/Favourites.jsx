import { useContext } from 'react';
import { FavouritesContext } from '../context/ThemeContext';
import CountryCard from '../components/CountryCard';

function Favourites() {
	const { favourites } = useContext(FavouritesContext);
	return (
		<div className="home">
			<h2>Favourites</h2>
			{favourites.length === 0 ? (
				<p className="home__status">No favourite countries yet.</p>
			) : (
				<div className="cards-grid">
					{favourites.map((country) => (
						<CountryCard key={country.cca3} country={country} />
					))}
				</div>
			)}
		</div>
	);
}

export default Favourites;