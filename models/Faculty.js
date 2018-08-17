const mongoose = require('mongoose');

const facultySchema = mongoose.Schema({
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

var Faculty = module.exports = mongoose.model('Faculty', facultySchema);

// Fetch faculty
module.exports.getFaculty = function(callback, limit)   {
    User.find(callback).limit(limit);
}

// Fetch single faculty
module.exports.getFacultyByUsername = function(userName, callback)    {
    var query = {userName: userName};
    User.find(query, callback);
}