import { doAfter } from "../src/loadLobby.js";
import { buildDescription } from "./buildDescription.js";

/**
 * Build right side of lobbys
 * @param {Object} socket - Current client's socket
 * @param {int} whoami    - owner=0, players=1, spectator=2
 * @param {int} clock     - Time left until all players gets kicked 
 */
export function buildRight(socket, whoami, clock) {
    //Create right side the (contents)
    const right = document.createElement("div");
    right.id = "contents";
    right.style = "display: flex; flex-flow: column wrap; align-items: center; flex-grow: 2";
    lobby.appendChild(right);

    //Create timer for lobby
    createTimer(right, clock);
    
    if (!whoami) {
        //Create Start Game button if owner
        const start_btn = document.createElement("button");
        start_btn.id = "start-game";
        start_btn.className = "btn btn-primary";
        start_btn.innerText = "Start Game"; 
        right.appendChild(start_btn);

        start_btn.addEventListener("click", (event) => {
            event.preventDefault();
            socket.emit("Start Game");
        }); 

        //Listen to the server respond
        socket.on("Start Game Status", ({status,msg}) => {
            startGame(socket, status, msg);
            if (status) start_btn.remove();
        });
    } else { //players or spectator
        socket.on("Start Game Status", ({status,msg}) => {
            startGame(socket, status, msg);
        });
    }
}

/**
 * Handle when owner tries to start game starts
 * @param {Object} socket
 * @param {Boolean} status 
 * @param {String} msg 
 */
function startGame(socket, status, msg) {
    if(status) {
        const timer = document.getElementById("timeout");
        timer.remove();

        buildDescription(socket);
        // buildChat(socket);
    } else {
        //failed and show msg
        const start_btn = document.getElementById("start-game");
        start_btn.disabled = "disabled";

        const alert = document.createElement("div");
        alert.innerText = msg;
        alert.className = "alert alert-danger";
        alert.style = "winCon_text-align: center";
        alert.id = "error";
        const main = document.getElementById("main");
        main.appendChild(alert);   

        //remove the error msg after 5s
        doAfter(5, ()=>{
            alert.remove();
            start_btn.disabled = "";
        });
    }
}

/**
 * Insert timer to parameter 
 * @param {Object} div - Insert timer to this div 
 * @param {int} clock  - Time left until all players gets kicked
 */
function createTimer(div, clock) {
    let timeleft = clock;
    
    //Create timer for lobby
    const timer = document.createElement("p");
    timer.id = "timeout"
    timer.style = "color: red;";
    timer.innerText = timeleft +" seconds left until you all get kick HURRY!!!!";
    div.appendChild(timer);
    
    //Countdown
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            //Reload the webpage if timeout still exists
            const timeout = document.getElementById("timeout");
            if (timeout != undefined) location.reload();
        }
        timeleft -= 1;
        timer.innerText = timeleft + " seconds left until you all get kick HURRY!!!!";
    }, 1000);
}
