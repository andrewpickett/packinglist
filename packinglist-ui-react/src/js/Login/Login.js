import React from "react";
import auth from "../../auth";
import {Fade} from "react-bootstrap";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {email: '', password: '', error: null};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		auth.login(this, '/lists');
	}

	render() {
		return (
			<div className="mx-auto col-7">
				<Fade in={this.state.error}>
					<div className={this.state.error ? "alert alert-danger" : "alert"} role="alert">
						{ this.state.error ? this.state.error : "" }&nbsp;
					</div>
				</Fade>
				<form method="POST" onSubmit={this.handleSubmit}>
					<div className="form-group row">
						<label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
						<div className="col-sm-10">
							<input type="email" className="form-control" id="email" name="email" placeholder="Email" autoFocus="autoFocus" autoComplete="off" required="required" onChange={this.handleChange} value={this.state.name} />
						</div>
					</div>
					<div className="form-group row">
						<label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
						<div className="col-sm-10">
							<input type="password" className="form-control" id="password" name="password" placeholder="Password" required="required" onChange={this.handleChange} value={this.state.password} />
						</div>
					</div>
					<button type="submit" className="btn btn-primary btn-block mx-auto col-4">Sign in</button>
				</form>
			</div>
		);
	}
}

export default Login;
