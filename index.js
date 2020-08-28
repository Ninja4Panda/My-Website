const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);//set options & use cors/csp

const Game = require("./server/Game/Game");

//Builds all public files for pages
app.use(express.static(path.join(__dirname+"/Main")));
app.use(express.static(path.join(__dirname+"/Game")));

//On every client connection
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
  socket.on("Start Game", ({roomid}) => {
    Game.startGame(socket, roomid);
  });

  // Listen to when a client disconnect
  socket.on("disconnect", () => {
    // const game = Game.getGameBySocket(socket);
    // game.disconnect(socket);
    console.log("disconnecting:", socket.id);
  });
});

//=========== routes ==============
app.get("/game",(req, res) => {
  res.sendFile(__dirname+"/Game/game.html");
});

// Handles page not found error
app.use((req, res) => {
  res.status(404).send("OH NO YOU DIED >_<");
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});