var express = require('express'); // web server를 사용하기 위해 express 모듈사용
var app = express();

var bodyParser = require('body-parser'); //bodyParser 모듈은 req.body를 사용하기 위해필요
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var path = require('path');//기본 내장으로 따로 깔아주지 않아도 괜찮

app.get ('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/index.html')); //__dirname : node 에서 제공하는 node 파일의 경로를 담고 있는 변수
});

app.post('/ajax/test',function(req, res){
  res.json({
    text: 'ajax 요청을 하셨습니다.'
  });//javascript 객체 그래서 {}만들어줌 저 객체만 브라우저에 전달.
});

app.post('/ajax/test2', function(req, res){
  res.json({
    text: req.body.text //객체를 text로 받았기 때문에 서버에 전송된 것을 받을 수 있다.
  });
});


app.listen(3000);
