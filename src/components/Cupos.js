import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from "react-dotenv";

export default class Cupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cupos: [],
            msgGetResultOk: "",
            msgGetResultFail: ""
        }

    }

    obtenerDatos(thisComponent) {
        async function getCupos() {
        	let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/cupo/obtener', {
                method: "GET"
            });

            let json = await answer.text();
            thisComponent.setState({ cupos: JSON.parse(json) })
        }
        getCupos();
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="container-fluid px-4">
                    <div className="card mb-4">
                        <div className="card-header">
                            Cupos
</div>
                        <div className="card-body">
                            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                <div className="dataTable-container">
                                    <table className="table table-hover">
                                        <thead>
                                            <th>FechaInicio</th>
                                            <th>FechaFin</th>
                                            <th>NumCitas</th>
                                            <th>Centro</th>
                                        </thead>
                                        <tbody>
                                            {this.state.cupos.map((listValue, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{listValue.fechaInicio}</td>
                                                        <td>{listValue.fechaFin}</td>
                                                        <td>{listValue.numeroCitas}</td>
                                                        <td>{listValue.centro.nombre}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="btn btn-success" aria-current="page" href="/FormularioCupos">Add Cupo</a>
                </div>
            </div>
        );
    }
	componentDidMount(){
		this.obtenerDatos(this);
	}
}