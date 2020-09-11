import React from 'react';
import auth from '../../auth';
import {Container} from 'react-bootstrap';

function Home(props) {
	if (props.logout) {
		auth.logout();
	}

	return (
		<Container>
			Home page here.
		</Container>
	);
}

export default Home;
