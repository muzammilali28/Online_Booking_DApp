var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var PDFDocument = require('pdfkit');
var fs = require("fs");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var OnlineRegistrationRouter = require('./routes/onlineRegistration');
// var pdfDownload = require("./routes/pdfDownload");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* This is a Route for Online Registration handeling all the GET , POST requests!!! */
app.use('/OnlineRegistration', OnlineRegistrationRouter);


// app.use('/pdfDownload', pdfDownload);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
