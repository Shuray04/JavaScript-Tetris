var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.listen('8000');



setInterval(function() {
    console.log("yeet");
  }, 1000);