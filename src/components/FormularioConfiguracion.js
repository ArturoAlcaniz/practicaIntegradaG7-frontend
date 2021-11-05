import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import env from "react-dotenv";

export default class FormularioConfiguracion extends Component {

	constructor(props) {
		super(props);
		this.state = {
			horaInicio: "08:00",
			horaFin: "17:00",
			citasPorFranja: "1",
            franjasPorDia: "1",
            duracionFranja: "540",
			msgConfigResultOk: "",
			msgConfigResultFail: ""
		}
	}
	
	handleCrearConfig(event) {
		event.preventDefault()
		async function makeConfiguracion(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/configuracion/create', {
				method: "POST",
				body: JSON.stringify(
                    { horaInicio: thisComponent.state.horaInicio
                    , horaFin: thisComponent.state.horaFin
                    , citasPorFranja: thisComponent.state.citasPorFranja
                    , franjasPorDia: thisComponent.state.franjasPorDia
                    }
                ),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				thisComponent.setState(
						{ msgConfigResultOk: response.message
							, msgConfigResultFail: ""})
			}else{
				thisComponent.setState(
						{ msgConfigResultOk: ""
							, msgConfigResultFail: response.message})
			}
            console.log(answer);
		}

		makeConfiguracion(this)
	}

	render() {
		return (
		<div className="auth-wrapper">
			<div className="auth-inner">	
				<form onSubmit={this.handleCrearConfig.bind(this)}>
						<div className="mb-3" name="titleForm">
                            <h3>Configuración</h3>
                        </div>

						<div className="form-group">
							<div className="row">
                                <div className="col-5">
                                    <label>Hora inicio</label>
                                </div>
                                <div className="col-5">
                                    <label>Hora fin</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5">
							        <input className="h5" type="time"
                                        min="00:00" max="23:59"
								        onChange={e => this.setState(
                                            { horaInicio: e.target.value
                                            , duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + this.state.horaFin))
                                            -(new Date (new Date().toDateString() + ' ' + e.target.value)))/60000)/this.state.franjasPorDia) })} 
                                        value={this.state.horaInicio}/>
                                </div>
                                <div className="col-5">
                                    <input className="h5" type="time"
                                        min="00:00" max="23:59"
                                        onChange={e => this.setState(
                                            { horaFin: e.target.value
                                            , duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + e.target.value))
                                            -(new Date (new Date().toDateString() + ' ' + this.state.horaInicio)))/60000)/this.state.franjasPorDia) })} 
                                        value={this.state.horaFin}/>
                                </div>
                            </div>
						</div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-5">
                                    <label>Franjas por dia</label>
                                </div>
                                <div className="col-5">
                                    <label>Citas por franja</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5">
                                    <div className="w-75">
							            <input className="col-4" type="number" className="form-control"
                                            min="0" max="9999"
								            onChange={e => this.setState(
                                                { franjasPorDia: e.target.value
                                                , duracionFranja: Math.round((((new Date (new Date().toDateString() + ' ' + this.state.horaFin))
                                                -(new Date (new Date().toDateString() + ' ' + this.state.horaInicio)))/60000)/e.target.value) }) } 
                                            value={this.state.franjasPorDia} />
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="w-75">
                                        <input type="number" className="form-control"
                                            min="0" max="9999"
                                            onChange={e => this.setState({ citasPorFranja: e.target.value })} 
                                            value={this.state.citasPorFranja} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div>Duración de cada franja: {this.state.duracionFranja} minutos
                            </div>
                        </div>

						<div className="invalid-feedback d-block">{this.state.msgConfigResultFail}</div>
						<div className="valid-feedback d-block">{this.state.msgConfigResultOk}</div>
						<button type="submit" className="btn btn-primary btn-block">Guardar configuración</button>
				</form>
			</div>
		</div>
		);
	}

}