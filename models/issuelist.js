var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = new Schema({
  book_name : String,
  book_id : String,
  issued_by : String,
  phone : String,
  branch : String,
  regd_no : String,
  issue_date : {type: Date, default: Date.now},
  is_returned : {type: Boolean, default:false},
  returned_by : String,
  return_date : {type: Date, default: Date.now}
});

var issues = mongoose.model('Issuelist', issueSchema)

module.exports = issues
