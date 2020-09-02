import { updateGame } from "../ioController.js";

/**
 * Create the left side of the lobby
 * @param {Object} socket     - Client socket object
 */
export function buildLeft(socket) {
    //Creates the left side div 
    const main = document.getElementById("lobby");
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid ; grid-template-columns:repeat(4,1fr); align-items: center; flex-grow: 8;";
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
        case 0: //A New player joined
            createAvator(data.name, data.uid);
            break;
        case 1: //Flip
            flipCard(data.role, data.uid);
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
    slot.style = "text-align: center;";
    
    //Create player avator
    const avator = document.createElement("img");
    avator.id = "img-" + uid;
    avator.src = "/assests/q.jpg";
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
        case 2: //police
            img.src = "/assests/police.png";
            break;
        case 3: //witch
            img.src = "/assests/witch.png"
            break;
    }
}