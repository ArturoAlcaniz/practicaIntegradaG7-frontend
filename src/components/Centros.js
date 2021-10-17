import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Centros extends Component{
    render() {
        return (
        	<div className="container-fluid px-4">
                <h1>Centros de salud</h1>
                <div className="card mb-4">
                    <div className="card-header">
                        Centros
                    </div>
                    <div className="card-body">
                        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            <div className="dataTable-container">

                                <table className="table table-hover">
                                    <thead>
                                        <th>Nombre del centro</th>
                                        <th>Dirección</th>
                                        <th>Vacunas disponibles</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Santa Cecilia</td>
                                            <td>Calle Laurel</td>
                                            <td>1500</td>
                                        </tr>
                                        <tr>
                                            <td>Hospital Universitariol</td>
                                            <td>Calle Toledo</td>
                                            <td>1200</td>
                                        </tr>
                                        <tr>
                                            <td>Hospital Azuzena</td>
                                            <td>Calle La Paz</td>
                                            <td>85</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            </div>
            <a className="btn btn-success" aria-current="page" href="/FormularioCentros">Add Centro</a>
        </div>

        );
    }
}