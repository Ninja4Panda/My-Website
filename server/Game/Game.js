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
 * 2-police
 * 3-witch
 */ 
module.exports = class Game { 
    players = [];  //List of player objects indexed by their socket.id 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    totalPlayers = 0; //total number of players
    spectators = []; //List of spectators (joinning after game start, full room, players that died)
    socketsCache = []; //list of socket objects in the room indexed by their socket.id
    roles = [1,1,1,2,3,0,0,0];
    uid = 1; //uid for frontend dom to identify each client 

    constructor(socket, name) {
        //Check in case the same roomid already exists
        //TODO: spotted a bug where when roomid is a valid number create  
        //it will create a lot of empty games in the gameRooms array
        //hence need to check if roomid is a number
        while(gameRooms[this.roomid] !== undefined) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //Add player into the list of players
        this.totalPlayers++;
        const player = new Player(this.uid, name, true);
        this.uid++;
        (this.players)[socket.id] = player;
        
        //cache the socket for later use
        this.socketsCache[socket.id] = socket;
        //Create room and make client owner 
        socket.join(this.roomid, () => {
            socket.emit("Create Game Status", {
                status:true, 
                roomid:this.roomid, 
                curPlayers:this.names
            });
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
            const player = new Player(game.uid, name, false);      
            game.uid++;
            (game.players)[socket.id] = player;
            socket.join(roomid, () => {
                // whoami defines the permission of client that joins the room 
                // owner=0, players=1, spectators=2
                // curPlayers send a list of current players in the room 
                socket.emit("Join Game Status", {
                    status:true, 
                    whoami:1, 
                    curPlayers: Object.values(game.players)
                });

                game.socketsCache[socket.id] = socket;
                socket.to(roomid).emit("A New player joined", {name: name});
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
            if (!game.players[socket.id].getIsOwner || game.started === true) { 
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
                const entries = Object.entries(game.players);
                for(const [socketid, player] of entries) {
                    assignRole(game.roles, player);
                    //Tell player game has started & Flip their cards to show role
                    game.socketsCache[socketid].emit("Flip", {role: player.getRole, index: player.getIndex});
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