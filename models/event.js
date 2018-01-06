const mongoose = require('mongoose');
const moment = require('moment')
const Schema = mongoose.Schema

const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    location: {
        type: String,  
        required  :true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publishedBy: {
        type: String,
        required:true
       
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
