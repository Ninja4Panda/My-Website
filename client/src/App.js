import React from 'react';
import logo from './logo.svg';
import './App.css';
import socket from 'socket.io-client';
import Form from './component/SignupForm/SignupForm.js' 
import NavBar from './component/NavBar/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const io = socket()

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <Form io={io}/>
      </header>
    </div>
  );
}

export default App;
