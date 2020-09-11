import React from 'react';

export default function Loader() {
	return (
		<div className="row text-center py-3">
			<div className="spinner-border text-success mx-auto" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
