const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const { port, staticFiles, mainPage, gamePage, errorPage } = require('./config');

//Compress all routes
const compression = require('compression');
app.use(compression()); 

//Libray that sets up http headers for security purposes not used for now
// const helmet = require('helmet');
// app.use( helmet({
//   contentSecurityPolicy: false,
// }));

//Builds all public files for pages
app.use(express.static(path.join(__dirname+staticFiles)));
const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname+'/src/Main/assests/favicon.ico')));

//Handles the io connection for game
const ioFunc = require("./server/Game/io");
ioFunc(http);

app.get("/",(req, res) => {
  res.sendFile(process.cwd()+mainPage);
});

app.get("/game",(req, res) => {
  res.sendFile(process.cwd()+gamePage);
});

// Handles page not found error
app.use((req, res) => {
  res.status(404).sendFile(process.cwd()+errorPage);
});

http.listen(port, () => {
  console.log(`Listening on *:${port}`);
});