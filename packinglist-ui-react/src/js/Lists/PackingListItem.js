import React from 'react';
import {Col, Row} from 'react-bootstrap';

export default function PackingListItem(props) {
	const packingList = props.list;

	return (
		<Row className="p-2 border-bottom">
			<Col>{packingList.name}</Col>
		</Row>
	);
}
