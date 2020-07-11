import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import socket from 'socket.io-client';
import Form from './component/SignupForm/SignupForm.js' 
import NavBar from './component/NavBar/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const io = socket()
  useEffect(() => {
    io.emit('msg', 'hiiii');
  })

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
      </header> */}
        <NavBar className="header"/>

        <Form className="split"/>
    </div>
  );
}

export default App;
