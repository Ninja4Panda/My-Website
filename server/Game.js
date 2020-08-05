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
    players = [];  //List of players indexed by their socket.id 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    numPlayers = 0;
    spectators = []; //List of spectators (joinning after game start, full room, players that died)
    socketsCache = []; //list of sockets in the room
    roles = [1,1,1,2,3,0,0,0];

    constructor(socket, name) {
        //Check in case the same roomid already exists
        //TODO: spotted a bug where when roomid is a valid number create  
        //it will create a lot of empty games in the gameRooms array
        //hence need to check if roomid is a number
        while(gameRooms[this.roomid] !== undefined) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //Add player into the list of players
        this.numPlayers++;
        const player = new Player(this.numPlayers, name, true);
        (this.players)[socket.id] = player;
        
        //cache the socket for later use
        this.socketsCache[socket.id] = socket;
        //Create room and make client owner 
        socket.join(this.roomid, () => {
            socket.emit("Create Game Status", {
                status:true, 
                roomid:this.roomid, 
                curPlayers:Object.values(this.players)
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
        } else if (game.started === true || game.numPlayers === 8) {
            //Join as spectator
            
        } else {
            //Join as player
            game.numPlayers++;
            const player = new Player(game.numPlayers, name, false);      
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
                socket.to(roomid).emit("A New player joined", {player: player});
            });
            console.log(game);
        }
    }

    /**
     * Start Game based on roomid
     * @param {Object} socket - Client socket object
     * @param {String} roomid - Room that the client is trying to start  
     */
    static startGame(socket, roomid) {
        const game = gameRooms[roomid];
        //Check if the person that emitted "start game" is owner 
        if (game === undefined || !game.players[socket.id].getIsOwner || game.started === true) { 
            //Disconnect malicious client
            // call our own disconnect function 
            //socket.disconnect(true); 
        } else if (game.numPlayers !== 8) {
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
    }

    disconnect(socket) {
        
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