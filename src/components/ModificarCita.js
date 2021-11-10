import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from "react-dotenv";

export default class ModificarCita extends Component {
	constructor(props) {
		super(props);
				
		this.state = {
			email: localStorage.getItem("emailCita"),
			centro:localStorage.getItem("centroCita"),
			fechaAntigua: localStorage.getItem("fechaCita"),
			fechaNueva:localStorage.getItem("fechaCita"),
			ncita:localStorage.getItem("ncita"),
			limiteCalendario:"",
			diaSeleccionado:"",
			cupoSeleccionado: "",
			citas:[],
			cupos:[],
			msgCreationResultOk: "",
			msgCreationResultFail: ""
		}
	
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
	
	setLimiteCalendario(thisComponent){
		if (this.state.ncita==="1"){
		thisComponent.state.limiteCalendario="2022-01-10";
		}
		if (this.state.ncita==="2"){
		thisComponent.state.limiteCalendario="2022-01-31";	
		}
	
	}
	
	obtenerCuposLibres(thisComponent, fecha){
	
		if (typeof fecha !== 'undefined'){
			thisComponent.state.diaSeleccionado = fecha;
			async function getCuposLibres(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/obtenerCuposLibres', {
			method: "POST",
			body: JSON.stringify({fechaSeleccionada: fecha, centro: thisComponent.state.centro  }),
			headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
		});
		
		let json = await answer.text();
		thisComponent.setState({cupos: JSON.parse(json)})

		
		}
		getCuposLibres();
		
		}
		
	}
	
	handleModificarCita(event) {
		event.preventDefault()
		async function modificarCita(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/modify', {
				method: "POST",
				body: JSON.stringify({email: thisComponent.state.email, centro: thisComponent.state.centro, fechaAntigua: thisComponent.state.fechaAntigua, 
				fechaNueva:thisComponent.state.diaSeleccionado+"T"+thisComponent.state.cupoSeleccionado, ncita : thisComponent.state.ncita}),
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
								<input type="date" id="start" name="trip-start" defaultValue={this.state.fechaAntigua.substring(0,10)} min="2021-11-01" max={this.state.limiteCalendario}
								onChange={e => this.obtenerCuposLibres(this,e.target.value)}/>
							</div>
							<div className="form-group">
								<label>Seleccione una hora disponible para esa fecha</label>								
								<select className="form-control" id="LOL"
								onChange={e => this.setState({ cupoSeleccionado: e.target.value })}>
								<option selected disabled hidden>Selecciona una hora</option>
								{this.state.cupos.map((listValue, index) => {
									return (
										<option key={index}>{(listValue.fechaInicio).substring(11,16)}</option>
									);
								})}
								</select >
							</div>
							<div className="invalid-feedback d-block">{this.state.msgCreationResultFail}</div>
							<div className="valid-feedback d-block">{this.state.msgCreationResultOk}</div>
							<button type="submit" className="btn btn-primary btn-block">Modificar cita</button>
						</form>
					</div>
				</div>
			
		);
	}
	
	componentDidMount(){
		this.obtenerDatos(this);
		this.setLimiteCalendario(this);
		this.obtenerCuposLibres(this, this.state.fechaAntigua.substring(0,10));
		
	
	}
	

}