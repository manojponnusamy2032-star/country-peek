
function Loader({ type }) {
	if (type === 'detail') {
		return (
			<div className="skeleton-detail">
				<div className="skeleton-detail-flag" />
				<div className="skeleton-detail-info">
					<div className="skeleton-detail-line" style={{ width: '60%' }} />
					<div className="skeleton-detail-line" style={{ width: '40%' }} />
					<div className="skeleton-detail-line" style={{ width: '80%' }} />
					<div className="skeleton-detail-line" style={{ width: '50%' }} />
					<div className="skeleton-detail-line" style={{ width: '70%' }} />
					<div className="skeleton-detail-line" style={{ width: '60%' }} />
				</div>
			</div>
		);
	}
	// Default: Show 8 skeleton cards
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