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

    let query = "SELECT * FROM users WHERE user_name = ?;";
    connection.query(query,[req.session.user.user_name],function(error, rows, fields) {
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

router.post('/changeEmail', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE users SET email = ? WHERE user_name = ?;";
    connection.query(query,[req.body.new_email,req.session.user.user_name], function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }

      res.send(rows);
      if(rows.length==0)
      {
        console.log('incorrect email');
        res.sendStatus(401);
      } else if(rows[0].password == req.body.password) {
        console.log('sccuess');
        req.session.user = rows[0];
        res.sendStatus(200);
      } else {
        console.log('wrong password');
        res.sendStatus(401);
      }

    });
  });
});

module.exports = router;
