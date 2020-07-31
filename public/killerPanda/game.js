const socket = io();
const room_input = document.getElementById("roomid");
const signup_btn = document.getElementById("signup-btn");
room_input.addEventListener("input", function() {
    signup_btn.innerText = (room_input.value.length === 0) ? "Create Game":"Join Game";
});

const form = document.getElementById("signup-form"); 
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    //Check for empty name
    if (event.target.name.value === "") { 
        const main = document.getElementById("main");
        const error_msg = document.createElement("label");
        error_msg.style = "color: red; font-size: 20px;"
        error_msg.innerText = "Name cannot be empty";
        main.appendChild(error_msg);
        return;
    }

    //request server to join game
    if (event.target.roomid.value === "") {
        socket.emit("Create Game", {name:event.target.name.value});
    } else {
        socket.emit("Join Game", {
            name:event.target.name.value,
            room:event.target.room.value
        }); 
    }

    //
}