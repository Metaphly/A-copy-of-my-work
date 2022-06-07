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

  if(req.body.new_email == [])
  {
    console.log("empty email");
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE users SET email = ? WHERE user_name = ?;";
    connection.query(query,[req.body.new_email,req.session.user.user_name],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("email changed");
      req.session.email = req.body.new_email;
      res.sendStatus(200);
    });
  });
});


router.post('/changeName', function(req, res, next) {

  if(req.body.new_email == [])
  {
    console.log("empty name");
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE users SET user_name = ? WHERE user_name = ?;";
    connection.query(query,[req.body.new_name,req.session.user.user_name],function(error, rows, fields) {
      //connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("name changed");
      //req.session.name = req.body.new_name;
      //res.sendStatus(200);
    });

    connection.query("SELECT * FROM users WHERE user_name = ?;",[req.body.user_name], function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log('Can not find crated user info');
        res.sendStatus(500);
        return;
      }
      console.log("find user session info");
      req.session.user = rows[0];
      res.sendStatus(200);
    });

  });
});



module.exports = router;
