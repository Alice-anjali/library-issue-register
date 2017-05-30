var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

router.post('/login', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/dashboard.html'));
});

module.exports = router;
