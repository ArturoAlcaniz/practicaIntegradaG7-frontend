import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


export default class ListaVacunacion extends Component {
	constructor(props) {
		super(props);
		let today = new Date();
		let dia;
		if (today.getDate()<10) {
			dia = '0'+today.getDate();
		}else {
			dia = today.getDate();
		}
		let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + dia;
		this.state = {
			citas: [],
			fecha: date,
			perm: "",
			msgVacunasError: "",
		}
	}
	
	obtenerCitas(thisComponent,fecha){
		async function getCitas(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/obtenerPorFechaAndCentro', {
			method: "POST",
			body: JSON.stringify({fecha: fecha, centro: sessionStorage.getItem("centro")}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
		});
		
		let json = await answer.text();
		thisComponent.setState({citas: JSON.parse(json)})}
		
		getCitas();
		}
		
		manageNavBar() {
		document.getElementById("navConf").hidden = true;
		document.getElementById("navCentros").hidden = true;
		document.getElementById("navUsers").hidden = true;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = false;
		document.getElementById("navLogin").hidden = true;
		document.getElementById("btnLO").hidden = false;
		document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
		document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();

	}
	
	checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "listaVacunacion", 
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
		chek()
	}

	handleVacunacion(thisComponent, dataVacunacion) {
		async function vacunar() {
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/marcarVacunacion', {
				method: "POST",
				body: JSON.stringify({email: dataVacunacion[1], ncita: dataVacunacion[2]}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				let arrayCitas = thisComponent.state.citas
				let newArrayCitas = arrayCitas.filter((cita, _) => cita.email !== dataVacunacion[1])
				thisComponent.setState({citas: newArrayCitas, msgVacunasError: ""})
			}else{
				thisComponent.setState(
						{ msgVacunasError: response.message})
			}
		}
		vacunar()
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
				<div className="container-fluid px-4">
					<div className="card mb-4">
						<div className="card-header">
							Lista de pacientes
						</div>
						<div className="card-body">
							<div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
								<div className="dataTable-container">
									<div>Fecha</div>
									<div><input type="date" id="start" name="trip-start"
       									defaultValue={this.state.fecha}	min="2021-11-10" max="2022-01-31"
										onChange={e => this.obtenerCitas(this,e.target.value)}/>
									</div>
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Hora</th>
												<th>DNI</th>
												<th>Nombre</th>
												<th>Apellidos</th>
												<th>Dosis</th>
												<th>Vacunación</th>
											</tr>
										</thead>
										<tbody>
											{this.state.citas.map((listValue, index) => {
												return (
													<tr key={index}>
														<td>{listValue.fecha.substring(11,16)}</td>
														<td>{listValue.dni}</td>
														<td>{listValue.nombre}</td>
														<td>{listValue.apellidos}</td>
														<td>{listValue.ncita}</td>
														<td><Button className="btn btn-primary btn-block col-6" onClick={e => this.handleVacunacion(this, [listValue.dni, listValue.email, listValue.ncita])}>Vacunar</Button></td> 
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
							<div className="text-danger d-block">{this.state.msgVacunasError}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		this.checkPermission(this);
		this.obtenerCitas(this,this.state.fecha);
		this.manageNavBar();
	}

}
