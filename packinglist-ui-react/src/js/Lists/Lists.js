import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';

import axios from 'axios';
import auth from '../../auth';

import Unauthorized from '../Exception/Unauthorized';
import Loader from '../Layout/Loader';

export default class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: <Loader />
		}
	}

	componentDidMount() {
		axios.get('/api/lists')
			.then(response => {
				this.setState({
					lists: <div>
						{response.data.map(list => (
							<Row key={list.id}>
								<Col>{list.name}</Col>
							</Row>
						))}
					</div>
				});
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized /> : null}
				{this.state.lists}
				<Row>
					<Col>
						<a href="/lists/create" role="button" className="btn btn-primary">+ New List</a>
					</Col>
				</Row>
			</Container>
		);
	}
}
