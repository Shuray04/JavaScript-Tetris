const inputHandler = require('./game/InputHandler.js');
const { Worker } = require('worker_threads');
const express = require('express');
const APP = express();
const HTTP = require('http').createServer(APP);
const IO = require('socket.io')(HTTP);

APP.use(express.static(__dirname + '/web'))

var connections = {};

IO.on('connection', function(socket){
  socket.on("message", (input) => {
    socket.pause();
  });

  socket.on('disconnect', function(){
    delete connections[socket.id];
    console.log("Client disconnected: ", socket.id);
  });

  socket.setTimeout(14);
  socket.on('timeout', () => {
    socket.resume();
  });
  

  console.log("Connection from: ", socket.id);
  var worker = new Worker("./game/TetrisThread.js");
  worker.on('message', (data) => { socket.send(data); });
  worker.on("exit", exitCode => { console.log(exitCode); })

  var inputHandler = new InputHandler();

  connections[socket.id] = {
    socket: socket,
    thread: worker,
    inputHandler: new InputHandler()
  }
});


HTTP.listen(8000, function(){
  console.log('Server listening');
});