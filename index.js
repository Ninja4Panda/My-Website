const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const Game = require("./server/Game");

//Builds all public files for pages
app.use(express.static(path.join(__dirname+"/public")));
app.use(express.static(path.join(__dirname+"/public/killerPanda")));

//on every client connection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  
  // listen to when a client creates a new room
  socket.on("Create Game", ({name}) => {
    const game = new Game(name, socket);
    Game.addGame(game);
  });
  
  // listen to when a client wants to join a room
  socket.on("Join Game", ({name, roomid}) => {
    Game.joinGame(name, roomid, socket);
  });
  
  // listen to when the client wants to initiate a game
  socket.on("Start Game", () => {
    Game.startGame(socket);
  });

  // listen to when a client disconnect
  socket.on("disconnect", () => {
    // const game = Game.getGameBySocket(socket);
    // game.disconnect(socket);
    console.log("disconnecting:", socket.id);
  });
});

//=========== routes ==============
app.get("/game",(req, res) => {
  res.sendFile(__dirname+"/public/killerPanda/game.html");
});

// Handles page not found error
app.use((req, res) => {
  res.status(404).send("OH NO YOU DIED >_<");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});