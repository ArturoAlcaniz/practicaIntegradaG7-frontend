import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from"react-dotenv";

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

	handleCrearLogin(event) {
		event.preventDefault()
		async function makeLogin(thisComponent) {
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/login', {
				method: "POST",
				body: JSON.stringify({email: thisComponent.state.email, password: thisComponent.state.password}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status == "200") {
				sessionStorage.setItem("email",response.email);
				sessionStorage.setItem("password",response.pwd);
				sessionStorage.setItem("centro",response.centro);
				thisComponent.setState(
						{ msgLoginResultOk: "Acceso permitido"
							, msgLoginResultFail: ""});
			}else{
				thisComponent.setState(
						{ msgLoginResultOk: ""
							, msgLoginResultFail: "Password o email erroneo"})
			}console.log(answer);
		}

		makeLogin(this)
	}
	

	render() {
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
					<form onSubmit={this.handleCrearLogin.bind(this)}>
					<h3>Acceder</h3>
					<div className="form-group">
							<label>E-mail</label>
							<input type="email" className="form-control" placeholder="Introduzca email"
								onChange={e => this.setState({ email: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Introduzca Password"
								onChange={e => this.setState({ password: e.target.value })} />
						</div>
					<div className="text-center">
						<button id="SubmitButton" type="submit" className="btn  btn-primary btnblock">Acceso</button>
					</div>
					<div><label></label></div>
					<div className="text-success d-block text-center">{this.state.msgLoginResultOk}</div>
					<div className="text-danger d-block text-center">{this.state.msgLoginResultFail}</div>
					</form>
				</div>
				</div>
		);
	}
}