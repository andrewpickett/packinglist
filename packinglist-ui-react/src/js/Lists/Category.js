import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function Category(props) {
	return (
		<Card>
			<Card.Header>
				{props.editMode ?
					<Form.Control required type="text" name={"list.categories[" + props.index + "].name"}
									  placeholder="Category Name" onChange={(e) => props.onChange(e, props.index)}
									  value={props.name} />
					:
					<h5>{props.name}</h5>
				}
			</Card.Header>
			<Card.Body>
				{props.editMode ?
					<Row>
						<Col className="col-1 text-lg-center"> + </Col>
						<Col>
							<Form.Control type="text" onChange={(e) => props.onChange(e, props.index)}
											  placeholder="List Item" value={props.name}/>
						</Col>
					</Row>
					:
					<Card.Text>Let's display stuff here</Card.Text>
				}
			</Card.Body>
		</Card>
	);
}
