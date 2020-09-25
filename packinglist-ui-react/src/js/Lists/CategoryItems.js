import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './CategoryItems.css';
import {FaPlus, FaRegWindowClose} from 'react-icons/fa';

export default function CategoryItems(props) {

	return (
		<Container>
			{props.category.items.map((item, idx) => (
				<Row key={"cat" + props.catIndex + "item"+ idx}>
					<Col>
						{props.editMode ?
							<Row className="py-2">
								<Col className="col-1 text-right py-1">
									<Form.Check readOnly disabled={true} />
								</Col>
								<Col className="col text-left">
									<Form.Control type="text" required autoFocus placeholder="Item Name" className="borderless"
													  onChange={(e) => props.onChange(e, props.catIndex, idx)}
													  value={item.name} />
								</Col>
								<Col className="col-1 text-left p-0">
									<Button tabIndex={-1} onClick={() => props.onRemove(props.catIndex, idx)} variant="link" size="sm">
										<FaRegWindowClose size={16} color={"red"} />
									</Button>
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
						<Button variant="outline-primary" size="sm" onClick={() => props.onAdd(props.catIndex)}>
							<FaPlus size={8} style={{marginTop:"-2px"}} /> Add Item
						</Button>
					</Col>
				</Row>
				: null
			}
		</Container>
	);
}
