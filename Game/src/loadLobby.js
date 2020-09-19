import { buildLeft } from "./buildLeft.js";
import { buildRight } from "./buildRight.js"

/**
 * Load the lobby based on who the player is
 * @param {Object} socket     - Current client's socket 
 * @param {string} roomid     - Current Game roomid 
 * @param {int} whoami        - owner=0, players=1, spectator=2
 * @param {int} clock         - Time left until all players gets kicked
 */
export function loadLobby(socket, roomid, whoami, clock) {
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
        
    //Start listening to forced disconnection
    socket.on("Forced Disconnect", ({msg}) => {
        forcedDis(msg);
    });

    socket.on("Forced Disconnect", ({msg}) => {
        forcedDis(msg)
    });
    
    buildLeft(socket);
    buildRight(socket, whoami, clock);
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

    const x = setInterval(()=>{
        if (timeleft <= 1) {
            clearInterval(x);
            //Reload the webpage
            location.reload();
        }
        timeleft -= 1;
        error.innerText = msg + ", redirecting back to signup page in " + timeleft;
    }, 1000);
}
