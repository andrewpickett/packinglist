import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {FaRegWindowClose} from 'react-icons/fa';

import CategoryItems from './CategoryItems';

export default function Category(props) {
	return (
		<Card>
			<Card.Header>
				{props.editMode ?
					<Row>
						<Col>
							<Form.Control required type="text" autoFocus className="borderless"
											  placeholder="Category Name" onChange={(e) => props.onChange(e, props.index)}
											  value={props.category.name} />
						</Col>
						<Col className="col-2 text-right p-0">
					  		<Button variant="link" tabIndex={-1} size="sm" onClick={() => props.onRemove(props.index)}>
								<FaRegWindowClose size={24} color={"red"} />
							</Button>
						</Col>
					</Row>
					:
					<h5>{props.category.name}</h5>
				}
			</Card.Header>
			<Card.Body>
				<CategoryItems catIndex={props.index} category={props.category} editMode={props.editMode}
									onAdd={props.onAddItem} onChange={props.onChangeItem} onRemove={props.onRemoveItem} />
			</Card.Body>
		</Card>
	);
}
