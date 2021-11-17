var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var { mongodb_url } = require('./database_layer/database_config');
var app = express();

mongoose.connect(
  mongodb_url, {
  useNewUrlParser: 'true',
  useUnifiedTopology: 'true'
});

mongoose.connection.on('connected',() => {
  console.log("connected to DB");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

BASE_URL = "/api/v1"
app.use('/', require('./routes/index'));
app.use(BASE_URL + '/user', require('./routes/user_route'));
app.use(BASE_URL + '/todo', require('./routes/todo_route'));
app.use(BASE_URL + '/serveStaticFile', require('./routes/serveStaticFile'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({response_message: "Not Found"});
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
