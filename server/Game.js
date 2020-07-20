const crypto = require("crypto");
const gameRooms = [];
const Player = require('./Player');

// 3 channels players, mafia, spectator
/** 
 * 0-nobody 
 * 1-mafia
 * 2-police
 * 3-witch
 * */ 
module.exports = class Game { 
    players = [];
    started = false;
    room = crypto.randomBytes(4).toString('hex');
    roles = [1,1,1,2,3,0,0,0];

    createGame({name}, socket) {
        //check in case the same room already exists
        while(gameRooms.includes(this.room)) this.room = crypto.randomBytes(4).toString('hex');
        gameRooms.push(this.room);
        //put client to the room
        socket.join(this.room, () => {
            socket.emit("Join Game Status", {status:true, roomid:this.room});
        });
        console.log(gameRooms);
        //add player into the array of players
        const player = new Player(name);
        (this.players).push(player);
        console.log(this.players)
    }

    //static funciton for joining game
    static joinGame({name, room}, socket) {
        //check if specified room exists
        if (gameRooms.includes(room)) {
            socket.join(this.room, () => {
                socket.emit("Join Game Status", true);
            });
            const player = new Player(name);
            (this.players).push(player);
        } else {
            socket.emit("Join Game Status", false);
        } 
    }

    startGame() {
        (this.players).forEach(this.assignRole);
        this.started = true;
    }

    assignRole(player) {
        //choose a random number from the array
        const randRole = roles[Math.floor(Math.random() * roles.length)];
        player.setRole(randRole);
        //remove the already chosen one 
        (this.roles).splice((this.roles).indexOf(randRole), 1);
    }
}
