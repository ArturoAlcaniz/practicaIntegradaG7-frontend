import React, {useState, useEffect} from 'react';
import logo from '../../utils/images/logo.svg';
import './App.css';
import env from "react-dotenv";

function App () {
    const [message, setMessage] = useState("")
	
    useEffect(() => {
        fetch(env.API_URL+'/hello')
            .then(response => response.text())
            .then(response => {
                setMessage(response);
            });
    },[])
    
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">{message}</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    )
}

export default App;