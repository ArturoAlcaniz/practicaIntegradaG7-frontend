import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";


export default class FormularioModificarUsuario extends Component {

	constructor(props) {
		super(props);
		this.state = {
				centros: [],
				email: props.location.state.user.email,
				dni: props.location.state.user.dniDenc,
				nombre:props.location.state.user.nombre,
				apellidos:props.location.state.user.apellidos,
				centro: props.location.state.user.centro.nombre,
				rol: props.location.state.user.rol,
				password: ""
		}
		console.log(props.location.state.user);
	}
	handleModUsuario(event) {
		event.preventDefault()
		async function modUsuarios(thisComponent) {
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/usuario/modify', {
				method: "POST",
				body: JSON.stringify({email: thisComponent.state.email, 
					dni: thisComponent.state.dni, 
					nombre: thisComponent.state.nombre, 
					apellidos: thisComponent.state.apellidos, 
					password: thisComponent.state.password, 
					centro: thisComponent.state.centro,
					rol: thisComponent.state.rol
					}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = (await answer.json());
			if (response.status === "200") {
				thisComponent.setState(
						{ msgLoginResultOk: "Usuario creado correctamente"
							, msgLoginResultFail: ""})
			}else{
				thisComponent.setState(
						{ msgLoginResultOk: ""
							, msgLoginResultFail: "Error al crear usuario"})
			}
		}

		modUsuarios(this)
	}
	
	obtenerDatos(thisComponent){
		async function getUsuarios(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/centros/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({centros: JSON.parse(json)})
		}
		getUsuarios();
	}
	
	render() {
		return (
			<div className="auth-wrapper">
				<div className="auth-inner">
					<form onSubmit={this.handleModUsuario.bind(this)}>
						<h3>Modificar Usuario</h3>
						<div className="form-group">
							<label>DNI</label>
							<input type="dni" className="form-control" value={this.state.dni}
								onChange={e => this.setState({ dni: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Nombre</label>
							<input type="nombre" className="form-control" value={this.state.nombre}
								onChange={e => this.setState({ nombre: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Apellidos</label>
							<input type="apellidos" className="form-control" value={this.state.apellidos}
								onChange={e => this.setState({ apellidos: e.target.value })} />
						</div>
						<div className="form-group">
							<label htmlFor="exampleFormControlSelect1">Centro</label>
							<select className="form-control" id="exampleFormControlSelect1" value={this.state.centro}
							onChange={e => this.setState({ centro: e.target.value })}>
								{this.state.centros.map((listValue, index) => {
									return (
										<option key={index}>{listValue.nombre}</option>
									);
								})}
							</select >
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" onChange={e => this.setState({ password: e.target.value })} />
						</div>
						<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
						<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
						<button type="submit" className="btn btn-primary btn-block">Guardar usuario</button>
					</form>
				</div>
			</div>
		);
	}
	componentDidMount(){
		this.obtenerDatos(this);
	}

}