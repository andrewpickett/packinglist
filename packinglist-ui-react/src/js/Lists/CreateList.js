import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';

export default function CreateList() {
	const [list, setList] = useState({name: '', categories: []});

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('/api/lists', this.state)
			.then(() => {
				// TODO: Figure out the flow I want here.
				window.location = '/lists';
			});
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setList({...list, [name]: value});
	}

	return (
		<Container className="mx-auto col-7">
			{!auth.checkAuth() ? <Unauthorized /> : null}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>List Name</Form.Label>
					<Form.Control required type="text" name="name" placeholder="List Name" autoFocus="autoFocus" onChange={handleChange} value={list.name} />
				</Form.Group>
				<Button variant="primary" type="submit">Create</Button>
			</Form>
		</Container>
	);
}
