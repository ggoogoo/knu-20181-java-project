var express = require('express');
var app = express();

var ejs = require('ejs');
app.set('views', __dirname + '/public');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/redirectToIndex', function(req, res){
  res.redirect('/');
});

app.get('/get/:number', function(req, res){
  res.render('what.ejs', { what: req.params.number});
});

app.post('/change', function(req, res){
  res.send(req.body.what);
});

app.listen(3000);
