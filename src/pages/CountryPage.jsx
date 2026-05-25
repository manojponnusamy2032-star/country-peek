import { useParams, useNavigate } from 'react-router-dom';
import useCountry from '../hooks/useCountry';
import '../styles/App.css';


function CountryPage() {
	const { code } = useParams();
	const navigate = useNavigate();
	const { country, loading, error } = useCountry(code);

	if (loading) return <p className="page-status">Loading...</p>;
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
					<h2 className="country-page__name">{name?.common}</h2>
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
								<span key={b} className="border-badge">{b}</span>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default CountryPage;