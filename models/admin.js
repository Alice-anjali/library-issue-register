var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  admin : String,
  password : String
},{ collection: 'myAdmin' });

var admin = mongoose.model('myAdmin', userSchema)

module.exports = admin
