
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FavouritesContext } from '../context/ThemeContext';

function CountryCard({ country }) {
	const { name, flags, population, region, capital, cca3 } = country;
	const { favourites, toggleFavourite } = useContext(FavouritesContext);
	const isFav = favourites.some((c) => c.cca3 === cca3);

	return (
		<div className="card" tabIndex={0} aria-label={`Country card for ${name?.common}`}>
			<button
				className={`fav-btn${isFav ? ' fav-btn--active' : ''}`}
				aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
				onClick={(e) => {
					e.stopPropagation();
					toggleFavourite(country);
				}}
				tabIndex={0}
			>
				{isFav ? '★' : '☆'}
			</button>
			<Link to={`/country/${cca3}`} tabIndex={-1}>
				<img
					src={flags?.svg}
					alt={`Flag of ${name?.common}`}
					className="card__flag"
					loading="lazy"
				/>
				<div className="card__body">
					<h3 className="card__name">{name?.common}</h3>
					<p><span>Population:</span> {population?.toLocaleString()}</p>
					<p><span>Region:</span> {region}</p>
					<p><span>Capital:</span> {capital?.[0] ?? 'N/A'}</p>
				</div>
			</Link>
		</div>
	);
}

export default CountryCard;