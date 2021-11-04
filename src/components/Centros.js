import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env  from "react-dotenv";


export default class Centros extends Component{
	constructor(props) {
		super(props);
		this.addVaccines = this.addVaccines.bind(this);
		this.state = {
			centros: [],
			nombre: "",
			direccion: "",
			vacunas: "",
			msgGetResultOk: "",
			msgGetResultFail: ""
		}
		
	}
	obtenerDatos(thisComponent){
		async function getCentros(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({centros: JSON.parse(json)})
		}
		getCentros();
	}

	addVaccines(event) {
		var hospital =  event.target.parentNode.parentNode.getElementsByTagName("td")[0].getAttribute("data-value");
		var nvacunas = event.target.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML;
		var amount = prompt("¿Cuantas vacunas?", "0");
		nvacunas = parseInt(nvacunas) + parseInt(amount);
		
		if (amount === null) {
			return;
		}
		fetch(env[process.env.NODE_ENV+'_API_URL']+'/addVaccines', {
			method: "POST",
			body: JSON.stringify({hospital, amount}),
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			}
		});
		var arrayCentros = this.state.centros
		arrayCentros[this.state.centros.findIndex(item => item.nombre === hospital)].vacunas = nvacunas
		this.setState({centros: arrayCentros})
		console.log("Vacunas anadidas")
	}
	
    render() {
	
        return (
        	<div className="container-fluid px-4">
                <div className="card mb-4">
                    <div className="card-header">
                        Centros
                    </div>
                    <div className="card-body">
                        <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                            <div className="dataTable-container">
								<a className="btn btn-success" aria-current="page" href="/FormularioCentros">Add Centro</a>
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
										{this.state.centros.map((listValue, index) => {
											return (
												<tr key={index}>
													<td  data-value={listValue.nombre}>{listValue.nombre}</td>
													<td>{listValue.direccion}</td>
													<td>{listValue.vacunas}</td>
													<td>
														<button onClick={this.addVaccines}>Anadir vacunas</button>
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
        );
    }

	componentDidMount(){
		this.obtenerDatos(this);
	}
}