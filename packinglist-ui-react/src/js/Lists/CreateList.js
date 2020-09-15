import React from 'react';
import axios from 'axios';
import {Button, Container} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';
import CreateCategory from './CreateCategory';

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
		this.changeCategoryName = this.changeCategoryName.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		axios.post('/api/lists', this.state.list)
			.then((response) => {
				this.setState({list: response.data});
			});
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({list: {[name]: value}});
	}

	addCategory() {
		let newCategory = {name: 'Test', items: []};
		let l = this.state.list;
		l.categories.push(newCategory);
		this.setState({list: l});

		let newCard = <CreateCategory key={this.state.categoryCards.length}
												changeCategoryName={this.changeCategoryName}
												category={newCategory} catIndex={this.state.list.categories.length - 1}/>
		this.setState({categoryCards: this.state.categoryCards.concat([newCard])});
	}

	changeCategoryName(event, index) {
		const { name, value } = event.target;
		console.log("Updating category index " + index)
		let list = {...this.state.list};
		let categories = list.categories;
		categories[index].name = value;
		console.log(list);
		this.setState({list});
	}

	splitEvery(array, length) {
		let retVal = [];
		for (let i = 0; i < array.length; i += length) {
			retVal.push(i + length < array.length ? array.slice(i, i + length) : array.slice(i));
		}
		return retVal;
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
					{this.splitEvery(this.state.categoryCards, 3).map((row, idx1) => (
						<CardDeck key={idx1} className="py-3">
							{row.map(card => (card))}
						</CardDeck>
					))}
					<Button variant="primary" onClick={this.addCategory}>+ Add Category</Button>
				</Form>
			</Container>
		);
	}
}
