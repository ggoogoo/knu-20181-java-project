var express = require('express');
var app = express();

var ejs = require('ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  console.log(res);
  var number = 46;
  res.render('index.ejs', { num: number });//res.send('박지현');
});

app.listen(3000);
