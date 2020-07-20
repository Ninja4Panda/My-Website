import React, {useState, useEffect} from 'react';
import './SignupForm.css';
import Lobby from '../Lobby/Lobby';
import ReactDOM from 'react-dom';
import logo from '../../logo.svg';

export default function SignupForm({io}) {
  const [button, setbutton] = useState("Create Game");

  //handle changes of the button text according to input
  function handleChange() {
    const userInput = document.getElementById("room");
    setbutton((userInput.value === "") ? "Create Game":"Join Game");
  }

  function handleSubmit(event) {
    event.preventDefault();
    //show error when name is blank
    if (event.target.name.value === "") { 
      ReactDOM.render(
        <p id="errorName" style={{color:"red"}}>Name cannot be empty</p>,
        document.getElementById('error')
      );
      return;
    }

    //request server to join game
    if (event.target.room.value === "") {
      io.emit("Create Game", {name:event.target.name.value});
    } else {
      io.emit("Join Game", { 
        name:event.target.name.value, 
        room:event.target.room.value
      });
    }

    //show lobby & hide signup if room is valid 
    io.on("Join Game Status", (data) => {
      if(data.status) {
        const form = document.getElementById("form");
        
        ReactDOM.render(
          <Lobby prop={io, data.roomid}/>,
          document.getElementById('lobby')
        );
      } else {
        ReactDOM.render(
          <p id="errorName" style={{color:"red"}}>No such room</p>,
          document.getElementById('error')
        );
      }
    });
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo"/>
      <form id="signup" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Nickname"/>
        <input type="text" id="room" placeholder="Room id (Optional)" onChange={handleChange}/>
        <input className="button" type="submit" value={button}/>
      </form>
    </>
  );
}
