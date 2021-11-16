import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";

export default class ModificarCentro extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nombre: localStorage.getItem("nombreCentro"),
			direccion: localStorage.getItem("direccionCentro"),
			vacunas: localStorage.getItem("vacunasCentro"),
			msgModifyResultOk: "",
			msgModifyResultFail: ""
		}
	}
	
	handleModificarCentro(event) {
		event.preventDefault()
		async function modificarCentro(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centro/modify', {
				method: "POST",
				body: JSON.stringify({nombre: thisComponent.state.nombre, direccion: thisComponent.state.direccion, vacunas: thisComponent.state.vacunas}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			console.log(response);
			if (response.status === "200") {
				window.location = '/Centros';
			}else{
				thisComponent.setState(
						{ msgModifyResultOk: ""
							, msgModifyResultFail: "Error al modificar centro."})
			}
		}

		modificarCentro(this)
	}

	render() {
		
		
		return (
		
				<div className="auth-wrapper">
					<div className="auth-inner">
						<form onSubmit={this.handleModificarCentro.bind(this)}>
							<h3>Modificar centro</h3>
							<div className="form-group">
								<label>Nombre</label>
								<input type="name" className="form-control" defaultValue={this.state.nombre} disabled/>
								<label>Introduzca una nueva direccion</label>
								<input type="Address" className="form-control" defaultValue={this.state.direccion} placeholder="Introduzca direccion"
									onChange={e => this.setState({ direccion: e.target.value })} />
								<label>Introduzca el numero de vacunas</label>
								<input type="fecha" className="form-control" defaultValue={this.state.vacunas} placeholder="Introduzca el numero de vacunas"
									onChange={e => this.setState({ vacunas: e.target.value })} />
							</div>
							<div className="invalid-feedback d-block">{this.state.msgModifyResultFail}</div>
							<div className="valid-feedback d-block">{this.state.msgModifyResultOk}</div>
							<button type="submit" className="btn btn-primary btn-block">Modificar centro</button>
						</form>
					</div>
				</div>
			
		);
	}

}