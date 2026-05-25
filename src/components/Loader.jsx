function Loader() {
	// Show 8 skeleton cards
	return (
		<div className="cards-grid">
			{Array.from({ length: 8 }).map((_, i) => (
				<div className="card skeleton" key={i}>
					<div className="card__flag skeleton-flag" />
					<div className="card__body">
						<div className="skeleton-line skeleton-title" />
						<div className="skeleton-line" />
						<div className="skeleton-line" />
						<div className="skeleton-line" />
					</div>
				</div>
			))}
		</div>
	);
}

export default Loader;