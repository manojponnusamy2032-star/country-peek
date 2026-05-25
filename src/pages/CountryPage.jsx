import { useParams, useNavigate, Link } from 'react-router-dom';
import useCountry from '../hooks/useCountry';
import { useEffect, useState } from 'react';
import { useFavourites } from '../context/FavouritesContext';
import Skeleton from '../components/Loader';
import '../styles/App.css';

function CountryPage() {
	const { code } = useParams();
	const navigate = useNavigate();
	const { country, loading, error } = useCountry(code);
	const { favourites, dispatch } = useFavourites();
	const [borderNames, setBorderNames] = useState({});

	// Fetch border country names for display
	useEffect(() => {
		if (!country?.borders || country.borders.length === 0) {
			setBorderNames({});
			return;
		}
		let ignore = false;
		fetch(`https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}&fields=cca3,name`)
			.then(res => res.json())
			.then(data => {
				if (!ignore && Array.isArray(data)) {
					const map = {};
					data.forEach(c => { map[c.cca3] = c.name.common; });
					setBorderNames(map);
				}
			});
		return () => { ignore = true; };
	}, [country]);

	if (loading) return <Skeleton type="detail" />;
	if (error) return <p className="page-status page-status--error">{error}</p>;
	if (!country) return null;

	const {
		name,
		flags,
		population,
		region,
		subregion,
		capital,
		languages,
		currencies,
		borders,
		area,
		timezones,
	} = country;

	const languageList = languages ? Object.values(languages) : [];
	const currencyList = currencies ? Object.values(currencies).map(c => c.name) : [];
	const isFav = favourites && country ? favourites.some(fav => fav.cca3 === country.cca3) : false;

	const handleFavouriteToggle = () => {
		if (isFav) {
			dispatch({ type: 'REMOVE_FAVOURITE', payload: country.cca3 });
		} else {
			dispatch({ type: 'ADD_FAVOURITE', payload: country });
		}
	};

	return (
		<div className="country-page">
			<button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
			<div className="country-page__layout">
				<img
					src={flags?.svg}
					alt={`Flag of ${name?.common}`}
					className="country-page__flag"
				/>
				<div className="country-page__info">
					<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						<h2 className="country-page__name">{name?.common}</h2>
						<button
							className={`fav-btn${isFav ? ' fav-btn--saved' : ''}`}
							aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
							title={isFav ? 'Remove from favourites' : 'Add to favourites'}
							onClick={handleFavouriteToggle}
							style={{ position: 'static', transform: 'none', background: 'none', border: 'none', fontSize: '1.7rem', cursor: 'pointer' }}
						>
							{isFav ? (
								<span aria-hidden="true" role="img" style={{ color: '#ef4444' }}>♥</span>
							) : (
								<span aria-hidden="true" role="img" style={{ color: '#d1d5db' }}>♡</span>
							)}
						</button>
					</div>
					<p className="country-page__official">{name?.official}</p>
					<div className="country-page__details">
						<div>
							<p><b>Population:</b> {population?.toLocaleString()}</p>
							<p><b>Region:</b> {region}</p>
							<p><b>Subregion:</b> {subregion}</p>
							{capital?.[0] && <p><b>Capital:</b> {capital[0]}</p>}
							<p><b>Area:</b> {area?.toLocaleString()} km²</p>
							<p><b>Timezones:</b> {timezones?.join(', ')}</p>
						</div>
						<div>
							<p><b>Languages:</b> {languageList.join(', ') || 'N/A'}</p>
							<p><b>Currencies:</b> {currencyList.join(', ') || 'N/A'}</p>
						</div>
					</div>
					{borders && borders.length > 0 && (
						<div className="country-page__borders">
							<b>Borders:</b>
							{borders.map((b) => (
								<Link
									key={b}
									to={`/country/${b}`}
									className="border-badge"
									title={borderNames[b] || b}
									aria-label={`Go to ${borderNames[b] || b}`}
								>
									{borderNames[b] || b}
								</Link>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CountryPage;