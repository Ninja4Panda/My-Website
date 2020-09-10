const crypto = require("crypto");
const Player = require('./Player');
const { startGameLogic } = require("./GameLogic");

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
    server; //server io
    players = [];  //List of player objects indexed by their socket.id 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    totalPlayers = 0; //total number of players
    dead = []; //Array of dead 
    socketsCache = []; //Array of all socket objects in the room indexed by uid
    roles = [1,1,1,2,3,0,0,0];
    uid = crypto.randomBytes(2).toString('hex'); //uid for frontend dom to identify each client 
    owner;//socket.id of owner
    mafiaCache = []; //sockets of mafias
    detective; //socket of detective
    doctor = []; //doctor[0]:socket, doctor[1]:revive, doctor[2]:posion
    votes = [];
    clock = 300;

    constructor(io, socket, name) {
        //Check in case the same roomid already exists
        //Check in case randomly generated value is a number (which will create a lot of empty holes in the array)
        while(!isNaN(this.roomid) || gameRooms[this.roomid] !== undefined) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //Same checks for uid
        while(!isNaN(this.uid)) {
            this.uid = crypto.randomBytes(2).toString('hex');
        }

        //Add server
        this.server = io;
        
        //Add player into the list of players
        this.totalPlayers++;
        //Trim to get rid of the useless white spaces
        name = name.trim();
        //People that don't follow rules
        if (name.length > 20 || name.length <= 0) name = "Smart Boi";
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

        //Listen to when the owner wants to initiate a game
        socket.on("Start Game", () => {
            this.startGame(socket);
        });
        
        //Disconnect room owner when time is up
        const timer = setInterval(() => {
            //clean up the clock if game started or no players left
            if (this.started || this.totalPlayers === 0) {
                clearInterval(timer);
            } else if (this.clock <= 1) {
                clearInterval(timer);
                //Disconnect all client
                this.disconnect(socket);
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
        //Trim to get rid of the useless white spaces
        name = name.trim();
        //People that don't follow rules
        if (name.length > 20 || name.length <= 0) name = "Smart Boi";

        if (game === undefined) { //Check if specified room exists
            socket.emit("Join Game Status", ({status: false, msg:"Room doesn't exits"}));
        } else if (game.started === true) { //Check if game started already 
            socket.emit("Join Game Status", ({status: false, msg:"Game already started"}));
        } else if (game.totalPlayers === 8) { //Check if game is full
            socket.emit("Join Game Status", ({status: false, msg:"Room is full"}));
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
                    msg:"Success",
                    roomid:game.roomid,
                    whoami:1,
                    clock:game.clock
                });

                //Send other clients that is already in the room to new client 
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
    startGame(socket) {
        //Check if the game is already started 
        if (this.started === true) { 
            //Disconnect malicious client 
            this.disconnect(socket); 
        } else if (this.totalPlayers < 8) {
            //Not enough player
            const msg = "Not enough players";
            socket.emit("Start Game Status", {status:false, msg:msg});
        } else {
            //Start the Game
            this.started = true;
            // Send role to all clients in game
            sendRole(this);
            //Start doing game logic
            startGameLogic(this);
        }
    }

    /**
     * Disconnet the client and clean up 
     * @param {Object} socket 
     */
    disconnect(socket) {
        const disconnect_player = this.players[socket.id];
        this.totalPlayers--;
        //Free the disconnected player from both the cache and the players list
        delete this.socketsCache[disconnect_player.getUid]; 
        delete this.players[socket.id];
        if (socket.id === this.owner && this.started === false) {
            //Disconnect all clients
            for (let key in this.socketsCache) {
                const client = this.socketsCache[key];
                client.emit("Forced Disconnect", {msg: "Game room was closed by owner"});
                client.disconnect();
            }
            //Delete the game room from the room list
            delete gameRooms[this.roomid];
        } else {
            //If the disconnected client is the last client then delete the room
            if (this.totalPlayers === 0) {
                delete gameRooms[this.roomid];
            } else {
                if (this.started) {
                    //If the client disconnected is a detective
                    if(this.detective !== null && this.detective.id === socket.id) {
                         this.detective = null;
                    } else if(this.doctor !== null && this.doctor[0].id === socket.id) {
                        this.doctor = null;
                    }
                }
                
                //Tell every client in the room that a client is disconnected 
                for (let key in this.socketsCache) {
                    const client = this.socketsCache[key];
                    client.emit("A Client Disconnected", {uid: disconnect_player.getUid});
                }
            }
        }
        // console.log(gameRooms);
    }
    
    /**
     * Find game client is in based on the socket
     * @param {Object} socket - Client socket 
     * @returns Game found or throws roomid undefined error
     */
    static findGame(socket) {
        const rooms = Object.keys(socket.rooms);
        const roomid = rooms[1];
        if (gameRooms[roomid] === undefined) throw new ReferenceError("Roomid undefined");
        return gameRooms[roomid];
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
/**
 * Assign role to player
 * @param {int} roles - Array of Roles  
 * @param {Object} player - Player to assign the role to  
 */
function assignRole(roles, player) {
    //choose a random number from the array
    const randRole = roles[Math.floor(Math.random() * roles.length)];
    player.setRole = randRole;

    //remove the already chosen role 
    roles.splice(roles.indexOf(randRole), 1);
}

/**
 * Loop through all the players and send the role to them
 * @param {Object} game 
 */
function sendRole(game) {
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
                target_socket.join(game.roomid+"-m");
                game.mafiaCache.push(target_socket);
                break;
            case 2:
                game.detective = target_socket;
                break;
            case 3:
                game.doctor.push(target_socket);
                game.doctor.push(1);
                game.doctor.push(1);
                break;
            default:
                break;
        }
        target_socket.emit("Role Description", {playerRole: player.getRole});
    }
}
