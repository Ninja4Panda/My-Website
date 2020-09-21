const { endMafia,mafiaTurn,policeTurn,nurseTurn,findPlayer } = require("./SpecialRole");
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
                endPub(game);
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
            case 66://Prompt police to wake up
                io.to(game.roomid).emit("System Message", {msg: "Police please wake up"});
                break;
            case 68://Police turn
                policeTurn(game);
                break;
            case 100://Prompt police to sleep 
                io.to(game.roomid).emit("System Message", {msg: "Police please go to sleep"});
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
            case 170://Start chat & ask people to vote
                io.to(game.roomid).emit("System Message", {msg: "Please begin discussion"});
                startPub(game);
                break;
            case 262:
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
            io.to(game.roomid).emit("System Message", {msg: victim.getName+" & "+victim2.getName+" died yesterday night\n"});
            io.to(game.roomid).emit("Show Role", {uid: victim.getUid, role:-1});
            io.to(game.roomid).emit("Show Role", {uid: victim2.getUid, role:-1});
        } else {
            died(game, victim);
            io.to(game.roomid).emit("System Message", {msg: victim.getName+" died yesterday night\n"});
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
function startPub(game) {
    const io = game.server;
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        const player = game.players[socket.id]; 
        socket.emit("Toggle Message");
        socket.on("Client Message", ({msg}) => {
            game.server.to(game.roomid).emit("New Message", ({name: player.getName, msg:msg}));
        });

        //Ask player to vote, which makes the avator clickable
        socket.emit("Please Vote", ({timer: 90}));
        //Listen to when the player voted
        socket.once("Voted", ({uid})=> {
            let msg;
            try {
                if (uid !== "No one") {
                    const victim = findPlayer(game, uid);
                    msg = player.getName+" voted out "+victim.getName;
                }
            } catch(err) {
                //When client provide undefined uid
                console.log(err);
                msg =  player.getName+" voted out no one";
                uid = "No one";
            } finally {
                io.to(game.roomid).emit("System Message", {msg: msg});
                //Store the vote
                if (game.votes[uid] === undefined) {
                    game.votes[uid] = 1;
                } else {
                    game.votes[uid]++;
                }

                //Speed up to the next phase if everyone already voted
                const numPlayers = Object.keys(game.socketsCache).length;
                const numVotes = Object.values(game.votes).reduce((a,b)=> a+b,0);
                //greater or equal to account for players disconnecting
                if (numVotes >= numPlayers) {
                    //Tell frontend to end the timer & advance the clock
                    io.to(game.roomid).emit("End Timer");
                    game.clock = 260;
                }
            }
            
            // const minVote = numPlayers/2;
            // //Everyone agreed to vote on the same player
            // if (game.votes[uid] === numPlayers) { 
            //     if (uid === "No one") {
            //         io.to(game.roomid).emit("System Message", {msg: "No one got voted out\n"});
            //     } else {
            //         //kill the player
            //         died(game, victim);
            //         io.to(game.roomid).emit("System Message", {msg: victim.getName+" got voted out\n"});
            //     }
            //     //Change the votes to normal array for next round 
            //     game.votes = [];
            //     //Tell frontend to end the timer
            //     io.to(game.roomid).emit("End Timer");
            //     // game.clock = ;
            // } else if(numVotes >= numPlayers) {
            //     //greater than or equal to because someone might disconnect after voting
            //     for (let uid in game.votes) {
            //         const numOfVotes = game.votes[uid]; 
            //         if (numVotes >= minVote) {

            //         }
            //     }
            //     game.votes = [];
            //     io.to(game.roomid).emit("End Timer");
            //     // game.clock = ;
            // }
                                

        });
    }
}

/**
 * End the public Chat Room
 * @param {Object} game - Game object 
 */
function endPub(game) {
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        socket.emit("Toggle Message");
        socket.removeAllListeners("Client Message");
    }
} 
exports.startGameLogic = startGameLogic;