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

// Fetch students
module.exports.getStudent = function(callback, limit)   {
    Student.find(callback).limit(limit);
}

// Fetch single student
module.exports.getStudentByUsername = function(userName, callback)    {
    var query = {userName: userName};
    Student.find(query, callback);
}