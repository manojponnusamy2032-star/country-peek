import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CountryPage() {
	const { name } = useParams();
	const [country, setCountry] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		fetch(`https://restcountries.com/v3.1/alpha/${name}`)
			.then(res => {
				if (!res.ok) throw new Error('Not found');
				return res.json();
			})
			.then(data => {
				setCountry(data[0]);
				setError(null);
			})
			.catch(() => {
				setCountry(null);
				setError('Country not found.');
			})
			.finally(() => setLoading(false));
	}, [name]);

	if (loading) return <p className="home__status">Loading...</p>;
	if (error) return <p className="home__status home__status--error">{error}</p>;
	if (!country) return null;

	return (
		<div className="home">
			<Link to="/">← Back</Link>
			<h2>{country.name?.common}</h2>
			<img src={country.flags?.svg} alt={`Flag of ${country.name?.common}`} style={{width: '200px', borderRadius: '1rem'}} />
			<p><b>Population:</b> {country.population?.toLocaleString()}</p>
			<p><b>Region:</b> {country.region}</p>
			<p><b>Capital:</b> {country.capital?.[0] ?? 'N/A'}</p>
			<p><b>Subregion:</b> {country.subregion}</p>
			<p><b>Area:</b> {country.area?.toLocaleString()} km²</p>
			<p><b>Timezones:</b> {country.timezones?.join(', ')}</p>
		</div>
	);
}

export default CountryPage;