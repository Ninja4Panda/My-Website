import React from 'react';
import './App.css';
import socket from 'socket.io-client';
import Form from './component/SignupForm/SignupForm.js' 
import NavBar from './component/NavBar/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const io = socket()

  return (
    <div className="App">
      {/* <NavBar /> */}
      <header className="App-header">
        <div id="lobby"></div>
        <Form id="form" io={io}/>
        <div id="error"></div>
      </header>
    </div>
  );
}

export default App;
