var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
async = require('async');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const { mongoCredentials } = require('./configs/mlab.config');
// MongoDB connection
// mongoose.connect('mongodb://localhost/projectDevel');
// mongoose.connect('mongodb://gghanshyam01:' + pwd + '@ds225442.mlab.com:25442/projectdevel');

mongoose.connect('mongodb://gghanshyam01.@ds225442.mlab.com:25442/projectdevel', {
  auth: {
    user: mongoCredentials.user,
    password: mongoCredentials.password
  }
}).then(res => console.log('Connected to mongodb'))
  .catch(err => console.log('Error connecting to mongo'));

var indexRouter = require('./routes/index');
var contactRouter = require('./routes/contact');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');

var app = express();

// view engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/contact', contactRouter);
app.use('/users', usersRouter);


// Express validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;
    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));



// Global vars
app.use(function (req, res, next) {
  res.locals.message = require('express-messages')(req, res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log('From app.js', err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// app.listen(3000, () => {
//   console.log('App listening on port 3000');
// });