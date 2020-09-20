const { endMafia,mafiaTurn,detectiveTurn,doctorTurn } = require("./SpecialRole");

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
                endMafia(game);
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
            case 168://Everyone wakes up & summary of what happened last night
                io.to(game.roomid).emit("System Message", {msg: "Everyone please wake up"});
                summary(game);
                break;
            case 170://Start chat
                io.to(game.roomid).emit("System Message", {msg: "Please begin discussion"});
                startChat(game);
                break;
            case 172:

                break;
        }
        game.clock++;
    }, 1000); 
}

/**
 * Summary of what happened at night
 * @param {Object} game - Game Object
 */
function summary(game) {
    const io = game.server;
    const victim = game.votes[0];
    //No one died
    if (victim === undefined) {
        io.to(game.roomid).emit("System Message", {msg: "No one died tonight\n"});
    } else {
        io.to(game.roomid).emit("System Message", {msg: victim.getName+" died tonight\n"});
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