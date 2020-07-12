const crypto = require("crypto");
const gameRooms = [];

//3 channels players, mafia, spectator
module.exports = class Game {
    //private field 
    #players = [];
    #mafia = [];
    #police;
    #witch;
    #started = true;

    createGame(data, socket) {
        //check in case the same room already exists
        var room = crypto.randomBytes(4).toString('hex');
        while(gameRooms.includes(room)) room = crypto.randomBytes(4).toString('hex');
        gameRooms.push(room);
        //put client to the room
        socket.join(room)
        console.log(gameRooms);
    }

    //static funciton for joining game
    static joinGame({name, room}, socket) {
        console.log(name);
        if(started) ;
    }

    //Start Game
    startGame() {

    }
    //assign roles
    assignRoles() {

    }
}
