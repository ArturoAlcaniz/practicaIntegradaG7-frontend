import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';


export default class Usuarios extends Component {
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
                            <table className="table table-hover">
                                <thead>
									<tr>
										<th>DNI</th>
										<th>Rol</th>
										<th>Nombre</th>
										<th>Apellidos</th>
										<th>Email</th>
										<th>Centro</th>
									</tr>
                                </thead>
                                <tbody>
                                    <tr>
										<td>05122334E</td>
										<td>Sanitario</td>
										<td>Mariano</td>
										<td>Lopez Jimenez</td>
										<td>mariano@gmail.com</td>
										<td>Santa Cecilia</td>
                                    </tr>
                                    <tr>
										<td>05122354X</td>
										<td>Paciente</td>
										<td>Juan</td>
										<td>Gervas Sanchez</td>
										<td>juang_7632@hotmail.com</td>
										<td>Luz de Sevilla</td>
                                    </tr>
                                    <tr>
										<td>05164433F</td>
										<td>Paciente</td>
										<td>Francisca</td>
										<td>Salas Delgado</td>
										<td>pacaxd@gmail.com</td>
										<td>Hospital Universitario Ciudad Real</td>
                                    </tr>
									<tr>
										<td>05232334B</td>
										<td>Administrador</td>
										<td>Jose Luis</td>
										<td>Rodriguez Castillo</td>
										<td>joselu-cars@yahoo.es</td>
										<td>Ernesto Balbuena Madrid</td>
                                    </tr>
 									<tr>
										<td>05232234F</td>
										<td>Paciente</td>
										<td>Manuel</td>
										<td>Toloso Sanchez</td>
										<td>manueltosan@gmail.com</td>
										<td>Hospital Azuzena</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
 <a className="btn btn-success" aria-current="page" href="/FormularioUsuarios">Add usuario</a>
                </div>
			
            </div>

        </div>



			</div>
		);
	}
}