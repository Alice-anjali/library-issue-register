var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  book_name : String,
  book_id : String,
  issued_by : String,
  phone : String,
  branch : String,
  regd_no : String,
  issue_date : Date,
  is_returned : Boolean,
  returned_by : String,
  return_date : Date
});

var issues = mongoose.model('Issuelist', issueSchema)

model.exports = issues
