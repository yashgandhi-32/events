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
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    publishedOn: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    },
    comments: {
        type: Array
    }
});

eventSchema.statics.getEventsList = function() {
    return this.find()
        .then((result) => {
            return result
        })
}

const Event = module.exports = mongoose.model('Event', eventSchema);

