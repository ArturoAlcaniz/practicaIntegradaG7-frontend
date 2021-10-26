import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";

export default class FormularioCentros extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nombre: "",
			direccion: "",
			nvacunas: "",
			msgCreationResultOk: "",
			msgCreationResultFail: ""
		}
	}
	handleCrearCentro(event) {
		event.preventDefault()
		async function makeCentros(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/create', {
				method: "POST",
				//body: JSON.stringify({user: thisComponent.state.user}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let nombre = await answer.text()
			if (nombre === undefined) {
				thisComponent.setState(
						{ msgCreationResultOk: ""
							, msgCreationResultFail: "Error al crear centro, se necesita un id"})
			}else{
				thisComponent.setState(
						{ msgCreationResultOk: "Centro creado correctamente"
							, msgCreationResultFail: ""})
			}console.log(answer);
		}

		makeCentros(this)
	}

	render() {
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
							<input type="nvacunas" className="form-control" placeholder="Introduzca el numero de vacunas"
								onChange={e => this.setState({ nvacunas: e.target.value })} />
						</div>

						<div className="invalid-feedback d-block">{this.state.msgCreationResultFail}</div>
						<div className="valid-feedback d-block">{this.state.msgCreationResultOk}</div>
					<button type="submit" className="btn btn-primary btn-block">Crear centro</button>
				</form>
			</div>
		</div>
		);
	}

}