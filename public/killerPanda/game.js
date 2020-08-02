import { loadLobby } from "./loadLobby.js";

//Responsive button
const room_input = document.getElementById("roomid");
const signup_btn = document.getElementById("signup-btn");
room_input.addEventListener("input", function() {
    signup_btn.innerText = (room_input.value.length === 0) ? "Create Game":"Join Game";
});

const socket = io();
const form = document.getElementById("signup-form"); 
form.addEventListener("submit", (event) => {
    event.preventDefault();
    //Check for empty name
    if (event.target.name.value === "") { 
        const error_msg = document.getElementById("error-msg");
        error_msg.style = "color: red; font-size: 20px;";
        error_msg.innerText = "Please at least tell me your name 🐵";
        return;
    }
    
    //Check for empty roomid 
    if (event.target.roomid.value === "") {
        socket.emit("Create Game", {name:event.target.name.value});
        //As of now Create Game always return true as status 
        socket.on("Create Game Status", ({status, roomid}) => {
            if(status) {
                loadLobby(event.target.name.value, socket, roomid, 0);
            }
        });
    } else {
        socket.emit("Join Game", {
            name:event.target.name.value,
            roomid:event.target.roomid.value
        }); 
        socket.on("Join Game Status", ({status, whoami}) => {
            if(status) {
                loadLobby(event.target.name.value, socket, event.target.roomid, whoami);
            } else {
                const error_msg = document.getElementById("error-msg");
                error_msg.style = "color: red; font-size: 20px;";
                error_msg.innerText = "Room doesn't exits 🙈";
            }
        });
    }
});