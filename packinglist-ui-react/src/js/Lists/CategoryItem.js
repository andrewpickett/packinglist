import {Button, Col, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {FaRegWindowClose} from 'react-icons/fa';
import React from 'react';

export default function CategoryItem(props) {
	return (
		<Row className="py-1">
			<Col className="col-1 text-right py-1">
				<Form.Check readOnly disabled={true} />
			</Col>
			<Col className="col text-left">
				<Form.Control type="text" required autoFocus placeholder="Item Name" className="borderless"
								  onChange={(e) => props.onChange(e, props.catIndex, props.index)}
								  value={props.item.name} />
			</Col>
			<Col className="col-1 text-left p-0">
				<Button tabIndex={-1} onClick={() => props.onRemove(props.catIndex, props.index)} variant="link" size="sm">
					<FaRegWindowClose size={16} color={"red"} />
				</Button>
			</Col>
		</Row>
	);
}
