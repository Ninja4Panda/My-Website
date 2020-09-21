import { loadLobby } from "./loadLobby.js";

//Responsive button
const room_input = document.getElementById("roomid-input");
const signup_btn = document.getElementById("signup-btn");
room_input.addEventListener("input", function() {
    signup_btn.innerText = (room_input.value.length === 0) ? "Create Game":"Join Game";
});

const socket = io();
const form = document.getElementById("signup-form"); 
form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = event.target['name-input'].value;
    const roomid = event.target['roomid-input'].value;
    
    //Check for empty name
    if (name === "") { 
        const error_msg = document.getElementById("error-msg");
        error_msg.style = "color: red; font-size: 20px;";
        error_msg.innerText = "Please at least tell me your name 🐵";
        return;
    }
    
    //Check for empty roomid 
    if (roomid === "") {
        socket.emit("Create Game", {name:name});
    } else {
        socket.emit("Join Game", {name:name, roomid:roomid});
    }
});

//As of now Create Game always return true as status 
socket.once("Create Game Status", ({status, roomid, clock}) => {
    if(status) {
        loadLobby(socket, roomid, 0, clock);
    }
});

//Client trys to join game 
socket.on("Join Game Status", ({status, msg, roomid, whoami, clock}) => {
    if(status) {
        loadLobby(socket, roomid, whoami, clock);
    } else {
        const error_msg = document.getElementById("error-msg");
        error_msg.style = "color: red; font-size: 20px;";
        error_msg.innerText = msg+" 🙈";
    }
});