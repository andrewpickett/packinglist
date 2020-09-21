import React from 'react';
import axios from 'axios';
import {Button, Col, Container, Row} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';
import utils from '../../utils';
import Form from 'react-bootstrap/Form';
import Category from './Category';

export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			list: {name: '', categories: []},
			editMode: this.props.editMode
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleListChange = this.handleListChange.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.editMode) {
			axios.post('/api/lists', this.state.list)
				.then(() => {
					window.location = '/lists'
				});
		}
	}

	handleListChange(event) {
		let list = this.state.list;
		list.name = event.target.value;
		this.setState({list: list});
	}

	handleAddCategory() {
		let list = this.state.list;
		list.categories.push({name: '', items: []});
		this.setState({list: list});
	}

	handleCategoryChange(event, idx) {
		let list = this.state.list;
		list.categories[idx].name = event.target.value;
		this.setState({list: list});
	};

	componentDidMount() {
		if (this.state.id) {
			axios.get('/api/lists/' + this.state.id, {})
				.then((response) => {
					this.setState({list: response.data});
				});
		}
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized/> : null}
				<Form onSubmit={this.handleSubmit}>
					<Container className="mx-auto col-7 text-center">
						{this.state.editMode ?
							<Form.Group controlId="name">
								{/*<Form.Label>List Name</Form.Label>*/}
								<Form.Control required type="text" name="name" placeholder="List Name" autoFocus="autoFocus"
												  onChange={this.handleListChange} value={this.state.list.name}/>
							</Form.Group>
							:
							<h1>{this.state.list.name}</h1>
						}
					</Container>
					{utils.splitEvery(this.state.list.categories, 3).map((row, idx1) => (
						<CardDeck key={idx1} className="py-3">
							{row.map((card, idx2) => (
								<Category key={"category" + ((idx1 * 3) + idx2)} index={(idx1 * 3) + idx2}
													 onChange={this.handleCategoryChange} editMode={this.state.editMode}
													 name={this.state.list.categories[((idx1 * 3) + idx2)].name} />
							))}
						</CardDeck>
					))}
					{this.state.editMode ?
						<Row>
							<Col className="text-left">
								<Button variant="primary" onClick={this.handleAddCategory}>+ Add Category</Button>
							</Col>
							<Col className="text-right">
								<Button variant="primary" type="submit">Save List</Button>
							</Col>
						</Row> : null}
				</Form>
			</Container>
		);
	}
}
