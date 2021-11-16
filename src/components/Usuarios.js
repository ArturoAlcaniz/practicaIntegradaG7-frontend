import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";
import { Link, Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default class Usuarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usuarios: [],
			perm: ""
		}
	}
	
	manageNavBar() {
		document.getElementById("navConf").hidden = false;
		document.getElementById("navCupos").hidden = false;
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
				body: JSON.stringify({site: "usuarios", 
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
	
	handleEliminar(event) {
		var email = event.target.parentNode.parentNode.getElementsByTagName("td")[4].innerHTML;
		
		async function eliminarUsuario() {
		
		let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/eliminar', {
			method: "POST",
			body: JSON.stringify({email}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		let response = await answer.json();
			
		alert(response.message);
		window.location = '/Usuarios';
		
		}
		eliminarUsuario(this);
	}

	obtenerDatos(thisComponent){
		async function getUsuarios(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuarios/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({usuarios: JSON.parse(json)})
		}
		getUsuarios();
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
							Usuarios
						</div>
						<div className="card-body">
							<div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
								<div className="dataTable-container">
									<a className="btn btn-success" aria-current="page" href="/FormularioUsuarios">Add usuario</a>
									<table className="table table-hover">
										<thead>
											<tr>
												<th>DNI</th>
												<th>Rol</th>
												<th>Nombre</th>
												<th>Apellidos</th>
												<th>Email</th>
												<th>Centro</th>
												<th>Modificar usuario</th>
												<th>Eliminar usuario</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{this.state.usuarios.map((listValue, index) => {
												return (
													<tr key={index}>
														<td>{listValue.dniDenc}</td>
														<td>{listValue.rol}</td>
														<td>{listValue.nombre}</td>
														<td>{listValue.apellidos}</td>
														<td>{listValue.email}</td>
														<td>{listValue.centro.nombre}</td>
														<td>
															<Link
																to={{
																	pathname: "/modifyUser",
																	state: { user: this.state.usuarios[index] }
																}}>
																<Button>Modificar usuario</Button>
															</Link>
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

