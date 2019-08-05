var express = require('express');
var app = express();
var usersRouter = require('./users');
var loginRouter = require('./loginVerify');
var fakeBoardRouter = require('./fakeBoard');

app.use('/', loginRouter);
app.use('/fakeBoard',fakeBoardRouter);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = app;
