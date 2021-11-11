import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";
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
			usuarios: [],
			fecha: date
		}
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
									<div><input type="date" id="start" name="trip-start"
       									defaultValue={this.state.fecha}
       									min="2021-11-01" max="2022-01-31"/>
									</div>
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
														<td>{listValue.primeraDosis ? "2" : "1"}</td>
														<VacunarPaciente dataVacunacion={[listValue.dni]} />
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
}

async function VacunarPaciente({dataVacunacion}) {
	
	const handleVacunacion = async function() {
		let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/vacunar', {
			method: "POST",
			body: JSON.stringify({dni: dataVacunacion[0]}),
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