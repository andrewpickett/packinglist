import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function Item(props) {
	return (
		<Row>
			<Col>
				+
			</Col>
			<Col>
				<Form.Control type="text" onChange={(e) => props.onChange(e, props.index)}
								  placeholder="List Item" value={props.name} />
			</Col>
		</Row>
	);
}
