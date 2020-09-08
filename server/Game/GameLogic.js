function startGameLogic(game) {
    const io = game.server;
    io.to(game.roomid).emit("System Message", {msg: "Make sure you know your role (Top Right!!)"});
    while(gameOver(game)) {
        //Everyone goes to sleep
        io.to(game.roomid).emit("System Message", {msg: "Everyone please go to sleep"});
        endChat(game);
        //wait for 3s then start mafia turn
        setTimeout((game) => {
            mafiaTurn(game);
        }, 3000);
        
        
        // setTimeout(())
        // io.to(game.roomid).emit("System Message", {msg: "Mafia please go to sleep"});
        // io.to(game.roomid).emit("System Message", {msg: "Detective wake up"});
        // io.to(game.roomid).emit("System Message", {msg: "Detective please go to sleep"});
        // io.to(game.roomid).emit("System Message", {msg: "Doctor wake up"});
        // io.to(game.roomid).emit("System Message", {msg: "Doctor please go to sleep"});
        
        //detective wake up
        //detective goes to sleep
        
        //doctor wake up
        //doctor goes to sleep
        
        //Everyone wake up
        io.to(game.roomid).emit("System Message", {msg: "Everyone wake up"});
        startChat(game);
    }
    
    //send game over
}

/**
 * Mafia Operation
 * @param {Object} game - Game Object
 */
function mafiaTurn(game) {
    const mafiaRoom = game.roomid+"-m";
    const io = game.server;
    
    io.to(game.roomid).emit("System Message", {msg: "Mafia wake up"});
    io.to(mafiaroom).emit("System Message", {msg: "All mafias must agree on the same person otherwise no one will be killed"});
    io.to(mafiaroom).emit("System Message", {msg: "Click on the player to vote when you are ready"});
    io.to(mafiaroom).emit("System Message", {msg: "Mafias can dicuss who to kill in here, other players will not be able to see your messages"});
    //Start mafias chat up 
    io.to(mafiaroom).emit("Start Message");
    //Ask to vote on who to kill, which makes the avator clickable
    io.to(mafiaRoom).emit("Please Vote", ({timer: 60}));

    game.mafiaCache.foreach(socket => {
        let vote = 0;
        socket.on("Voted", ({uid})=> {
            try {
                const player = game.players[socket.id];
                const victim = findPlayer(game, uid);

                //Display who each player voted to kill 
                const msg = player.getName+" voted to kill "+victim.getName;
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                if(vote !== 0 && vote !== uid) {
                    //no kill
                    vote = 1;
                } else {
                    //kill
                    vote = uid;
                }
                // kill();

            } catch(err) {//Forced disconnect client when they provide undefined uid
                console.log(err);
                socket.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
                socket.disconnect();
            }
        });
    });
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
exports.startGameLogic = startGameLogic;