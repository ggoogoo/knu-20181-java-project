var mongoose = require('mongoose');

var Board = new mongoose.Schema({
  content: {type: String},
  score: {type: String},
  created_at: {type: String},
  toiletpaper: {type: String},
  cleaness : {type: String}
});

module.exports = mongoose.model('board',Board);
