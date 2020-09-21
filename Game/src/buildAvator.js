import { createModal,closeModal } from "./buildModal.js";

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
    avator.src = "/assests/unknown.png";
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
        case -1: //dead
            img.src = "/assests/dead.png";
            img.id = "dead";
            break; 
        case 0: //innocents
            img.src = "/assests/innocent.png";
            break;
        case 1: //mafia
            img.src = "/assests/mafia.png";
            break;
        case 2: //police
            img.src = "/assests/police.png";
            break;
        case 3: //nurse
            img.src = "/assests/nurse.png";
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
                    //Pop up modal for user to choose
                    const msg = "Are you sure you want to vote for "+player.childNodes[1].innerText+" ?";
                    createModal(socket, msg, player.id, success_callback);
                });
            }
        }
    }
}

/**
 * Callback when yes is pressed in the modal 
 * @param {int} uid -  
 * @param {Object} socket - Socket Object  
 */
function success_callback(socket, uid) {
    socket.emit("Voted", ({uid: uid}));
    const skip = document.getElementById("skip_btn");
    skip.remove();
    removeClickable();
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
            if (player.firstChild.id === "alive") {
                const player_clone = player.cloneNode(true);
                player_clone.style.cursor = "default";
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
    alert.innerText = timeleft + "s left to vote";
    div.appendChild(alert);
    
    //Create skip button
    const skip = document.createElement("button");
    skip.innerText = "Skip Vote";
    skip.id = "skip_btn";
    skip.className = "btn btn-secondary";
    div.appendChild(skip);
    
    //Remove div when time is up
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            div.remove();
            //remove clickable avator if time is up
            removeClickable();
            closeModal();
            //Time is up and mafia voted for no one 
            socket.emit("Voted", ({uid: "No one"}));
        }
        timeleft -= 1;
        alert.innerText = timeleft + "s left to vote";
    }, 1000);

    //End timer  
    socket.on("End Timer", ()=> {
        div.remove();
        closeModal();
        clearInterval(x);
    });

    //Add click event to the button
    skip.addEventListener("click", (event) => {
        event.preventDefault();
        skip.remove();
        //remove clickable avator if skipped was pressed
        removeClickable();
        closeModal();
        socket.emit("Voted", ({uid: "No one"}));
    });
}