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
            case 0: //Everyone goes to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Everyone please go to sleep"});
                endChat(game);
                break;
            case 2: //Prompt mafia to wake up
                io.to(game.roomid).emit("System Message", {msg: "Mafia please wake up"});
                break;
            case 4: //Mafia turn 
                mafiaTurn(game);
                break;
            case 64: //Prompt mafia to sleep
                io.to(game.roomid).emit("System Message", {msg: "Mafia please go to sleep"});
                break;
            case 66: //Prompt detective to wake up
                io.to(game.roomid).emit("System Message", {msg: "Detective please wake up"});
                break;
            case 68: //Detective turn
                detectiveTurn(game);
                break;

        }
        game.clock++;
    }, 1000); 

        //Start detective turn
        // await sleep(2);
        // io.to(game.roomid).emit("System Message", {msg: "Detective please wake up"});
        //await detectiveTurn(game);
        // io.to(game.roomid).emit("System Message", {msg: "Detective please go to sleep"});
        
        //Start doctor turn
        // await sleep(2);
        // io.to(game.roomid).emit("System Message", {msg: "Doctor please wake up"});
        //await doctorTurn(game);
        // io.to(game.roomid).emit("System Message", {msg: "Doctor please go to sleep"});
        
        // //Everyone wake up
        // await sleep(3);
        // io.to(game.roomid).emit("System Message", {msg: "Everyone wake up"});
        // startChat(game);
        // // await sleep(15);

    
    //send game over
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
                const victim = findPlayer(game, uid);
                
                //Display who each player voted to kill 
                const msg = player.getName+" voted to kill "+victim.getName;
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                //Store the vote
                if (game.votes[uid] === undefined) {
                    game.votes[uid] = 1;
                } else {
                    game.votes[uid]++;
                }

                //Speed up to the next phase if everyone already voted 
                if (game.votes[uid] === game.mafiaCache.length) {
                    //Everyone agreed to vote for no one 
                    if (uid === "NO ONE") delete game.votes[uid]; 
                    game.clock = 63;
                } else if(Object.keys(game.votes).length === game.mafiaCache.length) {
                    delete game.votes[uid];
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
 * Checks if game is over 
 * @param {Object} game - Game Object
 * @return True/false 
 */
function gameOver(game) {
    // game.
}

/**
 * Find player by uid
 * @param {Object} game - Game Object
 * @param {int} uid - uid of client
 * @returns Player Object
 */
function findPlayer(game, uid) {
    const victim = game.socketCache[uid];
    if (victim === undefined) throw "Undefined player";
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