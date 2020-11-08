var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var author = require('../config/author');
var router = express.Router();

function generateToken(params = {}){
  return jwt.sign(params, author.secret, { expiresIn: 86400})
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // res.json("Express");
  // res.end();
});

module.exports = router;