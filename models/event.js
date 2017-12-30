const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventName: {
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
        type: String
    },
    tags: {
        type: Array
    },
    published: {
        type: Boolean,
        default: false
    },
    publishedOn: {
        type: Date,
        default: Date.now
    },
    eventImage: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: {
        type: Array
    },
    contact: {  //needed for user to contact event organizer
        type: String
    }
});

eventSchema.statics.getEventsList = function() {
    return this.find()
        .then((result) => {
            return result
        })
}

const Event = module.exports = mongoose.model('Event', eventSchema);

