import React, {Component } from "react";
import Button from 'react-bootstrap/Button';
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';



export default class Appointment extends Component {
	constructor(props){
		super(props);
		this.state = {
				user: "PRUEBA",
				citas:[],
				msgAppointFail: "",
				msgAppointOk: "",
				perm: ""
		}
	}
	
	
	manageNavBar() {
		document.getElementById("navConf").hidden = true;
		document.getElementById("navCupos").hidden = true;
		document.getElementById("navCentros").hidden = true;
		document.getElementById("navUsers").hidden = true;
		document.getElementById("navCita").hidden = false;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = false;
		
	}

	checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "appointment", 
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

	obtenerDatos(thisComponent){
		async function getCitas(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/obtener', {
				method: "GET"
			});

			let json = await answer.text();
			thisComponent.setState({citas: JSON.parse(json)})
		}
		getCitas();
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
	
	handleEliminarCita(event) {
		event.preventDefault()

		async function eliminarCita() {

		var email = sessionStorage.getItem("email");
		var centro = event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
		var fecha = event.target.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
		var ncita = event.target.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML;

		let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/delete', {
			method: "POST",
			body: JSON.stringify({fecha: fecha, email: email, centro:centro, ncita: ncita}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		let response = await answer.json();
			
		alert(response.message);
		if(response.status === "200"){
			window.location = "/Appointment";
		}
		
		}
		eliminarCita(this);
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
				<div className="container-sm">
				<div className="card">
				<form className="align-items-center" onSubmit={this.handlePetition.bind(this)}>
				<h3>Reservar cita</h3>
				<div className="text-center">

				<button id="SubmitButton" type="submit" className="btn  btn-primary btnblock">Pedir cita</button>
				</div>
				<div><label></label></div>
				<div className="text-success d-block text-center">{this.state.msgAppointOk}</div>
				<div className="text-danger d-block text-center">{this.state.msgAppointFail}</div>
				</form>
				<h3>Mis Citas</h3>
				<div className="card-body">
				<div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
				<div className="dataTable-container">
				<table className="table table-hover">
				<thead>
				<tr>
				<th>Centro</th>
				<th>Fecha</th>
				<th>Cita</th>
				<th></th>
				</tr>
				</thead>
				<tbody>
				{this.state.citas.map((listValue, index) => {
					return (
							<tr key={index}>
							<td>{listValue.centroNombre}</td>
							<td>{listValue.fecha.substring(0,10)+" a las "+listValue.fecha.substring(11,16)}</td>
							<td>{listValue.ncita}</td>
							<td>		
							<ModificarCita dataCita={[listValue.email, listValue.centroNombre, listValue.fecha, listValue.ncita]}/>										        
							</td>
							<td>
														<Button  onClick={this.handleEliminarCita}>Eliminar</Button>
													</td>
							</tr>
					);
				})}
				</tbody>
				</table>
				</div>
				</div>
				</div>
				</div>
				</div>
				<div className="text-center">
				</div>
				</div>
		);
	}
	
componentDidMount() {
		this.checkPermission(this);
		this.manageNavBar();
		this.obtenerDatos(this);
	}
	
}


function ModificarCita({dataCita}){
	
	let emailCita = dataCita[0];
	let centroCita = dataCita[1];
	let fechaCita = dataCita[2];
	let ncita = dataCita[3];
	
	const handleClick = () => {
    	localStorage.setItem("emailCita",emailCita);
		localStorage.setItem("centroCita",centroCita);
		localStorage.setItem("fechaCita",fechaCita);
		localStorage.setItem("ncita",ncita);
	
  }
	return (
		<Button href="/ModificarCita" onClick={handleClick}>Modificar cita</Button>	
	)

}











