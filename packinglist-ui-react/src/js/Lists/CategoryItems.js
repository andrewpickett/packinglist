import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './CategoryItems.css';

export default function CategoryItems(props) {

	return (
		<Container>
			{props.category.items.map((item, idx) => (
				<Row key={"cat" + props.index + "item"+ idx}>
					<Col>
						{props.editMode ?
							<Row className="py-2">
								<Col className="col-1 text-right py-1">
									<Form.Check readOnly disabled={true} />
								</Col>
								<Col className="col text-left">
									<Form.Control required type="text" autoFocus
													placeholder="Item Name" onChange={(e) => props.onChange(e, props.index, idx)}
													value={item.name} className="borderless" />
								</Col>
								<Col className="col-1 text-left p-0">
									<Button tabIndex={-1} onClick={() => props.onRemove(props.index, idx)} variant="outline-danger" size="sm">X</Button>
								</Col>
							</Row>
							:
							<Form.Check label={item.name} />
						}
					</Col>
				</Row>
			))}
			{props.editMode ?
				<Row>
					<Col>
						<Button variant="outline-primary" size="sm" onClick={() => props.onAddItem(props.index)}>+ Add Item</Button>
					</Col>
				</Row>
				: null
			}
		</Container>
	);
}
