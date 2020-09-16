import React from 'react';
import {Card} from 'react-bootstrap';

export default function Category(props) {

	return (
		<Card>
			<Card.Header>
				<h5>{props.category.name}</h5>
			</Card.Header>
			<Card.Body>
				<Card.Text>This will be where your individual items are shown.</Card.Text>
			</Card.Body>
		</Card>
	);
}
