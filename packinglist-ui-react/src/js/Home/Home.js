import React from 'react';
import {Container} from 'react-bootstrap';

import auth from '../../auth';

export default function Home(props) {
	if (props.logout) {
		auth.logout();
	}

	return (
		<Container>
			Home page here.
		</Container>
	);
}
