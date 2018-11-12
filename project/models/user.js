
var mongoose = require('mongoose');
var bcrypt = require('bcrypt'); //문자열을 암호화시켜서 비교

var User = new mongoose.Schema({
  id: { type: String },
  pw: { type: String },
  name: { type: String }
});

User.methods.generateHash = function(pw){
  return bcrypt.hashSync(pw, 8);
}//암호화해서 저장

User.methods.validateHash = function(pw){
  return bcrypt.compareSync(pw,this.pw);
}//암호화된 애랑 비교 같으면 ture 다르면 false 반환

module.exports = mongoose.model('user', User);
