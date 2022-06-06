var express = require('express');
var path = require('path');
var router = express.Router();


router.use('/', function(req, res, next) {
  if(!(user in req.session)) {
    console.log("Haven't login");
    res.sendStatus(403);
  }else
  {
    next();
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
