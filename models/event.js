const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    event_name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    publishedBy: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    published: {
        type: Boolean,
        required: true
    },
    publishedOn: {
        type: Date,
        default: Date.now
    }

});

const Event = mongoose.model('Event', eventSchema);
module.exports = { Event }