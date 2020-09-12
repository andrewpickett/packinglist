import React from 'react';
import {Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import auth from '../../auth';
import logo from '../../images/logo.png';

export default function Header() {
	const isLoggedIn = auth.checkAuth();
	let loginLinkToShow = null;
	if (window.location.pathname !== '/login') {
		loginLinkToShow = isLoggedIn ? <a href="/logout" role="button">Logout</a> : <a href="/login" role="button">Login</a>;
	}

	return (
		<header>
			<Container>
				<Row>
					<Col>
						<a href="/" role="button"><img src={logo} alt="" /></a>
					</Col>
					<Col className="text-right my-auto">
						{loginLinkToShow}
					</Col>
				</Row>
			</Container>

			{isLoggedIn ?
				<Row>
					<Col>
						<Navbar bg="light" variant="light" className="shadow">
							<Container className="px-4">
								<Nav>
									<Nav.Link href="/lists" className="py-0 px-3">My Lists</Nav.Link>
									<Nav.Link href="/samples" className="py-0 px-3">Sample Lists</Nav.Link>
								</Nav>
							</Container>
						</Navbar>
					</Col>
				</Row>
				: null
			}
		</header>
	);
}
