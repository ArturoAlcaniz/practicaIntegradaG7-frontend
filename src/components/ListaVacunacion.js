import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";


export default class ListaVacunacion extends Component {
	constructor(props) {
		super(props);
		let today = new Date(),
		date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		this.state = {
			usuarios: [],
			fecha: date
		}
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
	
	vacunar(event) {
	}

	render() {
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
									<div className='date'>{this.state.fecha}</div>
									<table className="table table-hover">
										<thead>
											<tr>
												<th>DNI</th>
												<th>Nombre</th>
												<th>Apellidos</th>
												<th>Dosis a suministrar</th>
												<th>Vacunar</th>
											</tr>
										</thead>
										<tbody>
											{this.state.usuarios.map((listValue, index) => {
												return (
													<tr key={index}>
														<td>{listValue.dni}</td>
														<td>{listValue.nombre}</td>
														<td>{listValue.apellidos}</td>
														<td>{listValue.segundaDosis ? 'Segunda' : 'Primera'}</td>
														<td>
															<button onClick={this.vacunar}>Vacunar</button>
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