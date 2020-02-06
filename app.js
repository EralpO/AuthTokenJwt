var express = require('express');
var app = express();
var db = require('./db');
global.__root   = __dirname + '/'; 


var cors = require('cors')

app.use(cors())
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/api',function (req, res) {
  res.send('hi')
});

var AuthController = require(__root + 'auth/AuthController');  
app.use('/api/auth', AuthController);


module.exports = app;