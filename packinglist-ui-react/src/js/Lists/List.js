import React from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';
import utils from '../../utils';
import Category from './Category';

export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			list: {name: '', categories: []},
			categoryCards: []
		}
	}

	componentDidMount() {
		axios.get('/api/lists/' + this.state.id, {})
			.then((response) => {
				this.setState({list: response.data});
				this.setState({categoryCards: this.state.list.categories.map((cat, idx) => (
					<Category key={idx} category={cat} catIndex={idx} />
				))});
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized/> : null}
				<Container className="mx-auto col-7 text-center">
					<h1>{this.state.list.name}</h1>
				</Container>
				{utils.splitEvery(this.state.categoryCards, 3).map((row, idx1) => (
					<CardDeck key={idx1} className="py-3">
						{row.map(card => (card))}
					</CardDeck>
				))}
			</Container>
		);
	}
}
