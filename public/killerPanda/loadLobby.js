/**
 * Load the lobby based on who the player is
 * @param {Object} socket - Current client's socket 
 * @param {string} roomid - Current Game roomid 
 * @param {int} whoami    - owner=0, players=1, spectator=2
 */
export function loadLobby(clientname, socket, roomid, whoami) {
    document.getElementById("signup").remove();

    //Create the lobby 
    const main = document.getElementById("main");
    const lobby = document.createElement("div");
    lobby.id = "lobby";
    lobby.style = "display: flex; flex-direction: row; align-items: center; margin: 30px;";
    main.appendChild(lobby);

    //Create left side (characters) 
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid; align-items: center; flex-grow: 8;";
    
    //Create Top left flexbox
    for (let i = 0; i < 4; i++) {
        const slot = document.createElement("div");
        const avator = document.createElement("img");
        avator.src = "q.jpg";
        avator.width = "200";
        avator.height = "300";
        const name = document.createElement("p");
        name.innerText = clientname;
        name.style = "color: white; text-align: center;";
        slot.appendChild(avator);
        slot.appendChild(name);
        left_top.appendChild(slot); 
    }
    left.appendChild(left_top);

    //Create Bottom left flexbox
    const left_bot = document.createElement("div");
    left_bot.style = "display: flex; flex-direction: row; align-items: center; justify-content: space-around;";
    for (let i = 0; i < 4; i++) {
        const slot = document.createElement("div");
        const avator = document.createElement("img");
        avator.src = "q.jpg";
        avator.width = "200";
        avator.height = "300";
        const name = document.createElement("p");
        name.innerText = clientname;
        name.style = "color: white; text-align: center;";
        slot.appendChild(avator);
        slot.appendChild(name);
        left_bot.appendChild(slot); 
    }
    left.appendChild(left_bot);

    //Create right side the (contents)
    const right = document.createElement("div");
    right.id = "contents";
    right.style = "display: flex; flex-flow: column wrap; align-items: center; flex-grow: 2";
    
    //Create timer for lobby
    const timer = document.createElement("p");
    timer.style = "color: red;";
    let timeleft = 600;
    timer.innerText = timeleft +" seconds left until you all get kick HURRY!!!!";
    right.appendChild(timer);

    //Countdown 
    const x = setInterval(() => {
        if (timeleft <= 0) {
            clearInterval(x);
            //TODO: Disconnect all client and reload the webpage
        }
        timeleft -= 1;
        timer.innerText = timeleft + " seconds left until you all get kick HURRY!!!!";
    }, 1000);
    
    //Create Start Game button
    const start_btn = document.createElement("button");
    start_btn.id = "start-game";
    start_btn.className = "btn btn-primary";
    start_btn.innerText = "Start Game"; 
    right.appendChild(start_btn);

    switch(whoami) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        default:
            throw new Error("Whoami permission is wrong!");   
    }
    lobby.appendChild(left);
    lobby.appendChild(right);
}
