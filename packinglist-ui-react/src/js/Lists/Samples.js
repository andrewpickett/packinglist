import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

import axios from 'axios';
import auth from '../../auth';

import Unauthorized from '../Exception/Unauthorized';
import Loader from '../Layout/Loader';
import PackingListItem from './PackingListItem';

export default class Samples extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: <Loader />
		}
	}

	componentDidMount() {
		axios.get('/api/lists/samples')
			.then(response => {
				const lists = response.data.map(list => <PackingListItem key={list.id} list={list}/>);
				if (lists && lists.length > 0) {
					this.setState({lists: lists});
				} else {
					this.setState({lists: <div>You have no packing lists yet.</div>});
				}
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized /> : null}
				<Row className="p-2 rounded-top bg-secondary">
					<Col className="text-right">
						&nbsp;
					</Col>
				</Row>
				{this.state.lists}
				<Row className="p-2 rounded-bottom bg-secondary">&nbsp;</Row>
			</Container>
		);
	}
}
