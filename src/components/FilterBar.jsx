function FilterBar({ region, onRegionChange }) {
	return (
		<div className="filter-bar">
			<label htmlFor="region-select">Filter by Region: </label>
			<select
				id="region-select"
				value={region}
				onChange={e => onRegionChange(e.target.value)}
			>
				<option value="">All</option>
				<option value="Africa">Africa</option>
				<option value="Americas">Americas</option>
				<option value="Asia">Asia</option>
				<option value="Europe">Europe</option>
				<option value="Oceania">Oceania</option>
			</select>
		</div>
	);
}

export default FilterBar;