import { useState, useEffect, useRef } from 'react';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import Loader from '../components/Loader';
import FilterBar from '../components/FilterBar';

function BackToTop() {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const onScroll = () => setShow(window.scrollY > 300);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);
	if (!show) return null;
	return (
		<button
			className="back-to-top"
			aria-label="Back to top"
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
		>
			↑ Top
		</button>
	);
}

function Home() {
	const [query, setQuery] = useState('');
	const [countries, setCountries] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [region, setRegion] = useState('All');
	const [sortBy, setSortBy] = useState('');
	const lastQuery = useRef('');

	// Fetch countries from API for a given query
	function fetchCountries(q) {
		setLoading(true);
		fetch(`https://restcountries.com/v3.1/name/${q}`)
			.then((res) => {
				if (!res.ok) throw new Error('Not found');
				return res.json();
			})
			.then((data) => {
				setCountries(data);
				setError(null);
			})
			.catch((err) => {
				setCountries([]);
				if (err.message === 'Not found') {
					setError('No countries found.');
				} else {
					setError('Network error. Please check your connection.');
				}
			})
			.finally(() => setLoading(false));
	}

	// Debounce search input: only fetch after 400ms of no typing
	// Also reset region and sort when query is cleared
	useEffect(() => {
		if (!query) {
			setCountries([]);
			setError(null);
			setRegion('All');
			setSortBy('');
			return;
		}
		lastQuery.current = query;
		const timer = setTimeout(() => {
			fetchCountries(query);
		}, 400);
		// Cleanup cancels previous timer if query changes quickly
		return () => clearTimeout(timer);
	}, [query]);

	// Compute derived displayed array: filter and sort
	const displayed = [...countries]
		.filter((c) => region === 'All' || c.region === region)
		.sort((a, b) => {
			if (sortBy === 'name') {
				return a.name.common.localeCompare(b.name.common);
			}
			if (sortBy === 'population') {
				return b.population - a.population;
			}
			return 0;
		});

	return (
		<div className="home">
			<SearchBar query={query} onQueryChange={setQuery} />
			<FilterBar
				region={region}
				onRegionChange={setRegion}
				sortBy={sortBy}
				onSortChange={setSortBy}
			/>

			{loading && <Loader />}
			{error && (
				<div className="home__status home__status--error">
					<p>{error}</p>
					{error.includes('Network') && (
						<button onClick={() => fetchCountries(lastQuery.current)} className="retry-btn">Retry</button>
					)}
				</div>
			)}

			{!loading && !error && countries.length > 0 && displayed.length === 0 && (
				<p className="home__status">No countries match the selected filters.</p>
			)}

			{!loading && !error && displayed.length > 0 && (
				<div className="cards-grid">
					{displayed.map((country) => (
						<CountryCard key={country.cca3} country={country} />
					))}
				</div>
			)}

			{!loading && !error && countries.length === 0 && !query && (
				<p className="home__status">Start searching to explore countries.</p>
			)}
			<BackToTop />
		</div>
	);
}

export default Home;
