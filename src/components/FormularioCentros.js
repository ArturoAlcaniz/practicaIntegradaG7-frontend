import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from "react-dotenv";
import { Redirect } from 'react-router-dom';

export default class FormularioCentros extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nombre: "",
			direccion: "",
			vacunas: "",
			msgCreationResultOk: "",
			msgCreationResultFail: "",
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
	
	handleCrearCentro(event) {
		event.preventDefault()
		async function makeCentros(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/create', {
				method: "POST",
				body: JSON.stringify({nombre: thisComponent.state.nombre, direccion: thisComponent.state.direccion, vacunas: thisComponent.state.vacunas}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				thisComponent.setState(
						{ msgCreationResultOk: response.message
							, msgCreationResultFail: ""})
			}else{
				thisComponent.setState(
						{ msgCreationResultOk: ""
							, msgCreationResultFail: response.message})
			}console.log(answer);
		}

		makeCentros(this)
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
				<form onSubmit={this.handleCrearCentro.bind(this)}>
				<h3>Nuevo Centro</h3>

				<div className="form-group">
				<label>Nombre</label>
				<input type="nombre" className="form-control" placeholder="Introduzca Nombre"
					onChange={e => this.setState({ nombre: e.target.value })} />
				</div>
				<div className="form-group">
				<label>Direccion</label>
				<input type="Direccion" className="form-control" placeholder="Introduzca Direccion"
					onChange={e => this.setState({ direccion: e.target.value })} />
				</div>
				<div className="form-group">
				<label>Vacunas disponibles</label>
				<input type="vacunas" className="form-control" placeholder="Introduzca el numero de vacunas"
					onChange={e => this.setState({ vacunas: e.target.value })} />
				</div>

				<button type="submit" className="btn btn-primary btn-block">Crear centro</button>
				<div className="invalid-feedback d-block">{this.state.msgCreationResultFail}</div>
				<div className="valid-feedback d-block">{this.state.msgCreationResultOk}</div>
				</form>
				</div>
				</div>
		);
	}
	
	componentDidMount(){
		this.checkPermission(this);
		this.manageNavBar();
	}

}