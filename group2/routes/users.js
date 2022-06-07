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

router.get('/eventsCreator', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/eventsCreator.html'));
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
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("name changed");
    });

    connection.query("SELECT * FROM users WHERE user_name = ?;",[req.body.new_name], function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log('Can not find updated user info');
        res.sendStatus(500);
        return;
      }
      console.log("find updated user session info");
      req.session.user = rows[0];
      res.sendStatus(200);
    });

  });
});

router.post('/addevent', function(req, res, next) {

  if(req.body.event_name == [] || req.body.location == [] || req.body.descriptio == [] || req.body.start_date == [])
  {
    console.log("empty input");
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "INSERT INTO events(event_name,location,description,start_date,creator) VALUES (?,?,?,?,?);";
    connection.query(query,[req.body.event_name,req.body.location,req.body.description,req.body.start_date,req.session.user.user_id],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("event created");
      res.sendStatus(200);
    });
  });
});

router.post('/takeevent', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
  if(error){
    res.sendStatus(500);
    return;
  }

  let query = "INSERT INTO user_events(user_id,event_id) VALUES (?,?);";
  connection.query(query,[req.session.user.user_id,req.body.event_id],function(error, rows, fields) {
    connection.release();
    if (error) {
      console.log("query error");
      res.sendStatus(500);
      return;
    }
    console.log("sucessfully take the event");
    res.sendStatus(200);
  });
});
});

router.get('/myevents', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT * FROM user_events WHERE user_id = ?;";
    connection.query(query,[req.session.user.user_id],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

router.post('/freetime', function(req, res, next) {

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE user_events SET email = ? WHERE user_name = ?;";
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

module.exports = router;
