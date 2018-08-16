var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local'),Strategy;

// Include models
var User = require('../models/User');
var Student = require('../models/Student');
var Faculty = require('../models/Faculty');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});

router.post('/signup', function(req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var ernumber = req.body.ernumber;
  var password = req.body.password;
  var repassword = req.body.repassword;
  var type = req.body.type;
  var username = firstName + lastName;

  // Input validation
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email ID is require').notEmpty();
  req.checkBody('email', 'Email ID must be valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('repassword').equals(req.body.password);

  // Check errors
  var errors = req.validationErrors();

  if(errors)  {
    res.render('/signup', {
      errors: errors,
      firstName: firstName,
      lastName: lastName,
      ernumber: ernumber,
      email: email
    });
  } else  {
    var newUser = new User({
      userName: userName,
      email: email,
      password: password,
      type: type,
      dateJoined: Date.now
    });
    if(type == 'student') {
      var newStudent = new Student({
        firstName: firstName,
        LastName:lastName,
        userName: firstName + lastName,
        email: email
      });
      User.registerStudent(newUser, newStudent, function(err, user)  {
        console.log('Student Registered');
      });
    } else if(type == 'faculty') {
      var newFaculty = new Faculty({
      firstName: firstName,
      LastName: lastName,
      userName: firstName + lastName,
      email: email
      });
      User.registerFaculty(newUser, newFaculty, function(err, user)  {
        console.log('Faculty Registered');
      });
    }

    req.flash('success', 'User added');
    res.redirect('/');
  }
});

module.exports = router;
