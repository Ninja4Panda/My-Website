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
        socket.on("Voted", ({uid})=> {
            try {
                let victim;
                let msg = player.getName+" voted to kill no one";
                if (uid !== "No one") {
                    victim = findPlayer(game, uid);
                    msg = player.getName+" voted to kill "+victim.getName;
                }
                
                //Display who each player voted to kill 
                io.to(mafiaRoom).emit("System Message", {msg: msg});
                
                //Store the vote
                if (game.votes[uid] === undefined) {
                    game.votes[uid] = 1;
                } else {
                    game.votes[uid]++;
                }

                const numMafia = Object.keys(game.mafiaCache).length;
                //Speed up to the next phase if everyone already voted
                if (game.votes[uid] === numMafia) {//Everyone agreed to vote the same player 
                    game.votes = [];
                    //Change the votes to normal array for easier access
                    //Push the player object into the votes
                    if (uid !== "No one") game.votes.push(victim);
                    //Tell frontend to end the timer
                    io.to(mafiaRoom).emit("End Timer");
                    game.clock = 62;
                } else if(Object.keys(game.votes).length === numMafia) {//Everyone voted different player
                    game.votes = []; //no one will be killed
                    //Tell frontend to end the timer
                    io.to(mafiaRoom).emit("End Timer");
                    game.clock = 62;
                }
                                
                //Stop listening to vote
                socket.removeAllListeners("Voted");
            } catch(err) {//Forced disconnect client when they provide undefined uid
                console.log(err);
                socket.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
                socket.disconnect();
            }
        });
    }
}

/**
 * End Mafia chat 
 * @param {Object} game 
 */
function endMafia(game) {
    for(let key in game.mafiaCache) {
        const socket = game.mafiaCache[key];
        socket.emit("Toggle Message");
        socket.removeAllListeners("Client Message");
    }
}

/**
 * Detective Operation
 * @param {Object} game - Game Object 
 */
function detectiveTurn(game) {
    const detective = game.detective;
    //Detective is dead or disconnected already
    if (game.detective === null) {
        game.clock = 98;
        return;
    }

    //Ask to vote on who to check, which makes the avator clickable
    detective.emit("System Message", {msg:"Please click on the player you would like to check"});
    detective.emit("Please Vote", ({timer: 30}));
    detective.on("Voted", ({uid})=> {
        try {
            if (uid !== "No one") {
                const target = findPlayer(game, uid);
                detective.emit("Flip", {role: target.getRole, uid: uid});
            } else {
                detective.emit("System Message", {msg:"I like your confidence, good luck young man"});
            }
            game.clock = 98;
            detective.removeAllListeners("Voted");
            detective.emit("End Timer");
        } catch(err) {//Forced disconnect client when they provide undefined uid as this shouldn't happen
            console.log(err);
            detective.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
            detective.disconnect();
        }
    });
}

/**
 * Doctor Operation
 * @param {Object} game - Game Object 
 */
function doctorTurn(game) {
    //Doctor is dead or disconnected already
    if (game.doctor === null) {
        game.clock = 160;
        return;
    }
    
    const doctor = game.doctor[0];
    const revive = game.doctor[1];
    const posion = game.doctor[2];
    
    //Revive potion 
    if (revive) {
        const victim = game.votes[0];
        //No one died
        if (victim === undefined) {
            doctor.emit("System Message", {msg:"No one died tonight\n"});
            posionLogic(game, doctor);
        } else {
            //Doctor can't save himself
            if(doctor.id === victim.id) { 
                doctor.emit("Revive Potion", {msg:"You died tonight\nUnfortuentely you cannot save yourself.", timer:30});
                doctor.on("Save", ()=>{
                    if(posion) {
                        posionLogic(game, doctor);
                    } else {
                        doctor.emit("System Message", {msg:"You already used the posion\nSkipping your turn"});
                        game.clock = 160;
                    }
                });
            } else {
                doctor.emit("Revive Potion", {msg:victim.getName+" died tonight\n", timer:30});
                doctor.on("Save", ({save})=>{
                    if (save) {
                        doctor.emit("System Message", {msg:"You decided to save "+ victim.getName});
                        game.doctor[1] = 0;
                        game.clock = 164;
                    } else {
                        doctor.emit("System Message", {msg:"You decided not to save "+ victim.getName});
                        //Posion still exist & didn't used revive potion this turn 
                        if(posion) {
                            posionLogic(game, doctor);
                        } else {
                            doctor.emit("System Message", {msg:"You already used the posion\nSkipping your turn"});
                            game.clock = 160;
                        }
                    }
                });
            }
        }
    } else if(posion) { //Only have a posion left
        posionLogic(game, doctor);
    } else { //Nothing to use
        doctor.emit("System Message", {msg:"You have used everything\nSkipping your turn"});
        game.clock = 160;
    }
}

/**
 * Posion logic
 * @param {Object} game   - Game Object
 * @param {Object} doctor - Doctor socket 
 */
function posionLogic(game, doctor) {
    doctor.emit("System Message", {msg:"Please click on the player you would like to posion"});
    doctor.emit("Please Vote", ({timer: 30}));
    doctor.on("Voted", ({uid}) => {
        if (uid === "No one") {
            doctor.emit("System Message", {msg:"You posioned no one"});
        } else {
            game.doctor[2] = 0;
            try {
                const victim = findPlayer(game, uid);
                game.votes.push(victim);
                doctor.emit("System Message", {msg:"You posioned "+victim.getName});
            } catch (err) {//Forced disconnect client when they provide undefined uid as this shouldn't happen
                console.log(err);
                detective.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
                detective.disconnect();
            }
        }
        doctor.removeAllListeners("Voted");
        doctor.emit("End Timer");
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
exports.mafiaTurn = mafiaTurn;
exports.endMafia = endMafia;
exports.detectiveTurn = detectiveTurn;
exports.doctorTurn = doctorTurn;
