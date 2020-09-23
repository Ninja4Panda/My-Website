const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const { port } = require('./config');

//Compress all routes
const compression = require('compression');
app.use(compression()); 

//Libray that sets up http headers for security purposes not used for now
// const helmet = require('helmet');
// app.use( helmet({
//   contentSecurityPolicy: false,
// }));

//Builds all public files for pages
app.use(express.static(path.join(__dirname+"/src")));
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname+'/src/Main/assests/favicon.ico')));

//Handles the io connection for game
const ioFunc = require("./server/Game/io");
ioFunc(http);

app.get("/",(req, res) => {
  res.sendFile(process.cwd()+"/src/Main/index.html");
});

app.get("/game",(req, res) => {
  res.sendFile(process.cwd()+"/src/Game/game.html");
});

// Handles page not found error
app.use((req, res) => {
  res.status(404).sendFile(process.cwd()+"/src/Error/error.html");
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});