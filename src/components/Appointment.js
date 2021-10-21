import React, {Component} from 'react';
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/makeAppointment', {
				method: "POST",
				body: JSON.stringify({user: thisComponent.state.user}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let date = await answer.text()
			if (date === undefined) {
				thisComponent.setState(
						{ appointment: ""
							, msgAppointFail: "Error al pedir cita"})
			}else{
				thisComponent.setState(
						{ appointment: date
							, msgAppointFail: ""})
			}
		}
		makeReserve(this)
	}

	render() {
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
				<form onSubmit={this.handlePetition.bind(this)}>
					<h3>Reservar cita</h3>
					<div className="form-group">
						<label>DNI</label>
						<input id="DNI" type="text" className="form-control"
							placeholder="DNI" onChange={e => this.setState({ user: e.target.value })}/>
					</div>
					<button id="SubmitButton" type="submit" className="btn btn-primary btnblock">Pedir cita</button>
					<div><label></label></div>
					<div id="txtSuccess" className="appoint-success dblock">{this.state.appointment}</div>
					<div id="txtErr" className="appoint-error dblock">{this.state.msgAppointFail}</div>
				</form>
				</div>
				</div>
		);
	}
}
