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

    connection.query("SELECT * FROM users WHERE email = ?;",[req.body.email], function(error, rows, fields) {
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
        res.redirect('/');
        //res.sendStatus(200);
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

    if(req.body.password != req.body.password2)
    {
      console.log("Get two different password");
      res.sendStatus(400);
      return;
    }else if(req.body.email == null)
    {
      console.log("invalid email");
      res.sendStatus(400);
      return;
    }else if(req.body.password == [] || req.body.password2 == [])
    {
      console.log("invalid password");
      res.sendStatus(400);
      return;
    }

    connection.query("INSERT INTO users(email,password) VALUES (?,?);",[req.body.email,req.body.password], function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log('user exist');
        res.sendStatus(500);
        return;
      }
      console.log('sccuess');
      req.session.user = {"email":req.body.email};
      res.sendStatus(200);
    });
  });
});



module.exports = router;
