import { Stream } from 'stream';

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
        default:false
    },
    publishedOn: {
        type: Date,
        default: Date.now
    },
    image:{
        type:String,
        required:true
    }
     
});

const Event = mongoose.model('Event', eventSchema);
module.exports = { Event }