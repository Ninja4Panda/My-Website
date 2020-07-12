import React, {useState} from 'react';
import './SignupForm.css';
import Lobby from '../Lobby/Lobby';

function showlobby() {
  const form = document.getElementById("signup");
  form.style.display = "none";
  const lobby = document.getElementById("lobby");
  lobby.style.display = "";
}

export default function SignupForm({io}) {
  const [button, setbutton] = useState("Create Game");

  function handleChange() {
    const userInput = document.getElementById("room");
    setbutton((userInput.value === "") ? "Create Game":"Join Game");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (button === "Join Game") {
      io.emit("Join Game", { 
        name:event.target.name.value, 
        room:event.target.room.value
      });
    } else {
      io.emit("Create Game", {name:event.target.name.value});
    }

    io.on("Game Status", (status)=> {
      if(status) {
        showlobby();
      } else {
        alert("no such room");
      }
    });
  }

  return (
    <>
      <form id="signup" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Nickname"/>
        <input type="text" id="room" placeholder="Room id (Optional)" onChange={handleChange}/>
        <input className="button" type="submit" value={button}/>
      </form>
      <div id="lobby" style={{display:"none"}}>
        <Lobby io={io}/>
      </div>
    </>
  );
}
