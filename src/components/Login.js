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
			if (response.status === "200") {
				let rol = response.rol;
				sessionStorage.setItem("email",response.email);
				sessionStorage.setItem("password",response.password);
				sessionStorage.setItem("centro",response.centro);
				sessionStorage.setItem("nombre",response.nombre);
				sessionStorage.setItem("rol",response.rol);
				thisComponent.setState(
						{ msgLoginResultOk: ""
							, msgLoginResultFail: ""});
				
				alert("Acceso permitido");

				document.getElementById("navCentro").value = "Centro: " + sessionStorage.getItem("centro");
				document.getElementById("navNombre").value = (sessionStorage.getItem("nombre")).toUpperCase();
				document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
				document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();
				document.getElementById("navLogin").value = "LogOut";
				document.getElementById("btnLO").hidden = false;
				
				if(rol === "paciente" || rol === "Paciente") {
					thisComponent.loadPacienteLinks();
					window.location = '/Appointment';
				}
				if(rol === "sanitario" || rol === "Sanitario") {
					thisComponent.loadSanitarioLinks();
					window.location = '/ListaVacunacion';

				}
				if(rol === "administrador" || rol === "Administrador") {
					thisComponent.loadAdminLinks();
					window.location = '/Configuracion';
				}
			}else{
				thisComponent.setState(
						{ msgLoginResultOk: ""
							, msgLoginResultFail: "Password o email erroneo"})
			}
		}

		makeLogin(this)
	}
	
	loadPacienteLinks() {
		document.getElementById("navConf").hidden = true;
		document.getElementById("navCentros").hidden = true;
		document.getElementById("navUsers").hidden = true;
		document.getElementById("navCita").hidden = false;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = true;
	}
	
	loadSanitarioLinks() {
		document.getElementById("navConf").hidden = true;
		document.getElementById("navCentros").hidden = true;
		document.getElementById("navUsers").hidden = true;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = false;
		document.getElementById("navLogin").hidden = true;
	}
	
	loadAdminLinks() {
		document.getElementById("navConf").hidden = false;
		document.getElementById("navCentros").hidden = false;
		document.getElementById("navUsers").hidden = false;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = true;
	}
	
	loadDefLinks() {
		document.getElementById("navConf").hidden = true;
		document.getElementById("navCentros").hidden = true;
		document.getElementById("navUsers").hidden = true;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = true;
	}
	
	showPwd() {
		var x = document.getElementById("pwdInput");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
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
							<input id="pwdInput" type="password" className="form-control" placeholder="Introduzca Password"
								onChange={e => this.setState({ password: e.target.value })} />
						</div>
					<div> <input type="checkbox" onClick={this.showPwd} />Mostrar contrasena</div>
					<label> </label>
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
	
	componentDidMount(){
		this.loadDefLinks();
		sessionStorage.clear();
	}
}