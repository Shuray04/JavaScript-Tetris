var express = require('express');
const APP = express();
APP.use(express.static(__dirname + '/web'));

const HTTP = require('http').createServer(APP);
const IO = require('socket.io')(HTTP);

var connections = [];


IO.on('connection', function(socket){
  connections.push(socket);
  socket.send([1, 2, 3, 4, 5]);
  console.log("Connection from: ", socket.id);
  socket.on("message", (data) => {
    if (data){
      socket.send("------------------------------------------------");
    }
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