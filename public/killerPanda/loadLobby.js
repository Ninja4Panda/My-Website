/**
 * Load the lobby based on who the player is
 * @param {Object} socket - Current client's socket 
 * @param {string} roomid - Current Game roomid 
 * @param {int} whoami    - owner=0, players=1, spectator=2
 */
export function loadLobby(clientname, socket, roomid, whoami, curPlayers) {
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

    //Create left side (characters) 
    const left = document.createElement("div");
    left.id = "players";
    left.style = "display: grid ; grid-template-columns:repeat(4,1fr); align-items: center; flex-grow: 8;";
    lobby.appendChild(left);

    //Create 
    // socket.on
    for (let i = 0; i < 8; i++) {
        const slot = document.createElement("div");
        slot.style = "text-align: center;";
        const avator = document.createElement("img");
        avator.src = "q.jpg";
        avator.width = "200";
        avator.height = "300";
        slot.appendChild(avator);

        const name = document.createElement("p");
        name.innerText = clientname;
        name.style.color = "white";
        slot.appendChild(name);
        
        left.appendChild(slot); 
    }

    //Create right side the (contents)
    const right = document.createElement("div");
    right.id = "contents";
    right.style = "display: flex; flex-flow: column wrap; align-items: center; flex-grow: 2";
    lobby.appendChild(right);
    
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
    
    //Create Start Game button if owner
    if (!whoami) {
        const start_btn = document.createElement("button");
        start_btn.id = "start-game";
        start_btn.className = "btn btn-primary";
        start_btn.innerText = "Start Game"; 
        right.appendChild(start_btn);
         
        start_btn.addEventListener("click", (e) => {
            socket.emit("Start Game");
            socket.on("Start Game Status", ({status, msg}) => {
                if(status) {
                    //TODO: startGame function
                    //emits to all user in the room 
                } else {
                    //failed and show msg
                }
            });
        });
    } else {
        curPlayers.forEach(player=>{
            console.log(player.name);
        });
    }


}
