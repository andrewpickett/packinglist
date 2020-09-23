import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

import axios from 'axios';
import auth from '../../auth';

import Unauthorized from '../Exception/Unauthorized';
import Loader from '../Layout/Loader';
import PackingListItem from './PackingListItem';

export default class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: <Loader />
		}
	}

	componentDidMount() {
		let urlToCall = '/api/lists';
		if (this.props.isSample) {
			urlToCall += '/samples';
		}

		axios.get(urlToCall)
			.then(response => {
				const lists = response.data.map(list => <PackingListItem key={list.id} list={list} isSample={this.props.isSample} />);
				if (lists && lists.length > 0) {
					this.setState({lists: lists});
				} else {
					this.setState({lists: <div className="p-3">You have no packing lists yet.</div>});
				}
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized /> : null}
				<Row className="p-1 rounded-top bg-secondary">
					<Col className="text-right">
						{this.props.isSample ?
							<div>&nbsp;</div>
							:
							<a href="/lists/create" role="button" className="btn btn-primary btn-sm">+ New List</a>
						}
					</Col>
				</Row>
				{this.state.lists}
				<Row className="p-2 rounded-bottom bg-secondary">&nbsp;</Row>
			</Container>
		);
	}
}
