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
			perm: ""
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
												<th></th>
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
														{/*<td><VacunarPaciente dataVacunacion={[listValue.email]} /></td>*/}										
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
			</div>
		);
	}
	
	componentDidMount() {
		this.checkPermission(this);
		this.obtenerCitas(this,this.state.fecha);
		this.manageNavBar();
	}

}

async function VacunarPaciente({dataVacunacion}) {
	
	const handleVacunacion = async function() {
		let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/vacunar', {
			method: "POST",
			body: JSON.stringify({email: dataVacunacion[0]}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		let response = (await answer.json());
		if (response.status === "200") {
			let arrayUsuarios = this.state.usuarios
			arrayUsuarios.remove(this.state.usuarios.findIndex(item => item.dni === dataVacunacion[0]))
			this.setState({usuarios: arrayUsuarios})
		}else{
			
		}
	}

	return (
		<Button href="/VacunarPaciente" onClick={handleVacunacion}></Button> 
	)
	
}