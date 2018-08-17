const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title:  {
        type: String,
        required: true
    },
    description:    {
        type: String,
        required: true
    },
    user:   {
        type: String,
        required: true
    },
    venue:   {
        type: String,
        required: true
    },
    date:   {
        type: Date,
        required: true
    },
    dateCreated:    {
        type: Date,
        default: Date.now
    }
});

var Event = module.exports = mongoose.model('Event', eventSchema);

// Fetch events
module.exports.getEvents = function(callback, limit)   {
    Event.find(callback).limit(limit);
}

// Fetch single event
module.exports.getEventByID = function(id, callback)    {
    Event.findById(id, callback);
}