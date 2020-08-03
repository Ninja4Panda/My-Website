import { updateGame } from "../ioController.js";

/**
 * Create the left side of the lobby
 * 
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
 * 
 * @param {int} event   - Event received from server
 * @param {Object} data - Data received from server 
 */
function updateAvator(event, data) {
    switch(event) {
        case 0: //A New player joined
            const {player} = data;
            createAvator(player);
            break;
        case 1: //Game Started
            const {role} = data;
            switch(role) {
                case 0:
                    alert("innocents");
                    break;
                case 1:
                    alert("mafia");
                    break;
                case 2:
                    alert("police");
                    break;
                case 3:
                    alert("witch");
                    break;
            }
            break;
        case 2: //Flip
            break;
    }       
}

function createAvator(client) {
    //Create slots for each player
    const slot = document.createElement("div");
    slot.style = "text-align: center;";
    
    //Create player avator
    const avator = document.createElement("img");
    avator.src = "/assests/q.jpg";
    avator.width = "200";
    avator.height = "300";
    slot.appendChild(avator);
    
    //Create player name
    const name = document.createElement("p");
    name.innerText = client.name;
    name.style.color = "white";
    slot.appendChild(name);
 
    //Add to the leftside
    const left = document.getElementById("players");
    left.appendChild(slot); 
}