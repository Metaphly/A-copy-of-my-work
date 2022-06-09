var express = require('express');
var path = require('path');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// middleware check the user login
// user must login to perform user operations
router.use('/', function(req, res, next) {
  if(!('user' in req.session)) {
    console.log("Haven't login");
    res.redirect(403, '/');
  }else
  {
    next();
  }
});

// check the admin indentity
// limit all admin operation
router.use('/admin', function(req, res, next) {
  if(req.session.user.is_admin) {
    console.log("admin operation");
    next();
  }else
  {
    console.log("wrong admin");
    res.redirect(403, '/');
  }
});

// following 3 routers are used to render the page, user must login to acess them
router.get('/userPage', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/user.html'));
});

router.get('/eventsCreator', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/eventsCreator.html'));
});

router.get('/admin/allinfo', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../public/admin.html'));
});

// delete session when logout
router.get('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
  }
  res.redirect(200, '/');
});


// get user info
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

// cahnge user email
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

// change user name
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

// insert event to database
router.post('/addevent', function(req, res, next) {

  // check emptyness of input
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

// enrol in new event
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

// all enroled event
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

// set availability
router.post('/freetime', function(req, res, next) {

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE user_events SET free_time = ? WHERE event_id = ? && user_id= ?;";
    connection.query(query,[req.body.free_time,req.body.event_id,req.session.user.user_id],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("availability changed");
      res.sendStatus(200);
    });
  });
});

// query all members in a particualr event
router.post('/everyone', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT users.user_id,user_name,email,free_time FROM user_events INNER JOIN users ON user_events.user_id = users. user_id  WHERE event_id = ?;";
    connection.query(query,[req.body.event_id],function(error, rows, fields) {
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

// get all event created by pritciular user
router.get('/createdevents', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT * FROM events WHERE creator = ?;";
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

// finalise the time
router.post('/finaltime', function(req, res, next) {

  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "UPDATE events SET final_time = ? WHERE event_id = ? && creator= ?;";
    connection.query(query,[req.body.final_time,req.body.event_id,req.session.user.user_id],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("time finalised");
      res.sendStatus(200);
    });
  });
});

// admin get all user info
router.get('/admin/userlist', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT user_id,user_name,email,is_admin FROM users;";
    connection.query(query,function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      console.log("admin get all users");
      res.json(rows);
    });
  });
});

module.exports = router;
