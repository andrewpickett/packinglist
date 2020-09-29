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
import {ImCancelCircle} from 'react-icons/im';
import autoBind from 'react-autobind/src/autoBind';

export default class List extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			list: {name: '', categories: []},
			editMode: this.props.editMode,
			samples: [],
			mylists: []
		}
		this.baseUrl = '/api/lists' + (props.isSample ? '/samples' : '');
		this.categoryColumns = 3;
		autoBind(this);
	}

	/**
	 * Cancelling the edit just means leaving the page...
	 */
	handleCancel() {
		window.location = "/lists";
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

	handleChangeList(event) {
		let list = this.state.list;
		list.name = event.target.value;
		this.setState({list: list});
	}

	handleAddCategory() {
		let list = this.state.list;
		list.categories.push({name: '', items: []});
		this.setState({list: list});
	}

	handleChangeCategory(event, idx) {
		let list = this.state.list;
		list.categories[idx].name = event.target.value;
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
	}

	handleChangeItem(event, catIdx, itemIdx) {
		let list = this.state.list;
		list.categories[catIdx].items[itemIdx].name = event.target.value;
		this.setState({list: list});
	}

	handleRemoveItem(catIdx, itemIdx) {
		let list = this.state.list;
		list.categories[catIdx].items.splice(itemIdx, 1);
		this.setState({list: list});
	}

	handleCopyFrom(isSample, id) {
		let baseUrl = '/api/lists' + (isSample ? '/samples' : '');
		axios.get(baseUrl + '/' + id)
			.then((response) => {
				let list = this.state.list;
				list.categories = response.data.categories;
				list.categories.forEach(this.cleanCategory);
				this.setState({list: list});
			});
	}

	/**
	 * Need to remove the ids from the copied categories to ensure these get saved as new entries. While this cleaning
	 * can (and maybe should) be done on the server side before sending it back, this method will ensure that no matter
	 * what the server does, the items are cleaned.
	 * @param cat the cateogry to clean
	 */
	cleanCategory(cat) {
		delete cat["id"];
		delete cat["listId"];
		if (cat.items) {
			cat.items.forEach((item) => {
				delete item["id"];
				delete item["categoryId"];
			});
		}
	}

	componentDidMount() {
		if (this.state.id) {
			axios.get(this.baseUrl + '/' + this.state.id, {})
				.then((response) => {
					this.setState({list: response.data});
				});
		}
		if (this.state.editMode) {
			axios.get(this.baseUrl + "?summary=true", {})
				.then((response) => this.setState({mylists: response.data}));
			axios.get(this.baseUrl + "/samples?summary=true", {})
				.then((response) => this.setState({samples: response.data}));
		}
	}

	render() {
		return (
			<Container>
				{!auth.checkAuth() && <Unauthorized/>}
				<Form onSubmit={this.handleSubmit}>
					<Container className="mx-auto col-7 text-center">
						{this.state.editMode ?
							<Form.Group controlId="name">
								<Form.Control required type="text" placeholder="List Name" autoFocus className="borderless list-text"
												  onChange={this.handleChangeList} value={this.state.list.name}/>
							</Form.Group>
							:
							<h1>{this.state.list.name}</h1>
						}
					</Container>
					{utils.splitEvery(this.state.list.categories, this.categoryColumns).map((row, idx1) => (
						<CardDeck key={idx1} className="py-3">
							{row.map((card, idx2) => {
								let i = ((idx1 * this.categoryColumns) + idx2);
								return <Category key={"category" + i} index={i} editMode={this.state.editMode}
													  onChange={this.handleChangeCategory} onRemove={this.handleRemoveCategory}
													  onAddItem={this.handleAddItem} onChangeItem={this.handleChangeItem}
													  onRemoveItem={this.handleRemoveItem}
													  category={this.state.list.categories[i]} />
							})}
						</CardDeck>
					))}
					{this.state.editMode &&
						<Row>
							<Col className="text-left">
								<Button variant="primary" onClick={this.handleAddCategory}>
									<FaPlus size={12} style={{marginTop:"-4px"}} /> Category
								</Button>
								&nbsp;
								<DropdownButton id="dropdown-basic-button" as={'span'} variant={"info"}
													 title={<span><FaRegCopy style={{marginTop:"-4px"}} onClick={this.handleAddCategory} /> Import... </span>}>
									<Dropdown.Header>Samples</Dropdown.Header>
									{this.state.samples.map((l, idx) => (
										<Dropdown.Item key={'sdd' + idx} onClick={() => this.handleCopyFrom(true, l.id)}>{l.name}</Dropdown.Item>)
									)}
									<Dropdown.Divider />
									<Dropdown.Header>My Lists</Dropdown.Header>
									{this.state.mylists.map((l, idx) => (
										<Dropdown.Item key={'mdd' + idx} onClick={() => this.handleCopyFrom(false, l.id)}>{l.name}</Dropdown.Item>)
									)}
								</DropdownButton>
							</Col>
							<Col className="text-right">
								<Button variant="danger" onClick={this.handleCancel}>
									<ImCancelCircle style={{marginTop:"-2px"}} /> Cancel
								</Button>
								&nbsp;
								<Button variant="success" type="submit">
									<FaRegSave style={{marginTop:"-4px"}} /> Save
								</Button>
							</Col>
						</Row>
					}
				</Form>
			</Container>
		);
	}
}
