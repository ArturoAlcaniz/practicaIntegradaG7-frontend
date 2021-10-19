import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default class FormularioCentros extends Component {

	constructor(props) {
		super(props);
		this.state = {
			nombre: "",
			direccion: "",
			nvacunas: "",
			msgLoginResultOk: "",
			msgLoginResultFail: ""
		}
	}
	handleCrearCentro(event) {
		event.preventDefault()
		async function fetchCentros(thisComponent) {
			thisComponent.setState(
				{
					msgLoginResultOk: "Centro creado correctamente"
					, msgLoginResultFail: ""
				})

		}
		fetchCentros(this)
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

						<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
						<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
					<button type="submit" className="btn btn-primary btn-block">Crear centro</button>
				</form>
			</div>
		</div>
		);
	}

}