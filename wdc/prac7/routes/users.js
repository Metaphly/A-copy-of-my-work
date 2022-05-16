var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var blogposts=[];

router.post('/addpost', function(req, res, next) {
  blogposts.unshift(req.body);
  res.send('correct');
});

module.exports = router;
