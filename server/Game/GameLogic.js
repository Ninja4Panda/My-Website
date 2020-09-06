function startGameLogic(game) {
    // while(gameOver(game)) {
    //     //Everyone goes to sleep
    //     //mafia wake up 
    //     //mafia goes to sleep
    
    //     //doctor wake up
    //     //doctor goes to sleep
    //     //detective wake up
    //     //detective goes to sleep
    //     //Everyone wake up
    // }

    //send game over
}

/**
 * Mafia Operation
 * @param {Object} game - Game Object
 */
function mafiaTurn(game) {
    const mafiaRoom = game.roomid.concat("-m");
    const io = game.server;
    
    //Wake mafias up to vote on who to kill
    io.to(mafiaRoom).emit("Who To Kill");
    let vote = 0;
    game.mafiaCache.foreach(socket => {
        socket.on("Vote", ({uid})=> {
            try {
                const player = game.players[socket.id];
                const victim = findPlayer(game, uid);

                //Display who each player voted to kill 
                const msg = player.getName.concat(" voted to kill ", victim.getName);
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                if (vote == 0) {
                    vote = uid;
                } else if(vote !== uid) {
                
                }  

            } catch(err) {
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
 * Do the callback function after sec amount of time
 * @param {int} sec           - time in seconds
 * @param {function} callback - function to callback
 */
function doAfter(sec, callback) {
    let time = sec;
    const x = setInterval(() => {
        if (time <= 1) {
            clearInterval(x);
            callback();
        }
        time -= 1;
    }, 1000);
}

exports.startGameLogic = startGameLogic;