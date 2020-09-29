import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import {FaPlus} from 'react-icons/fa';
import autoBind from 'react-autobind/src/autoBind';

import axios from 'axios';
import auth from '../../auth';

import Unauthorized from '../Exception/Unauthorized';
import Loader from '../Layout/Loader';
import PackingListItem from './PackingListItem';
import EmptyDiv from '../Layout/EmptyDiv';

export default class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lists: <Loader />
		}

		autoBind(this);
	}

	handleDeleteList(event, id) {
		event.preventDefault();
		axios.delete("/api/lists/" + id)
			.then(() => {
				window.location.reload();
			});
	}

	componentDidMount() {
		let urlToCall = '/api/lists';
		if (this.props.isSample) {
			urlToCall += '/samples';
		}

		axios.get(urlToCall)
			.then(response => {
				const lists = response.data.map(list => (
					<PackingListItem key={list.id} list={list} isSample={this.props.isSample} onDelete={this.handleDeleteList}/>
				));
				if (lists && lists.length > 0) {
					this.setState({lists: lists});
				} else {
					this.setState({lists: <Row className="border-left border-right p-3">You have no packing lists yet.</Row>});
				}
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() && <Unauthorized />}
				<Row className="p-1 rounded-top bg-secondary">
					<Col className="text-right">
						{this.props.isSample ?
							<EmptyDiv />
							:
							<a href="/lists/create" role="button" className="btn btn-primary btn-sm">
								<FaPlus size={10} style={{marginTop:"-4px"}} /> New List
							</a>
						}
					</Col>
				</Row>
				{/* Each list in the state (PackingListItem) is actually a <Row> element, so just output the list. */}
				{this.state.lists}
				<Row className="p-2 rounded-bottom bg-secondary">
					<EmptyDiv />
				</Row>
			</Container>
		);
	}
}
