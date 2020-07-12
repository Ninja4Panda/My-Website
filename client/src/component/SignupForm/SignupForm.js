import React, {useState, useEffect} from 'react'
import './SignupForm.css';
import Lobby from '../Lobby/Lobby';

function showlobby() {
  const form = document.getElementById("signup")
  form.style.display = "none"
  const lobby = document.getElementById("lobby")
  lobby.style.display = ""
}

export default function SignupForm({io}) {
  const [button, setbutton] = useState("Create Game")

  function handleChange() {
    const userInput = document.getElementById("room")
    setbutton((userInput.value === "") ? "Create Game":"Join Game")
  } 

  function handleSubmit(event) {
    event.preventDefault()
    io.emit("room",event.target.room.value)
    io.emit("name",event.target.name.value)
    showlobby()
  }

  return (
    <>
      <form id="signup" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Nickname"/>
        <input type="text" id="room" placeholder="Room id (Optional)" onChange={handleChange}/>
        <input className="button" type="submit" value={button}/>
      </form>
      <div id="lobby" style={{display:"none"}}>
        <Lobby/>
      </div>
    </>
  )
}
