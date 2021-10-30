import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default class FormularioCentros extends Component {

	constructor(props) {
		super(props);
		this.state = {
			franjahoraria: "",
			ncitas: "",
			msgLoginResultOk: "",
			msgLoginResultFail: ""
		}
	}
	handleCrearCupo(event) {
		event.preventDefault()
		async function fetchCupo(thisComponent) {
			thisComponent.setState(
				{
					msgLoginResultOk: "Cupo creado correctamente"
					, msgLoginResultFail: ""
				})

		}
		fetchCupo(this)
	}

	render() {
		return (
		<div className="card mb-3">
			<div className="card-body">
				<div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
					<div className="dataTable-container">
						<form onSubmit={this.handleCrearCupo.bind(this)}>
							<h3>Nuevo Cupo</h3>
							<div className="form-group">
								<label>FechaInicio</label>
								<input type="FechaInicio" className="form-control" placeholder="Introduzca fecha de inicio"
									onChange={e => this.setState({ fechaini: e.target.value })} />
							</div>
							<div className="form-group">
								<label>FechaFin</label>
								<input type="FechaFin" className="form-control" placeholder="Introduzca fecha de fin"
									onChange={e => this.setState({ fechafin: e.target.value })} />
							</div>
							<div className="form-group">
								<label>Citas</label>
								<input type="Citas" className="form-control" placeholder="Introduzca cantidad de citas"
									onChange={e => this.setState({ ncitas: e.target.value })} />
							</div>
							<div className="form-group">
								<label>Centro</label>
								<input type="Centro" className="form-control" placeholder="Introduzca centro"
									onChange={e => this.setState({ centro: e.target.value })} />
							</div>

							<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
							<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
							<button type="submit" className="btn btn-primary btn-block">Crear Cupo</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		);
	}

}