import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function CategoryItems(props) {

	return (
		<Container>
			{props.category.items.map((item, idx) => (
				<Row key={"cat" + props.index + "item"+ idx}>
					<Col>
						{props.editMode ?
							<Form.Control required type="text" name={"list.categories[" + props.index + "].items[" + idx + "].name"}
												placeholder="Item Name" onChange={(e) => props.onChange(e, props.index, idx)}
											   value={item.name} />
											   :
							<Form.Check label={item.name} />
						}
					</Col>
				</Row>
			))}
			{props.editMode ?
				<Row>
					<Col><Button onClick={() => props.onAddItem(props.index)}>+ Add Item</Button></Col>
				</Row>
				: null
			}
		</Container>
	);
}
