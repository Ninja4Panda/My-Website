import { updateGame } from "../ioController.js";
import { createAvator, clickableAvator, flipAvator } from "./buildAvator.js";

/**
 * Create the left side of the lobby
 * @param {Object} socket     - Client socket object
 */
export function buildLeft(socket) {
    //Creates the left side div 
    const lobby = document.getElementById("lobby");
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid; grid-template-columns:repeat(4,5fr); align-items: center; flex-grow: 8;";
    lobby.appendChild(left);
    //Update the game as state changes
    updateGame(socket, updateAvator);
}

/**
 * Update avator base on the event
 * @param {int} event     - Event received from server
 * @param {Object} socket - Client socket object
 * @param {Object} data   - Data received from server 
 */
function updateAvator(event, socket, data) {
    switch(event) {
        case 0: //A New Player Joined
            createAvator(data.name, data.uid);
            break;
        case 1: //Show Role
            flipAvator(data.role, data.uid);
            break;
        case 2: //A Client Disconnected
            clientDis(data.uid);
            break;
        case 3: //Please Vote
            clickableAvator(data.timer, socket);
            break;
        case 4: //Revive Potion
            createModal(socket, data.msg, data.timer, revive, notRevive);
            break;
    }       
}

/**
 * Revive 
 * @param {Object} socket - Client socket object
 */
function revive({socket}) {
    socket.emit("Save", ({save:true}));
}

/**
 * Don't Revive 
 * @param {Object} socket - Client socket object
 */
function notRevive({socket}) {
    socket.emit("Save", ({save:false}));
}

/**
 * Remove the client that was disconnected and let every other client knows that he/she is disconnected 
 * @param {int} uid - uid of client
 */
function clientDis(uid) {
    //Get the name of client then remove the element
    const div = document.getElementById(uid);
    const name = div.children[1].innerText;
    div.remove();

    //Construct the divs
    const alert = document.createElement("div");
    alert.innerText = name + " disconnected";
    alert.className = "alert alert-danger";
    alert.style = "text-align: center";
    alert.id = "error";

    const main = document.getElementById("main");
    main.appendChild(alert);
    
    //remove the error msg after 5s
    setTimeout(()=>{
        alert.remove();
    }, 5000);
}