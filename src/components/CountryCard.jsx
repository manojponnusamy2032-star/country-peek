import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';

function CountryCard({ country }) {
	const { name, flags, population, region, capital, cca3 } = country;
	const { favourites, dispatch } = useFavourites();
	const isSaved = favourites.some((c) => c.cca3 === cca3);

	const handleFavouriteClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (isSaved) {
			dispatch({ type: 'REMOVE_FAVOURITE', payload: cca3 });
		} else {
			dispatch({ type: 'ADD_FAVOURITE', payload: country });
		}
	};

	return (
		<div className="card" tabIndex={0} aria-label={`Country card for ${name?.common}`} role="group">
			<Link to={`/country/${cca3}`} tabIndex={-1} aria-label={`View details for ${name?.common}`}
				role="link"
				onKeyDown={e => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.currentTarget.click();
					}
				}}
			>
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
					{capital?.[0] && <p><span>Capital:</span> {capital[0]}</p>}
				</div>
			</Link>
			
			<div className="card__footer">
				<button
					className={`fav-btn${isSaved ? ' fav-btn--saved' : ''}`}
					aria-label={isSaved ? 'Remove from favourites' : 'Add to favourites'}
					onClick={handleFavouriteClick}
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							handleFavouriteClick(e);
						}
					}}
				>
					{isSaved ? '♥ Saved' : '♡ Save'}
				</button>
			</div>
		</div>
	);
}

export default CountryCard;