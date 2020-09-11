import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';

import Login from './js/Login/Login';
import Home from './js/Home/Home';
import Lists from './js/Lists/Lists';
import CreateList from './js/Lists/CreateList';
import Header from './js/Layout/Header';

export default function App() {
	return (
		<div>
			<Header />
			<main>
				<Container>
					<Row className="justify-content-md-center py-4">
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
			</main>
		</div>
	);
}
