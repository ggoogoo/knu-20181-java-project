var express = require('express');
var app = express();
var ejs = require('ejs');
var session = require('express-session');

app.set('views', __dirname + '/public');
var bodyParser = require('body-parser');

var static = require('serve-static');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));

var session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

var Toilet = require('./public/toilet');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const mongoose = require('mongoose');
mongoose.connect('mongodb://muknu:muknu1234@ds127139.mlab.com:27139/muknu');

// var User = require('./models/user');

// app.get('/', function(req, res){
//   res.render('index.ejs');
// });

var Board = require('./models/board');
var User = require('./models/user');
app.get('/', function(req,res){
  Board.find({},function(err,boards){
    if(!err){
      res.render('index.ejs',{results:boards, account: req.session.account}); //index.ejs로 user정보도 넘겨줌.
    }
  });
});

app.get('/register', function(req, res){
    if ( req.session.account ){
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

app.post('/register', function(req, res){
    User.findOne({ id: req.body.id }, function(err, account){
        if ( account !== null ){
            res.send("이미 가입된 아이디입니다.");
        } else{
            let account = new User({
                id: req.body.id,
                name: req.body.name
            });
            account.pw = account.generateHash(req.body.pw);
            account.save(function(err){
                req.session.account = {
                    name: account.name,
                    id: account.id
                }
                res.redirect('/');
            })
        };
    });
});

app.post('/login', function(req, res){
    User.findOne({ id: req.body.id }, function(err, account){
      if ( account === null ){
        res.send('아이디가 없습니다.');
      }
      else {
        if(account.validateHash(req.body.pw) === false){
          res.send('비밀번호가 틀렸습니다.');
        }
        else {
          req.session.account = {
            name: account.name,
            id: account.id
          }
          res.redirect('/');
          console.log(req.session)
        }
      }
    });
  });

  app.get('/login', function(req, res){
    if ( req.session.account ){
      res.redirect('/');
    } else{
      res.redirect('/');
    }
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  });


app.post('/write', function(req,res){
  var board = new Board({
    score: req.body.starInput,
    content: req.body.inputContent,
    created_at: (new Date()).toISOString(),
    toiletpaper: req.body.toiletpaper,
    cleaness: req.body.cleaness
  });
  board.save(function(err){
    res.redirect('/index2');
  });
});

app.get('/index2', function(req,res){
  Board.find({},function(err,boards){
    if(!err){
        res.render('index2.ejs',{results:boards, user: req.session.user, to: Toilet.Toilet});
    }
  });
});



app.get('/1', function(req,res) {
  res.render('1.ejs', { to: Toilet.Toilet})
})

app.listen(3000);
