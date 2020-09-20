/**
 * Create an avator for the player
 * @param {String} player_name - Player name
 * @param {int} uid - uid that is used to identify the player
 */
export function createAvator(player_name, uid) {
    //Create slots for each player
    const slot = document.createElement("div");
    slot.id = uid;
    slot.style = "text-align: center;";
    
    //Create player avator
    const avator = document.createElement("img");
    avator.id = "alive";
    avator.src = "/assests/unknown.jpg";
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
 * Flip the Avator of a player based on the index 
 * @param {int} role  - Role of the player 
 * @param {int} uid   - uid of the player 
 */
export function flipAvator(role, uid) {
    const img = document.getElementById(uid).firstChild;
    switch(role) {
        case 0: //innocents
        img.src = "/assests/innocent.png";
        break;
        case 1: //mafia
        img.src = "/assests/mafia.png";
        break;
        case 2: //detective
        img.src = "/assests/detective.png";
        break;
        case 3: //doctor
        img.src = "/assests/doctor.png";
        break;
    }
}

/**
 * Make avators clickable
 * @param {int} timer     - Time player gets to vote and discuss 
 * @param {Object} socket - Socket Object 
 */
export function clickableAvator(timer, socket) {
    //Create the skip buttons, timer and their operations
    createDiv(timer, socket);

    //Make the div clickable
    const div = document.getElementById("players");
    if (div.hasChildNodes()) {
        const players = div.childNodes;
        //Add event listeners to every avator
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.firstChild.id === "alive") {
                //Mouseover effects so user knows they can click on it
                player.addEventListener("mouseover", (event)=> {
                    event.preventDefault();
                    player.style.cursor = "pointer";
                });

                //Click effect
                player.addEventListener("click", (event)=> {
                    event.preventDefault();
                    console.log("clicked");
                    //Pop up modal for user to choose
                    const msg = "Do you want to vote for "+player.childNodes[1].innerText+" ?";
                    // createModal(socket, msg, 30, ,removeClickable);
                });
            }
        }
    }
}

/**
 * Remove all clickable avators
 */
function removeClickable() {
    //Make the div clickable
    const div = document.getElementById("players");
    if (div.hasChildNodes()) {
        const players = div.childNodes;
        //Remove event listeners for every avator by making clone
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            if (player.id === "alive") {
                var player_clone = player.cloneNode(true);
                player.replaceWith(player_clone);
            }
        }
    }
}

/**
 * Create Skip button and timer
 * @param {int} timer     - Time player gets to vote and discuss 
 * @param {Object} socket - Socket Object 
 */
function createDiv(timer, socket) {
    const main = document.getElementById("main");
    
    //Main div to hold the skipp button and timer
    const div = document.createElement("div");
    main.appendChild(div);
    
    //Create timer 
    let timeleft = timer;
    const alert = document.createElement("h2");
    alert.style = "color: red; text-align: center;";
    alert.innerText = timeleft + "s left to discuss and vote";
    div.appendChild(alert);
    
    //Create skip button
    const skip = document.createElement("button");
    skip.innerText = "Skip";
    skip.style= "color: grey; algin-item: center";
    div.appendChild(skip);
    
    //Remove div when time is up
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            div.remove();
            //remove clickable avator if time is up
            removeClickable();
            //Time is up and mafia voted for no one 
            socket.emit("Voted", ({uid: "No one"}));
        }
        timeleft -= 1;
        alert.innerText = timeleft + "s left to discuss and vote";
    }, 1000);

    //End timer  
    socket.on("End Timer", ()=> {
        div.remove();
        clearInterval(x);
    });

    //Add click event to the button
    skip.addEventListener("click", (event) => {
        event.preventDefault();
        skip.remove();
        //remove clickable avator if skipped was pressed
        removeClickable();
        socket.emit("Voted", ({uid: "No one"}));
    });
}