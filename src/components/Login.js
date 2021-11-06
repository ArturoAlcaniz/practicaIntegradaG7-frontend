import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Login extends Component{

	constructor(props) {
		super(props);
		this.state = {
			email:"",
			password:"",
			msgLoginResultOk:"",
			msgLoginResultFail:""
		}
	}
	render() {
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
					<h3>Acceder</h3>
					<div className="form-group">
							<label>E-mail</label>
							<input type="id" className="form-control" placeholder="Introduzca email"
								onChange={e => this.setState({ email: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Introduzca Password"
								onChange={e => this.setState({ password: e.target.value })} />
						</div>
					<div className="text-center">
						<button id="SubmitButton" type="submit" className="btn  btn-primary btnblock">Acceder</button>
					</div>
					<div><label></label></div>
					<div className="text-success d-block text-center">{this.state.msgLoginResultOk}</div>
					<div className="text-danger d-block text-center">{this.state.msgLoginResultFail}</div>
				</div>
				</div>
		);
	}
}