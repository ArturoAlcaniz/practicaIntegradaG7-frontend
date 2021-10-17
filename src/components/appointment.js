import React, {Component} from 'react';
import env from "react-dotenv";
export default class Appointment extends Component {
	constructor(props){
		super(props);
		this.state = {
				user: "",
				appointment: "",
				msgAppointFail: ""
		}
	}
	
	handlePetition(event) {
		event.preventDefault()
		async function makeReserve(thisComponent) {
			let answer = await fetch(
					env[process.env.NODE_ENV+'_API_URL']+'/makeAppointment'
			)
			let date = await answer.text()
			if (date === undefined) {
				thisComponent.setState(
						{ appointment: ""
							, msgAppointFail: "Error al pedir cita"})
						}else{
							thisComponent.setState(
									{ appointment: "Fecha: " + date
										, msgAppointFail: ""})
						}
			}
			makeReserve(this)
		}

	render() {
		return (
				<div className="appoint-wrapper">
				<div className="appoint-inner">
				<form onSubmit={this.handlePetition.bind(this)}>
					<h3>Reservar cita</h3>
					<div className="form-group">
						<label>Registrado como -</label>
					</div>
					<button type="submit" className="btn btn-primary btnblock">Pedir cita</button>
					<div><label></label></div>
					<div className="appoint-success dblock">{this.state.appointment}</div>
					<div className="appoint-error dblock">{this.state.msgAppointFail}</div>
				</form>
				</div>
				</div>
		);
	}
}
