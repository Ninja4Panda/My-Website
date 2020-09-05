const crypto = require("crypto");
const Player = require('./Player');

// list of game rooms indexed by roomid
const gameRooms = []; 
/** 
 * Game state class:
 * Maintain the state and logic of the game 
 * 
 * Properties: 
 * Hard-coded to 8 players for now 
 * 
 * 0-innocents 
 * 1-mafia
 * 2-detective
 * 3-doctor
 */ 
module.exports = class Game { 
    players = [];  //List of player objects indexed by their socket.id 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    totalPlayers = 0; //total number of players
    spectators = []; //List of spectators (joinning after game start, full room, players that died)
    socketsCache = []; //Array of all socket objects in the room indexed by uid
    roles = [1,1,1,2,3,0,0,0];
    uid = crypto.randomBytes(2).toString('hex'); //uid for frontend dom to identify each client 
    owner;//socket.id of owner
    mafiaCache = []; //Sockets of all mafias in game
    detective; //socket of detective
    doctor; //socket of doctor
    clock = 300;

    constructor(socket, name) {
        //Check in case the same roomid already exists
        //Check in case randomly generated value is a number (which will create a lot of empty holes in the array)
        while(!isNaN(this.roomid) === 'number' || gameRooms[this.roomid] !== undefined) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //Same checks for uid
        while(!isNaN(this.uid)) {
            this.uid = crypto.randomBytes(2).toString('hex');
        }

        //Add player into the list of players
        this.totalPlayers++;
        const player = new Player(this.uid, name);
        this.players[socket.id] = player;

        //cache the socket for later use
        this.socketsCache[this.uid] = socket;

        //Create room and make client owner 
        this.owner = socket.id;
        socket.join(this.roomid, () => {
            socket.emit("Create Game Status", {
                status:true, 
                roomid:this.roomid,
                clock:this.clock
            });
            //Add client into lobby
            socket.emit("A New Player Joined", {name: name, uid: player.getUid});
        });

        const timer = setInterval(() => {
            if (this.clock <= 1) {
                clearInterval(timer);
                //Disconnect all client
                if (!this.started) {
                    socket.disconnect();
                }
            }
            this.clock -= 1;
        }, 1000);
    }
    
    /**
     * Static function for joinning game 
     * Since roomid is provided we can get an instance of the object 
     * @param {Object} socket - Client socket object
     * @param {String} name   - Client name 
     * @param {String} roomid - Room that the client is trying to join
     */
    static joinGame(socket, name, roomid) {
        const game = gameRooms[roomid];
        //Check if specified room exists
        if (game === undefined) { 
            socket.emit("Join Game Status", false);
        } else if (game.started === true || game.totalPlayers === 8) {
            //Join as spectator
            
        } else {
            //Check if uid already exists
            while(!isNaN(game.uid) || game.socketsCache[game.uid] !== undefined) {
                game.uid = crypto.randomBytes(2).toString('hex');
            }

            //Join as player
            game.totalPlayers++;
            const player = new Player(game.uid, name);      
            game.players[socket.id] = player;

            //cache the socket for later use
            game.socketsCache[game.uid] = socket;

            socket.join(roomid, () => {
                // whoami defines the permission of client that joins the room 
                // owner=0, players=1, spectators=2
                socket.emit("Join Game Status", {
                    status:true, 
                    roomid:game.roomid,
                    whoami:1,
                    clock:game.clock
                });

                //Send to client that other clients that is already in the room 
                for(let key in game.players) {
                    socket.emit("A New Player Joined", {
                        name:game.players[key].getName, 
                        uid:game.players[key].getUid
                    });
                }

                //Update other clients that a new client joined
                socket.to(roomid).emit("A New Player Joined", {
                    name:name, 
                    uid:player.getUid
                });
            });
            console.log(game);
        }
    }

    /**
     * Start Game based on roomid
     * @param {Object} socket - Client socket object
     */
    static startGame(socket) {
        try {
            const game = findGame(socket);
            //Check if the person that emitted "start game" is owner 
            if (!game.owner === socket.id || game.started === true) { 
                //Disconnect malicious client
                // call our own clean up function 
                //socket.disconnect(true); 
            } else if (game.totalPlayers !== 1) { //TODO: change it back to 8
                //Not enough player
                const msg = "Not enough players";
                socket.emit("Start Game Status", {status:false, msg:msg});
            } else {
                //Start the Game
                game.started = true;

                //loop through all the players
                for(let key in game.players) {
                    const player = game.players[key];
                    assignRole(game.roles, player);
                    
                    //Tell player game has started & Flip their cards to show role
                    const target_socket = game.socketsCache[player.getUid];
                    target_socket.emit("Start Game Status", {status:true});
                    target_socket.emit("Show Role", {role: player.getRole, uid: player.getUid});

                    //cache sockets with special role & tell player description 
                    switch (player.getRole) {
                        case 1:
                            game.mafiaCache.push(target_socket);
                            break;
                        case 2:
                            game.detective = target_socket;
                            break;
                        case 3:
                            game.doctor = target_socket;
                            break;
                        default:
                            break;
                    }
                    target_socket.emit("Role Description", {playerRole: player.getRole});
                }
                console.log(game)
            }
        } catch(err) {
            console.log(err);
            socket.emit("Forced Disconnect", {msg: "Unexpected error occurred"});
            socket.disconnect();
        }
    }

    /**
     * Disconnet the client and clean up 
     * @param {Object} socket 
     */
    static disconnect(socket) {
        try {
            const game = findGame(socket);
            const disconnect_player = game.players[socket.id];
            game.totalPlayers--;
        
            //Free the disconnected player from both the cache and the players list
            delete game.socketsCache[disconnect_player.getUid]; 
            delete game.players[socket.id];
            if (socket.id === game.owner && game.started === false) {
                //Disconnect all clients
                for (let key in game.socketsCache) {
                    const client = game.socketsCache[key];
                    client.emit("Forced Disconnect", {msg: "Game room was closed by owner"});
                    client.disconnect();
                }
                //Delete the game room from the room list
                delete gameRooms[game.roomid];
            } else {
                //Tell every client in the room that a client is disconnected 
                for (let key in game.socketsCache) {
                    const client = game.socketsCache[key];
                    client.emit("A Client Disconnected", {uid: disconnect_player.getUid});
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    /**
     * Add game object into list of game rooms
     * @param {Object} game 
     */
    static addGame(game) {
        gameRooms[game.roomid] = game;
        console.log(gameRooms);
    }
}

//Helper functions
function assignRole(roles, player) {
    //choose a random number from the array
    const randRole = roles[Math.floor(Math.random() * roles.length)];
    player.setRole = randRole;

    //remove the already chosen role 
    roles.splice(roles.indexOf(randRole), 1);
}

function findGame(socket) {
    const rooms = Object.keys(socket.rooms);
    const roomid = rooms[1];
    if (gameRooms[roomid] === undefined) throw "roomid undefined";
    return gameRooms[roomid];
}