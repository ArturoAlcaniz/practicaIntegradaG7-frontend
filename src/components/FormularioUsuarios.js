import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import env from"react-dotenv";


export default class FormularioUsuarios extends Component {

	constructor(props) {
		super(props);
		this.state = {
				dni:"",
				rol:"",
				nombre:"",
				apellidos:"",
				email: "",
				centro:"",
				password: "",
				centros: [],
				msgLoginResultOk: "",
				msgLoginResultFail: ""
		}
	}
	handleCrearUsuario(event) {
		event.preventDefault()
		async function makeUsuarios(thisComponent) {
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/post', {
				method: "POST",
				body: JSON.stringify({dni: thisComponent.state.dni, nombre: thisComponent.state.nombre, apellidos: thisComponent.state.apellidos, email: thisComponent.state.email, password: thisComponent.state.password, centro: thisComponent.state.centro, rol: thisComponent.state.rol}),
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
			}console.log(answer);
		}

		makeUsuarios(this)
	}
	
	obtenerNombre(thisComponent){
		async function getUsuarios(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/obtenerNombre', {
			method: "GET"
		});
		
		let json = await answer.text();
		console.log(JSON.parse(json))
		thisComponent.setState({centros: JSON.parse(json)})
		}
		console.log(this.state.centros)
		
		getUsuarios();
	}

	 
	render() {
		return (
			<div className="auth-wrapper">
				<div className="auth-inner">
					<form onSubmit={this.handleCrearUsuario.bind(this)}>
						<h3>Nuevo Usuario</h3>
						<div className="form-group">
							<label>DNI</label>
							<input type="dni" className="form-control" placeholder="Introduzca DNI"
								onChange={e => this.setState({ dni: e.target.value })} />
						</div>
						<div className="form-group">
							<label htmlFor="exampleFormControlSelect1">Rol</label>
							<select className="form-control" id="exampleFormControlSelect1"
								onChange={e => this.setState({ rol: e.target.value })}>
								<option>Selecciona un rol</option>
								<option>Paciente</option>
								<option>Sanitario</option>
								<option>Administrador</option>
							</select >
						</div>
						<div className="form-group">
							<label>Nombre</label>
							<input type="nombre" className="form-control" placeholder="Introduzca Nombre"
								onChange={e => this.setState({ nombre: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Apellidos</label>
							<input type="apellidos" className="form-control" placeholder="Introduzca Apellidos"
								onChange={e => this.setState({ apellidos: e.target.value })} />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="email" className="form-control" placeholder="Introduzca Email"
								onChange={e => this.setState({ email: e.target.value })} />
						</div>
						<div className="form-group">
							<label htmlFor="exampleFormControlSelect1">Centro</label>
							<select className="form-control" id="exampleFormControlSelect1"
							onChange={this.state.centros.map((listValue, index) => {
												return (
													<option key={index}>{listValue}</option>	
												);
											})}>
							</select >
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="Introduzca Password"
								onChange={e => this.setState({ password: e.target.value })} />
						</div>
						<div className="invalid-feedback d-block">{this.state.msgLoginResultFail}</div>
						<div className="valid-feedback d-block">{this.state.msgLoginResultOk}</div>
						<button type="submit" className="btn btn-primary btn-block">Crear usuario</button>
					</form>
				</div>
			</div>
		);
	}
	componentDidMount(){
		this.obtenerNombre(this);
	}

}