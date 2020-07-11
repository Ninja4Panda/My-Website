const express = require('express')
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//this builds all the static js files for reacts
app.use(express.static(path.join(__dirname+'/client/build')));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/client/build/index.html');
});

//on every client connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // listen to when a client socket send back a msg
  socket.on('msg', (res) => {
    console.log(res);
  });

  socket.on('disconnect', () =>{
    console.log('disconnecting:', socket.id)
  });

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});