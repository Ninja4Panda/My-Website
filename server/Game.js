const crypto = require("crypto");
const Player = require('./Player');

const gameRooms = []; // list of game rooms indexed by roomid
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
 * */ 
module.exports = class Game { 
    players = [];  //list of players indexed by their socket.id 
    started = false;
    roomid = crypto.randomBytes(4).toString("hex");
    roles = [1,1,1,2,3,0,0,0];
    numPlayers = 0;
    spectators = []; //list of spectators (joinning after game start, full room, players that died)

    constructor(name, socket) {
        //check in case the same roomid already exists
        while(gameRooms[this.roomid] !== undefined) {
            this.roomid = crypto.randomBytes(4).toString('hex');
        }

        //put client into room
        socket.join(this.roomid, () => {
            socket.emit("Create Game Status", {status:true, roomid:this.roomid});
        });
        
        //add player into the list of players
        const player = new Player(name);
        (this.players)[socket.id] = player;
        this.numPlayers++;
        console.log(this);
    }
    
    /**
     * Static function for joinning game 
     * Since roomid is provided we can get an instance of the object 
     */
    static joinGame(name, roomid, socket) {
        const game = gameRooms[roomid];
        //check if specified room exists
        if (game === undefined) {
            //no such room 
            socket.emit("Join Game Status", false);
        } else if (game.started === true || game.numPlayers === 8) {
            //join as spectator
            
        } else {
            //join as player
            const player = new Player(name);      
            (game.players)[socket.id] = player;
            game.numPlayers++;
            socket.join(roomid, () => {
                // whoami defines the client that joins the room 
                // owner=0, players=1, spectators=2
                socket.emit("Join Game Status", {status:true, whoami:1});
                socket.to(roomid).emit("A New player joined", {name: name});
            });
            console.log(game);
        }
    }

    startGame(socket) {
        console.log(socket.room);
        (this.players).forEach(assignRole);
        this.started = true;
    }

    
    disconnect(socket) {
        
    }

    //return game object based on a socket
    static getGameBySocket(socket) {
        
    }

    //Add game object into list of game rooms
    static addGame(game) {
        gameRooms[game.roomid] = game;
        console.log(gameRooms);
    }
}

//Helper functions
function assignRole(player) {
    //choose a random number from the array
    const randRole = roles[Math.floor(Math.random() * roles.length)];
    player.setRole(randRole);
    //remove the already chosen role 
    (this.roles).splice((this.roles).indexOf(randRole), 1);
}
