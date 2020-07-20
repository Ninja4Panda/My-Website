import React, {useState, useEffect} from 'react';
import './SignupForm.css';
import Lobby from '../Lobby/Lobby';

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
      const lobby = document.getElementById("errorName");
      lobby.style.display = "";
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
        const form = document.getElementById("signup");
        form.style.display = "none";
        const logo = document.getElementsByClassName("App-logo");
        logo[0].style.display = "none";
        const room = data.roomid; 
        console.log(data.roomid)
        console.log(room)
        
        const lobby = document.getElementById("lobby");
        lobby.style.display = "";
      } else {
        const error = document.getElementById("errorRoom");
        error.style.display = "";
      }
    });
  }

  return (
    <>
      <div id="lobby" style={{display:"none"}}>
        <Lobby prop={io}/>
      </div>
      <form id="signup" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Nickname"/>
        <input type="text" id="room" placeholder="Room id (Optional)" onChange={handleChange}/>
        <p id="errorName" style={{display:"none", color:"red"}}>Name can't be empty</p>
        <p id="errorRoom" style={{display:"none", color:"red"}}>No such room</p>
        <input className="button" type="submit" value={button}/>
      </form>
    </>
  );
}
