import { updateGame } from "../ioController.js";

let imgId = 1;
/**
 * Create the left side of the lobby
 * @param {Object} socket     - Client socket object
 * @param {Array} curPlayers  - A list of current player objects
 */
export function buildLeft(socket, curPlayers) {
    //Creates the left side div 
    const main = document.getElementById("lobby");
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid ; grid-template-columns:repeat(4,1fr); align-items: center; flex-grow: 8;";
    lobby.appendChild(left);

    //Create all players in game
    curPlayers.forEach(createAvator);
    
    //Update the game as more clients join
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
            const {name} = data;
            createAvator(name);
            break;
        case 1: //Flip
            const {role, index} = data;
            flipCard(role, index);
            break;
    }       
}

/**
 * Create an avator for the player
 * @param {String} player_name - Player name
 */
function createAvator(player_name) {
    //Create slots for each player
    const slot = document.createElement("div");
    slot.style = "text-align: center;";
    
    //Create player avator
    const avator = document.createElement("img");
    avator.id = "img-" + imgId;
    imgId++;
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
 * @param {int} index - Index of the player 
 */
function flipCard(role, index) {
    const img = document.getElementById("img-"+index);
    switch(role) {
        case 0: //innocents
            img.src = "/assests/innocent.png";
            break;
        case 1: //mafia
            alert("mafia");
            img.src = "/assests/mafia.png";
            break;
        case 2: //police
            alert("police");
            img.src = "/assests/police.png";
            break;
        case 3: //witch
            alert("witch");
            img.src = "/assests/witch.png"
            break;
    }
}