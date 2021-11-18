import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env  from "react-dotenv";
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


export default class Centros extends Component{
	constructor(props) {
		super(props);
		this.addVaccines = this.addVaccines.bind(this);
		this.state = {
			centros: [],
			nombre: "",
			direccion: "",
			vacunas: "",
			msgGetResultOk: "",
			msgGetResultFail: "",
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
	}
	
	checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "centros", 
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
		async function getCentros(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({centros: JSON.parse(json)})
		}
		getCentros();
	}
	
	handleEliminar(event) {
		var nombreCentro = event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML;
		
		async function eliminarCentro() {
		
		let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/eliminar', {
			method: "POST",
			body: JSON.stringify({nombreCentro}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		let response = await answer.json();
			
		alert(response.message);
		if(response.status === "200"){
		window.location = '/Centros';
		}
		
		}
		eliminarCentro(this);
	}

	addVaccines(event) {
		var hospital =  event.target.parentNode.parentNode.getElementsByTagName("td")[0].getAttribute("data-value");
		var nvacunas = event.target.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML;
		var amount = prompt("¿Cuantas vacunas?", "0");
		nvacunas = parseInt(nvacunas) + parseInt(amount);
		
		if (amount === null) {
			return;
		}
		fetch(env[process.env.NODE_ENV+'_API_URL']+'/addVaccines', {
			method: "POST",
			body: JSON.stringify({hospital, amount}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		var arrayCentros = this.state.centros
		arrayCentros[this.state.centros.findIndex(item => item.nombre === hospital)].vacunas = nvacunas
		this.setState({centros: arrayCentros})
		console.log("Vacunas anadidas")
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
							Centros
						</div>
						<div className="card-body">
							<div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
								<div className="dataTable-container">
									<a className="btn btn-success" aria-current="page" href="/FormularioCentros">Add Centro</a>
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Nombre del centro</th>
												<th>Direccion</th>
												<th>Vacunas disponibles</th>
												<th>Anadir vacunas</th>
												<th>Modificar Centro</th>
												<th>Eliminar</th>
											</tr>
										</thead>
										<tbody>
											{this.state.centros.map((listValue, index) => {
												return (
													<tr key={index}>
														<td data-value={listValue.nombre}>{listValue.nombre}</td>
														<td>{listValue.direccion}</td>
														<td>{listValue.vacunas}</td>
														<td>
															<Button onClick={this.addVaccines}>Anadir vacunas</Button>
														</td>
														<td>
															<ModificarCentro dataCentro={[listValue.nombre, listValue.direccion, listValue.vacunas]} />
														</td>
														<td>
															<Button onClick={this.handleEliminar}>Eliminar</Button>
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
			</div>
		);
    }

	componentDidMount(){
		this.checkPermission(this);
		this.manageNavBar();
		this.obtenerDatos(this);
	}
}


function ModificarCentro({dataCentro}){
	
	let centroNombre = dataCentro[0];
	let centroDireccion = dataCentro[1];
	let centroVacunas = dataCentro[2];
	
	const handleClick = () => {
    	localStorage.setItem("nombreCentro", centroNombre);
		localStorage.setItem("direccionCentro", centroDireccion);
		localStorage.setItem("vacunasCentro", centroVacunas);
  	}
	return (
		<Button href="/ModificarCentro" onClick={handleClick}>Modificar centro</Button>	
	)
}