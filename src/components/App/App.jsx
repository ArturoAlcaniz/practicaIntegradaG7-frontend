import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import Centros from '../Centros';
import FormularioCentros from '../FormularioCentros';
import Usuarios from '../Usuarios';
import FormularioUsuarios from '../FormularioUsuarios';
import Appointment from '../Appointment';
import Cupos from '../Cupos';
import FormularioCupos from '../FormularioCupos';
import Login from '../Login';
import FormularioConfiguracion from '../FormularioConfiguracion';
import ModificarCita from '../ModificarCita';
import ListaVacunacion from '../ListaVacunacion';

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
								<NavLink className="nav-link" to="/Configuracion" activeClassName="nav-link active">
									Configuracion
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Cupos" activeClassName="nav-link active">
									Cupos
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Centros" activeClassName="nav-link active">
									Centros
</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Usuarios" activeClassName="nav-link active">
									Usuarios
</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Appointment" activeClassName="nav-link active">
									Pedir cita
</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/ListaVacunacion" activeClassName="nav-link active">
									Lista de vacunacion
</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Login" activeClassName="nav-link active">
									Login
</NavLink>
							</li>
							
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
				<Route path='/FormularioCupos' exact component={FormularioCupos} />
				<Route path='/ModificarCita' exact component={ModificarCita} />
				<Route path='/Cupos' exact component={Cupos} />
				<Route path='/Login' exact component={Login} />
				<Route path='/Configuracion' exact component={FormularioConfiguracion} />
				<Route path='/ListaVacunacion' exact component={ListaVacunacion} />
			</Switch>
		</div>
	</Router>);
}



export default App;