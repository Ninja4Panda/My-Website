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
    avator.id = "img-" + uid;
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
    const img = document.getElementById("img-"+uid);
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
    
    //Remove div when time is over
    const x = setInterval(() => {
        if (timeleft <= 1) {
            clearInterval(x);
            div.remove();
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
        socket.emit("Voted", ({uid: "No one"}));
    });
}
