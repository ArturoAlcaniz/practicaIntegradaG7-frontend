import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from "react-dotenv";
import { Redirect } from 'react-router-dom';

export default class Cupos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cupos: [],
            msgGetResultOk: "",
            msgGetResultFail: "",
            perm: ""
        }
    }
    
    manageNavBar() {
		document.getElementById("navConf").hidden = false;
		document.getElementById("navCupos").hidden = false;
		document.getElementById("navCentros").hidden = false;
		document.getElementById("navUsers").hidden = false;
		document.getElementById("navCita").hidden = true;
		document.getElementById("navLsVac").hidden = true;
		document.getElementById("navLogin").hidden = false;
	}
    
    checkPermission(thisComponent){
		async function chek(){
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/perms/check', {
				method: "POST",
				body: JSON.stringify({site: "cupos", 
					email: sessionStorage.getItem("email"),
					password: sessionStorage.getItem("password")}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}

			});
			let allowed = (await answer.json());
			thisComponent.state.perm = allowed.message;
			}
		chek();
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
    	if (this.state.perm && this.state.perm !== "OK") {
			return <Redirect to={{
				pathname: '/notAllowed',
				state: { prevMssg: this.state.perm }
			}}
			/>
		}
    	
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
    			<a className="btn btn-success" aria-current="page" href="/FormularioCupos">Add Cupo</a>
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
    			</div>
    			</div>
    	);
    }
	componentDidMount(){
		this.checkPermission(this);
		this.manageNavBar();
		this.obtenerDatos(this);
	}
}