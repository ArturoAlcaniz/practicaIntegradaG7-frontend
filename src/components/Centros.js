import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env  from "react-dotenv";

export default class Centros extends Component{
	constructor(props) {
		super(props);
		this.addVaccines = this.addVaccines.bind(this);
		this.state = {
			nombre: "",
			direccion: "",
			vacunas: "",
			msgGetResultOk: "",
			msgGetResultFail: ""
		}
	}

	addVaccines(event) {
		var hospital =  event.target.parentNode.parentNode.getElementsByTagName("td")[0].getAttribute("data-value");
		
		var amount = prompt("¿Cuantas vacunas?", "0");
		
		fetch(env[process.env.NODE_ENV+'_API_URL']+'/addVaccines', {
			method: "POST",
			body: JSON.stringify({hospital, amount}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});

		console.log("Vacunas anadidas")
	}
	
	obtenerDatos(event){
		fetch(env[process.env.NODE_ENV+'_API_URL']+'centros/obtener', {
			method: "GET",
			body: JSON.stringify({}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});

	}

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
                                    <tr>
                                        <th>Nombre del centro</th>
                                        <th>Direccion</th>
                                        <th>Vacunas disponibles</th>
                                        <th>Anadir vacunas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-value="Santa Cecilia">Santa Cecilia</td>
                                            <td>Calle Laurel</td>
                                            <td>1500</td>
                                            <td>
                                            	<button id="addVaccinesB1" onClick={this.addVaccines}>Anadir vacunas</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td data-value="Hospital Universitario1">Hospital Universitariol</td>
                                            <td>Calle Toledo</td>
                                            <td>1200</td>
                                            <td>
                                        		<button id="addVaccinesB2" onClick={this.addVaccines}>Anadir vacunas</button>
                                        	</td>
                                        </tr>
                                        <tr>
                                            <td data-value="Hospital Azuzena">Hospital Azuzena</td>
                                            <td>Calle La Paz</td>
                                            <td>85</td><td>
                                            	<button id="addVaccinesB3" onClick={this.addVaccines}>Anadir vacunas</button>
                                            </td>
												<button id="get" onClick={this.obtenerDatos}>datos</button>
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