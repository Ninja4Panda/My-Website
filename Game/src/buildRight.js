import { startGame } from "../ioController.js";

/**
 * Build right side of lobbys
 * @param {Object} socket - Current client's socket
 * @param {String} roomid - Current roomid client is in  
 * @param {int} whoami    - owner=0, players=1, spectator=2
 */
export function buildRight(socket, roomid, whoami) {
    //Create right side the (contents)
    const right = document.createElement("div");
    right.id = "contents";
    right.style = "display: flex; flex-flow: column wrap; align-items: center; flex-grow: 2";
    lobby.appendChild(right);

    //Create timer for lobby
    createTimer(right);

    //Create Start Game button if owner
    if (!whoami) {
        const start_btn = document.createElement("button");
        start_btn.id = "start-game";
        start_btn.className = "btn btn-primary";
        start_btn.innerText = "Start Game"; 
        right.appendChild(start_btn);
        
        start_btn.addEventListener("click", () => {
            console.log(roomid)
            startGame(socket, roomid, ({status, msg}) => {
                if(status) {
                    //TODO: startGame function
                    //emits to all user in the room 
                } else {
                    //failed and show msg
                }
            });
        });
    } else {

    }
}

/**
 * Insert timer to parameter 
 * @param {Object} div - Insert timer to this div 
 */
function createTimer(div) {
    //Create timer for lobby
    const timer = document.createElement("p");
    timer.style = "color: red;";
    let timeleft = 600;
    timer.innerText = timeleft +" seconds left until you all get kick HURRY!!!!";
    div.appendChild(timer);

    //Countdown
    const x = setInterval(() => {
        if (timeleft <= 0) {
            clearInterval(x);
            //TODO: Disconnect all client and reload the webpage
        }
        timeleft -= 1;
        timer.innerText = timeleft + " seconds left until you all get kick HURRY!!!!";
    }, 1000);

}