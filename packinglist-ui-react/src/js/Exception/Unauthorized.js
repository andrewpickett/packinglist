import {Redirect} from 'react-router';
import React from 'react';

export default function Unauthorized(props) {
	const defaultException = "You are not authorized to view this page. Please login and try again. If the problem continues, tough."

	let errorText = props.error ? props.error : defaultException;
	let redirect = props.redir ? props.redir : '/login';
	return (
		<Redirect to={{pathname: redirect, state: {error: errorText}}} />
	);
}
