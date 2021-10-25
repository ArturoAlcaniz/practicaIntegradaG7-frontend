import React from 'react';
import './App.css';
import {BrowserRouter as Router}  from "react-router-dom";

function App () {
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
			          <a className="nav-link active" aria-current="page" href="/Centros">Centros</a>
			        </li>
					<li className="nav-item">
			          <a className="nav-link active" aria-current="page" href="/Usuarios">Usuarios</a>
			        </li>
					<li className="nav-item">
			          <a className="nav-link active" aria-current="page" href="/Appointment">Pedir cita</a>
			        </li>
			      </ul>
			    </div>
			  </div>  
           </nav>
        </div>
    </Router>);
}

export default App;