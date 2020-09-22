import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CategoryItems from './CategoryItems';

export default function Category(props) {
	return (
		<Card>
			<Card.Header>
				{props.editMode ?
					<Form.Control required type="text" name={"list.categories[" + props.index + "].name"}
									  placeholder="Category Name" onChange={(e) => props.onChange(e, props.index)}
									  value={props.category.name} />
					:
					<h5>{props.category.name}</h5>
				}
			</Card.Header>
			<Card.Body>
				<CategoryItems onAddItem={props.onAddItem} onChange={props.onItemChange} index={props.index} category={props.category} editMode={props.editMode} />
			</Card.Body>
		</Card>
	);
}
