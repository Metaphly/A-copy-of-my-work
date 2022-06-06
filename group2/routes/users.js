var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
router.use('/', function(req, res, next) {
  if(!(user in req.session)) {
    console.log("Haven't login");
    res.sendStatus(403);
  }else
  {
    next();
  }
});*/

router.get('/userPage', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/login.html'));
});

module.exports = router;
