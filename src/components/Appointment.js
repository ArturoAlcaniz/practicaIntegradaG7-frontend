import React, {Component, useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import env from "react-dotenv";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';



export default class Appointment extends Component {
	constructor(props){
		super(props);
		this.state = {
				user: "PRUEBA",
				citas:[],
				msgAppointFail: "",
				msgAppointOk: "",
				
				
		}
	}
	
	

	obtenerDatos(thisComponent){
		async function getCitas(){
				let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/obtener', {
			method: "GET"
		});
		
		let json = await answer.text();
		thisComponent.setState({citas: JSON.parse(json)})
		}
		getCitas();
	}

	handlePetition(event) {
		event.preventDefault()
		async function makeReserve(thisComponent) {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/create', 
				{ method: "POST" }
			);
			
			let response = (await answer.json());
			
			if (response.status === "200") {
				thisComponent.setState(
					{ msgAppointOk: response.message
					, msgAppointFail: ""
					}
				)
			}else {
				thisComponent.setState(
					{ msgAppointOk: ""
					, msgAppointFail: response.message
					}
				)
			}
			

		}
		makeReserve(this)
	}
	
	

	render() {
		
		

		
		return (
				 
			 
				<div className="auth-wrapper">
				<div className="container-sm">
				<div className="card">
				<form className="align-items-center" onSubmit={this.handlePetition.bind(this)}>
					<h3></h3>
					<h3></h3>
					<h3>Reservar cita</h3>
					<div className="text-center">
					
					<button id="SubmitButton" type="submit" className="btn  btn-primary btnblock">Pedir cita</button>
					</div>
					<div><label></label></div>
					<div className="text-success d-block text-center">{this.state.msgAppointOk}</div>
					<div className="text-danger d-block text-center">{this.state.msgAppointFail}</div>
				</form>
				
				
					<h3>Mis Citas</h3>
					
				
                   
					<div className="card-body">
                            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                <div className="dataTable-container">
					<table className="table table-hover">
                                        <thead>
										<tr>
                                            <th>Centro</th>
                                            <th>Fecha</th>
                                            <th></th>
										</tr>
                                        </thead>
                                        <tbody>
                                            {this.state.citas.map((listValue, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{listValue.centroNombre}</td>
                                                        <td>{listValue.fecha}</td>
                                                        <td>		
													<ModificarCita dataCita={[listValue.dni, listValue.centroNombre, listValue.fecha]}/>										        
													</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
</div>
                    </div>
                </div>
					</div>
                </div>
					
					<div className="text-center">
						
					</div>
					
				
				
				</div>
					
				
				
				
				
		);
	}
	
	
	componentDidMount(){
		this.obtenerDatos(this);
	}
	
	componentDidUpdate(){
		this.obtenerDatos(this);
	}
}


function ModificarCita({dataCita}){
	
	let dniCita = dataCita[0];
	let centroCita = dataCita[1];
	let fechaCita = dataCita[2];
	
	const handleClick = () => {
    	localStorage.setItem("dniCita",dniCita);
		localStorage.setItem("centroCita",centroCita);
		localStorage.setItem("fechaCita",fechaCita);
	
  }
	
	
	return (
		<Button href="/ModificarCita" onClick={handleClick}>Modificar cita</Button>	
	)
}



function ModificarBoton({dataCita}) {
	
	
	const handleModificarCita = () => {
		
		
		
		async function modificarCita() {
			
			let answer = await fetch(env[process.env.NODE_ENV+'_API_URL']+'/citas/modify', {
				method: "POST",
				body: JSON.stringify({dni: dataCita[0], centro: dataCita[1], fechaAntigua: dataCita[2], fechaNueva: dataCita[3]}),
				headers: { 
					'Accept': 'application/json',
					'Content-Type': 'application/json' 
				}
			});
			let response = await answer.json();
			
			console.log(response);
			dataCita[4] = response;
			return dataCita;
		
		}
		
		return modificarCita();
	
	
	
	}
	
  const [show, setShow] = useState(false);

  const handleClose = () => {
		
		setShow(false);
	}
	
	const handleSave = async () => {
		
		dataCita[3]=document.getElementById("FechaCita").value;
		
		dataCita = await handleModificarCita();
		
		var response = dataCita[4].status;
		if (!response === '200'){
			console.log("JEJE");
			setShow(false);
		}else{
			console.log("maricon");
	
		}
		
		
		
	}
	
  const handleShow = () => setShow(true);
	
	
	
	
	
	
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modificar cita
      </Button>

      
      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    show={show} onHide={handleClose}>
    
        <Modal.Body>Introduce una nueva fecha para tu cita</Modal.Body>

		<form>
							<div className="form-group">
								<input id="FechaCita" className="form-control" placeholder="" defaultValue={dataCita[2]}
									/>
							</div>
							
							</form>
		
        <Modal.Footer>
			
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


