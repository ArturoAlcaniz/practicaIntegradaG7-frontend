import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import '../src/utils/styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App/App';
import Centros from './components/Centros';
import FormularioCentros from './components/FormularioCentros';

function Routing() {
	return (
		<div>
			<App />
			<Router>
				<Route path="/Centros" exact component={Centros} />
				<Route path="/FormularioCentros" exact component={FormularioCentros} />
			</Router>
		</div>
	)
}

ReactDOM.render(<Routing />,
	document.getElementById("root"))


reportWebVitals();