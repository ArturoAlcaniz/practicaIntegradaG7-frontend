import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App/App';
import Centros from './components/Centros'

function Routing() {
	return (
		<div>
			
			<App />
			<Router>
				<Route path="/Centros" exact component={Centros} />
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