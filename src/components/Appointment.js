import React, {Component} from "react";
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Appointment extends Component {
	constructor(props){
		super(props);
		this.state = {
				user: "PRUEBA",
				msgAppointFail: "",
				msgAppointOk: ""
		}
	}
	
	handlePetition(event) {
		event.preventDefault()
		async function makeReserve(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/create', 
				{ method: "POST" }
			);
			
			let response = (await answer.json());
			
			if (response.status === "200") {
				thisComponent.setState(
					{ msgAppointOk: response.message
					, msgAppointFail: ""
					}
				)
			}else {
				thisComponent.setState(
					{ msgAppointOk: ""
					, msgAppointFail: response.message
					}
				)
			}
			

		}
		makeReserve(this)
	}

	render() {
		return (
				<div className="auth-wrapper">
				<div className="auth-inner">
				<form className="align-items-center" onSubmit={this.handlePetition.bind(this)}>
					<h3>Reservar cita</h3>
					<div className="text-center">
					<button id="SubmitButton" type="submit" className="btn  btn-primary btnblock">Pedir cita</button>
					</div>
					<div><label></label></div>
					<div className="text-success d-block text-center">{this.state.msgAppointOk}</div>
					<div className="text-danger d-block text-center">{this.state.msgAppointFail}</div>
				</form>
				</div>
				</div>
		);
	}
}
