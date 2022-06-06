var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/', function(req, res, next) {
  if(!('user' in req.session)) {
    console.log("Haven't login");
    res.sendStatus(403);
  }else
  {
    next();
  }
});

router.get('/userPage', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/user.html'));
});

router.get('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
  }
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

router.get('/userInfo', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT * FROM users WHERE email = ?;";
    connection.query(query,[req.session.user.email],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("email error");
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]);
    });
  });
});

module.exports = router;
