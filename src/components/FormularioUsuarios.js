import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default class FormularioUsuarios extends Component {

	constructor(props) {
		super(props);
		this.state = {
				dni:"",
				rol:"",
				nombre:"",
				apellidos:"",
				email: "",
				centro:"",
				password: "",
				msgLoginResultOk: "",
				msgLoginResultFail: ""
		}
	}
	handleCrearUsuario(event) {
		event.preventDefault()
		async function fetchUsuarios(thisComponent) {
			thisComponent.setState(
					{ msgLoginResultOk: "Usuario creado correctamente"
						, msgLoginResultFail: ""})

		}
		fetchUsuarios(this)
	}

	 
	render() {
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
				<form onSubmit={this.handleCrearUsuario.bind(this)}>
				<h3>Nuevo Usuario</h3>
				<div className="form-group">
				<label>DNI</label>
				<input type="dni" className="form-control" placeholder="Introduzca DNI" 
					onChange={e => this.setState({ dni: e.target.value })}/>
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
				<label>Centro</label>
				<input type="centro" className="form-control" placeholder="Introduzca Centro"
					onChange={e => this.setState({ centro: e.target.value })} />
				</div>
				<div className="form-group">
				<label>Password</label>
				<input type="password" className="form-control" placeholder="Introduzca Password"
					onChange={e => this.setState({ password: e.target.value })} />
				</div>
				<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
				<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
				<button type="submit" className="btn btn-primary btn-block">Crear usuario</button>
				</form>
				</div>
				</div>
		);
	}

}