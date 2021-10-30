import React from 'react';

import ReactDOM from 'react-dom';



import reportWebVitals from './reportWebVitals';

import '../src/utils/styles/index.css';

import 'bootstrap/dist/css/bootstrap.css';



import App from './components/App/App';




function Routing() {

    return (

        <div>

            <App />

        </div>

    )

}

ReactDOM.render(<Routing />,

    document.getElementById("root"))

    

reportWebVitals();