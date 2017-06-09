var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models/admin');
var issueList = require('../models/issuelist');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

router.post('/login', function(req, res, next) {
  Admin.findOne({admin : req.body.username, password : req.body.password},function(err,admin){
    if (err){
      res.redirect('/logout');
    }
    else{
      if(admin){
        req.session.admin = 'library@cet'
         res.redirect('/dashboard');
      }
      else{
        res.redirect('/');
      }
    }
  })
});

router.get('/logout', function(req,res,next){
  req.session.admin = null;
  res.redirect('/');
});

var loggedincheck = function(req,res,next){
  if(req.session){
    if(req.session.admin == 'library@cet'){
      return next();
    }
    else{
      res.redirect('/');
    }
  }
  else{
    res.redirect('/');
  }
}

router.get('/dashboard', loggedincheck, function(req,res,next){
  issueList.find({},function(err,issues){
    if(err){
      console.log(err);
    }
    else{
        res.render('dashboard', {issuelist: issues});
    }
  })
});

router.post('/additem', loggedincheck, function(req,res,next){
  var add_issue = new issueList({
    book_name : req.body.book_name,
    book_id : req.body.book_id,
    issued_by : req.body.issued_by,
    phone : req.body.phone,
    branch : req.body.branch,
    regd_no : req.body.regd_no,
    issue_date : req.body.issue_date
  });
  add_issue.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect('/dashboard');
    }
  })
});

router.post('/editbook', loggedincheck, function(req,res,next){
  issueList.findOne({_id : req.body.issue_id},function(err,id){
    if(err){
      console.log(err);
    }
    else {
      if(id){
        id.book_name = req.body.bookname;
        id.book_id = req.body.bookid;
        id.issued_by = req.body.issuedby;
        id.phone = req.body.phoneno;
        id.branch = req.body.branch;
        id.regd_no = req.body.regdno;
        id.issue_date = req.body.issuedate;
        id.save(function(err){
          if (err){
            return handleError(err);
          }
          else{
            console.log("Issue edited successfully");
            console.log("new values = "+id);
            res.redirect('/dashboard');
          }
        });
      }
    }
  });
});

module.exports = router;
