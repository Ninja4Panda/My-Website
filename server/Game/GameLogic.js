const { endMafia,startMafia,startPolice,startNurse,startInnocent,endInnocent } = require("./SpecialRole");
const INNOCENT = 0;
const MAFIA = 1;
const POLICE = 2;
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
                endInnocent(game);
                break;
            case 2://Prompt mafia to wake up
                io.to(game.roomid).emit("System Message", {msg: "Mafia please wake up"});   
                break;
            case 4://Mafia turn 
                startMafia(game);
                break;
            case 64://Prompt mafia to sleep
                endMafia(game);
                io.to(game.roomid).emit("System Message", {msg: "Mafia please go to sleep"});
                break;
            case 66://Prompt police to wake up
                io.to(game.roomid).emit("System Message", {msg: "Police please wake up"});
                break;
            case 68://Police turn
                startPolice(game);
                break;
            case 100://Prompt police to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Police please go to sleep"});
                break;
            case 102://Prompt nurse to wake up
                io.to(game.roomid).emit("System Message", {msg: "Nurse please wake up"});
                break;
            case 104://Nurse turn
                startNurse,(game);
                break;
            case 166://Prompt nurse to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Nurse please go to sleep"});
                break;
            case 168://Everyone wakes up 
                io.to(game.roomid).emit("System Message", {msg: "Everyone please wake up"});
                break;
            case 170://Summary of what happened last night
                summary(game, " died yesterday night\n");
                break;   
            case 172://Start public chat & ask people to vote
                io.to(game.roomid).emit("System Message", {msg: "Please begin with the discussion"});
                startInnocent(game);
                break;
            case 264://End public chat & count vote
                endInnocent(game);
                break;
            case 266://Summary
                summary(game, " got voted out\n");
                //reset the clock
                game.clock = -1;
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
 * Summary of what happened at night
 * @param {Object} game - Game Object
 * @param {String} msg  - Message to prompt the players
 */
function summary(game, msg) {
    const io = game.server;
    //Only 2 people can die in one night
    const victim = game.votes[0];
    const victim2 = game.votes[1];
    //No one died
    if (victim === undefined) {
        io.to(game.roomid).emit("System Message", {msg: "No one" +msg});
    } else {
        //Two people died
        if(victim2 !== undefined && victim !== victim2) {
            died(game, victim);
            died(game, victim2);
            io.to(game.roomid).emit("System Message", {msg: victim.getName+" & "+victim2.getName+msg});
            io.to(game.roomid).emit("Show Role", {uid: victim.getUid, role:-1});
            io.to(game.roomid).emit("Show Role", {uid: victim2.getUid, role:-1});
        } else {
            died(game, victim);
            io.to(game.roomid).emit("System Message", {msg: victim.getName + msg});
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
    //Player disconnected in between the time of picked and when "die" happens
    if (socket) return;
    
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
        case POLICE:
            game.police = null;
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
exports.startGameLogic = startGameLogic;