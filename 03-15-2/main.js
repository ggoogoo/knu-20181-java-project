var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname +'/hh.html'))
});

app.get('/iamtext', function(req, res){
  res.sendFile(path.resolve(__dirname + '/package.json'))
});

app.get('/iamnottext', function(req, res){
  res.sendFile(path.resolve(__dirname + '/dd.jpg'))
});

app.listen(3000);
