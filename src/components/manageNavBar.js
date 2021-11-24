import { Redirect } from 'react-router-dom';
import React from "react";

export default function manageNavBar() {
	try {
		document.getElementById("navConf").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
		document.getElementById("navCentros").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
		document.getElementById("navUsers").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
		document.getElementById("navCita").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "paciente");
		document.getElementById("navLsVac").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "sanitario");
	} catch(err) {
		if (err instanceof TypeError) {
			document.getElementById("navConf").hidden = true;
			document.getElementById("navCentros").hidden = true;
			document.getElementById("navUsers").hidden = true;
			document.getElementById("navCita").hidden = true;
			document.getElementById("navLsVac").hidden = true;
			document.getElementById("navLogin").hidden = false;
		    document.getElementById("btnLO").hidden = true;
		    document.getElementById("navCentro").innerHTML = "";
		    document.getElementById("navNombre").innerHTML = "";
			return <Redirect to={{
				pathname: '/notAllowed',
				state: { prevMssg: "No esta logeado" }
			}}
			/>
		  }
	}
    let roles = ["administrador", "paciente", "sanitario"];
    document.getElementById("navLogin").hidden = (roles.includes(sessionStorage.getItem("rol").toLowerCase()));
    document.getElementById("btnLO").hidden = !(roles.includes(sessionStorage.getItem("rol").toLowerCase()));
    document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
    document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();
}