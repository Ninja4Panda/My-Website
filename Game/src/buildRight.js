import { startGame } from "../ioController.js";

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

    //Create Start Game button if owner
    if (!whoami) {
        const start_btn = document.createElement("button");
        start_btn.id = "start-game";
        start_btn.className = "btn btn-primary";
        start_btn.innerText = "Start Game"; 
        right.appendChild(start_btn);
        
        start_btn.addEventListener("click", () => {
            startGame(socket, ({status, msg}) => {

                if(status) {
                    // const = document.createElement();
                    right.appendChild();
                } else {
                    //failed and show msg
                    if (document.getElementById("error") === null) {
                        const alert = document.createElement("div");
                        alert.innerText = msg;
                        alert.className = "alert alert-danger";
                        alert.id = "error";
                        const main = document.getElementById("main");
                        main.appendChild(alert);
                    }
                }
            });
        });
    } else {

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
    timer.style = "color: red;";
    timer.innerText = timeleft +" seconds left until you all get kick HURRY!!!!";
    div.appendChild(timer);
    
    //Countdown
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            //Reload the webpage
            location.reload();
        }
        timeleft -= 1;
        timer.innerText = timeleft + " seconds left until you all get kick HURRY!!!!";
    }, 1000);
}