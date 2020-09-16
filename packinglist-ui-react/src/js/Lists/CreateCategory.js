import React, {useState} from 'react';
import {Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function CreateCategory(props) {
	const [myState, setMyState] = useState(props.state);

	const handleChange = (event) => {
		let list = {...props.state.list};
		list.categories[props.catIndex].name = event.target.value;
		setMyState({...props.state, list: list});
	};

	return (
		<Card>
			<Card.Header>
				<Form.Control required type="text" name={"list.categories[" + props.catIndex + "].name"}
								  placeholder="Category Name" autoFocus="autoFocus"
								  onChange={handleChange}
								  value={props.category.name} />
			</Card.Header>
			<Card.Body>
				<Card.Text>This will be where you add items.</Card.Text>
			</Card.Body>
		</Card>
	);
}
