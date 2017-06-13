var express = require('express');
var router = express.Router();
var path = require('path');
// var Admin = require('../models/admin');
var issueList = require('../models/issuelist');
var app = express();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

router.get('/dashboard', loggedincheck, function(req,res,next){
  issueList.find({is_returned : false},function(err,due_issues){
    if(err){
      console.log(err);
    }
    else{
        issueList.find({is_returned : true},function(err,returned_issues){
         if(err){
           console.log(err);
         }
         else{
           res.render('dashboard', {issuelist : due_issues, returnissues : returned_issues});
         }
       });
    }
  });
});

router.post('/additem', loggedincheck, function(req,res,next){
  var add_issue = new issueList({
    book_name : req.body.book_name,
    book_id : req.body.book_id,
    issued_by : req.body.issued_by,
    phone : req.body.phone,
    branch : req.body.branch,
    regd_no : req.body.regd_no,
    issue_date : req.body.hidden_date
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
            res.redirect('/dashboard');
          }
        });
      }
    }
  });
});

router.post('/returnbook', loggedincheck, function(req,res,next){
  issueList.findOne({_id : req.body.returnissue_id},function(err,id){
    if(err){
      console.log(err);
    }
    else {
      if(id){
        id.returned_by = req.body.returnedby;
        id.return_date = req.body.returndate;
        id.is_returned = true;
        id.save(function(err){
          if (err){
            return handleError(err);
          }
          else{
            res.redirect('/dashboard');
          }
        });
      }
    }
  });
});

router.post('/deletebook', loggedincheck, function(req,res,next){
  issueList.remove({_id : req.body.delete_id}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/dashboard');
  });
});

module.exports = router;
