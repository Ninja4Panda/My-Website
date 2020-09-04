module.exports = function(http) {
    const io = require("socket.io")(http, {
        serveClient: false,
        cookie: false
    }); //set options & use cors/csp
    const Game = require("./Game");

    io.on("connection", (socket) => {
      console.log("a user connected", socket.id);
        
      // Listen to when a client creates a new room
      socket.on("Create Game", ({name}) => {
        const game = new Game(socket, name);
        Game.addGame(game);
      });
        
      // Listen to when a client wants to join a room
      socket.on("Join Game", ({name, roomid}) => {
        Game.joinGame(socket, name, roomid);
      });
        
      // Listen to when the client wants to initiate a game
      socket.on("Start Game", () => {
        Game.startGame(socket);
      });
    
      // Listen to when a client disconnects
      socket.on("disconnecting", () => {
        Game.disconnect(socket);
        console.log("disconnecting:", socket.id);
      });

    });
}