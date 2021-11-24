import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default class NotAllowed extends Component {

	constructor(props) {
		super(props);
		this.state = {
				prevst: props.location.state
		}
	}
	
	render() {
		var mssg = "";
		if(this.state.prevst === undefined) {
			mssg = "Motivo desconocido";
		} else {
			mssg = this.state.prevst.prevMssg;
		}
		return (
				<div className="container">
				<div className="error-template">
				<h2>Error de confirmacion de permisos</h2>
				<div>Si esta en esta pagina, es por que ha sido redirigido a ella debido a que ha intentado acceder a un sitio para el cual no disponia de pemisos</div>
				<div>Motivo de esta redireccion:</div>
				<div>{mssg}</div>
				</div>
				</div>
		);
	}
}