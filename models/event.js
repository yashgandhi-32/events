const mongoose = require('mongoose');
const moment = require('moment')
const Schema = mongoose.Schema

const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: String
    },
    description: {
        type: String
    },
    publishedBy: {
        type: String
       
    },
    tags: {
        type: Array
    },
    published: {
        type: Boolean
    },
    publishedOn: {
        type: Date,
        default: new Date()
    },
    eventImage: {
        type: String
    },
    likes: {
        type: Number
    },
    comments: [String],
    contact: {  //needed for user to contact event organizer
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

eventSchema.statics.getEventsList = function () {
    return this.find()
        .then((result) => {
            return result
        })
}



const Event = module.exports = mongoose.model('Event', eventSchema);
