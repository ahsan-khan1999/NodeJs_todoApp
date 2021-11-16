var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var todo = require('./Schema/todoSchemma')
var mongoose = require('mongoose')
var {mongodbkey} = require('./keys')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileRouter = require('./routes/serveStaticFile');
var todo =require('./routes/todoRoute')

var app = express();


mongoose.connect(mongodbkey,{
  useNewUrlParser:'true',
  useUnifiedTopology:'true'
})
mongoose.connection.on('connected',() => {
  console.log("connected to DB");
  
})




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',usersRouter);
app.use('/todo',todo)
app.use('/serveStaticFile', fileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("404 Please ")
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
