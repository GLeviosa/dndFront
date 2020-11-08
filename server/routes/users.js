var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var author = require('../config/author');
var router = express.Router();
var db = require("../db");
var User = db.Mongoose.model('dndUsers', db.UserSchema);  

function generateToken(params = {}){
  return jwt.sign(params, author.secret, { expiresIn: 86400})
}

/* GET Userlist home page. */
router.get('/', function(req, res) {
  Users.find({}).lean().exec(
     function (e, docs) {
        res.json(docs);
        res.end();
  });
});

/* GET ONE user */
router.get("/user/:id", function(req, res, next) {
  User.find({_id: req.params.id}).lean().exec(function(e,docs) {
    res.json(docs);
    res.end();
  });
});

/* POST ONE user */
router.post("/register", function(req ,res, next) {
  User.exists({email: req.body.email}, function(err,doc) {
    if(err){
      res.status(400).send({ error: err })
    } else {
        if (doc){
          res.status(400).send({ error: "That email has been taken already!"});
        } else {
          var user = new User(req.body);
          
          user.save(function(err){
            if (err) {
              res.status(500).json({error: err.message});
              res.end();
              return;
            }
            user.password = undefined;
            res.send({
              user,
              token: generateToken({ id: user.id})
            });
            res.end();
  });
        }
      console.log("Result: ", doc)
    }
  })
});

/* PUT ONE use. */
router.put("/user/:id", function(req, res, next) {
  User.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function (err, doc){
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
});

/* DELETE ONE use. */
router.delete("/user/:id", function(req, res, next) {
  User.find({_id: req.params.id}).remove(function (err) {
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json({success: true});
    res.end();
  });
});

/* Authenticate user */
router.post("/authenticate", function(req, res, next) {
  const email = req.body.email;
  User.exists({email: email}, function(err,doc) {
    if(err){
      console.log(err);
    } else {
      if (doc){
        User.findOne({email: email}, function(err, user) {
          if (err) {
            res.status(400).send({ error: err })
          }else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
              if (!result) {
                res.status(400).send({ error: "Invalid password"});
                res.end();
                return;
              }
              user.password = undefined;
              res.send({
                user,
                token: generateToken({ id: user.id}),
                loggedStatus: true
              });
              res.end();
            })
          }
        }).select("+password");   
    } else {
      res.status(400).send({ error: "User not found"});
      res.end();
      return; 
    };

    };
  });
});

/* Add Encounter */
router.put("/encounter", function(req, res, next) {
  var id = req.body._id
  User.findOneAndUpdate({_id: id}, req.body, {upsert: true}, function (err, doc){
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    } else if (doc) {
      res.json({doc: doc})
    }
    res.json(req.body);
    res.end();
  });
});

router.put("/encounter" ,function(req, res, next) {
  User.findOneAndUpdate({_id: req.body._id}, req.body, {upsert: true}, function (err, doc){
    if (err) {
      res.status(500).json({error: err.message});
      res.end();
      return;
    }
    res.json(req.body);
    res.end();
  });
})



module.exports = router;
