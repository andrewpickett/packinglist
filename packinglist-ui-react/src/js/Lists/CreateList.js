import React from 'react';
import axios from 'axios';
import {Button, Col, Container, Row} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';
import CreateCategory from './CreateCategory';
import utils from '../../utils';

export default class CreateList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			list: {name: '', categories: []},
			categoryCards: []
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addCategory = this.addCategory.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post('/api/lists', this.state.list)
			.then((response) => {
				window.location = '/lists';
				// this.setState({list: response.data});
			});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({...this.state, list: {...this.state.list, [name]: value}});
	}

	addCategory() {
		let l = this.state.list;
		l.categories.push({name: '', items: []});
		this.setState({...this.state, list: l});

		let newCard = <CreateCategory key={this.state.categoryCards.length}
												state={this.state} setState={(s) => this.setState(s)}
												category={this.state.list.categories[this.state.list.categories.length - 1]}
												catIndex={this.state.list.categories.length - 1}/>
		this.setState({categoryCards: this.state.categoryCards.concat([newCard])});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized/> : null}
				<Form onSubmit={this.handleSubmit}>
					<Container className="mx-auto col-7">
						<Form.Group controlId="name">
							<Form.Label>List Name</Form.Label>
							<Form.Control required type="text" name="name" placeholder="List Name" autoFocus="autoFocus"
											  onChange={this.handleChange} value={this.state.list.name}/>
						</Form.Group>
					</Container>
					{utils.splitEvery(this.state.categoryCards, 3).map((row, idx1) => (
						<CardDeck key={idx1} className="py-3">
							{row.map(card => (card))}
						</CardDeck>
					))}
					<Row>
						<Col className="text-left">
							<Button variant="primary" onClick={this.addCategory}>+ Add Category</Button>
						</Col>
						<Col className="text-right">
							<Button variant="primary" type="submit">Save List</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		);
	}
}
