import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Centros extends Component{
    render() {
        return (
        	<div class="container-fluid px-4">
                <h1>Centros de salud</h1>
                <div class="card mb-4">
                <div class="card-header">
                    Centros
                </div>
                <div class="card-body">
                    <div class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                        <div class="dataTable-container">
                            
                            <a class="btn btn-success" aria-current="page" href="/Formulario">Add Centro</a>
                        
                            <table class="table table-hover">
                                <thead>
                                  <th>Nombre del centro</th>
                                  <th charset="utf-8">Dirección</th>
                                  <th>Vacunas disponibles</th> 
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        );
    }
}