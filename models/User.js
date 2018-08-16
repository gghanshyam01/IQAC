const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    userName:  {
        type: String,
        required: true
    },
    email:   {
        type: String,
        required: true
    },
    password:   {
        type: String,
        required: true,
        bcrypt: true
    },
    type:   {
        type: String,
        required: true
    },
    dateJoined:    {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('User', userSchema);

// Fetch events
module.exports.getUsers = function(callback, limit)   {
    User.find(callback).limit(limit);
}

// Fetch single event
module.exports.getUserByUsername = function(username, callback)    {
    var query = {username: username};
    User.find(query, callback);
}

// Register Students
module.exports.registerStudent = function(newUser, newStudent, callback) {
    bcrypt.hash(newUser.password, 15, function(err, hash)    {
        if(err) throw err;
        newUser.password = hash;
        console.log('Student is regiestered');
        async.parallel([newUser.save, newStudent.save], callback);
    });
}

// Register Faculty
module.exports.registerFaculty = function(newUser, newFaculty, callback) {
    bcrypt.hash(newUser.password, 15, function(err, hash)    {
        if(err) throw err;
        newUser.password = hash;
        console.log('Student is regiestered');
        async.parallel([newFaculty.save, newStudent.save], callback);
    });
}