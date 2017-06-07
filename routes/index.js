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

// router.get('/dashboard', loggedincheck, function(req,res,next){
//   issueList.find({},function(err, getIssues){
//     if(err){
//       return handleError(err);
//     }
//     else{
//       res.render('dashboard', {IssueList : getIssues});
//     }
//   });
// });

router.get('/dashboard', function(req,res,next){
    res.render('dashboard', {});
});

// var loggedincheck = function(req,res,next){
//   console.log("loggedincheck......");
//   return next();
// }

// var loggedincheck = function(req,res,next){
//   if(req.session){
//     if(req.session.admin == 'library@cet'){
//       next();
//     }
//     else{
//       res.redirect('/');
//     }
//   }
//   else{
//     res.redirect('/');
//   }
// }

module.exports = router;
