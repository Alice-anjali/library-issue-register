var express = require('express');
var router = express.Router();
var path = require('path');
var Admin = require('../models/admin');
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




module.exports = router;
