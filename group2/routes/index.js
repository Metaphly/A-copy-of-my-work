var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

  if ('username' in req.body && 'password' in req.body) {
    if(req.body.username in users && users[req.body.username].password === req.body.password){
      console.log('success');
      req.session.user = users[req.body.username];
      res.sendStatus(200);
    } else {
      console.log('bad login');
      res.sendStatus(401);
    }
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }

});

router.get('/login', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    connection.query("SELECT * FROM users WHERE email = req.body.email;",[], function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }

      rows[0]

      } else {
        console.log('Incorrect request');
        res.sendStatus(400);
      }
    });
  });
});

module.exports = router;
