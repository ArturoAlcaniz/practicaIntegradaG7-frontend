import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';
import '../src/utils/styles/index.css';

import App from './components/App/App';
import Usuarios from './components/Usuarios';
import FormularioUsuarios from './components/FormularioUsuarios';

function Routing() {
	return (
		<div>
			<App />
			<Router>
				<Route path="/Usuarios" exact component={Usuarios} />
				<Route path="/FormularioUsuarios" exact component={FormularioUsuarios} />
			</Router>
		</div>
	)
}

ReactDOM.render(<Routing />,
	document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();