import { buildLeft } from "./buildLeft.js";
import { buildRight } from "./buildRight.js"

/**
 * Load the lobby based on who the player is
 * @param {Object} socket     - Current client's socket 
 * @param {string} roomid     - Current Game roomid 
 * @param {int} whoami        - owner=0, players=1, spectator=2
 * @param {Array} curPlayers  - A list of current player objects
 */
export function loadLobby(socket, roomid, whoami, curPlayers) {
    //Remove all sign-up html and show roomid
    document.getElementById("signup").remove();
    const roomLable = document.getElementById("roomid");
    roomLable.innerText = "Room id: " + roomid;
    roomLable.style.display = "";

    //Create the lobby 
    const main = document.getElementById("main");
    const lobby = document.createElement("div");
    lobby.id = "lobby";
    lobby.style = "display: flex; flex-direction: row; align-items: center; margin: 30px;";
    main.appendChild(lobby);

    buildLeft(socket, curPlayers);
    buildRight(socket, roomid, whoami);
}
