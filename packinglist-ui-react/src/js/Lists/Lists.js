import React from "react";
import axios from 'axios';
import auth from "../../auth";
import {Col, Container, Row} from "react-bootstrap";

class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: []
		}
	}

	componentDidMount() {
		axios.get('/api/lists', { headers: auth.getAuthHeader() })
			.then(response => {
				this.setState({
					lists: response.data
				});
			});
	}

	render() {
		return (
			<Container>
				{this.state.lists.map(list => (
					<Row>
						<Col key={list.id}>{list.name}</Col>
					</Row>
				))}
			</Container>
		);
	}
}

export default Lists;
