var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  admin : String,
  password : String
});

var admin = mongoose.model('myadmin', userSchema)

module.exports = admin
