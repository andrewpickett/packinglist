import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PackingListItem(props) {
	const urlBase = props.isSample ? '/samples/' : '/lists/';
	return (
		<Row className="p-2 border-bottom border-left border-right">
			<Col className="text-left">
				<Link to={urlBase + props.list.id}>{props.list.name}</Link>
			</Col>
			<Col className="text-right">
				{props.isSample ? <div>&nbsp;</div> : <Link to={urlBase + props.list.id + '/edit'}>[EDIT]</Link>}
			</Col>
		</Row>
	);
}
