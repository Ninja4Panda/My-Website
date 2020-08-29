const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);

//Builds all public files for pages
app.use(express.static(path.join(__dirname+"/Main")));
app.use(express.static(path.join(__dirname+"/Game")));

//Handles the io connection for game
const ioFunc = require("./server/Game/io");
ioFunc(http);

app.get("/game",(req, res) => {
  res.sendFile(process.cwd()+"/Game/game.html");
});

// Handles page not found error
app.use((req, res) => {
  res.status(404).send("OH NO YOU DIED >_<");
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});