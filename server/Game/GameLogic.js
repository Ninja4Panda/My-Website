const { mafiaTurn,detectiveTurn,doctorTurn } = require("./SpecialRole");

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
                //Flip the mafia so they know each other
                for(let key in game.mafiaCache) {
                    const socket = game.mafiaCache[key];
                    const player = game.players[socket.id];
                    io.to(game.roomid+"-m").emit("Show Role", {role: player.getRole, uid:player.getUid}); 
                }
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
            case 166://Prompt doctor to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Doctor please go to sleep"});
                break;
            case 168://Everyone wakes up sleep
                io.to(game.roomid).emit("System Message", {msg: "Everyone please wake up"});
                break;
            case 170://Summary of what happened
                summary(game);
                startChat(game);
                break;
        }
        game.clock++;
    }, 1000); 
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
 * Start the public Chat Room
 * @param {Object} game - Game object 
 */
function startChat(game) {
    game.server.to(game.roomid).emit("Toggle Message");

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
    game.server.to(game.roomid).emit("Toggle Message");

    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        socket.removeAllListeners("Client Message");
    }
} 
exports.startGameLogic = startGameLogic;