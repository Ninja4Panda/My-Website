const { endMafia,mafiaTurn,detectiveTurn,nurseTurn } = require("./SpecialRole");
const INNOCENT = 0;
const MAFIA = 1;
const DETECTIVE = 2;
const NURSE = 3;

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
            case 102://Prompt nurse to wake up
                io.to(game.roomid).emit("System Message", {msg: "Nurse please wake up"});
                break;
            case 104://Nurse turn
                nurseTurn(game);
                break;
            case 166://Prompt nurse to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Nurse please go to sleep"});
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
    //Only 2 people can die in one night
    const victim = game.votes[0];
    const victim2 = game.votes[1];
    //No one died
    if (victim === undefined) {
        io.to(game.roomid).emit("System Message", {msg: "No one died tonight\n"});
    } else {
        //Two people died
        if(victim2 !== undefined && victim !== victim2) {
            died(game, victim);
            died(game, victim2);
            io.to(game.roomid).emit("System Message", {msg: victim.getName+" & "+victim2.getName+" died tonight\n"});
            io.to(game.roomid).emit("Show Role", {uid: victim.getUid, role:-1});
            io.to(game.roomid).emit("Show Role", {uid: victim2.getUid, role:-1});
        } else {
            died(game, victim);
            io.to(game.roomid).emit("System Message", {msg: victim.getName+" died tonight\n"});
            io.to(game.roomid).emit("Show Role", {uid: victim.getUid, role:-1});
        }
        game.votes = [];
    }
}

/**
 * Do dead logic by adding & removing from different arrays
 * @param {Object} game - Game Object
 * @param {Object} victim - Player Object
 */
function died(game, victim) {
    const socket = game.socketsCache[victim.getUid];
    //Store into the dead array
    game.dead.push(socket);
    game.dead.push(victim);

    //Dead logic
    switch(victim.getRole) {
        case INNOCENT:
            delete game.socketsCache[victim.getUid];
            delete game.players[socket.id];
            break;
        case MAFIA:
            delete game.mafiaCache[victim.getUid];
            delete game.socketsCache[victim.getUid];
            delete game.players[socket.id];
            break;
        case DETECTIVE:
            game.detective = null;
            delete game.socketsCache[victim.getUid];
            delete game.players[socket.id];
            break;
        case NURSE:
            game.nurse = null;
            delete game.socketsCache[victim.getUid];
            delete game.players[socket.id];
            break;
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
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        const player = game.players[socket.id]; 
        socket.emit("Toggle Message");
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
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        socket.emit("Toggle Message");
        socket.removeAllListeners("Client Message");
    }
} 
exports.startGameLogic = startGameLogic;