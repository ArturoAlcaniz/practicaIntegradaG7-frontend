import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Cupos extends Component{
    render() {
        return (
        	<div className="container-fluid px-4">
                <h1>Cupos</h1>
                <div className="card mb-3">
                    <div className="card-header">
                        Cupos
                    </div>
                    <div className="card-body">
                        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            <div className="dataTable-container">
                                <table className="table table-hover">
                                    <thead>
                                        <th>FranjaHoraria</th>
                                        <th>Citas</th>
                                    </thead>
                                    <tbody>
                                    	<tr>
                                        	<td>9h a 10h</td>
                                        	<td>8</td>
                                        </tr>
                                        <tr>
                                    		<td>10h a 11h</td>
                                    		<td>8</td>
                                    	</tr>
                                    </tbody>
                                  </table>
                            </div>
                        </div>
                     </div>
                </div>
                <a className="btn btn-success" aria-current="page" href="/FormularioCupos">Add Cupo</a>
           </div>
        );
    }
 }