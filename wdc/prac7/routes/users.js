var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('*',function(req, res, next){
  console.log("POST from a user");
  next();
});

var blogposts=[];

router.post('/addpost', function(req, res, next) {
  blogposts.unshift(req.body);
  res.end();
});

router.get('/getposts', function(req, res, next) {
  res.send(blogposts);
});

module.exports = router;
