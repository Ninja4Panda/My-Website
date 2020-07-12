const crypto = require("crypto");
const gameRooms = [];

module.exports = class Game {
    //field 
    room;
    numPlayers = 1;


    createGame(data, socket) {
        console.log(data.name);
        gameRooms.push(crypto.randomBytes(4).toString('hex'));
        console.log(gameRooms);
    }

    //static funciton for joining game
    static joinGame({name, room}, socket) {
        console.log(name);
    }
}
