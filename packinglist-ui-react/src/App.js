import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';

import auth from './auth';

import Login from './js/Login/Login';
import Home from './js/Home/Home';
import Lists from './js/Lists/Lists';
import CreateList from './js/Lists/CreateList';

export default function App() {
	let loginLinkToShow = null;
	if (window.location.pathname !== '/login') {
		loginLinkToShow = auth.checkAuth() ? <a href="/logout" role="button">Logout</a> : <a href="/login" role="button">Login</a>;
	}

	return (
		<Container>
			<Row>
				<Col>
					<a href="/" role="button">LOGO HERE</a>
				</Col>
				<Col className="text-right">
					{loginLinkToShow}
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col>
					<Router>
						<Switch>
							<Route path="/lists/create" exact={true} component={CreateList} />
							<Route path="/lists" exact={true} component={Lists} />

							<Route path="/login" exact={true} component={Login} />
							<Route path="/logout" exact={true}><Home logout={true} /></Route>

							<Route path="/" component={Home} />
						</Switch>
					</Router>
				</Col>
			</Row>
		</Container>
	);
}
