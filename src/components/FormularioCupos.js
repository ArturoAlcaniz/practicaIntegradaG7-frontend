import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";

export default class FormularioCupos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fechaini: "", 
			fechafin: "",
			centro: "",
			ncitas: "",
			msgCreationResultOk: "",
			msgCreationResultFail: ""
		}
	}
	
	handleCrearCupo(event) {
		event.preventDefault()
		async function makeCupo(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/cupo/create', {
				method: "POST",
				body: JSON.stringify({fechaini: thisComponent.state.fechaini, fechafin: thisComponent.state.fechafin, centro: thisComponent.state.centro, ncitas: thisComponent.state.ncitas}),
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

		makeCupo(this)
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

							<div className="invalid-feedback d-block">{this.state.msgCreationResultFail}</div>
							<div className="valid-feedback d-block">{this.state.msgCreationResultOk}</div>
							<button type="submit" className="btn btn-primary btn-block">Crear Cupo</button>
						</form>
					</div>
				</div>
			</div>
		</div>
		);
	}

}