import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";
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
		
		/*async function eliminarUsuario() {
		
		fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/eliminar', {
			method: "POST",
			body: JSON.stringify({email}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		let response = await answer.json();
			
		alert(response.message);
		
		}
		eliminarUsuario(this);*/
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
														<td>{listValue.dni}</td>
														<td>{listValue.rol}</td>
														<td>{listValue.nombre}</td>
														<td>{listValue.apellidos}</td>
														<td>{listValue.email}</td>
														<td>{listValue.centro.nombre}</td>
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
		this.obtenerDatos(this);
	}
}

