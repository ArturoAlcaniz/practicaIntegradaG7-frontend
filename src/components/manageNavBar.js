export default function manageNavBar() {
    document.getElementById("navConf").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
    document.getElementById("navCentros").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
    document.getElementById("navUsers").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "administrador");
    document.getElementById("navCita").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "paciente");
    document.getElementById("navLsVac").hidden = (sessionStorage.getItem("rol").toLowerCase() !== "sanitario");
    let roles = ["administrador", "paciente", "sanitario"];
    document.getElementById("navLogin").hidden = (roles.includes(sessionStorage.getItem("rol").toLowerCase()));
    document.getElementById("btnLO").hidden = !(roles.includes(sessionStorage.getItem("rol").toLowerCase()));
    document.getElementById("navCentro").innerHTML = "Centro: " + sessionStorage.getItem("centro");
    document.getElementById("navNombre").innerHTML = (sessionStorage.getItem("nombre")).toUpperCase();
}