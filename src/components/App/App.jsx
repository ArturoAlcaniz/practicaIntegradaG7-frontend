import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route, Redirect } from "react-router-dom";
import Centros from '../Centros';
import FormularioCentros from '../FormularioCentros';
import Usuarios from '../Usuarios';
import FormularioUsuarios from '../FormularioUsuarios';
import Appointment from '../Appointment';
import Login from '../Login';
import FormularioConfiguracion from '../FormularioConfiguracion';
import FormularioModificarUsuario from '../FormularioModificarUsuario';
import ModificarCita from '../ModificarCita';
import ListaVacunacion from '../ListaVacunacion';
import NotAllowed from '../NotAllowed';
import ModificarCentro from '../ModificarCentro';

function App() {
	
	return (<Router>
		<div className="App">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink id="navConf" className="nav-link" to="/Configuracion" activeClassName="nav-link active">
									Configuracion
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink id="navCentros" className="nav-link" to="/Centros" activeClassName="nav-link active">
									Centros
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink id="navUsers" className="nav-link" to="/Usuarios" activeClassName="nav-link active">
									Usuarios
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink id="navCita" className="nav-link" to="/Appointment" activeClassName="nav-link active">
									Pedir cita
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink id="navLsVac" className="nav-link" to="/ListaVacunacion" activeClassName="nav-link active">
									Lista de vacunacion
								</NavLink>
							</li>
						</ul>
					</div>
					<div>
						<ul className="navbar-nav">
							<li id="navNombre" className="nav-link"></li>
							<li id="navCentro" className="nav-link"></li>
							<li className="nav-item">
								<NavLink id="navLogin" className="nav-link" to="/Login" activeClassName="nav-link active">	
								</NavLink>
							</li >
						</ul>
					</div>
					<div>
						<ul id="navLogOut" className="navbar-nav">
						</ul>
					</div>
				</div>
			</nav>
			<Switch>
				<Route path='/Centros' exact component={Centros} />
				<Route path='/Usuarios' exact component={Usuarios} />
				<Route path='/Appointment' exact component={Appointment} />
				<Route path='/FormularioCentros' exact component={FormularioCentros} />
				<Route path='/FormularioUsuarios' exact component={FormularioUsuarios} />
				<Route path='/ModificarCita' exact component={ModificarCita} />
				<Route path='/Login' exact component={Login} />
				<Route path='/Configuracion' exact component={FormularioConfiguracion} />
				<Route path='/modifyUser' exact component={FormularioModificarUsuario} />
				<Route path='/ListaVacunacion' exact component={ListaVacunacion} />
				<Route path='/notAllowed' exact component={NotAllowed} />
				<Route path='/ModificarCentro' exact component={ModificarCentro} />
				<Redirect exact from="/" to="/Login" />
			</Switch>
		</div>
	</Router>);
}


export default App;