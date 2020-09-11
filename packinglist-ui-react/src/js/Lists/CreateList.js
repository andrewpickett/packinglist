import React from 'react';
import axios from 'axios';
import auth from '../../auth';
import {Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import config from '../../config';

class CreateList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			categories: [],
			userId: auth.getUserInfoFromToken()['userId']
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post('/api/lists', this.state, config.AXIOS_CONFIG)
			.then(response => {
				console.log("SUCCESS");
			})
			.catch(() => { return false; });
	}

	handleChange(event) {
		const { name, value } = event.target;
		console.log("Updating " + name + " with " + value);
		this.setState({[name]: value});
	}

	componentDidMount() {
	}

	render() {
		return (
			<Container className="mx-auto col-7">
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="name">
						<Form.Label>List Name</Form.Label>
						<Form.Control required type="text" name="name" placeholder="List Name" autoFocus="autoFocus" onChange={this.handleChange} value={this.state.name} />
					</Form.Group>
				</Form>
			</Container>
		);
	}
}

export default CreateList;
