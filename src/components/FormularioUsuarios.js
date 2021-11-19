import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import env from"react-dotenv";
import { Redirect } from 'react-router-dom';


export default class FormularioUsuarios extends Component {

	constructor(props) {
		super(props);
		this.state = {
				centros: [],
				dni:"",
				rol:"",
				nombre:"",
				apellidos:"",
				email: "",
				centro:"",
				password: "",
				msgLoginResultOk: "",
				msgLoginResultFail: "",
				perm: ""
		}
	}
	
	manageNavBar() {
		document.getElementById("navConf").hidden = false;
		document.getElementById("navCentros").hidden = false;
		document.getElementById("navUsers").hidden = false;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = false;
		document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
		document.getElementById("navNombre").innerHTML = sessionStorage.getItem("nombre");
		document.getElementById("navLogin").hidden = true;
		document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
		document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();
		
		var ul = document.getElementById("navLogOut");
		var li = document.createElement("li");
		li.className = "nav-link";
		var button = document.createElement("Button");
		button.innerHTML = "LogOut";
		button.className = "btn btn-secondary";
		button.onclick = function() {window.location = "/Login";};
		li.appendChild(button);
		li.setAttribute("id","buttonLogOut");
		ul.appendChild(li);

	}
	
	checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "formulario", 
					email: sessionStorage.getItem("email"),
					password: sessionStorage.getItem("password")}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}

			});
			let allowed = (await answer.json());
			thisComponent.state.perm = allowed.message;
			}
		chek();
	}
	
	handleCancelar(){
		window.location = '/Usuarios'
	}
	
	handleCrearUsuario(event) {
		event.preventDefault()
		async function makeUsuarios(thisComponent) {
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/create', {
				method: "POST",
				body: JSON.stringify({dni: thisComponent.state.dni, nombre: thisComponent.state.nombre, apellidos: thisComponent.state.apellidos, email: thisComponent.state.email, password: thisComponent.state.password, centro: thisComponent.state.centro, rol: thisComponent.state.rol}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				thisComponent.setState(
						{ msgLoginResultOk: "Usuario creado correctamente"
							, msgLoginResultFail: ""})
			}else{
				thisComponent.setState(
						{ msgLoginResultOk: ""
							, msgLoginResultFail: "Error al crear usuario"})
			}console.log(answer);
		}

		makeUsuarios(this)
	}
	
	obtenerDatos(thisComponent){
		async function getCentros(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({centros: JSON.parse(json)})}
		getCentros();
	}
	
	render() {
		if (this.state.perm && this.state.perm !== "OK") {
			return <Redirect to={{
				pathname: '/notAllowed',
				state: { prevMssg: this.state.perm }
			}}
			/>
		}
		
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
				<form onSubmit={this.handleCrearUsuario.bind(this)}>
				<h3>Nuevo Usuario</h3>
				<div className="form-group">
				<label>DNI</label>
				<input type="dni" className="form-control" placeholder="Introduzca DNI"
					onChange={e => this.setState({ dni: e.target.value })} />
				</div>
				<div className="form-group">
				<label htmlFor="exampleFormControlSelect1">Rol</label>
				<select className="form-control" id="exampleFormControlSelect1"
					onChange={e => this.setState({ rol: e.target.value })}>
				<option>Selecciona un rol</option>
				<option>Paciente</option>
				<option>Sanitario</option>
				<option>Administrador</option>
				</select >
				</div>
				<div className="form-group">
				<label>Nombre</label>
				<input type="nombre" className="form-control" placeholder="Introduzca Nombre"
					onChange={e => this.setState({ nombre: e.target.value })} />
				</div>
				<div className="form-group">
				<label>Apellidos</label>
				<input type="apellidos" className="form-control" placeholder="Introduzca Apellidos"
					onChange={e => this.setState({ apellidos: e.target.value })} />
				</div>
				<div className="form-group">
				<label>Email</label>
				<input type="email" className="form-control" placeholder="Introduzca Email"
					onChange={e => this.setState({ email: e.target.value })} />
				</div>
				<div className="form-group">
				<label htmlFor="exampleFormControlSelect1">Centro</label>
				<select className="form-control" id="exampleFormControlSelect1" 
					onChange={e => this.setState({ centro: e.target.value })}>
				<option value="" selected disabled hidden>Selecciona un centro</option>
				{this.state.centros.map((listValue, index) => {
					return (
							<option key={index}>{listValue.nombre}</option>
					);
				})}
				</select >
				</div>
				<div className="form-group">
				<label>Password</label>
				<input type="password" className="form-control" placeholder="Introduzca Password"
					onChange={e => this.setState({ password: e.target.value })} />
				</div>
				<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
				<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
				<button type="submit" className="btn btn-primary btn-block">Crear usuario</button>
				<Button variant="secondary" onClick={this.handleCancelar} className="btn btn-primary btn-block">Cancelar</Button>
				</form>
				</div>
				</div>
		);
	}
	componentDidMount(){
		this.checkPermission(this);
		this.manageNavBar();
		this.obtenerDatos(this);
	}

}