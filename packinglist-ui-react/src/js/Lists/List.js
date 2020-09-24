import React from 'react';
import axios from 'axios';
import {Button, Col, Container, Dropdown, DropdownButton, Row} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import auth from '../../auth';
import Unauthorized from '../Exception/Unauthorized';
import utils from '../../utils';
import Form from 'react-bootstrap/Form';
import Category from './Category';
import './List.css';
import {FaPlus, FaRegCopy, FaRegSave} from 'react-icons/fa';

export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			list: {name: '', categories: []},
			editMode: this.props.editMode,
			samples: [{id:1, name:'Baby'}, {id:2, name:'Toddler'}, {id:3, name:'Adult'}],
			mylists: [{id:4, name:'First List'}, {id:5, name:'Florida'}, {id:6, name:'Foobar'}]
		}

		this.baseUrl = '/api/lists' + (props.isSample ? '/samples' : '');

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleListChange = this.handleListChange.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleItemChange = this.handleItemChange.bind(this);
		this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.handleCopy = this.handleCopy.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		if (this.state.editMode) {
			axios.post(this.baseUrl, this.state.list)
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

	handleRemoveCategory(idx) {
		let list = this.state.list;
		list.categories.splice(idx, 1);
		this.setState({list: list})
	}

	handleAddItem(idx) {
		let list = this.state.list;
		list.categories[idx].items.push({name: ''});
		this.setState({list: list});
	};

	handleRemoveItem(catIdx, itemIdx) {
		let list = this.state.list;
		list.categories[catIdx].items.splice(itemIdx, 1);
		this.setState({list: list});
	}

	handleCategoryChange(event, idx) {
		let list = this.state.list;
		list.categories[idx].name = event.target.value;
		this.setState({list: list});
	};

	handleItemChange(event, catIdx, itemIdx) {
		let list = this.state.list;
		list.categories[catIdx].items[itemIdx].name = event.target.value;
		this.setState({list: list});
	};

	componentDidMount() {
		if (this.state.id) {
			axios.get(this.baseUrl + '/' + this.state.id, {})
				.then((response) => {
					this.setState({list: response.data});
				});
		}
	}

	handleCopy(isSample, id) {
		let baseUrl = '/api/lists' + (isSample ? '/samples' : '');
		axios.get(baseUrl + '/' + id, {})
			.then((response) => {
				let list = this.state.list;
				list.categories = response.data.categories;
				this.setState({list: list});
			});
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() ? <Unauthorized/> : null}
				<Form onSubmit={this.handleSubmit}>
					<Container className="mx-auto col-7 text-center">
						{this.state.editMode ?
							<Form.Group controlId="name">
								<Form.Control required type="text" placeholder="List Name" autoFocus className="borderless list-text"
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
											 onAddItem={this.handleAddItem} onItemChange={this.handleItemChange}
											 onRemove={this.handleRemoveCategory}
											 onRemoveItem={this.handleRemoveItem}
											 category={this.state.list.categories[((idx1 * 3) + idx2)]} />
							))}
						</CardDeck>
					))}
					{this.state.editMode ?
						<Row>
							<Col className="text-left">
								<Button variant="primary" onClick={this.handleAddCategory}>
									<FaPlus size={12} style={{marginTop:"-4px"}} /> Add Category
								</Button>
								&nbsp;
								<DropdownButton id="dropdown-basic-button" as={'span'} variant={"info"}
													 title={<span><FaRegCopy style={{marginTop:"-4px"}} onClick={this.handleAddCategory} /> Copy From... </span>}>
									<Dropdown.Header>Samples</Dropdown.Header>
									{this.state.samples.map((l, idx) => (
										<Dropdown.Item key={'sdd' + idx} onClick={() => this.handleCopy(true, l.id)}>{l.name}</Dropdown.Item>)
									)}
									<Dropdown.Divider />
									<Dropdown.Header>My Lists</Dropdown.Header>
									{this.state.mylists.map((l, idx) => (
										<Dropdown.Item key={'mdd' + idx} onClick={() => this.handleCopy(false, l.id)}>{l.name}</Dropdown.Item>)
									)}
								</DropdownButton>
							</Col>
							<Col className="text-right">
								<Button variant="success" type="submit">
									<FaRegSave style={{marginTop:"-4px"}} /> Save
								</Button>
							</Col>
						</Row> : null}
				</Form>
			</Container>
		);
	}
}
