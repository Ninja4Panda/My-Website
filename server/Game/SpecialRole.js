const INNOCENT = 0;
const MAFIA = 1;

/**
 * Mafia Operation
 * @param {Object} game - Game Object
 */
function mafiaTurn(game) {
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
        socket.emit("Toggle Message");
        socket.on("Client Message", ({msg}) => {
            io.to(mafiaRoom).emit("New Message", ({name: player.getName, msg:msg}));
        });

        //Ask to vote on who to kill, which makes the avator clickable
        socket.emit("Please Vote", ({timer: 60}));
        //Listen to when the mafia vote
        socket.once("Voted", ({uid})=> {
            let msg;
            try {
                if (uid !== "No one") {
                    const victim = findPlayer(game, uid);
                    msg = player.getName+" voted to kill "+victim.getName;
                }               
            } catch(err) {
                //Client provided undefined uid which means they voted for no one
                console.log(err);
                msg = player.getName+" voted to kill no one";
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
                    game.clock = 62;
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
        socket.emit("Toggle Message");
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
function policeTurn(game) {
    const police = game.police;
    //Police is dead or disconnected already
    if (game.police === null) {
        game.clock = 98;
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
        game.clock = 98;
        police.emit("End Timer");
    });
}

/**
 * Nurse Operation
 * @param {Object} game - Game Object 
 */
function nurseTurn(game) {
    //Nurse is dead or disconnected already
    if (game.nurse === null) {
        game.clock = 160;
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
                        game.clock = 160;
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
                        game.clock = 164;
                    } else {
                        nurse.emit("System Message", {msg:"You decided not to save "+ victim.getName});
                        //Posion still exist & didn't used revive potion this turn 
                        if(posion) {
                            posionLogic(game, nurse);
                        } else {
                            nurse.emit("System Message", {msg:"You already used the posion\nSkipping your turn"});
                            game.clock = 160;
                        }
                    }
                });
            }
        }
    } else if(posion) { //Only have a posion left
        posionLogic(game, nurse);
    } else { //Nothing to use
        nurse.emit("System Message", {msg:"You have used everything\nSkipping your turn"});
        game.clock = 160;
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
        game.clock = 164;
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
exports.findPlayer = findPlayer;
exports.mafiaTurn = mafiaTurn;
exports.endMafia = endMafia;
exports.policeTurn = policeTurn;
exports.nurseTurn = nurseTurn;
