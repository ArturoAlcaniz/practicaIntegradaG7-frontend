import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from "react-dotenv";
import { Redirect } from 'react-router-dom';

export default class FormularioConfiguracion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			horaInicio: "",
			horaFin: "",
			citasPorFranja: "",
            franjasPorDia: "",
            duracionFranja: "",
            configurationAlreadySaved: false,
			msgConfigResultOk: "",
			msgConfigResultFail: "",
			perm: ""
		}
	}
	
	manageNavBar() {
		document.getElementById("navConf").hidden = false;
		document.getElementById("navCentros").hidden = false;
		document.getElementById("navUsers").hidden = false;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = false;
		document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
		document.getElementById("navNombre").innerHTML = sessionStorage.getItem("nombre");
		document.getElementById("navLogin").hidden = true;
		document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
		document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();
		
		var ul = document.getElementById("navLogOut");
		var li = document.createElement("li");
		li.className = "nav-link";
		var button = document.createElement("Button");
		button.innerHTML = "LogOut";
		button.className = "btn btn-secondary";
		button.onclick = function() {window.location = "/Login";};
		li.appendChild(button);
		li.setAttribute("id","buttonLogOut");
		ul.appendChild(li);

	}
	
	checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "formulario", 
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
	
	handleCrearConfig(event) {
		event.preventDefault()
		async function makeConfiguracion(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/configuracion/create', {
				method: "POST",
				body: JSON.stringify(
                    { horaInicio: thisComponent.state.horaInicio
                    , horaFin: thisComponent.state.horaFin
                    , citasPorFranja: thisComponent.state.citasPorFranja
                    , franjasPorDia: thisComponent.state.franjasPorDia
                    }
                ),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				thisComponent.setState(
						{ configurationAlreadySaved: true
                        , msgConfigResultOk: response.message
						, msgConfigResultFail: ""})
			}else{
				thisComponent.setState(
						{ msgConfigResultOk: ""
						, msgConfigResultFail: response.message})
			}
		}

		makeConfiguracion(this)
	}

    obtenerConfiguracion(thisComponent){
		async function getConfiguration(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/configuration/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
        let response = JSON.parse(json)
        if (response.status === undefined) {
            thisComponent.setState(
                { configurationAlreadySaved: true
                , horaInicio: response.horaInicio
                , horaFin: response.horaFin
                , citasPorFranja: response.citasPorFranja
                , franjasPorDia: response.franjasPorDia
                , duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + response.horaFin))
                -(new Date (new Date().toDateString() + ' ' + response.horaInicio)))/60000)/response.franjasPorDia) 
                }
            )
        }


		}
		getConfiguration();
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
				<div className="auth-inner">	
				<form onSubmit={this.handleCrearConfig.bind(this)}>
				<div className="mb-3" name="titleForm">
				<h3>Configuración</h3>
				</div>

				<div className="form-group">
				<div className="row">
				<div className="col-5">
				<label>Hora inicio</label>
				</div>
				<div className="col-5">
				<label>Hora fin</label>
				</div>
				</div>
				<div className="row">
				<div className="col-5">
				<input className="h5" type="time"
					min="00:00" max="23:59"
						onChange={e => this.setState(
								{ horaInicio: e.target.value
									, duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + this.state.horaFin))
											-(new Date (new Date().toDateString() + ' ' + e.target.value)))/60000)/this.state.franjasPorDia) })} 
				value={this.state.horaInicio}
				disabled={this.state.configurationAlreadySaved} />
				</div>
				<div className="col-5">
				<input className="h5" type="time"
					min="00:00" max="23:59"
						onChange={e => this.setState(
								{ horaFin: e.target.value
									, duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + e.target.value))
											-(new Date (new Date().toDateString() + ' ' + this.state.horaInicio)))/60000)/this.state.franjasPorDia) })} 
				value={this.state.horaFin}
				disabled={this.state.configurationAlreadySaved} />
				</div>
				</div>
				</div>
				<div className="form-group">
				<div className="row">
				<div className="col-5">
				<label>Franjas por dia</label>
				</div>
				<div className="col-5">
				<label>Citas por franja</label>
				</div>
				</div>
				<div className="row">
				<div className="col-5">
				<div className="w-75">
				<input className="form-control" type="number"
					min="0" max="9999"
						onChange={e => this.setState(
								{ franjasPorDia: e.target.value
									, duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + this.state.horaFin))
											-(new Date (new Date().toDateString() + ' ' + this.state.horaInicio)))/60000)/e.target.value) }) } 
				value={this.state.franjasPorDia}
				disabled={this.state.configurationAlreadySaved} />
				</div>
				</div>
				<div className="col-5">
				<div className="w-75">
				<input type="number" className="form-control"
					min="0" max="9999"
						onChange={e => this.setState({ citasPorFranja: e.target.value })} 
				value={this.state.citasPorFranja}
				disabled={this.state.configurationAlreadySaved} />
				</div>
				</div>
				</div>
				</div>
				<div className="form-group">
				<div>Duración de cada franja: {this.state.duracionFranja} minutos
				</div>
				</div>

				<div className="invalid-feedback d-block">{this.state.msgConfigResultFail}</div>
				<div className="valid-feedback d-block">{this.state.msgConfigResultOk}</div>
				<button disabled={this.state.configurationAlreadySaved} type="submit" className="btn btn-primary btn-block">Guardar configuración</button>
				</form>
				</div>
				</div>
		);
	}

    componentDidMount(){
    	this.checkPermission(this);
    	this.manageNavBar();
		this.obtenerConfiguracion(this);
	}
}