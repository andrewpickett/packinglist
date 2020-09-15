import React from 'react';
import {Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function CreateCategory(props) {

	return (
		<Card>
			<Card.Header>
				<Form.Control required type="text" name={"list.categories[" + props.catIndex + "].name"}
								  placeholder="Category Name" autoFocus="autoFocus"
								  onChange={(e) => props.changeCategoryName(e, props.catIndex)}
								  value={props.category.name} />
			</Card.Header>
			<Card.Body>
				<Card.Text>This will be where you add items.</Card.Text>
			</Card.Body>
		</Card>
	);
}
