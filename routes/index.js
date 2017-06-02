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
    if(admin){
      res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'));
    }
    else{
      res.redirect('/');
    }
  })
});

module.exports = router;
