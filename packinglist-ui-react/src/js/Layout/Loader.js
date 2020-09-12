import React from 'react';
import {Row} from 'react-bootstrap';

export default function Loader() {
	return (
		<Row className="text-center py-3 border-left border-right">
			<div className="spinner-border text-success mx-auto" role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</Row>
	);
}
