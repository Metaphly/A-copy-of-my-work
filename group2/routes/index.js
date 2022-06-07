var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loginPage', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/login.html'));
});

router.get('/signupPage', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/signup.html'));
});

router.get('/events', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT event_id,event_name,location,start_time FROM events;";
    connection.query(query, function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/login', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    if('user' in req.session){
      console.log("already log in");
      res.sendStatus(409);
      return;
    }

    connection.query("SELECT * FROM users WHERE user_name = ?;",[req.body.user_name], function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }

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

router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    if('user' in req.session){
      console.log("already log in");
      res.sendStatus(409);
      return;
    }

    if(req.body.password != req.body.password2)
    {
      console.log("Get two different password");
      res.sendStatus(400);
      return;
    }else if(req.body.user_name == [])
    {
      console.log("User name empty!");
      res.sendStatus(400);
      return;
    }else if(req.body.password == [] || req.body.password2 == [])
    {
      console.log("invalid password");
      res.sendStatus(400);
      return;
    }

    let query="INSERT INTO users(user_name,password) VALUES (?,?);";
    connection.query(query,[req.body.user_name,req.body.password], function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log('user exist');
        res.sendStatus(500);
        return;
      }
      console.log('sccuess');
      req.session.user = {"user_name":req.body.user_name, "email":""};
      res.sendStatus(200);
    });
  });
});



module.exports = router;
