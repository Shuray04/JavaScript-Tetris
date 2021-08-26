const TetrisGame = require('./game/TetrisGame.js');

var express = require('express');
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
  console.log("Connection from: ", socket.id);
  socket.on("message", (input) => {
      connections[socket.id].game.update(input);
      if (connections[socket.id].game.renderGame){
        socket.send({
          currentPiece: connections[socket.id].game.currentPiece,
          amountOfPieces: connections[socket.id].game.pieces.length,
          removeLineCounter: connections[socket.id].game.removeLineCounter,
          removableLines: connections[socket.id].game.removableLines,
          resetBlocks: connections[socket.id].game.currentPiece == null ? false : connections[socket.id].game.pieces 
        });
        console.log("sent package");
      }
    });
});

HTTP.listen(8000, function(){
  console.log('Server listening');
});


setInterval(function(){
  /*for (var connection of Object.entries(connections)){
    console.log(connection);
    /*if (!connection.[socket.connected]){
      delete connections(connection);
    }
  }*/
  console.log(Object.keys(connections).length);
}, 1000);