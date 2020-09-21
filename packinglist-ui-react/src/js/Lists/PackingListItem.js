import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PackingListItem(props) {
	const packingList = props.list;

	return (
		<Row className="p-2 border-bottom border-left border-right">
			<Col className="text-left"><Link to={'/lists/' + packingList.id}>{packingList.name}</Link></Col>
			<Col className="text-right"><Link to={'/lists/' + packingList.id + '/edit'}>[EDIT]</Link></Col>
		</Row>
	);
}
