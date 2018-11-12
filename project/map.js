var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var file = '/dev/cu.usbserial';
// var file = '/dev/ttyUSB0';
//var file = '/dev/tty.usbserial';
// var file = '/dev/tty.usbmodem1411';

var GPS = require('gps');
var gps = new GPS;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/map.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
