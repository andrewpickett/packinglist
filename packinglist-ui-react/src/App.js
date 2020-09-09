import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './js/Login/Login';
import Home from './js/Home/Home';
import Lists from './js/Lists/Lists';

import './App.css';

import auth from './auth';
import {Col, Container, Row} from "react-bootstrap";

function App() {
	auth.checkAuth();
	const isAuthenticated = auth.user.authenticated;
	console.log(window.location.pathname);
	let loginLinkToShow = null;
	if (window.location.pathname !== '/login') {
		loginLinkToShow = isAuthenticated ? <a href="/logout" role="button">Logout</a> : <a href="/login" role="button">Login</a>;
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

export default App;
