const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName:  {
        type: String,
        required: true
    },
    LastName:    {
        type: String,
        required: true
    },
    userName:  {
        type: String,
        required: true
    },
    email:   {
        type: String,
        required: true
    },
    events: [{
        eventId:    {type: [mongoose.Schema.Types.ObjectId]},
        eventTitle:  {type: String}
    }]
});

var Student = module.exports = mongoose.model('Student', studentSchema);

// Fetch events
module.exports.getStudent = function(callback, limit)   {
    User.find(callback).limit(limit);
}

// Fetch single event
module.exports.getStudentByUsername = function(username, callback)    {
    var query = {username: username};
    User.find(query, callback);
}