var express = require('express');
var router = express.Router();


router.use('/', function(req, res, next) {
  if(!(user in req.session)) {
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
