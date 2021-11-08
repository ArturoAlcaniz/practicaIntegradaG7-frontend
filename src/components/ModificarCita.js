import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";

export default class ModificarCita extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dni: localStorage.getItem("dniCita"),
			centro:localStorage.getItem("centroCita"),
			fechaAntigua: localStorage.getItem("fechaCita"),
			fechaNueva:localStorage.getItem("fechaCita"),
			msgCreationResultOk: "",
			msgCreationResultFail: ""
		}
	}
	
	handleModificarCita(event) {
		event.preventDefault()
		async function modificarCita(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/modify', {
				method: "POST",
				body: JSON.stringify({dni: thisComponent.state.dni, centro: thisComponent.state.centro, fechaAntigua: thisComponent.state.fechaAntigua, fechaNueva:thisComponent.state.fechaNueva}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = await answer.json();
			
			if (response.status === "200") {
				thisComponent.setState(
						{ msgCreationResultOk: ""
							, msgCreationResultFail: ""});
				alert(response.message);
				window.location = '/Appointment';
			}else{
				thisComponent.setState(
						{ msgCreationResultOk: ""
							, msgCreationResultFail: response.message})
			}
		}

		modificarCita(this)
	}

	render() {
		
		
		return (
		
				<div className="auth-wrapper">
					<div className="auth-inner">
						<form onSubmit={this.handleModificarCita.bind(this)}>
							<h3>Modificar cita</h3>
							<div className="form-group">
								<label>Introduzca un nueva fecha</label>
								<input type="fecha" className="form-control" defaultValue={this.state.fechaAntigua} placeholder="Introduzca fecha"
									onChange={e => this.setState({ fechaNueva: e.target.value })} />
							</div>
				

							<div className="invalid-feedback d-block">{this.state.msgCreationResultFail}</div>
							<div className="valid-feedback d-block">{this.state.msgCreationResultOk}</div>
							<button type="submit" className="btn btn-primary btn-block">Modificar cita</button>
						</form>
					</div>
				</div>
			
		);
	}

}