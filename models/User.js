const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    type: {
        type: String,
        required: true
    },
    dateJoined: {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('User', userSchema);

// Fetch users
module.exports.getUsers = function (callback, limit) {
    User.find(callback).limit(limit);
}

// Fetch single user
module.exports.getUserByUsername = function (userName, callback) {
    var query = { userName: userName };
    User.find(query, callback);
}

// Register Students
module.exports.registerStudent = function (newUser, newStudent, callback) {
    console.log('Reached inside User.js\'s registerStudent()');

    bcrypt.hash(newUser.password, 15, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        console.log('Student is registered');
        async.parallel([newUser.save, newStudent.save], callback);
    });
}

// Register Faculty
module.exports.registerFaculty = function (newUser, newFaculty, callback) {
    bcrypt.hash(newUser.password, 15, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        console.log('Faculty is registered');
        async.parallel([newUser.save, newFaculty.save], callback);
    });
}