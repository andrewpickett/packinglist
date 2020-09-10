import React, {useState} from "react";
import auth from "../../auth";
import {Button, Fade} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function Login() {
	const [userInfo, setUserInfo] = useState({email: '', password: ''});
	const [loginError, setLoginError] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!auth.login(userInfo, setUserInfo, '/lists')) {
			setLoginError('There was a problem logging in. Please verify your credentials and try again.');
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserInfo({...userInfo, [name]: value})
	}

	return (
		<div className="mx-auto col-7">
			<Fade in={!!loginError}>
				<div className={loginError ? "alert alert-danger" : "alert"} role="alert">
					{ loginError ? loginError : "" }&nbsp;
				</div>
			</Fade>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control required type="email" name="email" placeholder="Email" autoComplete="off" autoFocus="autoFocus" onChange={handleChange} value={userInfo.name} />
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} value={userInfo.password} />
				</Form.Group>
				<Button variant="primary" type="submit">Login</Button>
			</Form>
		</div>
	);
}

export default Login;
