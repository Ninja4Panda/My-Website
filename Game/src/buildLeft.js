import { updateGame } from "../ioController.js";
import { doAfter } from "../src/loadLobby.js";

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
 * @param {int} event   - Event received from server
 * @param {Object} data - Data received from server 
 */
function updateAvator(event, data) {
    switch(event) {
        case 0: //A New Player Joined
            createAvator(data.name, data.uid);
            break;
        case 1: //Show Role
            flipCard(data.role, data.uid);
            break;
        case 2: //A Client Disconnected
            clientDis(data.uid);
            break;
        case 3: //Forced Disconnect
            forcedDis(data.msg);
            break;
    }       
}

/**
 * Create an avator for the player
 * @param {String} player_name - Player name
 * @param {int} uid - uid that is used to identify the player
 */
function createAvator(player_name, uid) {
    //Create slots for each player
    const slot = document.createElement("div");
    slot.id = uid;
    slot.style = "text-align: center;";
    
    //Create player avator
    const avator = document.createElement("img");
    avator.id = "img-" + uid;
    avator.src = "/assests/unknown.jpg";
    avator.width = "200";
    avator.height = "300";
    slot.appendChild(avator);
    
    //Create player name
    const name = document.createElement("p");
    name.innerText = player_name;
    name.style.color = "white";
    slot.appendChild(name);
 
    //Add to the leftside
    const left = document.getElementById("players");
    left.appendChild(slot); 
}

/**
 * Flip the card of a player based on the index 
 * @param {int} role  - Role of the player 
 * @param {int} uid   - uid of the player 
 */
function flipCard(role, uid) {
    const img = document.getElementById("img-"+uid);
    switch(role) {
        case 0: //innocents
            img.src = "/assests/innocent.png";
            break;
        case 1: //mafia
            img.src = "/assests/mafia.png";
            break;
        case 2: //detective
            img.src = "/assests/detective.png";
            break;
        case 3: //doctor
            img.src = "/assests/doctor.png";
            break;
    }
}

/**
 * Handles when a client is forced disconnected.
 * Display error msg & reload the page
 * @param {String} msg 
 */
function forcedDis(msg) {
    let timeleft = 5;
    
    document.getElementById("lobby").remove();
    const main = document.getElementById("main");
    const error = document.createElement("h2");
    error.style = "color: red; text-align: center; margin: 60px";
    error.innerText = msg + ", redirecting back to signup page in " + timeleft;
    main.appendChild(error);

    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            //Reload the webpage
            location.reload();
        }
        timeleft -= 1;
        error.innerText = msg + ", redirecting back to signup page in " + timeleft;
    }, 1000);
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
    doAfter(5, ()=>{
        alert.remove();
    });
}

