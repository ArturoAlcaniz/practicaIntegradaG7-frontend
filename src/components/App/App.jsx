import React from 'react';
import './App.css';
import {BrowserRouter as Router}  from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
function App () {
    return (<Router>
          <div className="App">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
			 
			  <div class="container-fluid">
			    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
			      <span class="navbar-toggler-icon"></span>
			    </button>

			    <div class="collapse navbar-collapse" id="navbarNavDropdown">
			      <ul class="navbar-nav">
			        <li class="nav-item">
			          <a class="nav-link active" aria-current="page" href="/">Home</a>
			        </li>
					 <li class="nav-item">
			          <a class="nav-link active" aria-current="page" href="/Centros">Centros</a>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
        </div>
    </Router>);
}

export default App;