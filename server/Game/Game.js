const crypto = require("crypto");
const Player = require('./Player');
const { lookup } = require("dns");

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
 * 2-police
 * 3-witch
 */ 
module.exports = class Game { 
    players = [];  //List of player objects indexed by their uid 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    totalPlayers = 0; //total number of players
    spectators = []; //List of spectators (joinning after game start, full room, players that died)
    socketsCache = []; //Array of socket objects in the room
    roles = [1,1,1,2,3,0,0,0];
    uid = 0; //uid for frontend dom to identify each client 
    owner;//socket.id of owner

    constructor(socket, name) {
        //Check in case the same roomid already exists
        //Check in case randomly generated value is a number (which will create a lot of empty holes in the array)
        while(gameRooms[this.roomid] !== undefined && !isNaN(this.roomid)) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //Add player into the list of players
        this.totalPlayers++;
        const player = new Player(this.uid, name);
        this.uid++;
        this.players.push(player);
        
        //cache the socket for later use
        this.socketsCache.push(socket);
        //Create room and make client owner 
        this.owner = socket.id;
        socket.join(this.roomid, () => {
            socket.emit("Create Game Status", {
                status:true, 
                roomid:this.roomid
            });
            //Add client into lobby
            socket.emit("A New player joined", {name: name, uid: player.getUid});
        });
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
            //Join as player
            game.totalPlayers++;
            const player = new Player(game.uid, name);      
            game.uid++;
            game.players.push(player);

            socket.join(roomid, () => {
                // whoami defines the permission of client that joins the room 
                // owner=0, players=1, spectators=2
                // curPlayers send a list of current players in the room 
                socket.emit("Join Game Status", {
                    status:true, 
                    whoami:1
                });

                //Send already existed clients 
                for(let i = 0; i < game.players.length; i++) {
                    console.log(game.players[i].getName);
                    socket.emit("A New player joined", {name: game.players[i].getName, uid: game.players[i].getUid});
                }

                //Update other client that a new client joined
                game.socketsCache.push(socket);
                socket.to(roomid).emit("A New player joined", {name: name, uid: player.getIndex});
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
            } else if (game.totalPlayers !== 8) {
                //Not enough player
                const msg = "Not enough players";
                socket.emit("Start Game Status", {status:false, msg:msg});
            } else {
                //Start the Game
                game.started = true;
                //loop through all the players
                for(let i = 0; i < game.players.length; i++) {
                    const player = game.players[i];
                    assignRole(game.roles, player);
                    //Tell player game has started & Flip their cards to show role
                    const target_socket = game.socketsCache[i];
                    target_socket.emit("Flip", {role: player.getRole, uid: player.getUid});
                }
                socket.emit("Start Game Status", {status:true});
            }
        } catch(err) {
            console.log(err);
        }
    }

    /**
     * Disconnet the client and clean up 
     * @param {Object} socket 
     */
    static disconnect(socket) {
        try {
            const game = findGame(socket);
            console.log(game);

        } catch(err) {
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
    if (roomid === undefined) throw "roomid undefined";
    return gameRooms[roomid];
}