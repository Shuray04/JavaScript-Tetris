var express = require('express');
var tetris = require("./TetrisGame.js");
const APP = express();
APP.use(express.static(__dirname + '/web'));

const HTTP = require('http').createServer(APP);
const IO = require('socket.io')(HTTP);

var connections = {};


IO.on('connection', function(socket){
  connections[socket.id] = {
    socket: socket,
    game: new TetrisGame()
  }
  socket.send([1, 2, 3, 4, 5]);
  console.log("Connection from: ", socket.id);
  socket.on("message", (input) => {
      connections[socket.id][game].update(input);
      socket.send(connections[socket.id][game].pieces);
    });
});


HTTP.listen(8000, function(){
  console.log('Server listening');
});


setInterval(function(){
  for (connection in connections){
    if (!connections[connection].connected){
      connections.splice(connection, 1);
    }
  }
  console.log(connections.length);
}, 1000);