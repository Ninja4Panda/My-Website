function startGameLogic(game) {
    const io = game.server;
    io.to(game.roomid).emit("System Message", {msg: "Make sure you know your role (Top Right!!)"});
    game.clock = 0;

    //Main Game loop
    const mainlogic = setInterval(function() {
        //Game over clear the Interval
        if(gameOver(game)) {
            clearInterval(mainlogic);
            game.finishGame();
        }      
        
        //Logic for what to do every second
        switch(game.clock) {
            case 0://Everyone goes to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Everyone please go to sleep"});
                endChat(game);
                break;
            case 2://Prompt mafia to wake up
                io.to(game.roomid).emit("System Message", {msg: "Mafia please wake up"});
                break;
            case 4://Mafia turn 
                mafiaTurn(game);
                break;
            case 64://Prompt mafia to sleep
                io.to(game.roomid).emit("System Message", {msg: "Mafia please go to sleep"});
                break;
            case 66://Prompt detective to wake up
                io.to(game.roomid).emit("System Message", {msg: "Detective please wake up"});
                break;
            case 68://Detective turn
                detectiveTurn(game);
                break;
            case 100://Prompt detective to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Detective please go to sleep"});
                break;
            case 102://Prompt doctor to wake up
                io.to(game.roomid).emit("System Message", {msg: "Doctor please wake up"});
                break;
            case 104://Doctor turn
                doctorTurn(game);
                break;
            
        }
        game.clock++;
    }, 1000); 

        
        // io.to(game.roomid).emit("System Message", {msg: "Doctor please go to sleep"});
        
        // //Everyone wake up
        // await sleep(3);
        // io.to(game.roomid).emit("System Message", {msg: "Everyone wake up"});
        // startChat(game);
        // // await sleep(15);

    
    //send game over
}

/**
 * Checks if game is over 
 * @param {Object} game - Game Object
 * @return True/false 
 */
function gameOver(game) {
    // game.
}

/**
 * Mafia Operation
 * @param {Object} game - Game Object
 */
function mafiaTurn(game) {
    const mafiaRoom = game.roomid+"-m";
    const io = game.server;

    //send only to mafias
    for(let i = 0; i < game.mafiaCache.length; i++) { 
        const socket = game.mafiaCache[i];
        const player = game.players[socket.id]; 
        //System message
        socket.emit("System Message", {msg: "All mafias must agree on the same person otherwise no one will be killed\nClick on the player to vote when you are ready\nMafias can dicuss who to kill in here, other players will not be able to see your messages"});

        //Start mafias chat  
        socket.emit("Start Message");
        socket.on("Client Message", ({msg}) => {
            io.to(mafiaRoom).emit("New Message", ({name: player.getName, msg:msg}));
        });

        //Ask to vote on who to kill, which makes the avator clickable
        socket.emit("Please Vote", ({timer: 60}));
        //Listen to when the mafia vote
        socket.on("Voted", ({uid})=> {
            try {
                let victim;
                let msg = player.getName+" voted to kill no one";
                if (uid !== "No one") {
                    victim = findPlayer(game, uid);
                    msg = player.getName+" voted to kill "+victim.getName;
                }
                
                //Display who each player voted to kill 
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                //Store the vote
                if (game.votes[uid] === undefined) {
                    game.votes[uid] = 1;
                } else {
                    game.votes[uid]++;
                }

                //Speed up to the next phase if everyone already voted
                if (game.votes[uid] === game.mafiaCache.length) {//Everyone agreed to vote the same player 
                    delete game.votes[uid];
                    //Change the votes to normal array for easier access
                    //Push the player object into the votes
                    if (uid !== "No one") game.votes.push(victim);
                    //Tell frontend to end the timer
                    io.to(mafiaRoom).emit("End Timer");
                    game.clock = 63;
                } else if(Object.keys(game.votes).length === game.mafiaCache.length) {//Everyone voted different player
                    delete game.votes[uid]; //no one will be killed
                    //Tell frontend to end the timer
                    io.to(mafiaRoom).emit("End Timer");
                    game.clock = 63;
                }

                //Stop the communation again
                socket.removeAllListeners("Voted");
                socket.removeAllListeners("Client Message");
                
            } catch(err) {//Forced disconnect client when they provide undefined uid
                console.log(err);
                socket.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
                socket.disconnect();
            }
        });
    }
}

/**
 * Detective Operation
 * @param {Object} game - Game Object 
 */
function detectiveTurn(game) {
    const detective = game.detective;
    //Detective is dead or disconnected already
    if (game.detective === undefined) return;
    detective.emit("System Message", {msg:"Please click on the player you would like to check"});
    //Ask to vote on who to check, which makes the avator clickable
    detective.emit("Please Vote", ({timer: 30}));
    detective.on("Voted", ({uid})=> {
        try {
            if (uid !== "No one") {
                const target = findPlayer(game, uid);
                detective.emit("Flip", {role: target.getRole, uid: uid});
            }
        } catch(err) {//Forced disconnect client when they provide undefined uid as this shouldn't happen
            console.log(err);
            detective.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
            detective.disconnect();
        }
    });
}

/**
 * Doctor Operation
 * @param {Object} game - Game Object 
 */
function doctorTurn(game) {
    const doctor = game.doctor[0];
    const revive = game.doctor[1];
    const posion = game.doctor[2];

    //Doctor is dead or disconnected already
    if (doctor === null) return;
    
    //Revive potion 
    if (revive === 1) {
        const victim = game.votes[0];
        if (victim === undefined) {
            doctor.emit("System Message", {msg:"No one died tonight\n"});
        } else {
            doctor.emit("System Message", {msg:victim.getName+" died tonight\n"});
        }
        // if () //Doctor can't save himself
        doctor.emit("Save", ({timer: 30}));
    } 

    //Posion 
    if (doctor[2] === 1 && revive === doctor[1]) {
        doctor.emit("System Message", {msg:"Please click on the player you would like to posion"});
        doctor.emit("Please Vote", ({timer: 30}));
        doctor.on("Voted", ()=> {

        });
    }
    doctor.emit("System Message", {msg:"You have used everything, you can skip to make the game faster"});
}


/**
 * Find player by uid
 * @param {Object} game - Game Object
 * @param {int} uid - uid of client
 * @returns Player Object
 */
function findPlayer(game, uid) {
    const victim = game.socketsCache[uid];
    if (victim === undefined) throw new ReferenceError("Undefined player");
    return game.players[victim.id];
}

/**
 * Start the public Chat Room
 * @param {Object} game - Game object 
 */
function startChat(game) {
    game.server.to(game.roomid).emit("Start Message");

    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        const player = game.players[socket.id]; 
        socket.on("Client Message", ({msg}) => {
            game.server.to(game.roomid).emit("New Message", ({name: player.getName, msg:msg}));
        });
    }
}

/**
 * End the public Chat Room
 * @param {Object} game - Game object 
 */
function endChat(game) {
    game.server.to(game.roomid).emit("Stop Message");

    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        socket.removeAllListeners("Client Message");
    }
}

/**
 * Sleep for that many seconds
 * @param {int} sec 
 */
function sleep(sec) {
    sec = sec *1000;
    return new Promise(resolve => setTimeout(resolve, sec));
}
  
exports.startGameLogic = startGameLogic;