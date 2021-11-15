import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default class Usuarios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usuarios: []
		}
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
		console.log(thisComponent.state.usuarios[0].dniDenc);
		}
		getUsuarios();
	}

	render() {
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
																state: {user: this.state.usuarios[index]}
															}}>
															<button className="btn btn-success">Modificar usuario</button>
														</Link>
														</td>
														<Button onClick={this.handleEliminar}>Eliminar</Button>	
													
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
		this.obtenerDatos(this);
	}
}

