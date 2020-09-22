const INNOCENT = 0;
const MAFIA = 1;

/**
 * Start the public Chat Room
 * @param {Object} game - Game object 
 */
function startInnocent(game) {
    const io = game.server;
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        const player = game.players[socket.id]; 
        socket.emit("Message On");
        socket.on("Client Message", ({msg}) => {
            game.server.to(game.roomid).emit("New Message", ({name: player.getName, msg:msg}));
        });
        
        //Ask player to vote, which makes the avator clickable
        socket.emit("Please Vote", ({timer: 90}));
        //Listen to when the player voted
        socket.once("Voted", ({uid})=> {
            let msg = player.getName+" voted out no one";
            try {
                if (uid !== "No one") {
                    const victim = findPlayer(game, uid);
                    msg = player.getName+" voted out "+victim.getName;
                }
            } catch(err) {
                //When client provide undefined uid
                console.log(err);
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
                    game.clock = 264;
                }
            }
        });
    }
}

/**
 * End the public Chat Room & count votes
 * @param {Object} game - Game object 
 */
function endInnocent(game) {
    for (let key in game.socketsCache) {
        const socket = game.socketsCache[key];
        socket.emit("Message Off");
        socket.removeAllListeners("Client Message");
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
} 

/**
 * Mafia Operation
 * @param {Object} game - Game Object
 */
function startMafia(game) {
    const mafiaRoom = game.roomid+"-m";
    const io = game.server;
    
    //send only to mafias
    for(let key in game.mafiaCache) { 
        const socket = game.mafiaCache[key];
        const player = game.players[socket.id];
        
        //Flip the mafia so they know each other
        io.to(mafiaRoom).emit("Show Role", {role: player.getRole, uid:player.getUid});
        //System message
        socket.emit("System Message", {msg: "All mafias must agree on the same person otherwise no one will be killed\nClick on the player to vote when you are ready\nMafias can dicuss who to kill in here, other players will not be able to see your messages"});

        //Start mafias chat  
        socket.emit("Message On");
        socket.on("Client Message", ({msg}) => {
            io.to(mafiaRoom).emit("New Message", ({name: player.getName, msg:msg}));
        });

        //Ask to vote on who to kill, which makes the avator clickable
        socket.emit("Please Vote", ({timer: 60}));
        //Listen to when the mafia vote
        socket.once("Voted", ({uid})=> {
            let msg = player.getName+" voted to kill no one"; 
            try {
                if (uid !== "No one") {
                    const victim = findPlayer(game, uid);
                    msg = player.getName+" voted to kill "+victim.getName;
                }               
            } catch(err) {
                //Client provided undefined uid which means they voted for no one
                console.log(err);
                uid = "No one";
            } finally {
                //Display who each player voted to kill 
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                //Store the votes
                if (game.votes[uid] === undefined) {
                    game.votes[uid] = 1;
                } else {
                    game.votes[uid]++;
                }

                //Speed up to the next phase if everyone already voted
                const numMafia = Object.keys(game.mafiaCache).length;
                const numVotes = Object.values(game.votes).reduce((a,b)=> a+b,0);
                //greater or equal to account for mafia disconnecting
                if (numVotes >= numMafia) {
                    //Tell frontend to end the timer & advance the clock
                    io.to(mafiaRoom).emit("End Timer");
                    game.clock = 64;
                }
            }
        });
    }
}

/**
 * End Mafia chat & count vote
 * @param {Object} game 
 */
function endMafia(game) {
    for(let key in game.mafiaCache) {
        const socket = game.mafiaCache[key];
        socket.emit("Message Off");
        socket.removeAllListeners("Client Message");
    }
    
    const numMafia = Object.keys(game.mafiaCache).length;
    //Count votes
    for (let uid in game.votes) {
        //Everyone agreed to vote the same player (greater or equal to account for mafia disconnecting)
        if (game.votes[uid] >= numMafia) { 
            //Change the votes to normal array for easier access
            game.votes = [];
            //Push the player object into the votes
            if (uid !== "No one") {
                try {
                    const victim = findPlayer(game, uid);
                    game.votes.push(victim);
                } catch {
                    //Undefined uid no need to do anything
                    console.log(err);
                }
            }
        }
    }
}

/**
 * Police Operation
 * @param {Object} game - Game Object 
 */
function startPolice(game) {
    const police = game.police;
    //Police is dead or disconnected already
    if (game.police === null) {
        game.clock = 100;
        return;
    }

    //Ask to vote on who to check, which makes the avator clickable
    police.emit("System Message", {msg:"Please click on the player you would like to check"});
    police.emit("Please Vote", ({timer: 30}));
    police.once("Voted", ({uid})=> {
        try {
            if (uid !== "No one") {
                const target = findPlayer(game, uid);
                if (target.getRole === MAFIA) {
                    police.emit("Show Role", {role: target.getRole, uid: uid});
                    police.emit("System Message", {msg: target.getName + " is a mafia"});
                } else {
                    police.emit("Show Role", {role: INNOCENT, uid: uid});
                    police.emit("System Message", {msg: target.getName + " is innocent"});
                }
            } else {
                police.emit("System Message", {msg:"No one? I like your confidence, good luck young man"});
            }
        } catch(err) {
            //Client provided undefined uid
            console.log(err);
            police.emit("System Message", {msg:"No one? I like your confidence, good luck young man"});
        } 
        game.clock = 100;
        police.emit("End Timer");
    });
}

/**
 * Nurse Operation
 * @param {Object} game - Game Object 
 */
function startNurse(game) {
    //Nurse is dead or disconnected already
    if (game.nurse === null) {
        game.clock = 166;
        return;
    }
    
    const nurse = game.nurse[0];
    const revive = game.nurse[1];
    const posion = game.nurse[2];
    const nurseUid = game.players[nurse.id].getUid;

    //Revive potion 
    if (revive) {
        const victim = game.votes[0];
        //No one died
        if (victim === undefined) {
            nurse.emit("System Message", {msg:"No one died tonight\n"});
            posionLogic(game, nurse);
        } else {
            //nurse can't save himself
            if(nurseUid === victim.getUid) { 
                nurse.emit("Revive Potion", {msg:"You died tonight\nUnfortunately you cannot save yourself.", timer:30});
                nurse.once("Save", ()=>{
                    //End timer and stop listenning to "Save" event
                    nurse.emit("End Timer");
                    //Posion logics
                    if(posion) {
                        posionLogic(game, nurse);
                    } else {
                        nurse.emit("System Message", {msg:"You already used the posion\nSkipping your turn"});
                        game.clock = 166;
                    }
                });
            } else {
                nurse.emit("Revive Potion", {msg:victim.getName+" died tonight\nWould you like to save him/her ?", timer:30});
                nurse.once("Save", ({save})=>{
                    //End timer and stop listenning to "Save" event
                    nurse.emit("End Save Timer");
                    //Save logics
                    if (save) {
                        nurse.emit("System Message", {msg:"You decided to save "+ victim.getName});
                        game.nurse[1] = 0;
                        //Remove the dead player from the array
                        game.votes = [];
                        game.clock = 166;
                    } else {
                        nurse.emit("System Message", {msg:"You decided not to save "+ victim.getName});
                        //Posion still exist & didn't used revive potion this turn 
                        if(posion) {
                            posionLogic(game, nurse);
                        } else {
                            nurse.emit("System Message", {msg:"You already used the posion\nSkipping your turn"});
                            game.clock = 166;
                        }
                    }
                });
            }
        }
    } else if(posion) { //Only have a posion left
        posionLogic(game, nurse);
    } else { //Nothing to use
        nurse.emit("System Message", {msg:"You have used everything\nSkipping your turn"});
        game.clock = 166;
    }
}

/**
 * Posion logic
 * @param {Object} game   - Game Object
 * @param {Object} nurse  - Nurse socket 
 */
function posionLogic(game, nurse) {
    nurse.emit("System Message", {msg:"Please click on the player you would like to posion"});
    nurse.emit("Please Vote", ({timer: 30}));
    nurse.once("Voted", ({uid}) => {
        if (uid === "No one") {
            nurse.emit("System Message", {msg:"You posioned no one"});
        } else {
            try {
                const victim = findPlayer(game, uid);
                game.nurse[2] = 0;
                game.votes.push(victim);
                nurse.emit("System Message", {msg:"You posioned "+victim.getName});
            } catch (err) {
                console.log(err);
                //Client provided undefined uid
                nurse.emit("System Message", {msg:"You posioned no one"});
            }
        }
        nurse.emit("End Timer");
        game.clock = 166;
    });
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

exports.startInnocent = startInnocent;
exports.endInnocent = endInnocent;
exports.startMafia = startMafia;
exports.endMafia = endMafia;
exports.startPolice = startPolice;
exports.startNurse = startNurse;
