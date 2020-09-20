import { updateGame } from "../ioController.js";
import { createAvator, clickableAvator, flipAvator } from "./buildAvator.js";
import { createModal,closeModal } from "./buildModal.js";

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
            reviveLogic(socket, data.msg, data.timer);
            break;
    }       
}

/**
 * Creates a modal & a timer
 * @param {Object} socket - Client socket object
 * @param {String} msg    - Message to display in the Modal
 * @param {int} timer     - Time user has to decide
 */
function reviveLogic(socket, msg, timer) {
    //Create the modal
    createModal(socket, msg, "No one", revive, notRevive);

    //Create the timer
    const main = document.getElementById("main");
    let timeleft = timer;
    const alert = document.createElement("h2");
    alert.id = "timer";
    alert.style = "color: red; text-align: center;";
    alert.innerText = timeleft + "s left to vote";
    main.appendChild(alert);

    //Remove div when time is up
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            alert.remove();
            closeModal();
            socket.emit("Save", ({save:false}));
        }
        timeleft -= 1;
        alert.innerText = timeleft + "s left to vote";
    }, 1000);

    //End timer  
    socket.on("End Save Timer", ()=> {
        div.remove();
        closeModal();
        clearInterval(x);
    });
}

/**
 * Callback when user decided to revive 
 * @param {Object} socket - Client socket object
 */
function revive(socket) {
    socket.emit("Save", ({save:true}));
    const alert = document.getElementById("timer");
    if(alert) alert.remove();
}

/**
 * Callback when user decided not to revive 
 * @param {Object} socket - Client socket object
 */
function notRevive(socket) {
    socket.emit("Save", ({save:false}));
    const alert = document.getElementById("timer");
    if(alert) alert.remove();
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