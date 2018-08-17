var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator')

router.use(expressValidator())

var passport = require('passport');
var localStrategy = require('passport-local'), Strategy;

// Include models
var User = require('../models/User');
var Student = require('../models/Student');
var Faculty = require('../models/Faculty');

// console.log('Reg Func', regS)

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  res.render('users/signup');
});

router.post('/signup', function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var ernumber = req.body.ernumber;
  var password = req.body.password;
  var repassword = req.body.repassword;
  // var type = req.body.type;
  var type = 'student';
  var userName = firstName + lastName;

  // Input validation
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email ID is require').notEmpty();
  req.checkBody('email', 'Email ID must be valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('repassword').equals(req.body.password);

  // Check errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('/signup', {
      errors: errors,
      firstName: firstName,
      lastName: lastName,
      ernumber: ernumber,
      email: email
    });
  } else {
    var newUser = new User({
      userName: userName,
      email: email,
      password: password,
      type: type,
      dateJoined: Date.now
    });
    console.log("Type: ", type);
    if (type == 'student') {
      var newStudent = new Student({
        firstName: firstName,
        LastName: lastName,
        userName: firstName + lastName,
        email: email
      });
      // User.registerStudent(newUser, newStudent, function (err, user) {
      //   console.log('Student Registered', user);
      // });

      newStudent.save((err, user) => {
        if (err) return console.log('Error Occurred: ', err);
        console.log('Success: ', user);
      });

    } else if (type == 'faculty') {
      var newFaculty = new Faculty({
        firstName: firstName,
        LastName: lastName,
        userName: firstName + lastName,
        email: email
      });
      User.registerFaculty(newUser, newFaculty, function (err, user) {
        console.log('Faculty Registered');
      });
    }

    req.flash('success', 'User added');
    res.redirect('/');
  }
});

module.exports = router;
