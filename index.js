const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Game = require('./server/Game');

//this builds all the static js files for reacts
app.use(express.static(path.join(__dirname+'/client/build')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/client/build/index.html');
});

//on every client connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // listen to when a client creates a new room
  socket.on('Create Game', (data) => {
    const game = new Game();
    game.createGame(data, socket);
  });

  // listen to when a client wants to join a room
  socket.on('Join Game', (data) => {
    Game.joinGame(data, socket);
  });

  socket.on('disconnect', () =>{
    console.log('disconnecting:', socket.id);
  });
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});