const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);

//Compress all routes
const compression = require('compression');
app.use(compression()); 

//Libray that sets up http headers for security purposes not used for now
// const helmet = require('helmet');
// app.use( helmet({
//   contentSecurityPolicy: false,
// }));

//Builds all public files for pages
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname+'/Main/assests/favicon.ico')));
app.use(express.static(path.join(__dirname+"/Error")));
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
  res.status(404).sendFile(process.cwd()+"/Error/error.html");
});

http.listen(3000, () => {
  console.log("Listening on *:3000");
});