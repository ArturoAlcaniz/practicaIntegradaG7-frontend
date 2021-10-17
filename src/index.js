import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Appointment from './components/appointment'
import "./utils/styles/index.css";
import App from "./components/App/App.js";
function Routing() {
	return (
			<div>
			<App />
			<Router>
			<Route path="/appointment" exact component={Appointment} />
			</Router>
			</div>
	)
}
ReactDOM.render(<Routing />,
		document.getElementById("root"))