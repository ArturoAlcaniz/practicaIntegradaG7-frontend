import React, {Component, useState, show, handleClose, handleShow} from "react";
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
	
	modificarFecha(event) {
		var fecha =  event.target.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
		console.log(fecha);
		
		
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
													<Example  dataFecha={listValue.fecha}/>											        
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
}












function Example({dataFecha}) {
	
	//var fecha = event.target.parentNode.parentNode.parentNode.getElementsByTagName("td")[1].innerHTML;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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
								<input id="FechaCita" className="form-control" placeholder="" defaultValue={dataFecha}
									/>
							</div>
							
							</form>
		
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}











function ModificarCitaModal(){
	
		
		const [show, setShow] = useState(false);

  const handleClose = () => {
			console.log(document.getElementById("FechaCita").value);
			setShow(false)};
  const handleShow = () => setShow(true);
	
;
 
return (
	<>

      <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    show={show} onHide={handleClose}>
    
        <Modal.Body>Introduce una nueva fecha para tu cita</Modal.Body>

		<form>
							<div className="form-group">
								<input id="FechaCita" className="form-control" placeholder="" defaultValue=""
									/>
							</div>
							
							</form>
		
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</>
);
		
	}
