var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  email: String,
  password: String
});
mongoose.model('User', UserSchema); //Creating User model 

module.exports = mongoose.model('User');