import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {FaPlus} from 'react-icons/fa';

import CategoryItem from './CategoryItem';

export default function CategoryItems(props) {

	return (
		<Container>
			{props.category.items.map((item, idx) => (
				<Row key={"cat" + props.catIndex + "item"+ idx}>
					<Col>
						{props.editMode ?
							<CategoryItem item={item} catIndex={props.catIndex} index={idx}
											  onChange={props.onChange} onRemove={props.onRemove} />
							:
							<Form.Check label={item.name} />
						}
					</Col>
				</Row>
			))}
			{props.editMode &&
				<Row>
					<Col>
						<Button variant="outline-primary" size="sm" onClick={() => props.onAdd(props.catIndex)}>
							<FaPlus size={8} style={{marginTop:"-2px"}} /> Add Item
						</Button>
					</Col>
				</Row>
			}
		</Container>
	);
}
