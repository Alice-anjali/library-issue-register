var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  admin : String,
  password : String
});

var admin = mongoose.model('Admin', userSchema)

model.exports = admin
